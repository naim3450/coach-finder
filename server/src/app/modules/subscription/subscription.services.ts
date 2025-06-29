import { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import { subscriptionType } from "../../constants";
import AppError from "../../errors/app-error";
import { IServiceResponse } from "../../interfaces/service-response";
import { IStripe, ISuccess } from "./subscription.interfaces";
import { Stripe } from "stripe";
import User from "../users/user.models";
import transporter from "../../emails/transporter";
import confirmedSubscriptionEmailTemplate from "../../emails/confirmedSubscriptionEmailTemplate";
import { StatusCodes } from "http-status-codes";

const stripeConstructor = new Stripe(config.stripe_secret_key as string);

async function stripe(payload: IStripe): Promise<IServiceResponse> {
  let amount: number = 0;

  switch (payload.packageName) {
    case subscriptionType.ESSENTIAL.NAME:
      amount =
        payload.subscriptionFor === subscriptionType.ESSENTIAL.TYPE.MONTHLY.NAME
          ? subscriptionType.ESSENTIAL.TYPE.MONTHLY.PRICE
          : subscriptionType.ESSENTIAL.TYPE.YEARLY.PRICE;
      break;
    case subscriptionType.PREMIUM.NAME:
      amount =
        payload.subscriptionFor === subscriptionType.PREMIUM.TYPE.MONTHLY.NAME
          ? subscriptionType.PREMIUM.TYPE.MONTHLY.PRICE
          : subscriptionType.PREMIUM.TYPE.YEARLY.PRICE;
      break;
    case subscriptionType.ADVANCE.NAME:
      amount =
        payload.subscriptionFor === subscriptionType.ADVANCE.TYPE.MONTHLY.NAME
          ? subscriptionType.ADVANCE.TYPE.MONTHLY.PRICE
          : subscriptionType.ADVANCE.TYPE.YEARLY.PRICE;
      break;
  }

  const paymentIntent = await stripeConstructor.paymentIntents.create({
    amount: amount * 100,
    currency: "usd",
  });

  if (!paymentIntent) {
    throw new AppError(400, "Failed to create payment intent");
  }

  return {
    success: true,
    status: 201,
    message: "payment intent successfully created",
    data: paymentIntent,
  };
}

async function success(
  user: JwtPayload,
  payload: ISuccess
): Promise<IServiceResponse> {
  const subscriber = await User.findById(user._id);

  if (!subscriber) {
    throw new AppError(404, "User not found with that id");
  }

  subscriber.account_type = payload.package;
  await subscriber.save();

  const sendEmail = await transporter.sendMail({
    to: subscriber.email,
    subject: "Subscription Confirmed - Coach Finder",
    html: confirmedSubscriptionEmailTemplate({
      name: `${subscriber.first_name} ${subscriber.last_name}`,
      packageName:
        payload.package.charAt(0).toUpperCase() + payload.package.slice(1),
      amount: payload.amount,
      billingPeriod:
        payload.billingPeriod.charAt(0).toUpperCase() +
        payload.billingPeriod.slice(1),
      transactionId: payload.transactionId,
    }),
  });

  if (!sendEmail.accepted.length) {
    return {
      status: StatusCodes.BAD_REQUEST,
      success: false,
      message: "Failed to send Email",
      data: null,
    };
  }

  return {
    success: true,
    status: 200,
    message: "Subscription success",
    data: subscriber,
  };
}

export const SubscriptionServices = {
  stripe,
  success,
};
