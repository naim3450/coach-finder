"use client";

import React, { useEffect, useState } from "react";
import Button from "./shared/botton";

import { GoArrowRight } from "react-icons/go";
import Image from "next/image";
import Marque_one from '../assets/marque_one.png'
import Marque_two from '../assets/marque_two.png'
import Marque_three from '../assets/marque_three.png'
import Marque_four from '../assets/marque_four.png'
import Marque_five from '../assets/marque_five.png'
import { CiSearch } from "react-icons/ci";
import Marquee from "react-fast-marquee";
import Link from "next/link";

const Header = () => {
  const [showBackground, setShowBackground] = useState(false);

  useEffect(() => {

    const timer = setTimeout(() => {
      setShowBackground(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="bg-primaryColor bg-hero-bg bg-cover bg-center bg-no-repeat py-20 lg:py-48">

      <div className="container">
        <h1 className="lg:font-extrabold lg:text-[77px] text-[11vw] lg:leading-[120%]    text-white text-center">
          Grow Your Practice on<span className="text-BtnColor"> Coach Finder</span>{" "}

        </h1>
        <p className="lg:w-[777px] w-full mx-auto text-center  font-medium text-base text-white">
          Reach new clients and connect with a broader audience by joining our network.
        </p>

        <div className="flex sm:flex-row flex-col w-full items-center gap-5 justify-center mt-10">
          <div className="relative">
            <Link href={'/signin'}>
              <Button className="!px-8 !py-3 text-center">
                Claim Your Free Listing
                <GoArrowRight className="absolute top-3 right-5 text-white h-7 w-6" />
              </Button>
            </Link>
          </div>

          <div className="relative mt-1">
            <Link href={'https://coachfinder.app/peer-group'}>
              <Button className="bg-white flex items-center gap-2 !py-[12px] !text-primaryColor border border-primaryColor !px-8">
                <CiSearch className='h-[22px] w-[22px] cursor-pointer text-primaryColor' />
                Browse All
              </Button>
            </Link>
          </div>
        </div>

      </div>

      {

        <div className={`mt-28 lg:w-[1200px] w-full mx-auto ${showBackground ? "bg-white" : "bg-transparent"
          } rounded-[12px] py-5 px-6 lg:px-10 transition-colors duration-500`}>
          <Marquee className="">
            <Image src={Marque_one} alt="Marque_one" className="" />
            <Image src={Marque_two} alt="Marque_two" className="ml-14" />
            <Image src={Marque_three} alt="Marque_three" className="ml-14" />
            <Image src={Marque_four} alt="Marque_four" className="ml-14" />
            <Image src={Marque_five} alt="Marque_five" className=" ml-14" />
          </Marquee>
        </div>

      }
    </section>
  );
};

export default Header;
