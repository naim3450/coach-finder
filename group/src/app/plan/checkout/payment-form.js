import Button from "@/components/shared/botton";
import axiosInstance from "@/lib/axios.config";
import { pageShowFunc4 } from "@/redux/groupSlice";
import { numberToUsd } from "@/utils/numberToUsd";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Result } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const PaymentForm = ({ payable, packageName, subscriptionFor }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [tixId, setTixId] = useState("");
  const router = useRouter();

  const dispatch = useDispatch()

  async function handleSubmit(event) {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (error) {
      setErrorMessage(error.message ?? "An unknown error occurred");
      setIsLoading(false);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      const res = await axiosInstance.patch("/subscriptions/success", {
        package: packageName,
        amount: numberToUsd(payable),
        billingPeriod: subscriptionFor,
        transactionId: paymentIntent.id,
      });

      if (res.success) {
        setIsLoading(false);
        setTixId(paymentIntent.id);
        setIsSuccess(true);
      }

      setTimeout(() => {
        dispatch(pageShowFunc4(true))
        router.push("/create-group");
      }, 500);
    }
  }

  if (isSuccess) {
    return (
      <Result
        status="success"
        title={`Successfully Subscribed ${packageName.charAt(0).toUpperCase() + packageName.slice(1)
          } Plan`}
        subTitle={`Transaction ID: ${tixId}`}
        extra={[
          <Link key="go_back" href={"/"}>
            <Button className="!bg-[#9d8c8c]">Go Home</Button>
          </Link>,
          <Link key="profile" href="/dashboard">
            <Button>Go Profile</Button>
          </Link>,
        ]}
      />
    );
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-4">Make Payment</h2>
      <p>
        After clicking &quot;Pay Now&quot; the payment is processed and an
        receipt will send to your email
      </p>
      <h2 className="text-xl font-bold mb-4">{numberToUsd(payable)}</h2>
      <PaymentElement />
      <Button className="w-full">{isLoading ? "Processing" : "Pay Now"}</Button>

      {errorMessage && (
        <div className="text-red-500 text-sm">{errorMessage}</div>
      )}
    </form>
  );
};

export default PaymentForm;
