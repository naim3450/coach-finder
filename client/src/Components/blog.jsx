"use client";

import React from "react";
import BlogCard from "./shared/blogCard";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { cards } from "../../data/Data";
import Link from "next/link";


const Blog = () => {




  return (
    <section className="bg-BgColor mt-20 py-10">
      <div className="container text-center">
        <h3 className="text-primaryColor font-extrabold md:text-[48px] text-[5vw]">
          News and Blog
        </h3>
        <p className="text-primaryColor text-base font-medium  ">
          Get the latest news, updates and tips
        </p>
      </div>
      <div className="container ">

        {/* xl part  start*/}
        <div className="my-10 xl:block hidden">
          <Splide
            options={{
              type: "loop",
              perPage: 3,
              perMove: 1,
              arrows: false,
              pagination: true,
              gap: 10,
            }}
            aria-label="My Favorite Images"
          >
            {

              cards.map((el, idx) => {

                return (
                  <SplideSlide key={idx}>
                    <Link href={`/blogpost/${el.id}`}>
                    <BlogCard
                      srcmain={el.image}
                      title={el.category}
                      h3text={el.title}
                      h4text={el.category}
                      description={el.description}
                      date={el.date}
                      time={el.readingTime}
                      src3={el.imagetwo}
                    />
                    </Link>
                  </SplideSlide>
                )
              })
            }

          </Splide>
        </div>
        {/* xl part end  */}

        {/* md part start  */}
        <div className="my-10 xl:hidden hidden md:block">
          <Splide
            className=""
            options={{
              perPage: 2,
              perMove: 1,
              arrows: false,
              pagination: true,
              gap: 10,
            }}
            aria-label="My Favorite Images"
          >
            {

              cards.map((el, idx) => {

                return (
                  <SplideSlide key={idx}>
                    <BlogCard
                      srcmain={el.image}
                      title={el.category}
                      h3text={el.title}
                      h4text={el.category}
                      description={el.description.slice(0,160)}
                      date={el.date}
                      time={el.readingTime}
                      src3={el.imagetwo}
                    />
                  </SplideSlide>
                )
              })
            }

          </Splide>
        </div>
        {/* md part end  */}

        {/* sm part start  */}
        <div className="my-10 md:hidden block">
          <Splide
            className=""
            options={{
              perPage: 1,
              perMove: 1,
              arrows: false,
              pagination: true,
              gap: 10,
            }}
            aria-label="My Favorite Images"
          >
            {

              cards.map((el, idx) => {

                return (
                  <SplideSlide key={idx}>
                    <BlogCard
                      srcmain={el.image}
                      title={el.category}
                      h3text={el.title}
                      h4text={el.category}
                      description={el.description.slice(0,160)}
                      date={el.date}
                      time={el.readingTime}
                      src3={el.imagetwo}
                    />
                  </SplideSlide>
                )
              })
            }
          </Splide>
        </div>
        {/* sm part end */}

      </div>
    </section>
  );
};

export default Blog;
