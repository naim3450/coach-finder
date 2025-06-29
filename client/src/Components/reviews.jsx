"use client";
import React, { useEffect, useState } from "react";
import ReviewCard from "./shared/reviewCard";
import Review_icon from "../assets/review_icon.svg";
import Review_profile from "../assets/review_profile.png";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import axiosInstance from "@/lib/axios.config";

const Reviews = () => {
  const slideArr = [1, 2, 3];

  const [customerReviews, setCustomerReview] = useState(null);

  useEffect(() => {
    (async function () {
      const res = await axiosInstance.get("/reviews?limit=3");
      if (res.success) {
        setCustomerReview(res.data.data);
      }
    })();
  }, []);

  const [active, setactive] = useState(0);

  return (
    <section className="md:py-[80px] py-[5vw]">
      <div className="container">
        <h3 className="font-bold md:text-[32px] text-[4vw] text-center">
          Customer Reviews
        </h3>

        <div className="relative py-5">
          <Splide
            hasTrack={false}
            options={{
              // type: "loop",
              perPage: 1,
              perMove: 1,
              arrows: true,
              pagination: false,
              gap: 10,
            }}
            aria-label="My Favorite Images"
          >
            <SplideTrack>
              {customerReviews?.map((review, idx) => (
                <SplideSlide key={idx}>
                  <ReviewCard
                    {...review}
                    src1={Review_icon}
                    alt="Review_icon"
                    name={`ranshishi`}
                    description={`“We have choosed this option against competitors based on the Customers reviews. After 9 months of using we have never regreted. Right now we are more effective in communication and managing the customer flows.”`}
                    src2={Review_profile}
                    h4text={`Laura Klamrs,`}
                    ptext={`Marketing Manager @TheVercile`}
                  />
                </SplideSlide>
              ))}
            </SplideTrack>

            <div className="absolute mt-16 flex items-center gap-3">
              {slideArr.map((el, idx) => {
                return (
                  <div
                    key={idx}
                    className="w-[48px] rounded-full overflow-hidden h-[2px] "
                  >
                    <div
                      className={`${
                        active == idx ? "bg-BtnColor" : "bg-gray-500"
                      } !w-full  !h-full !rounded-full`}
                    ></div>
                  </div>
                );
              })}
            </div>

            <div className="bg-red-500 absolute w-[130px] right-0 mt-16">
              <div className="splide__arrows sliderBtn">
                <button
                  onClick={() => setactive(active - 1)}
                  className="splide__arrow splide__arrow--prev left-0"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="13"
                    viewBox="0 0 18 13"
                    fill="none"
                  >
                    <path
                      d="M1.1499 6.24219H16.8499"
                      stroke="#07101A"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="bevel"
                    />
                    <path
                      d="M12.4497 11.0222L16.5597 6.9122C16.746 6.72483 16.8505 6.47138 16.8505 6.2072C16.8505 5.94301 16.746 5.68956 16.5597 5.5022L12.5597 1.5022"
                      stroke="#07101A"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="bevel"
                    />
                  </svg>
                </button>

                <button
                  onClick={() => setactive(active + 1)}
                  className="splide__arrow splide__arrow--next right-0"
                >
                  <div className="rotate-[180deg]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="12"
                      viewBox="0 0 20 12"
                      fill="none"
                    >
                      <path
                        d="M18.0702 6.24219H1.93018"
                        stroke="#07101A"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="bevel"
                      />
                      <path
                        d="M6.32999 1.46216L2.21999 5.57216C2.03374 5.75952 1.9292 6.01297 1.9292 6.27716C1.9292 6.54134 2.03374 6.7948 2.21999 6.98216L6.21999 10.9822"
                        stroke="#07101A"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="bevel"
                      />
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          </Splide>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
