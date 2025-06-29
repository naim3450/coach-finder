"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import group_profile from "../../../assets/group_profile.png";
import { CardDescription, CardContent } from "@/Components/ui/card";
import {
  Compare,
  Contact,
  Cross,
  Flag,
  Play,
  Save,
  Share,
  Watch,
} from "../icons";
import { Star } from "../icons";
import Button from "@/Components/shared/button";
import { Plus } from "lucide-react";
import SectionTitle from "./sectionTitle";
import ReviewPeer from "./reviewPeer";
import { Input } from "@/Components/ui/input";
import postera from "../../../assets/poster.jpg";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { getCompareData } from "@/redux/dataSlice";
import { FaStarHalfAlt } from "react-icons/fa";
import axiosInstance from "@/lib/axios.config";
import { ToastContainer, toast } from "react-toastify";
import useMe from "@/hooks/get-me";
import Loading from "@/Components/shared/loading";
import useReviews from "@/hooks/get-review.";
import { StarUpdated } from "../icons/starNew";
import SonoTab from "@/Components/shared/SonoTab";
import { NumberToUsd } from "@/utils/number-to-usd";
import { SharePopup } from "@/Components/shared/sharePopUp";

const DetailsPage = ({ obj }) => {
  const [apply, setapply] = useState(false);
  const [saveActive, setsaveActive] = useState([]);

  const dispatch = useDispatch();
  const { data, error, success, loading } = useMe();

  const {
    _id,
    name,
    country,
    city,
    industry,
    key_topics,
    about,
    focus_area,
    goals,
    meeting_format,
    pricing,
    profile_picture,
    registration_link,
    review,
    video,
    user,
  } = obj;

  const [saveLoading, setsaveLoading] = useState(false);

  const { avgRating, reviews, totalReviews } = useReviews(_id);

  async function getGroup() {
    try {
      const res = await axiosInstance.get(`/groups/save/${data?._id}`);
      const recive = await res?.data?.data;
      if (res.success) {
        setsaveActive(recive?.filter((el) => el?.group?._id == _id));
      }
    } catch (error) {
    } finally {
      setsaveLoading(false);
    }
  }

  const handleSave = async () => {
    setsaveLoading(true);
    const res = await axiosInstance.post(`/groups/save/${_id}`);
    if (res.success) {
      if (success) {
        getGroup();
      }
    }
  };

  useEffect(() => {
    if (success) {
      getGroup();
    }
  }, [success]);

  const [rating, setRating] = useState(0);

  const renderReview = (idx) => {
    setRating(idx + 1);
  };

  const notify = () =>
    toast.success("Review successfully created!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const sumbitReview = async (e) => {
    e.preventDefault();
    const sendToServerUpinfo = {};
    const formData = new FormData(e.target);
    formData.forEach((val, key) => {
      sendToServerUpinfo[key] = val;
    });
    const marge = Object.assign({}, sendToServerUpinfo, {
      rating: rating,
      group: _id,
    });
    const res = await axiosInstance.post("/reviews", marge);
    if (res.message == "Review successfully created") {
      notify();
      e.target.reset();
    }
  };

  return (
    <div className="w-container mx-auto flex !lg:justify-between !justify-center">
      <div>
        <ToastContainer />
      </div>
      {saveLoading && <Loading />}

      <div className="lg:w-[792px] p-4">
        <div className="flex justify-between gap-6 border-b pb-4 mb-5 max-sm:hidden">
          <div className=" lg:w-[100px] rounded-md lg:h-[80px] w-[65px] h-[65px]">
            <Image
              className="object-contain rounded-md"
              src={profile_picture}
              width={500}
              height={500}
              alt={name}
            />
          </div>
          <div className="flex flex-col space-y-3 w-full">
            <h1 className="text-[#333] lg:text-[32px] sm:text-[3.5vw] sm:leading-[4.5vw] lg:leading-[48px] max-sm:text-sm font-extrabold ">
              {name}
            </h1>

            <CardDescription className="font-medium text-[16px] text-primaryColor opacity-40 flex items-center gap-2">
              <Flag />
              {city}, {country}
            </CardDescription>

            <div className="flex space-x-2">
              {Array.from({ length: 5 }, (_, idx) => {
                const fillLevel = Math.max(0, Math.min(1, avgRating - idx)); // Calculate fill level for each star (0 to 1)

                return (
                  <StarUpdated
                    key={idx}
                    className={
                      fillLevel === 1
                        ? "fill-[#FDAE53]" // Fully filled star
                        : fillLevel > 0
                          ? "partial-star" // Partially filled star
                          : "fill-none stroke-[#FDAE53]" // Empty star
                    }
                    fillLevel={fillLevel} // Pass fill level to the Star component
                  />
                );
              })}

              <p className="text-gray-500 font-normal text-sm pl-2 mt-[2px]">
                {avgRating} ({`${totalReviews} Reviews`})
              </p>
            </div>

            <CardContent className="flex gap-x-2 p-0">
              <SonoTab text={industry[0]} />
              <SonoTab text={goals[0]} />
              <SonoTab text={focus_area[0]} />
              <SonoTab text={key_topics[0]} />
            </CardContent>
          </div>
        </div>

        {/* responsive conminacation part start  */}
        <div className="max-sm:flex flex-col items-center justify-between gap-6 border-b pb-4 mb-5 hidden">
          <div className=" lg:w-[100px] rounded-md lg:h-[80px] w-[65px] h-[65px]">
            <Image
              className="object-contain rounded-md"
              src={profile_picture}
              width={500}
              height={500}
              alt={name}
            />
          </div>

          <div className="flex flex-col items-center space-y-3 w-full">
            <h3 className="text-[#333] text-center max-sm:text-sm font-semibold">
              {name}
            </h3>

            <CardDescription className="font-medium text-[16px] text-primaryColor opacity-40 flex items-center gap-2">
              <Flag />
              {city}, {country}
            </CardDescription>

            <div className="flex space-x-2">
              {Array.from({ length: 5 }, (_, idx) => {
                const fillLevel = Math.max(0, Math.min(1, avgRating - idx)); // Calculate fill level for each star (0 to 1)

                return (
                  <StarUpdated
                    key={idx}
                    className={
                      fillLevel === 1
                        ? "fill-[#FDAE53]" // Fully filled star
                        : fillLevel > 0
                          ? "partial-star" // Partially filled star
                          : "fill-none stroke-[#FDAE53]" // Empty star
                    }
                    fillLevel={fillLevel} // Pass fill level to the Star component
                  />
                );
              })}

              <p className="text-gray-500 font-normal text-sm pl-2 mt-[2px]">
                {avgRating} ({`${totalReviews} Reviews`})
              </p>
            </div>

            <CardContent className="grid grid-cols-2 gap-3 w-[70vw] mx-auto">
              <SonoTab text={industry[0]} />
              <SonoTab text={goals[0]} />
              <SonoTab text={focus_area[0]} />
              <SonoTab text={key_topics[0]} />
            </CardContent>
          </div>
        </div>
        {/* responsive conminacation part end  */}

        {/*  btn start */}
        <CardContent className="sm:flex gap-x-2 p-0 hidden">
          {/* <Button className="!bg-transparent border font-bold text-[16px] !text-[#333] hover:!text-[#FFF] hover:!bg-BtnColor !rounded-[8px] flex items-center gap-2 group">
            <Star className={"fill-[#6E6E6E] group-hover:!fill-white"} />
            Write a Review
          </Button> */}

          <SharePopup title={name} />
          {saveActive?.length > 0 ? (
            <Button
              onClick={handleSave}
              className="border font-bold text-[16px] !text-[#FFF] !bg-BtnColor !px-2  !rounded-[8px] flex items-center gap-2 group"
            >
              <Save className={"!fill-white !stroke-white"} />
              Save
            </Button>
          ) : (
            <Button
              onClick={handleSave}
              className="border font-bold text-[16px] !text-black !bg-transparent !px-2  !rounded-[8px] flex items-center gap-2 group"
            >
              <Save className={"!fill-none !stroke-black"} />
              Save
            </Button>
          )}
        </CardContent>

        {/* responsive part start btn  */}
        <CardContent className="grid grid-cols-2 gap-3 w-[70vw] mx-auto sm:hidden">
          {/* <Button className="!bg-transparent border font-bold text-sm !text-[#333] hover:!text-[#FFF] hover:!bg-BtnColor !px-2 !rounded-[8px] flex items-center gap-2 group">
            <Star
              className={"fill-[#6E6E6E] !w-4 !h-4 group-hover:!fill-white"}
            />
            Write a Review
          </Button> */}
          <SharePopup />
          <Button className="!bg-transparent border font-bold text-sm !text-[#333] hover:!text-[#FFF] hover:!bg-BtnColor !px-2 !rounded-[8px] flex items-center gap-2 group">
            <Plus className="text-[#6E6E6E] group-hover:!text-white" />
            Follow
          </Button>
        </CardContent>
        {/* responsive part end btn  */}

        {/* btn end */}

        <div className="lg:hidden flex justify-center mt-3 relative bg-white">
          <Button onClick={() => setapply(true)}>Apply Now</Button>
          <div
            className={`w-[360px] border rounded-[8px] absolute top-0 left-1/2 -translate-x-1/2 bg-white ${apply ? "block" : "hidden"
              }`}
          >
            <div className="">
              <Cross
                onClick={() => setapply(false)}
                className={"absolute z-10 right-4 top-3 !w-8 !h-8"}
              />
            </div>

            {user.account_type === "advance" && (
              <iframe
                className="w-full h-[209px]"
                src={`https://www.youtube.com/embed/${video?.match(
                  /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
                )[1]
                  }`}
                title={name}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullscreen
                autoPlay
              ></iframe>
            )}

            <div className="flex p-3 flex-col space-y-3 mt-6">
              <h3 className="text-primary font-lato text-2xl font-bold leading-7">
                Meeting Format
              </h3>

              <div className="flex gap-6">
                <h5 className="text-xs text-black/50 flex items-center gap-1 capitalize font-medium">
                  <Contact />
                  {meeting_format}
                </h5>
                <h5 className="text-xs text-black/50 flex items-center gap-1 capitalize font-medium">
                  <Watch />1 Hour
                </h5>
              </div>

              <h1 className="text-primary font-lato text-4xl font-extrabold leading-[44.8px]">
                {NumberToUsd(pricing)}
                <span className="text-black/50 text-[20px] font-normal">
                  /Hour
                </span>
              </h1>

              <Link className="w-full" href={registration_link}>
                <Button className="py-3 w-full">Apply Now</Button>
              </Link>

              <Link href={"/compare"}>
                <Button
                  onClick={() => dispatch(getCompareData(_id))}
                  className="py-3 !w-full !text-[#6E6E6E] flex items-center gap-2 justify-center !font-medium !bg-transparent !border-2 !border-[#6E6E6E]"
                >
                  <Compare /> Add To Compare
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="my-5 sm:w-full w-[85vw] mx-auto">
          <SectionTitle text={`About`} />

          <p className="text-[rgba(13,13,14,0.40)] text-xs my-5 font-medium leading-[18px]">
            {about}
          </p>
        </div>

        <ReviewPeer id={_id} />

        {review && (
          <form
            onSubmit={sumbitReview}
            className="p-6 rounded-[12px] border sm:w-full w-[85vw] mx-auto"
          >
            <h3 className="text-[#333] font-lato sm:text-2xl text-base font-medium sm:leading-[38.4px]">
              Write a Review
            </h3>

            <div className="flex sm:flex-row flex-col w-full gap-6 mt-[16px]">
              <Input
                name="name"
                placeholder="Enter your name"
                className="text-[14px] leading-[20px]"
              />
              <Input
                name="email"
                placeholder="Enter your mail"
                className="text-[14px] leading-[20px]"
              />
            </div>

            <h4 className="text-[#51525B] font-lato text-base font-medium leading-[160%] mt-[16px]">
              Rating
            </h4>

            <div className="flex gap-[6px] mt-2">
              {Array.from({ length: 5 }, (e, idx) => {
                return (
                  <div key={idx} onClick={() => renderReview(idx)}>
                    {rating >= idx + 1 ? (
                      <Star />
                    ) : (
                      <Star className={"fill-none stroke-[#FDAE53]"} />
                    )}
                  </div>
                );
              })}
            </div>

            <textarea
              name="review"
              placeholder="Write your comments"
              className=" resize-none w-full h-[300px] outline-none border rounded-[6px] text-[#51525B] text-base leading-[160%] p-[10px] mt-6"
            ></textarea>

            <Button className="mt-6">Submit Review</Button>
          </form>
        )}
      </div>

      <div className="w-[384px] p-6 border rounded-[8px] h-full lg:!block hidden">
        {user.account_type === "advance" && (
          <iframe
            className="w-full h-[209px]"
            src={`https://www.youtube.com/embed/${video?.match(
              /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
            )[1]
              }`}
            title={name}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullscreen
            autoPlay
          ></iframe>
        )}

        <div className="flex flex-col space-y-3 mt-6 py-3">
          <h3 className="text-primary font-lato text-2xl font-bold leading-7">
            Meeting Format
          </h3>

          <div className="flex gap-6">
            <h5 className="text-xs text-black/50 flex items-center gap-1 capitalize font-medium">
              <Contact />
              {meeting_format}
            </h5>
            <h5 className="text-xs text-black/50 flex items-center gap-1 capitalize font-medium">
              <Watch />1 Hour
            </h5>
          </div>

          <h1 className="text-primary font-lato text-4xl font-extrabold leading-[44.8px]">
            {NumberToUsd(pricing)}
            <span className="text-black/50 text-[20px] font-normal">/Hour</span>
          </h1>

          <Link className="w-full" target="_blank" href={registration_link}>
            <Button className="py-3 w-full">Apply Now</Button>
          </Link>

          <Link href={"/compare"}>
            <Button
              onClick={() => dispatch(getCompareData(_id))}
              className="py-3 !w-full !text-[#6E6E6E] flex items-center gap-2 justify-center !font-medium !bg-transparent !border-2 !border-[#6E6E6E]"
            >
              <Compare /> Add To Compare
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
