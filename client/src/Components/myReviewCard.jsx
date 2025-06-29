"use client"
import { Star } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'
import { FaStarHalfAlt } from 'react-icons/fa'
import upReview from '../assets/upReview.jpg'
import remove from '../assets/remove.jpg'
const MyReviewCard = ({ item, onClick, clickForPatch }) => {

    const { _id, rating, review, group } = item

    const date = new Date(item.createdAt); // Convert the string to a Date object
    const options = { year: 'numeric', month: 'long' }; // Options to format the month and year
    const formattedDate = date.toLocaleDateString('en-US', options); // Format the date

    return (
        <div className='w-[724px] p-3 border flex gap-4 shadow-md rounded-[8px] justify-between'>
            <div className="
            rounded-full h-[56px] w-[56px]">

            </div>
            {/* <Image /> */}
            <div className="flex flex-col gap-3 w-[65%]">
                <h3 className='font-bold text-primaryColor'>{group?.name}</h3>

                <div className="flex space-x-1">
                    {
                        Array.from({ length: 5 }, (e, idx) => {
                            let number = idx + 0.5
                            return <div key={idx}>
                                {
                                    rating >= idx + 1 ?
                                        <Star className=' h-[14px] w-[14px] !stroke-[#FDAE53] fill-[#FDAE53]' /> :
                                        rating >= number ?
                                            <FaStarHalfAlt className='text-[#FDAE53] text-[14px]' /> :
                                            <Star className={"fill-none stroke-[#FDAE53] h-[14px] w-[14px]"} />

                                }
                            </div>
                        })
                    }
                </div>

                <h4 className='text-[16px] text-primaryColor'>{review}</h4>
            </div>

            <div className="flex gap-8">
                <h3>
                    {formattedDate}
                </h3>

                <div className="flex flex-col justify-between">
                    <button onClick={clickForPatch}>
                        <Image src={upReview} alt='upReview' />
                    </button>
                    <button onClick={onClick}>
                        <Image src={remove} alt='remove' />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default MyReviewCard