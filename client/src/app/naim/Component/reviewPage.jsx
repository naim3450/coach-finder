"use client"
import { Input } from '@/Components/ui/input'
import React, { useEffect, useState } from 'react'
import { Drop, Search } from '../icons'
import Button from '@/Components/shared/button'
import ReviewCard from './reviewCard'
import axiosInstance from '@/lib/axios.config'

const ReviewPage = () => {

    const [review, setreview] = useState([])

    useEffect(() => {
        const fetchReview = async () => {
            const res = await axiosInstance.get('/reviews');
            const arrayReview = await res.data.data
            setreview(arrayReview);
        };
        fetchReview()
    }, []);


    const [rv, setrv] = useState(false)

    return (
        <div>
            <div className="flex justify-center gap-6 mt-[68px]">
                <div className="relative w-[548px]">
                    <Search className={"absolute top-1/2 -translate-y-1/2 left-4"} />
                    <Input placeholder="Search Group" className="w-full h-full !py-3 pl-[48px] rounded-[6px] focus-visible:ring-0" />
                    <Drop className={"absolute top-1/2 -translate-y-1/2 right-4"} />
                </div>
                <Button type="submit" className='font-bold text-base !rounded-[8px] !py-3'>
                    Search
                </Button>
            </div>

            <div className="p-8 mt-6">
                <h3 className='text-[#0D0D0E] text-[32px] font-bold mb-2'>Select the business you&apos;d like to review</h3>
                <div className="grid grid-cols-2 gap-2 cursor-pointer">
                    {
                        review?.map((el, idx) => <ReviewCard key={idx} item={el} />)
                    }
                </div>
            </div>
        </div>
    )
}

export default ReviewPage