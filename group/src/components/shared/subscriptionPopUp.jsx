import React from 'react'
import Button from './botton'

const SubscriptionPopUp = () => {
    return (

        <div className='py-8 md:w-[520px] sm:w-full mx-auto bg-white rounded-[16px] drop-shadow-md p-8'>

            <h3 className='font-medium text-primaryColor text-[20px] lg:text-[24px] text-center'>are you sure you want to cancel your subscriptions.</h3>
            <p className='font-normal text-primaryColor text-[14px] md:text-base text-center'>Your plan end date is 03-10-2025 </p>
            <div className="flex justify-center gap-4 mt-5">
                <Button className='!bg-transparent border !text-[#60666C]'>
                    Yes
                </Button>
                <Button>
                    No
                </Button>
            </div>
        </div>
    )
}

export default SubscriptionPopUp