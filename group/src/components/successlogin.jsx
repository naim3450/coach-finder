"use client";
import { pageShowFunc3 } from "@/redux/groupSlice";
import { useRouter } from "next/navigation";
import { HiArrowLeft } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import Button from "./shared/botton";

const Successlogin = () => {
  const { successNotice } = useSelector((state) => state.groupInfo);

  const router = useRouter();
  const dispatch = useDispatch();
  if (!successNotice) {
    router.push("/signup");
  }

  const handlePlan = () => {
    dispatch(pageShowFunc3(true));
    router.push("/plan");
  };

  return (
    <div className="bg-BgColor py-10">
      <div className="container py-20 w-full lg:w-[607px] bg-white rounded-[20px] shadow-2xl">
        <h3 className="font-medium text-primaryColor text-[8vw] lg:text-[64px] text-center pt-20 md:w-[484px] w-full mx-auto leading-snug">
          Successfully logged In
        </h3>
        <p className="font-normal text-[18px] text-primaryColor text-center">
          Now select a plan to get started
        </p>
        <div className="flex items-center justify-between  px-10 mt-10">
          <button className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300">
            <HiArrowLeft />
          </button>

          <Button onClick={handlePlan} className="!py-4">
            Select a plan
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Successlogin;
