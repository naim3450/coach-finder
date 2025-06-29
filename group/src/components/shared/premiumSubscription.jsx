import React, { useState } from 'react'
import Button from './botton'
import { TikMark } from '../icons'
import { useRouter } from 'next/navigation';
import { pageShowFunc3 } from '@/redux/groupSlice';
import { useDispatch } from 'react-redux';

const PremiumSubscription = () => {
    const dispatch = useDispatch();
    const router = useRouter()
    const handleClick = () => {
        dispatch(pageShowFunc3(true))
        router.push(`/plan`)
    }
    return (
        <div className="pb-10 container">
            <div className='w-[724px] drop-shadow-sm bg-white p-6 mt-5 rounded-sm'>
                <h3 className='font-semibold text-[24px] text-[#637381] pb-6'>Your Plan</h3>
                <div className="h-[531px] w-[362px] bg-white rounded-[16px] drop-shadow-xl p-10">

                    <h3 className='font-normal text-[20px] text-BtnColor text-center pt-5'>Premium</h3>
                    <h3 className='font-semibold text-[20px] text-primaryColor text-center pt-5'>$199/month or $2,000/year</h3>
                    <div className="flex gap-x-2 pt-10">
                        <TikMark className='mt-1' />
                        <p className='font-normal text-base text-primaryColor w-[262px]'>Featured placement on category pages.</p>
                    </div>
                    <div className="flex gap-x-2 mt-2">
                        <TikMark className='mt-1' />
                        <p className='font-normal text-base text-primaryColor w-[253px]'>Advanced analytics.</p>
                    </div>
                    <div className="flex gap-x-2 mt-2">
                        <TikMark className='mt-1' />
                        <p className='font-normal text-base text-primaryColor w-[253px]'>Enhanced lead generation tools.</p>
                    </div>
                    <div className="flex gap-x-2 mt-2">
                        <TikMark className='mt-[6px]' />
                        <p className='font-normal text-base text-primaryColor w-[259px]'>Access to platform-exclusive webinars and networking events.</p>
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

export default PremiumSubscription