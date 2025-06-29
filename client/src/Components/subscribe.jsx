"use client";

import React, { useState } from "react";
import Button from "./shared/button";
import { IoMail } from "react-icons/io5";
import { Toaster, toast } from "sonner";
import axiosInstance from "@/lib/axios.config";
import SubscribeIcon from "@/assets/ico/subscribeIcon";

const Subscribe = () => {
  async function handleSubscribe(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const loading = toast.loading("Working ...");
    if (!email) {
      toast.error("Please provide your email address", { id: loading });
      return;
    } else if (!emailRegex.test(email)) {
      toast.error("Please provide valid email format", { id: loading });
      return;
    }

    const res = await axiosInstance.post(`/subscribe?email=${email}`);

    if (res.success) {
      toast.success(res.message, { id: loading });
      e.target.reset();
    }
  }

  return (
    <>
      <Toaster position="bottom-right" richColors />
      <section className="py-36 bg-[#F9F9FA] bg-subscribe-bg bg-cover bg-no-repeat bg-center">
        <div className="container mb-14">
          <h3 className="font-extrabold md:text-[48px] text-[5vw] text-primaryColor text-center">
            Subscribe to our newsletter
          </h3>
          <p className="font-normal xl:text-base text-sm text-[#080316] opacity-40 text-center pt-4">
            Get notification about tips, new product and exclusive promo news
            just for you.
          </p>
        </div>

        <form
          onSubmit={handleSubscribe}
          className="flex md:flex-row flex-col items-center justify-center gap-5 lg:w-[482px] mx-auto w-[70vw]"
        >
          <div className="flex bg-white items-center gap-2 rounded-[12px] h-[70px] drop-shadow-xl px-3  w-[482px] relative max-sm:hidden">
            <SubscribeIcon />
            <input
              type="text"
              name="email"
              placeholder="Enter your email address"
              className="!py-4 h-[60px]  lg:w-[215px] w-[95%] outline-none bg-transparent border-none focus-visible:ring-0"
            />
            <Button className="!bg-[#08192B] !py-3 !px-8 h-[54px] my-2 !rounded-[12px] absolute right-2 top-0">
              Subscribe
            </Button>
          </div>

          <div className="max-sm:flex max-sm:flex-col hidden items-center gap-2 rounded-[12px] px-3  w-full relative">
            <div className="relative shadow-md w-full">
              <SubscribeIcon className={"absolute top-1/2 left-2 -translate-y-1/2"} />
              <input
                type="text"
                name="email"
                placeholder="Enter your email address"
                className="!py-4 rounded-md pl-10 outline-none bg-transparent border-none focus-visible:ring-0 bg-white"
              />
            </div>
            <Button className="!bg-[#08192B] !py-2 !px-6 my-2 text-sm !rounded-[12px]">
              Subscribe
            </Button>
          </div>

        </form>
      </section>
    </>
  );
};

export default Subscribe;
