import React, { useState } from 'react'
import { TikMark } from '../icons'
import Button from './botton'
import { useRouter } from 'next/navigation'
import { pageShowFunc3 } from '@/redux/groupSlice'
import { useDispatch } from 'react-redux'
const EssentialSubscription = () => {
    const dispatch = useDispatch();
    const router = useRouter()
    const handleClick = () => {
        dispatch(pageShowFunc3(true))
        router.push(`/plan`)
    }
    return (

        <div className="py-5 container">
            <div className='lg:w-[724px] w-full drop-shadow-sm bg-white p-6 rounded-sm'>
                <h3 className='font-semibold text-[24px] text-[#637381] pb-6'>Your Plan</h3>
                <div className="h-[531px] lg:w-[362px] w-full bg-white rounded-[16px] drop-shadow-lg p-10">

                    <h3 className='font-normal text-[20px] text-BtnColor text-center pt-5'>Essential</h3>
                    <h3 className='font-semibold text-[20px] text-primaryColor text-center pt-5'>$99/month or $1,000/year</h3>
                    <div className="flex gap-x-2 pt-10">
                        <TikMark className='mt-1' />
                        <p className='font-normal text-base text-primaryColor w-[262px]'>Enhanced profile with additional fields.</p>
                    </div>
                    <div className="flex gap-x-2 mt-2">
                        <TikMark className='mt-1' />
                        <p className='font-normal text-base text-primaryColor w-[253px]'>Priority placement in search results.</p>
                    </div>
                    <div className="flex gap-x-2 mt-2">
                        <TikMark className='mt-1' />
                        <p className='font-normal text-base text-primaryColor w-[253px]'>Basic analytics dashboard.</p>
                    </div>
                    <div className="flex gap-x-2 mt-2">
                        <TikMark className='mt-1' />
                        <p className='font-normal text-base text-primaryColor w-[259px]'>Ability to respond publicly to reviews.</p>
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

export default EssentialSubscription