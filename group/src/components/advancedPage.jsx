

"use client";

import React, { useState } from "react";
import UserProfileForm from "@/components/userProfileForm";
import { HiArrowLeft } from "react-icons/hi2";
import ArrTypeVal from "@/components/arrTypeVal";
import CreateGroupStepFour from "@/components/createGroupStepFour";
import Congratulations from "@/components/congratulations";
import PremiumStepOne from "@/components/shared/premiumStepOne";

const AdvancedPage = () => {
  let [index, setindex] = useState(0);

  function inc() {
    if (index == 4) {
      setindex(3);
    } else if (index < 4) {
      setindex(++index);
    }
  }
  function dec() {
    if (index == 0) {
      setindex(0);
    } else {
      setindex(--index);
    }
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white lg:w-[607px] w-full  py-10  rounded-lg shadow-lg p-8">
        {index == 0 && <UserProfileForm index={index} dec={dec} inc={inc} />}
        {index == 1 && <PremiumStepOne index={index} dec={dec} inc={inc} />}
        {index == 2 && <ArrTypeVal index={index} dec={dec} inc={inc} />}
        {index == 3 && <CreateGroupStepFour index={index} dec={dec} inc={inc} advance={true} />}
        {index == 4 && <Congratulations index={index} dec={dec} inc={inc} />}
      </div>
    </div>
  );
};

export default AdvancedPage;
