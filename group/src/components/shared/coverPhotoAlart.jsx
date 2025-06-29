import React from 'react'
import Button from './botton'

const CoverPhotoAlart = () => {
  return (
    <div className='py-8 md:w-[520px] sm:w-full mx-auto bg-white rounded-[16px] drop-shadow-sm p-8'>

            <h3 className='font-medium text-primaryColor text-[20px] lg:text-[24px] text-center'>You can’t upload cover photo</h3>
            <p className='font-normal text-primaryColor text-[14px] md:text-base text-center'>In your free plan you can’t upload cover photo. Change your plan to access this feature.</p>
            <div className="flex justify-end gap-4 mt-5">
                <Button className='!bg-transparent border !text-[#60666C]'>
                Go back
                </Button>
                <Button>
                Change my plan
                </Button>
            </div>
        </div>
  )
}

export default CoverPhotoAlart