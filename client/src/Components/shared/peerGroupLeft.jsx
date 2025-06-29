import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { Input } from "../ui/input";
import { Checkbox } from "@/Components/ui/checkbox";
import { Label } from "../ui/label";
import Button from "./button";
import Image from "next/image";
import Personal from "../../assets/personal.svg";
import Virtual from "../../assets/virtual.svg";
import Hybrid from "../../assets/hybrid.svg";
import { useDispatch } from "react-redux";
import {
  insFilter,
  insSearch,
  locationFilter,
  locationSearch,
  meeting_formateFilter,
} from "@/redux/dataSlice";

const PeerGroupLeft = ({ industry, location, meeting_format }) => {
  const [insItem, setinsItem] = useState([]);
  const [loctionItem, setloctionItem] = useState([]);

  const dispatch = useDispatch();

  function handleindustry(el) {
    if (insItem.includes(el)) {
      setinsItem(insItem.filter((item) => item != el));
    } else {
      setinsItem([...insItem, el]);
    }
  }

  function handlelocation(el) {
    if (loctionItem.includes(el)) {
      setloctionItem(loctionItem.filter((item) => item != el));
    } else {
      setloctionItem([...loctionItem, el]);
    }
  }

  function handlemeeting_format(el) {
    dispatch(meeting_formateFilter(el));
  }

  useEffect(() => {
    dispatch(insFilter(insItem));
  }, [insItem]);

  useEffect(() => {
    dispatch(locationFilter(loctionItem));
  }, [loctionItem]);

  return (
    <div className="">
      {/* 1st checkbox */}
      <div className="relative bg-white">
        <h3 className="font-medium text-base text-primaryColor">Industry</h3>
        <Input
          onChange={(e) => dispatch(insSearch(e.target.value))}
          placeholder="Search for Skills"
          className="py-3 focus-visible:ring-0 bg-BgColor"
        />
        <CiSearch className="h-[22px] w-[22px] absolute top-8 right-6 cursor-pointer text-primaryColor hidden lg:!block" />

        <div className="">
          {industry?.slice(0, 5)?.map((el, idx) => {
            return (
              <div className="my-4 flex items-center" key={idx} value={el}>
                <Checkbox
                  onClick={() => handleindustry(el)}
                  className="h-4 w-4 data-[state=checked]:bg-[#3789FF] border-[#9DA6BA]"
                />
                <Label
                  htmlFor="terms"
                  className="text-base font-medium  text-[#637381] pl-4"
                >
                  {el}
                </Label>
              </div>
            );
          })}
        </div>

        <h3 className="text-base font-medium  text-[#637381]">See more</h3>
      </div>

      {/* 1st checkbox end */}
      <div className="relative mt-3">
        <h3 className="font-medium text-base text-primaryColor">Location</h3>
        <Input
          onChange={(e) => dispatch(locationSearch(e.target.value))}
          placeholder="Search for Skills"
          className="py-3 focus-visible:ring-0 bg-BgColor"
        />
        <CiSearch className="h-[22px] w-[22px] absolute top-8 right-6 cursor-pointer text-primaryColor hidden lg:!block" />

        <div className="">
          {location?.slice(0, 5)?.map((el, idx) => {
            return (
              <div className="my-4 flex items-center" key={idx} value={el}>
                <Checkbox
                  onClick={() => handlelocation(el)}
                  className="h-4 w-4 data-[state=checked]:bg-[#3789FF] border-[#9DA6BA]"
                />
                <Label
                  htmlFor="terms"
                  className="text-base font-medium  text-[#637381] pl-4"
                >
                  {el}
                </Label>
              </div>
            );
          })}
        </div>
        <h3 className="text-base font-medium  text-[#637381]">See more</h3>
      </div>

      {/* ======================== */}
      <div className="flex flex-wrap gap-x-1 mt-4">
        {meeting_format.map((el, idx) => (
          <div key={idx} className="relative">
            <Button
              onClick={() => handlemeeting_format(el)}
              className="!text-primaryColor border flex items-center justify-center gap-2 !border-[#E8E8E8] !bg-transparent !px-2 !rounded-[26px]"
            >
              {el.toLowerCase() === "In person".toLowerCase() ? (
                <Image src={Personal} alt="Personal" />
              ) : el.toLowerCase() === "Virtual".toLowerCase() ? (
                <Image src={Virtual} alt="Virtual" />
              ) : el.toLowerCase() === "Hybrid".toLowerCase() ? (
                <Image src={Hybrid} alt="Hybrid" />
              ) : (
                false
              )}
              {el}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PeerGroupLeft;
