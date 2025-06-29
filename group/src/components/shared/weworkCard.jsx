import Image from 'next/image'
import React from 'react'

const WeworkCard = ({src, alt, heading, peragraph}) => {
  return (
    <div className='lg:h-[246px] w-full lg:w-[383px] bg-[#F9F9F9] rounded-[23px] shadow-lg lg:p-10 p-5 lg:pl-10'>
            <Image
             src={src}
             alt={alt}
             className=''
            />
            <h3 className='text-[#282938] font-medium lg:text-[20px] text-[18px] w-[279px] pt-3'>{heading}</h3>
            <p className='text-[#282938] font-normal text-[14px]  w-[260px] pt-2'>{peragraph}</p>
    </div>
  )
}

export default WeworkCard