import React, { useEffect, useState } from "react";
import { Contact } from "@/assets/icons/contact";
import { Watch } from "@/assets/icons/watch";
import Button from "./botton";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "@/lib/axios.config";
import emptyImg from "../../assets/emptyImg.png";
import Image from "next/image";
import { FaStarHalfAlt } from "react-icons/fa";
import { Star } from "../icons";
import Virtual from "../../assets/virtual.svg";
import Hybrid from "../../assets/hybrid.svg";
import { numberToUsd } from "@/utils/numberToUsd";
import Link from "next/link";
import { pageShowFunc3 } from "@/redux/groupSlice";

const FreeMyGroup = () => {
  const { userGroup } = useSelector((state) => state.groupInfo);

  const [review, setreview] = useState([]);

  useEffect(() => {
    async function getReview() {
      const res = await axiosInstance.get(`/reviews/?group=${userGroup?._id}`);
      const recive = await res.data.data;
      setreview(recive);
    }
    getReview();
  }, [userGroup]);

  const total = review
    .map((el) => el.rating)
    .reduce((sum, rating) => sum + rating, 0);

  const average = total / review.length;

  const dispatch = useDispatch()

  const priching = numberToUsd(userGroup?.pricing)

  return (
    <div className="">
      <div className="container lg:mt-40 mt-72 lg:flex justify-between">
        <div className="">
          {/* about part start */}
          <div className="mt-14">
            <h3 className="font-bold text-primaryColor text-[20px] ">About</h3>
            <p className="font-medium text-[#97979C] text-[12px] pt-10 lg:w-[750px] w-full">
              {userGroup?.about}
            </p>
          </div>
          {/* about part end */}

          {/* meeting formet start */}
          <div className="p-4   mt-14">
            <div className="lg:w-[760px] w-full">
              <div className="sm:flex justify-between items-center mb-4">
                <h2 className="text-[20px] font-bold text-primaryColor ">
                  Reviews
                </h2>
                <div className="text-[16px] font-normal text-primaryColor  flex  items-center gap-2">
                  <div className="flex items-center">
                    <Star filled />
                    <span className="ml-1">
                      {average ? average?.toFixed(1) : 0} course rating
                    </span>
                  </div>

                  <span>{review.length} ratings</span>
                </div>
              </div>
              {review.map((elm, index) => {
                const months = [
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December",
                ];
                let date = new Date(elm.createdAt);
                const year = date.getFullYear();
                const month = months[date.getMonth()];
                const day = date.getDate();
                return (
                  <div
                    key={index}
                    className="flex flex-col md:flex-row gap-4 py-4 border-b"
                  >
                    <div className="flex-shrink-0 h-[56px] w-[56px] rounded-full">
                      {elm?.user?.profile_picture ? (
                        <Image
                          src={elm?.user?.profile_picture}
                          alt="profile_picture"
                          width={56}
                          height={56}
                          className="rounded-full"
                        />
                      ) : (
                        <Image src={emptyImg} alt="emptyImg" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-[16px] font-bold text-primaryColor">
                        {elm.user.first_name} {elm.user.last_name}
                      </h4>
                      <div className="flex items-center space-x-2">
                        {Array.from({ length: 5 }, (e, idx) => {
                          let number = idx + 0.5;
                          return (
                            <div key={idx}>
                              {elm.rating >= idx + 1 ? (
                                <Star />
                              ) : elm.rating >= number ? (
                                <FaStarHalfAlt className="text-[#FDAE53] text-[19px]" />
                              ) : (
                                <Star
                                  className={"fill-none stroke-[#FDAE53]"}
                                />
                              )}
                            </div>
                          );
                        })}
                        <span className="ml-2 text-[#3789FF] font-normal text-[18px]">
                          {elm.rating}
                        </span>
                      </div>
                      <p className="font-normal capitalize text-base text-[#97979C] mt-1">
                        {elm.review.charAt(0).toUpperCase() +
                          elm.review.slice(1).toLowerCase()}
                      </p>
                    </div>
                    <div className="font-normal text-[14px] text-[#97979C]">
                      {month} {year}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {/* review part end */}

        {/* meeting formet start */}

        <div className="lg:w-[384px] w-full h-[371px] border rounded-[8px] p-6 drop-shadow">
          <h3 className="font-bold text-primaryColor text-[20px] ">
            Meeting Format
          </h3>
          <div className="flex gap-6 my-3">
            <h5 className='text-xs text-black/50 flex items-center gap-1 capitalize font-medium'>
              {
                userGroup?.meeting_format?.toLowerCase() == "In person"?.toLowerCase() ?
                  <Contact /> :
                  userGroup?.meeting_format?.toLowerCase() == "Virtual"?.toLowerCase() ?
                    <Image src={Hybrid} alt="Hybrid" />
                    : <Image src={Virtual} alt="Virtual" />
              }
              {userGroup?.meeting_format}
            </h5>
            <h5 className="text-xs text-black/50 flex items-center gap-1 capitalize font-medium">
              <Watch /> 1 Hour
            </h5>
          </div>

          <h3 className="text-primaryColor text-[32px] font-extrabold">
            {priching}
            <span className='text-black/50 text-[20px] font-normal'>/Hour</span>
          </h3>
          <Link href={'/dashboard'}>
            <Button className='w-full mt-3'>
              Edit Group Details
            </Button>
          </Link>
          <Link href={`https://coachfinder.app/peer-group/${userGroup?._id}`}>
            <Button className='w-full !bg-transparent border !border-[#6E6E6E] !text-[#6E6E6E] my-3'>
              View as a user
            </Button>
          </Link>

          <Link href={'/plan'} onClick={() => dispatch(pageShowFunc3(true))}>
            <Button className='w-full !bg-transparent border !border-[#6E6E6E] !text-[#6E6E6E]'>
              Change Plans
            </Button>
          </Link>

        </div>
        {/* meeting formet end */}
      </div>
    </div>
  );
};

export default FreeMyGroup;
