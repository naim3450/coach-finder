"use client";
import Loading from "@/components/Loading";
import rootConfig from "@/config";
import axiosInstance from "@/lib/axios.config";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import PaymentForm from "./payment-form";
import Image from "next/image";
import Logo from "../../../assets/logo.png";
const stripePromise = loadStripe(rootConfig.stripe_publishable_key);

const Checkout = () => {
  const searchParams = useSearchParams();
  const packageName = searchParams.get("packageName");
  const subscriptionFor = searchParams.get("subscriptionFor");
  const [clientSecret, setClientSecret] = useState(null);
  const [payable, setPayable] = useState(0);

  const router = useRouter();

  if (!packageName || !subscriptionFor) {
    router.push("/");
  }

  useEffect(() => {
    (async function () {
      const res = await axiosInstance.post("subscriptions/payment", {
        packageName,
        subscriptionFor,
      });
      if (res.success) {
        setClientSecret(res.data.client_secret);
        setPayable(res.data.amount);
      }
    })();
  }, [packageName, subscriptionFor]);

  if (!clientSecret) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col h-screen   justify-center items-center max-w-lg mx-auto">
      <div className="flex justify-center">
        <Image src={Logo} alt="Logo" />
      </div>
      <div className="bg-white shadow rounded-lg p-6 mt-16">
        <Elements options={{ clientSecret }} stripe={stripePromise}>
          <PaymentForm
            payable={payable / 100}
            packageName={packageName}
            subscriptionFor={subscriptionFor}
          />
        </Elements>
      </div>
    </div>
  );
};

const CheckoutPage = () => {
  return (
    <Suspense>
      <Checkout />
    </Suspense>
  );
};

export default CheckoutPage;
