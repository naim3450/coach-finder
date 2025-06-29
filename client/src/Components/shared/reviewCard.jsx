import React from "react";
import Image from "next/image";
import Button from "./button";
import Link from "next/link";
const ReviewCard = ({ src2, review, user }) => {
  return (
    <div className="">
      <p className="font-medium xl:text-[28px] text-[3.5vw] text-center md:leading-10">
        {" "}
        {review}
      </p>
      <div className="md:flex justify-center mt-6 mb-4  hidden">
        <div className="md:w-[60px] md:h-[60px] rounded-full">
          <Image
            src={src2}
            alt="alt"
            className="h-full w-h-full rounded-full"
          />
        </div>
      </div>

      <div className="text-center mt-2">
        <h4 className="font-medium md:text-[18px] text-base">
          {user.first_name} {user.last_name}
        </h4>
        <p className="font-medium text-[18px] pt-1 md:pb-12 pb-5 text-[#071019] opacity-50">
          {user.email}
        </p>
        <Link href="/reviews">
          {" "}
          <Button className="md:!py-3 !py-2">Read Cutomer Story</Button>
        </Link>
      </div>
    </div>
  );
};

export default ReviewCard;
