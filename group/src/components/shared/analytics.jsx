"use client";

import axiosInstance from "@/lib/axios.config";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const GenderProgressBar = ({ label, percentage, color }) => {
  return (
    <div className="space-y-1 w-[270px]">
      <div className="flex justify-between items-center">
        <span className="text-sm  font-medium text-gray-700">{label}</span>
        <span className="text-sm text-gray-500">{percentage}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-[5px] h-[25px] overflow-hidden">
        <div
          className={`h-full ${color} rounded-[5px] transition-all`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

const Analytics = () => {
  const { userGroup } = useSelector((state) => state.groupInfo);


  function countGenderOccurrences(genderArray, gender) {
    return genderArray?.filter(item => item?.gender === gender).length;
  }

  let maleCount = countGenderOccurrences(userGroup?.visitors, "male");
  let femaleCount = countGenderOccurrences(userGroup?.visitors, "female");
  let otherCount = countGenderOccurrences(userGroup?.visitors, "other");

  // async function singleGroup() {
  //   const res = await axiosInstance.get(`/users`);
  //   console.log(res);
  // }

  // useEffect(() => {
  //   singleGroup()
  // }, [userGroup])


  const users = {
    men: maleCount,
    women: femaleCount,
    others: otherCount,
  };

  const totalUsers = users.men + users.women + users.others;

  const targetPercentages = {
    men: ((users.men / totalUsers) * 100).toFixed(1),
    women: ((users.women / totalUsers) * 100).toFixed(1),
    others: ((users.others / totalUsers) * 100).toFixed(1),
  };

  const [progress, setProgress] = useState({
    men: 0,
    women: 0,
    others: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = { ...prev };
        if (newProgress.men < targetPercentages.men) {
          newProgress.men = Math.min(
            newProgress.men + 1,
            targetPercentages.men
          );
        }
        if (newProgress.women < targetPercentages.women) {
          newProgress.women = Math.min(
            newProgress.women + 1,
            targetPercentages.women
          );
        }
        if (newProgress.others < targetPercentages.others) {
          newProgress.others = Math.min(
            newProgress.others + 1,
            targetPercentages.others
          );
        }
        return newProgress;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [targetPercentages]);

  return (
    <div className="p-6 space-y-6 w-full mx-auto">
      <h2 className="text-lg font-semibold text-gray-700">
        Gender Distribution
      </h2>
      <GenderProgressBar label="Men" percentage={progress.men} color="bg-[#EB3743]" />
      <GenderProgressBar label="Women" percentage={progress.women} color="bg-[#EB3743]" />
      <GenderProgressBar label="Others" percentage={progress.others} color="bg-[#EB3743]" />
    </div>
  );
};

export default Analytics;
