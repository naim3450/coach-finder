"use client"
import Button from '@/Components/shared/button'
import React, { useEffect, useState } from 'react'
import { Flag, Star } from '../icons'
import { CardDescription } from '@/Components/ui/card'
import Image from 'next/image'
import test from "../../../assets/test.jpg"
import { FaStarHalfAlt } from 'react-icons/fa'
import axiosInstance from '@/lib/axios.config'
import { ToastContainer, toast } from 'react-toastify';
import Loading from '@/Components/shared/loading'


const SubmitCard = ({ item, setpopUp, avgRating, totalReviews }) => {

    const [ratingNum, setratingNum] = useState(0);
    const [loading, setloading] = useState(false);

    const renderReview = (idx) => {
        setratingNum(idx + 1);
    };


    const sumbitReview = async (e) => {
        e.preventDefault()
        const sendToServerUpinfo = { rating: Math.floor(ratingNum), group: item?._id }
        const formData = new FormData(e.target)
        formData.forEach((val, key) => {
            sendToServerUpinfo[key] = val
        })
        try {
            setloading(true)
            console.log(sendToServerUpinfo);
            const res = await axiosInstance.post(`/reviews`, sendToServerUpinfo);
            console.log(res);

            if (res.success) {
                setpopUp(false)
            }
        } catch (error) {

        }
        finally {
            setloading(false)
        }


    };


    return (
        <div className="">
            {/* <div>
                <ToastContainer />
            </div> */}
            {loading && <Loading />}

            <div className="p-6 rounded-[12px] w-[760px] bg-white">
                <div className="flex gap-6">
                    <div className="h-[80px] w-[80px] relative">
                        <Image src={item?.group?.profile_picture} alt='test' objectFit='cover' layout='fill' />
                    </div>
                    <div className="">
                        <h3 className='text-base text-primaryColor font-extrabold'>{item?.group?.name}</h3>
                        <CardDescription className="font-semibold text-[12px] text-primaryColor opacity-40 flex items-center gap-2">
                            <Flag />
                            {item?.group?.city} {item?.group?.country}
                        </CardDescription>

                        <div className="flex space-x-2 mt-2">
                            <div className=" space-x-[5px] flex">
                                {
                                    Array.from({ length: 5 }, (e, idx) => {
                                        return <div key={idx}>
                                            {
                                                item?.rating >= idx + 1 ?
                                                    <Star /> :
                                                    <Star className={"fill-none stroke-[#FDAE53]"} />
                                            }

                                        </div>
                                    })
                                }
                            </div>

                            <p className="text-gray-500 font-normal text-sm pl-2 mt-[2px]">
                                {avgRating} ({`${totalReviews} Reviews`})
                            </p>
                        </div>
                    </div>
                </div>

                <h3 className="text-primaryColor text-2xl font-medium leading-[38.4px] mt-8">
                    Write a Review
                </h3>

                <h4 className="text-[#51525B] font-lato text-base font-medium leading-[160%] mt-[16px]">
                    Rating
                </h4>

                <form onSubmit={sumbitReview}>
                    <div className="flex gap-[6px] mt-2">
                        {
                            Array.from({ length: 5 }, (e, idx) => {
                                let number = idx + 0.5
                                return <div key={idx} onClick={() => renderReview(idx)}>
                                    {
                                        ratingNum >= idx + 1 ?
                                            <Star /> :
                                            ratingNum >= number ?
                                                <FaStarHalfAlt className='text-[#FDAE53] text-[19px]' /> :
                                                <Star className={"fill-none stroke-[#FDAE53]"} />

                                    }

                                </div>
                            })
                        }
                    </div>

                    <textarea name='review' placeholder='Write your comments' className=' resize-none w-full h-[300px] outline-none border rounded-[6px] text-[#51525B] text-base leading-[160%] p-[10px] mt-6'>
                    </textarea>

                    <Button type="submit" className='mt-6 !py-3 !px-6'>
                        Submit Review
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default SubmitCard