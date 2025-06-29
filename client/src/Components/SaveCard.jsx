import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import Image from "next/image";
import Link from "next/link";
import Map from "../assets/map.svg";
import Person from "../assets/person.svg";
import Clock from "../assets/clock.svg";
import { Save, Star } from "@/app/naim/icons";
import Button from "./shared/button";

const SaveCard = ({
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
    key_topics,
    name,
    city,
    country,
    meeting_format,
    about,
    pricing,
  } = item.group;

  return (
    <Card className={`w-full h-full py-5 ${className}`}>
      <div className="flex">
        <CardHeader className="">
          <Image
            className={`object-cover`}
            src={profile_picture}
            alt="alt"
            width={80}
            height={80}
          />
        </CardHeader>

        <CardHeader className="w-full">
          <div className="flex justify-between">
            <div className="flex flex-col gap-2">
              <CardTitle className="font-extrabold text-base text-primaryColor">
                {name}{" "}
              </CardTitle>
              <div className="flex gap-2 items-center">
                <Image src={Map} alt="Map" className=" " />
                <CardDescription className="font-medium text-[12px] text-primaryColor opacity-40">
                  {city} {country}
                </CardDescription>
              </div>

              <div className={`flex`}>
                {Array.from({ length: 5 }, (_, idx) => {
                  return (
                    <Star
                      key={idx}
                      className={
                        idx === 4 ? "stroke-[#FDAE53] fill-none" : false
                      }
                    />
                  );
                })}

                <p className="text-gray-500 font-normal text-sm pl-2 mt-[2px]">
                  4.6(35 reviews)
                </p>
              </div>
            </div>

            <div className="h-full">
              {" "}
              <Save />
            </div>
          </div>
        </CardHeader>
      </div>
      {/* ------ */}
      <div className="border-t border-[#E2E5F1] px-10 ml-5 mr-5"></div>
      <CardDescription className="font-bold text-primaryColor text-base ml-7 mt-2">
        Meeting Format
      </CardDescription>

      <div className={`flex ml-7 mt-1 gap-x-5`}>
        <div className="flex items-center">
          <Image src={Person} alt="alt" className="mr-1" />
          <CardDescription className="font-medium text-[12px] text-primaryColor opacity-40 pt-1 capitalize">
            {meeting_format}
          </CardDescription>
        </div>

        <div className="flex items-center">
          <Image src={Clock} alt="alt" className="mr-1" />
          <CardDescription className="font-medium text-[12px] text-primaryColor opacity-40 pt-1">
            1 Hour
          </CardDescription>
        </div>
      </div>

      {/* peragraph start */}
      <CardContent className={`mt-4`}>
        <p className="text-gray-500 text-md font-normal leading-6"> {about} </p>
      </CardContent>
      {/* peragraph end */}

      {/*  btn start */}
      <CardContent className={`flex !gap-2 mr-2 w-full flex-wrap !py-0`}>
        {key_topics?.map((el, indx) => (
          <Button
            key={indx}
            className="font-normal text-[12px] !text-primaryColor h-[36px] !rounded-[43px] !bg-BgColor"
          >
            {el}
          </Button>
        ))}
      </CardContent>
      {/* btn end */}
      {/* last btn start */}
      <CardFooter className="flex justify-between mt-3">
        <div className="flex">
          <h3 className="font-extrabold text-[20px] text-primaryColor">
            ${Number(pricing)}
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

export default SaveCard;
