"use client";
import React from "react";
import GroupCard from "./shared/groupCard";
import Button from "./shared/button";

import { useSelector } from "react-redux";
import Link from "next/link";

const PeerGroup = () => {
  let { dataInfo } = useSelector((state) => state.apiInfo);

  return (
    <section className="py-20">
      <div className="container mx-auto">
        <div className=" ">
          <h3 className="text-primaryColor font-extrabold md:text-[48px] text-[5vw]   text-center">
          Featured Groups
          </h3>
          
        </div>
        <p className="text-primaryColor text-base font-medium lg:w-[680px] mx-auto text-center mt-4">
          Discover the leaders and innovators shaping the future across various
          industries. Our featured groups are making a significant impact,
          driving change, and setting new standards in their respective fields.
        </p>

        <div className="sm:grid sm:grid-cols-2 flex flex-col items-center gap-6 mt-10">
          {dataInfo?.slice(0, 4).map((el, idx) => (
            <GroupCard className={"xl:!w-[588px]"} key={idx} item={el} />
          ))}
        </div>
        <div className="flex justify-center mt-10">
          <Link href={"/peer-group"}>
            <Button className="!px-14 h-[48px]">Browse All</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PeerGroup;
