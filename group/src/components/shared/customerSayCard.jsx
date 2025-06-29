import Image from 'next/image'
import React from 'react'


const CustomerSayCard = ({ heading, description, h4heading, intro, src, className, textStyle }) => {
  return (
    <div className={`h-[360px] bg-white drop-shadow-xl rounded-[12px] pt-[50px] relative px-14 ${className}`}>

      <h3 className='font-semibold text-[24px] text-[#1B2534]'>{heading}</h3>
      <p className={`font-normal text-[18px] text-[#545863] w-[420px] pt-6 ${textStyle}`}>{description}</p>

      <div className="relative">
        <div className="ml-7">
          <h4 className='font-semibold text-[24px] text-[#1B2534] pt-14'>{h4heading}</h4>
          <p className='font-normal text-[18px] text-[#545863]'>{intro}</p>
        </div>
        <Image
          src={src}
          alt='alt'
          className='absolute top-12 -left-[100px]'
        />
      </div>
    </div>
  )
}

export default CustomerSayCard     
