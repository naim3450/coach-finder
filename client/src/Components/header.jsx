"use client";

import React from "react";
import Button from "./shared/button";
import { SlArrowRight } from "react-icons/sl";
import { GoArrowRight } from "react-icons/go";
import Image from "next/image";
import Marque_one from "@/assets/marque_one.png";
import Marque_two from "@/assets/marque_two.png";
import Marque_three from "@/assets/marque_three.png";
import Marque_four from "@/assets/marque_four.png";
import Marque_five from "@/assets/marque_five.png";
import { CiSearch } from "react-icons/ci";
import Marquee from "react-fast-marquee";
import Link from "next/link";

const Header = () => {
  return (
    <section className="bg-BgColor bg-hero-bg bg-cover bg-center bg-no-repeat lg:py-32 py-10">
      <div className="sm:h-[46px] sm:w-[388px] h-full w-[320px] bg-white rounded-[70px] mx-auto">
        <div className="flex sm:flex-row flex-col ">
          <Button className="bg-[#222B60] !rounded-[60px] drop-shadow h-[44px]">
            Just Join!
          </Button>
          <p className="text-center pt-3 pl-3 text-[#0D0D0E] opacity-60">
            30 new Groups in this Month
          </p>
          <SlArrowRight className="ml-7 mt-4 sm:block hidden text-[14px]" />
        </div>
      </div>

      <div className="container">
        <h1 className="font-extrabold md:text-[71px] text-[8vw]  pt-5 text-primaryColor text-center">
          Discover The{" "}
          <span className="text-BtnColor mr-1">Perfect Peer Group</span>
          for your Professional Growth
        </h1>
        <p className="lg:w-[777px] mx-auto text-center leading-[150%] font-medium text-base text-primaryColor">
          Ambitious professionals around the world utilize coaching to reach the
          next level of their Business skills. Tired of figuring out Business on
          your own?
        </p>

        <div className="flex sm:flex-row flex-col w-full items-center gap-4 justify-center mt-10">
          <div className="relative">
            <Link href={"/peer-group"}>
              <Button className="!px-8 !py-3 text-left shadow-[0_10px_20px_rgb(234,242,251)] flex gap-6">
                Find Your Group
                <GoArrowRight className="  text-white h-7 w-6" />
              </Button>
            </Link>
          </div>
          <div className="relative">
            <Link href={"/peer-group"}>
              <Button className="bg-white   !py-3 flex items-center gap-3 !text-primaryColor border border-primaryColor !px-6 shadow-[0_10px_20px_rgb(234,242,300)]"><CiSearch className="h-[22px] w-[22px] cursor-pointer text-primaryColor" />
                Browse All
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-16 container">
        <Marquee className="">
          <Image src={Marque_one} alt="Marque_one" className="" />
          <Image src={Marque_two} alt="Marque_two" className="ml-10" />
          <Image src={Marque_three} alt="Marque_three" className="ml-10" />
          <Image src={Marque_four} alt="Marque_four" className="ml-10" />
          <Image src={Marque_five} alt="Marque_five" className="ml-10" />
        </Marquee>
      </div>
    </section>
  );
};

export default Header;
