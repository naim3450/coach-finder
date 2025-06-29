import React, { useState } from 'react'
import { TikMark } from '../icons'
import Button from './botton'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'

const BasicPlan = () => {
    const dispatch = useDispatch();
    const router = useRouter()
    const handleClick = () => {
        dispatch(pageShowFunc3(true))
        router.push(`/plan`)
    }
    return (
        <div className="container">
            <div className='lg:w-[724px] w-full h-[531px] shadow-sm bg-white p-6 mt-5 rounded-sm'>
                <h3 className='font-semibold text-[24px] text-[#637381] pb-6'>Your Plan</h3>
                <div className="h-[341px] lg:w-[342px] w-full rounded-[16px] drop-shadow-lg border py-5 p-10">
                    <h3 className='font-normal text-[20px] text-BtnColor text-center'>Basic (Free)</h3>
                    <div className="flex gap-x-2 pt-10">
                        <TikMark className='mt-1' />
                        <p className='font-normal text-base text-primaryColor w-[253px]'>Basic profile listing with limited information .</p>
                    </div>
                    <div className="flex gap-x-2 mt-2">
                        <TikMark className='mt-1' />
                        <p className='font-normal text-base text-primaryColor w-[253px]'>Access to client reviews and ratings</p>
                    </div>
                    <div className="flex gap-x-2 mt-2">
                        <TikMark className='mt-1' />
                        <p className='font-normal text-base text-primaryColor w-[253px]'>Limited analytics.</p>
                    </div>
                    <Button className='!bg-transparent border !w-full text-normal text-base !text-[#282b2e] mt-10'>
                        Cancel Plan
                    </Button>
                </div>
                <div className="flex justify-end">
                    <Button onClick={handleClick} className='!bg-transparent border !border-BtnColor   text-normal text-base !text-BtnColor mt-10'>
                        Upgrade Plan
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default BasicPlan