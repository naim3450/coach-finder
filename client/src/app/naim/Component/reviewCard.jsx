import Image from 'next/image'
import React, { useState } from 'react'
import test from "../../../assets/test.jpg"
import { CardDescription } from '@/Components/ui/card'
import { Flag, Star } from '../icons'
import { FaStarHalfAlt } from 'react-icons/fa'
import SubmitCard from './submitCard'
import useReviews from '@/hooks/get-review.'
import { StarUpdated } from '../icons/starNew'
const ReviewCard = ({ item, onClick }) => {

    const [rv, setrv] = useState(false)


    const { avgRating, reviews, totalReviews } = useReviews(item?.group?._id);

    return (
        <div onClick={() => setrv(true)} className='flex gap-6 w-full py-4 border-b border-gray-100'>

            {rv && <div className="flex h-screen w-full items-center justify-center bg-[#00000098] fixed top-0 left-0  z-50">
                <SubmitCard item={item} setpopUp={setrv} avgRating={avgRating} totalReviews={totalReviews} />
            </div>}

            <div className="h-[80px] w-[80px] relative">
                <Image src={item?.group?.profile_picture} alt='test' objectFit='cover' layout='fill' />
            </div>
            <div className="">

                <h3 className='text-base text-primaryColor font-extrabold'>{item?.group?.name}</h3>
                <CardDescription className="font-semibold text-[12px] text-primaryColor opacity-40 flex items-center gap-2">
                    <Flag />
                    {item?.group?.city}, {item?.group?.country}
                </CardDescription>

                <div className="flex space-x-2 mt-2">
                    {Array.from({ length: 5 }, (_, idx) => {
                        const fillLevel = Math.max(0, Math.min(1, avgRating - idx)); // Calculate fill level for each star (0 to 1)

                        return (
                            <StarUpdated
                                key={idx}
                                className={
                                    fillLevel === 1
                                        ? "fill-[#FDAE53]" // Fully filled star
                                        : fillLevel > 0
                                            ? "partial-star" // Partially filled star
                                            : "fill-none stroke-[#FDAE53]" // Empty star
                                }
                                fillLevel={fillLevel} // Pass fill level to the Star component
                            />
                        );
                    })}

                    <p className="text-gray-500 font-normal text-sm pl-2 mt-[2px]">
                        {avgRating} ({`${totalReviews} Reviews`})
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ReviewCard