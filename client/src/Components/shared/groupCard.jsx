import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import Button from "./button";
import Image from "next/image";
import Link from "next/link";
import Map from "../../assets/map.svg";
import Person from "../../assets/person.svg";
import Clock from "../../assets/clock.svg";
import useReviews from "@/hooks/get-review.";
import { NumberToUsd } from "@/utils/number-to-usd";
import SonoTab from "./SonoTab";
import { StarUpdated } from "@/app/naim/icons/starNew";
import { IsoToDate } from "@/utils/IsoToDate";

const GroupCard = ({
  className,
  item,
  imgCls,
  reviewCls,
  aboutCls,
  meetingCls,
  insListCls,
  veiwCls,
}) => {
  const {
    _id,
    profile_picture,
    name,
    city,
    country,
    meeting_format,
    about,
    pricing,
    industry,
    goals,
    focus_area,
    key_topics,
    createdAt,
  } = item;

  const { avgRating, totalReviews } = useReviews(_id);

  return (
    <Card className={`w-full h-full py-5 ${className}`}>
      <div className="flex">
        <CardHeader className="">
          <Image
            className={`${imgCls} object-cover`}
            src={profile_picture}
            alt="alt"
            width={80}
            height={80}
          />
        </CardHeader>

        <CardHeader className="">
          <CardTitle className="font-extrabold text-base text-primaryColor">
            {name}{" "}
          </CardTitle>
          <div className="flex gap-2 items-center">
            <Image src={Map} alt="Map" className=" " />
            <CardDescription className="font-medium text-[12px] text-primaryColor opacity-40">
              {city.charAt(0).toUpperCase() + city.slice(1)}{" "}
              {country.charAt(0).toUpperCase() + city.slice(1)}
            </CardDescription>
          </div>

          <div className={`flex ${reviewCls}`}>
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
        </CardHeader>
      </div>
      {/* ------ */}
      <div className="border-t border-[#E2E5F1] px-10 ml-5 mr-5"></div>
      <CardDescription className="font-bold text-primaryColor text-base ml-7 mt-2">
        Meeting Format
      </CardDescription>

      <div className={`flex ml-7 mt-1 gap-x-5 ${meetingCls}`}>
        <div className="flex items-center">
          <Image src={Person} alt="alt" className="mr-1" />
          <CardDescription className="font-medium text-[12px] text-primaryColor opacity-40 pt-1 capitalize">
            {meeting_format}
          </CardDescription>
        </div>

        <div className="flex items-center">
          <Image src={Clock} alt="alt" className="mr-1" />
          <CardDescription className="font-medium text-[12px] text-primaryColor opacity-40 pt-1">
            {IsoToDate(createdAt)}
          </CardDescription>
        </div>
      </div>

      {/* peragraph start */}
      <CardContent className={`mt-4 ${aboutCls}`}>
        <p className="text-gray-500 text-md font-normal leading-6"> {about} </p>
      </CardContent>
      {/* peragraph end */}

      {/*  btn start */}
      <CardContent
        className={`flex !gap-2 mr-2 w-full flex-wrap !py-0 ${insListCls}`}
      >
        <SonoTab text={industry[0]} />
        <SonoTab text={goals[0]} />
        <SonoTab text={focus_area[0]} />
        <SonoTab text={key_topics[0]} />
      </CardContent>
      {/* btn end */}

      {/* last btn start */}
      <CardFooter className="flex justify-between mt-3">
        <div className="flex">
          <h3 className="font-extrabold text-[20px] text-primaryColor">
            {NumberToUsd(pricing)}
          </h3>{" "}
          <span className="font-normal text-[12px] text-primaryColor opacity-40 pt-2 capitalize">
            /Hour
          </span>
        </div>
        <Link href={`/peer-group/${_id}`}>
          <Button className={`!bg-MenuHColor !text-BtnColor ${veiwCls}`}>
            View Details
          </Button>
        </Link>
      </CardFooter>
      {/* last btn end */}
    </Card>
  );
};

export default GroupCard;
