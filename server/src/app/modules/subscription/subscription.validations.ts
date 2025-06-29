import { z } from "zod";

export const stripePaymentValidationSchema = z.object({
  body: z.object({
    packageName: z.enum(["essential", "premium", "advance"]),
    subscriptionFor: z.enum(["monthly", "yearly"]),
  }),
});

const packageSchema = z.enum(["essential", "premium", "advance"]);
const billingPeriodSchema = z.enum(["monthly", "yearly"]);

export const paymentSuccessValidationSchema = z.object({
  body: z.object({
    package: packageSchema,
    amount: z.string(),
    billingPeriod: billingPeriodSchema,
    transactionId: z.string().min(1, "Transaction ID cannot be empty"),
  }),
});
