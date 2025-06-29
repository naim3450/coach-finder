import { CardContent, CardDescription } from '@/Components/ui/card'
import React from 'react'
import { Contact, Flag, Star } from '../icons'
import Button from '@/Components/shared/button'
import Image from 'next/image'
import useReviews from '@/hooks/get-review.'
import { StarUpdated } from '../icons/starNew'

const CampareListCard = ({ el }) => {
    const { avgRating, reviews, totalReviews } = useReviews(el?._id);

    console.log();


    return (
        <div className="">

            <div className='border rounded-[8px] md:w-[384px] h-[138px] w-full py-4 sm:px-4 px-2 flex lg:flex-row flex-col lg:justify-start justify-center items-center lg:gap-6 gap-3'>
                <div className="lg:w-[80px] lg:h-[80px] w-[50px] h-[50px] relative">
                    <Image src={el.profile_picture} alt='profile_picture' objectFit='cover' layout="fill" />
                </div>
                <h2 className="text-[#333] lg:text-base sm:text-sm max-sm:text-xs font-semibold lg:font-extrabold lg:leading-[24px] lg:text-left text-center">
                    {el.name}
                </h2>
            </div>

            <div className="border-b md:w-[384px] h-[83px] w-full items-center sm:p-4 p-2 sm:flex hidden">
                <p className='text-sm text-[#333] font-medium'>{el.about}</p>
            </div>

            {/* about responsive part start  */}
            <div className="border-b md:w-[384px] h-[83px] w-full  items-center sm:p-4 p-2 sm:hidden block">
                <p className='text-sm text-[#333] font-medium'>{el.about?.slice(0, 40)}....</p>
            </div>
            {/*about responsive part end  */}

            <div className="border-b md:w-[384px] h-[83px] w-full flex items-center sm:p-4 p-2">
                <h1 className="text-primary font-lato sm:text-[20px] text-sm sm:font-extrabold font-semibold leading-[44.8px]">
                    ${el.pricing}
                    <span className='text-black/50 text-[12px] font-normal'>/Hour</span>
                </h1>
            </div>

            <div className="border-b md:w-[384px] h-[83px] w-full sm:p-4 p-2 flex justify-center gap-2">
                {Array.from({ length: 5 }, (_, idx) => {
                    const fillLevel = Math.max(0, Math.min(1, avgRating - idx)); // Calculate fill level for each star (0 to 1)
                    return (
                        <StarUpdated
                            key={idx}
                            className={`!h-4 !w-4 ${fillLevel === 1
                                ? "fill-[#FDAE53]" // Fully filled star
                                : fillLevel > 0
                                    ? "partial-star" // Partially filled star
                                    : "fill-none stroke-[#FDAE53]" // Empty star
                                }`}
                            fillLevel={fillLevel} // Pass fill level to the Star component
                        />
                    );
                })}

                <p className="text-gray-500 font-normal text-sm pl-2 mt-[2px]">
                    {avgRating} ({`${totalReviews} Reviews`})
                </p>
            </div>

            <div className="border-b md:w-[384px] h-[83px] w-full p-4 flex items-center">
                <CardDescription className="font-medium sm:text-[16px] text-sm text-primaryColor opacity-40 flex sm:flex-row flex-col sm:text-left text-center items-center gap-2">
                    <Flag />
                    {el.city}, {el.country}
                </CardDescription>
            </div>

            <div className="border-b md:w-[384px] h-[83px] w-full p-4 flex items-center">
                <h5 className='text-xs text-black/50 flex sm:flex-row flex-col max-sm:justify-center max-sm:text-center items-center gap-1 capitalize font-medium'><Contact /> {el.meeting_format}</h5>
            </div>

            <div className="border-b md:w-[384px] h-[83px] w-full p-4 min items-center">
                <CardContent className="flex flex-wrap gap-2 p-0 w-full">
                    {
                        el.key_topics?.map((elm, idx) => (
                            <Button key={idx}
                                className="!bg-[#F5F5F5] font-normal xl:text-[12px] text-[10px] !text-[#333] !px-2 rounded-lg xl:!py-1 !py-2 xl:!rounded-[43px]">
                                {elm}
                            </Button>
                        ))
                    }
                </CardContent>
            </div>

        </div>
    )
}

export default CampareListCard