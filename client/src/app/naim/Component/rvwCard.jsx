import Image from "next/image";
import React from "react";
import notFound from "../../../assets/notFound.jpg";
import { Star } from "../icons";
import { FaStarHalfAlt } from "react-icons/fa";

const RvwCard = ({ item }) => {
  return (
    <div className="flex gap-4 sm:w-full w-[85vw] mx-auto border-b pb-3">
      <Image
        src={item.user.profile_picture || notFound}
        width={500}
        height={500}
        alt="blog_one"
        className="sm:w-[56px] sm:h-[56px] w-[48px] h-[48px] rounded-full"
      />

      <div className="flex flex-col sm:gap-3 gap-2">
        <h3 className="text-gray-800 font-lato text-base font-bold leading-[25.6px]">
          {item.user.first_name} {item.user.last_name}
        </h3>
        {item ? (
          <div className="flex space-x-1">
            {Array.from({ length: 5 }, (e, idx) => {
              let number = idx + 0.5;
              return (
                <div key={idx}>
                  {item.rating >= idx + 1 ? (
                    <Star />
                  ) : item.rating >= number ? (
                    <FaStarHalfAlt className="text-[#FDAE53] text-[19px]" />
                  ) : (
                    <Star className={"fill-none stroke-[#FDAE53]"} />
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          false
        )}

        <h3 className="text-[#333] sm:text-base text-sm font-normal leading-normal">
          {item?.review}
        </h3>
      </div>
    </div>
  );
};

export default RvwCard;
