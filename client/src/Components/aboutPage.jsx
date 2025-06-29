import React from "react";

import O_S_one from "../assets/o_s_one.svg";
import O_S_two from "../assets/o_s_two.svg";
import O_S_three from "../assets/o_s_three.svg";
import BusinessGoalCard from "./shared/businessGoalCard";
import A_B_G_one from "../assets/a_b_g_one.svg";
import A_B_G_two from "../assets/a_b_g_two.svg";
import A_B_G_three from "../assets/a_b_g_three.svg";
import Button from "./shared/button";
import Just_Logo from '../assets/just_logo.png'
import Image from "next/image";
import PageTitle from "@/app/naim/Component/pageTitle";





const   AboutPage = () => {
  return (
    <section className=" bg-BgColor pb-[190px]">
      <PageTitle text={`About Us`} />
      <div className="container bg-about-bg bg-cover bg-center bg-no-repeat md:h-[621px] h-[75vw] flex flex-col items-center justify-center">
        <h3 className="font-semibold md:text-[55px] text-[7vw] leading-[8vw] text-primaryColor text-center md:leading-[80px]">
          Factory of
          <span className="text-BtnColor px-4">Future Tech, Creativity,</span>
          Innovation
        </h3>
        <p className="text-[#60666C] text-[18px] font-medium text-center mt-3 lg:w-[800px] mx-auto">
          Anchored to the future, empowers businesses through forwarding designs
          and tech products with limitless possibilities.
        </p>
      </div>

      {/* our story part end */}
      {/* mission visson start */}
      <div className="container flex xl:flex-row flex-col justify-center gap-[20px] items-center xl:justify-between">

        <div className="xl:h-[463px] xl:py-6 xl:w-[288px] w-full flex flex-col xl:items-start items-center justify-center bg-white shadow-md rounded-xl px-4 py-10">
          <Image
            src={O_S_one}
            alt="O_S_one"
            className="my-5" />

          <h3 className="font-normal text-primaryColor text-[24px]">Vision</h3>
          <p className="font-normal text-base text-[#60666C] w-full xl:text-left text-center pt-3">At Coach Finder, we believe that every individual has the potential to achieve greatness — they just need the right guidance to unlock it. Our journey began with a simple yet powerful idea: to connect people with the right coaches who can inspire growth, drive success, and transform lives.</p>
        </div>

        <div className="">
          <div className="xl:w-[704px] xl:h-[318px] w-[80vw] mx-auto flex flex-col xl:items-start items-center justify-center bg-white shadow-md rounded-xl px-4 py-6">
            <Image

              src={O_S_two}
              alt="O_S_one"       
              className="my-5"
            />
            <h3 className="font-normal text-primaryColor text-[24px]">Mission</h3>
            <p className="font-normal text-base text-[#60666C] xl:w-[625px] w-full pt-3 xl:text-left text-center">Our mission is to simplify the search for expert coaches, making it easier for individuals to find trusted professionals who can guide them on their personal or professional journey. We work with a diverse network of highly qualified coaches who specialize in a range of fields, ensuring that everyone can find someone who truly understands their challenges and aspirations.</p>
          </div>

          <div className="flex xl:flex-row flex-col gap-x-8 mt-8">

            <div className="xl:h-[354px] xl:w-[402px] flex flex-col xl:items-start items-center justify-center bg-white shadow-md rounded-xl p-4 ">
              <Image

                src={O_S_three}
                alt="O_S_one"
                className="my-5"
              />
              <h3 className="font-normal text-primaryColor text-[24px]">Goal</h3>
              <p className="font-normal text-base text-[#60666C] xl:w-[291px] pt-3 xl:text-left text-center">Through Coach Finder, we aim to empower people to unlock their full potential, break through obstacles, and lead more fulfilling lives. Our platform is built on the belief that great coaching can be a game-changer, and were here to help you take that first step toward a better, more successful tomorrow.</p>
            </div>

            <div className="xl:mt-0 mt-3">
              <h3 className="font-normal text-[54px] text-primaryColor xl:text-left text-center">Our <span className="text-BtnColor">Story</span> </h3>
              <p className="font-normal text-base text-[#60666C] xl:w-[374px] pt-3 xl:text-left text-center">Founded by a passionate team of professionals who understand the power of mentorship and personal development, Coach Finder was created to make coaching more accessible and tailored to each persons unique needs. Whether youre looking for career coaching, life coaching, executive guidance, or fitness mentoring, were here to help you find the perfect coach who resonates with your goals and values.</p>
            </div>

          </div>
        </div>

      </div>

      {/* mission visson end */}
      {/* business goal part start */}
      <div className="container mt-[120px]">
        <h3 className="text-primaryColor text-[56px] font-normal xl:w-[650px] text-center mx-auto">
          Accomplish <span className="text-BtnColor">Business Goals</span> With
          Us
        </h3>

        <div className="flex flex-wrap xl:justify-between xl:gap-0 gap-[30px] justify-center">
          <BusinessGoalCard
            src={A_B_G_one}
            text={`Bring your brand to light`}
            perageaph={`A business without a website is faceless and non recognizable in the digital world aka the world of the future. Build the right website for your brand, create the right brand image through impactful UI/UX experience`}
          />
          <BusinessGoalCard
            src={A_B_G_two}
            text={`Create your Identity`}
            perageaph={`Create your brand identity, make it stand out from the rest. Choose the right logo and digital content from a list of thousands that meet and exceed your business needs`}
          />
          <BusinessGoalCard
            src={A_B_G_three}
            text={`Grow on social media platforms`}
            perageaph={`Dominate the digital verse with professional graphics and multimedia content. Our contents are designed and developed based on original ideas and rigorous market research aimed to achieve maximum impact. `}
          />
        </div>
      </div>
      {/* business goal part end */}
      {/* last */}
      <div className="bg-BtnColor xl:container w-[85vw] mx-auto rounded-[24px] xl:h-[368px]  mt-[120px]">
        <h3 className="font-normal xl:text-[56px] text-[4vw] text-white text-center pt-14">Have a question to ask?</h3>
        <p className="font-normal text-[18px] text-white text-center">Our dedicated Customer Service is available from 10:00 AM to 10:00 PM (GMT +6), 7 days a week</p>

        <div className="flex justify-center mt-10">
          <Button className="!bg-white !text-BtnColor !px-14 xl:h-[48px]">Get a quote Now</Button>
        </div>
        <div className="flex justify-end">
          <Image
            src={Just_Logo}
            alt="Just_Logo"
            className="xl:w-[56px] xl:h-[60px] w-[40px] h-[40px] mt-5 mr-5"
          />
        </div>
      </div>
      {/* last */}
    </section>
  );
};

export default AboutPage;
