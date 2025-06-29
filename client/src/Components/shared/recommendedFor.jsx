"use client";

import React from 'react'
import { useSelector } from "react-redux";
import GroupCard from './groupCard';
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import Loading from './loading';

const RecommendedFor = () => {
    let { dataInfo, isLoading } = useSelector((state) => state.apiInfo)
    if (isLoading) {
        return (
            <Loading />
        )
    }

    return (
        <div className='w-[1200px]  mx-auto  py-10'>
            <div className="">
                <h3 className='font-semibold text-primaryColor text-[32px] py-5'>Recommended for you</h3>
            </div>
            <div className="w-full  ">
                <Splide
                    className='pb-16'
                    options={{
                        type: "loop",
                        perPage: 2,
                        perMove: 1,
                        arrows: false,
                        pagination: true,
                        gap: 25,
                    }}
                    aria-label="My Favorite Images"
                >
                    {

                        dataInfo?.map((el, idx) => {
                            return (
                                <SplideSlide key={idx} >

                                    <GroupCard
                                        className={"xl:!w-[588px]"}

                                        item={el}
                                    />
                                </SplideSlide>
                            )
                        })
                    }

                </Splide>
            </div>


        </div>
    )
}

export default RecommendedFor

