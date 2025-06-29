import React from "react";

import Work_one from "../assets/work_one.png";
import Work_two from "../assets/work_two.png";
import Work_three from "../assets/work_three.png";
import Work_four from "../assets/group_frame.png";
import WorkCard from "./shared/workCard";
const Works = () => {
  return (
    <section className="">
      <div className="container">
        <h3 className="font-extrabold md:text-[48px] text-[5vw] text-center text-primaryColor">
          How it Works?
        </h3>
      </div>
      <div className="container">
        <div className="">
          <WorkCard
            src={Work_one}
            alt={`Work_one`}
            num={`1`}
            h4text={`Login or sign up to be able use our platform`}
            peragraph={`You must log in first to be able to use our platform to get your product analytics`}
            showLine={true}
          />
        </div>
        <div className="">
          <WorkCard
            src={Work_two}
            className="mr-10"
            alt={`Work_one`}
            num={`2`}
            h4text={`matching with top coaches or Peer Group`}
            peragraph={`You must log in first to be able to use our platform to get your product analytics`}
            showLine={true}
          />
        </div>
        <div className="">
          <WorkCard
            src={Work_three}
            alt={`Work_one`}
            num={`3`}
            h4text={`Coaching sessions anytime, anywhere`}
            peragraph={`You must log in first to be able to use our platform to get your product analytics`}
            showLine={true}
          />
        </div>
        <div className="">
          <WorkCard
            src={Work_four}
            alt={`Work_one`}
            num={`4`}
            h4text={`Join the Right Group`}
            peragraph={`You must log in first to be able to use our platform to get your product analytics`}
            showLine={false}
          />
        </div>
      </div>
    </section>
  );
};

export default Works;
