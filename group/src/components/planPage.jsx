"use client";
import { TikMark } from "@/assets/icons/tikMark";
import React, { useState } from "react";
import Button from "./shared/botton";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { CgClose } from "react-icons/cg";
import { pageShowFunc4 } from "@/redux/groupSlice";

const PlanPage = () => {
  const { planPage } = useSelector((state) => state.groupInfo);
  const router = useRouter();

  if (!planPage) {
    router.push("/signup");
    return;
  }

  const [subDate, setsubDate] = useState(false);
  const [packageName, setpackageName] = useState("");

  const handlePlan = async (month) => {
    // console.log({ packageName: packageName, subscriptionFor: month });
    setsubDate(false);
    router.replace(
      `/plan/checkout?packageName=${packageName}&subscriptionFor=${month}`
    );
  };

  const dispatch = useDispatch()
  const handleFree = () => {
    dispatch(pageShowFunc4(true))
    router.push('/create-group')
  }

  return (
    <section className="bg-BgColor py-10 lg:py-20">
      {subDate && (
        <div className="h-screen w-screen fixed top-0 left-0 bg-[#00000064] z-50 flex items-center justify-center">
          <div className="bg-white px-14 py-8 rounded-md relative">
            <h3 className="!font-bold text-[28px] text-primaryColor">
              Select subscription date time
            </h3>
            <button onClick={() => setsubDate(false)} className="absolute top-5 right-5 text-[18px]" >
              <CgClose />
            </button>
            <div className="flex items-center justify-center mt-5 gap-3">
              <Button onClick={() => handlePlan("monthly")}>Monthly</Button>
              <Button onClick={() => handlePlan("yearly")}>Yearly</Button>
            </div>
          </div>
        </div>
      )}

      <div className="lg:w-[1544px] w-full mx-auto flex justify-end">
        <Button onClick={handleFree} className="!px-10">Skip</Button>
      </div>
      <div className="container mt-10">
        <h3 className="font-semibold text-[8vw] lg:text-[64px] text-primaryColor lg:w-[600px] text-center mx-auto">
          Discover the <span className="text-BtnColor">Perfect Plan</span> for
          You
        </h3>

        <p className="font-normal text-[#637381] text-[20px] lg:text-[24px] text-center">
          Select the Ideal Plan to Suit Your Needs, Always Flexible to Adapt
        </p>
      </div>
      <div className="flex items-center justify-center  mt-6">
        <div className="flex border-2 border-black rounded-[8px] overflow-hidden">
          <button className="px-6 py-2   text-black   bg-gray-200">
            Coach
          </button>
          <button className="px-6 py-2 bg-red-500 text-white hover:bg-BtnColor">
            Group
          </button>
        </div>
      </div>

      <div className="container lg:flex lg:flex-wrap justify-center gap-8 mt-10">
        {/* free plan start */}
        <div className="h-[531px] lg:w-[362px] w-full bg-white rounded-[16px] drop-shadow-sm  p-10">
          <h3 className="font-normal text-[20px] text-BtnColor text-center">
            Basic (Free)
          </h3>
          <div className="flex gap-x-2 pt-10">
            <TikMark className="mt-1" />
            <p className="font-normal text-base text-primaryColor w-[253px]">
              Basic profile listing with limited information .
            </p>
          </div>
          <div className="flex gap-x-2 mt-2">
            <TikMark className="mt-1" />
            <p className="font-normal text-base text-primaryColor w-[253px]">
              Access to client reviews and ratings
            </p>
          </div>
          <div className="flex gap-x-2 mt-2">
            <TikMark className="mt-1" />
            <p className="font-normal text-base text-primaryColor w-[253px]">
              Limited analytics.
            </p>
          </div>
          <Button className="!bg-transparent border !w-full text-normal text-[18px] !text-gray-600 mt-10">
            Current Plan
          </Button>
        </div>
        {/* free plan start */}

        {/* Essential  plan start */}
        <div className="h-[531px] lg:w-[362px] w-full bg-white rounded-[16px] drop-shadow-sm  p-10">
          <div className="flex justify-end">
            <button className="text-BtnColor bg-MenuHColor px-2 py-1 rounded-[8px] ">
              POPULAR
            </button>
          </div>
          <h3 className="font-normal text-[20px] text-BtnColor text-center pt-5">
            Essential
          </h3>
          <h3 className="font-semibold text-[20px] text-primaryColor text-center pt-5">
            $99/month or $1,000/year
          </h3>
          <div className="flex gap-x-2 pt-10">
            <TikMark className="mt-1" />
            <p className="font-normal text-base text-primaryColor w-[262px]">
              Enhanced profile with additional fields.
            </p>
          </div>
          <div className="flex gap-x-2 mt-2">
            <TikMark className="mt-1" />
            <p className="font-normal text-base text-primaryColor w-[253px]">
              Priority placement in search results.
            </p>
          </div>
          <div className="flex gap-x-2 mt-2">
            <TikMark className="mt-1" />
            <p className="font-normal text-base text-primaryColor w-[253px]">
              Basic analytics dashboard.
            </p>
          </div>
          <div className="flex gap-x-2 mt-2">
            <TikMark className="mt-1" />
            <p className="font-normal text-base text-primaryColor w-[259px]">
              Ability to respond publicly to reviews.
            </p>
          </div>
          <Button
            onClick={() => {
              setsubDate(true), setpackageName("essential");
            }}
            className="!w-full text-normal text-[18px] text-white mt-10"
          >
            Subscribe
          </Button>
        </div>
        {/* Essential  plan end */}

        {/* Premium  plan start */}
        <div className="h-[531px] lg:w-[362px] w-full bg-white rounded-[16px] drop-shadow-sm p-10">
          <h3 className="font-normal text-[20px] text-BtnColor text-center pt-5">
            Premium
          </h3>
          <h3 className="font-semibold text-[20px] text-primaryColor text-center pt-5">
            $199/month or $2,000/year
          </h3>
          <div className="flex gap-x-2 pt-10">
            <TikMark className="mt-1" />
            <p className="font-normal text-base text-primaryColor w-[262px]">
              Featured placement on category pages.
            </p>
          </div>
          <div className="flex gap-x-2 mt-2">
            <TikMark className="mt-1" />
            <p className="font-normal text-base text-primaryColor w-[253px]">
              Advanced analytics.
            </p>
          </div>
          <div className="flex gap-x-2 mt-2">
            <TikMark className="mt-1" />
            <p className="font-normal text-base text-primaryColor w-[253px]">
              Enhanced lead generation tools.
            </p>
          </div>
          <div className="flex gap-x-2 mt-2">
            <TikMark className="mt-[6px]" />
            <p className="font-normal text-base text-primaryColor w-[259px]">
              Access to platform-exclusive webinars and networking events.
            </p>
          </div>
          <Button
            onClick={() => {
              setsubDate(true), setpackageName("premium");
            }}
            className="!w-full text-normal text-[18px] text-white mt-10"
          >
            Subscribe
          </Button>
        </div>
        {/* Premium  plan end */}

        {/* Advanced  plan start */}
        <div className="h-[531px] lg:w-[362px] w-full bg-white rounded-[16px] drop-shadow-sm p-10">
          <h3 className="font-normal text-[20px] text-BtnColor text-center pt-5">
            Advanced
          </h3>
          <h3 className="font-semibold text-[20px] text-primaryColor text-center pt-5">
            $499/month or $5,000/year
          </h3>
          <div className="flex gap-x-2 pt-10">
            <TikMark className="mt-1" />
            <p className="font-normal text-base text-primaryColor w-[262px]">
              Priority featured placement on the homepage and top search
              results.
            </p>
          </div>
          <div className="flex gap-x-2 mt-2">
            <TikMark className="mt-1" />
            <p className="font-normal text-base text-primaryColor w-[253px]">
              Access to advanced marketing tools.
            </p>
          </div>
          <div className="flex gap-x-2 mt-2">
            <TikMark className="mt-1" />
            <p className="font-normal text-base text-primaryColor w-[253px]">
              Customizable profile enhancements
            </p>
          </div>
          <div className="flex gap-x-2 mt-2">
            <TikMark className="mt-[6px]" />
            <p className="font-normal text-base text-primaryColor w-[259px]">
              Personalized performance consultations and marketing support.
            </p>
          </div>
          <div className="flex gap-x-2 mt-2">
            <TikMark className="mt-[6px]" />
            <p className="font-normal text-base text-primaryColor w-[259px]">
              Invitation to exclusive high-value webinars and industry events.
            </p>
          </div>
          <Button
            onClick={() => {
              setsubDate(true), setpackageName("advance");
            }}
            className="!w-full text-normal text-[18px] text-white mt-10"
          >
            Subscribe
          </Button>
        </div>
        {/* Advanced  plan end */}
      </div>

      {/* <div className="lg:h-[334px] py-10  container w-full bg-white rounded-[16px] drop-shadow-sm mx-auto mt-10  p-10">
        <h3 className='font-normal text-[20px] text-BtnColor text-center'>Enterprise (Custom/Inquire)</h3>

        <div className="flex gap-x-2 pt-5">
          <TikMark className='mt-1' />
          <p className='font-normal text-base text-primaryColor'>Fully customizable profile options and white-label capabilities..</p>
        </div>
        <div className="flex gap-x-2 mt-2">
          <TikMark className='mt-1' />
          <p className='font-normal text-base text-primaryColor'>Dedicated account manager for tailored support.</p>
        </div>
        <div className="flex gap-x-2 mt-2">
          <TikMark className='mt-1' />
          <p className='font-normal text-base text-primaryColor'>Full platform API access for integrations.</p>
        </div>
        <div className="flex gap-x-2 mt-2">
          <TikMark className='mt-[6px]' />
          <p className='font-normal text-base text-primaryColor'>Comprehensive marketing campaigns designed by the platform's team.</p>
        </div>
        <div className="flex gap-x-2 mt-2">
          <TikMark className='mt-[6px]' />
          <p className='font-normal text-base text-primaryColor'>Exclusive partnerships and co-branded content opportunities.</p>
        </div>
        <Button className='!w-full text-normal text-[18px] text-white mt-6'>
          Subscribe
        </Button>
      </div> */}
    </section>
  );
};

export default PlanPage;
