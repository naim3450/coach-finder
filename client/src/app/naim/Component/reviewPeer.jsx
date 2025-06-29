import React, { useEffect, useState } from "react";
import SectionTitle from "./sectionTitle";
import RvwCard from "./rvwCard";
import axiosInstance from "@/lib/axios.config";
import useReviews from "@/hooks/get-review.";

const ReviewPeer = ({ id }) => {
  const { reviews, totalReviews } = useReviews(id);

  return (
    <div>
      <div>
        <div className="sm:w-full w-[85vw] flex justify-between items-center">
          <SectionTitle
            text={`Review`}
            className={"!text-[20px] !text-primaryColor"}
          />

          <div className="">
            <h3 className="text-base text-primaryColor">
              {reviews?.length} ratings
            </h3>
          </div>
        </div>
        {/* 
        <div className="flex flex-col space-y-6 my-8">
          {reviews?.slice(0, 4).map((el, idx) => (
            <RvwCard item={el} key={idx} />
          ))}
        </div> */}

        <div className="">
          <h3 className="text-base text-primaryColor">
            {totalReviews} ratings
          </h3>
        </div>
      </div>

      <div className="flex flex-col space-y-6 my-8">
        {reviews?.map((el, idx) => (
          <RvwCard item={el} key={idx} />
        ))}
      </div>
    </div>
  );
};

export default ReviewPeer;