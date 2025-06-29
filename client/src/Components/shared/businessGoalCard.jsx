import React from 'react'
import Image from 'next/image'
const BusinessGoalCard = ({ text, perageaph, src }) => {
  return (
    <div className='h-[356px] w-[370px] bg-white shadow-md rounded-[11px] px-6 mt-8'>
      <Image
        src={src}
        alt='alt'
        className='pt-14 pb-6 mx-auto'
      />
      <h3 className='font-normal text-primaryColor text-[24px] text-center'>{text}</h3>
      <p className='text-[#656D70] font-normal text-[14px] w-[290px] mx-auto text-center'>{perageaph}</p>
    </div>
  )
}

export default BusinessGoalCard