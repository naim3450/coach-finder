import React from 'react'
import Image from 'next/image'
 
const BlogCard = ({ srcmain, title, description, h4text, h3text, date, time, src3, srcProfile }) => {
  return (
     
      <div className='border border-[#00000014]  h-[530px] mx-auto xl:w-[356px] md:w-[35vw] sm:[70vw] w-[85vw] rounded-[8px] shadow-sm bg-white mb-10'>
        <div className="p-4">
          <div className="">
            <Image
              src={srcmain}
              alt='alt'
              className='rounded-[8px] w-full object-cover mx-auto'
            />
            <span className='text-base font-semibold text-[#0D0D0E]  opacity-40 pt-4'>{title}</span>
            <h3 className='text-[18px] font-normal text-primaryColor pt-3'>{h3text}</h3>
            <p className='text-[14px] font-normal text-primaryColor pt-3 h-[88px]'>{description.slice(0, 160)} {description.length > 160 && '...'}</p>

          </div>
          <div className="border-t border-[#00000014] mt-10"></div>
          <div className="flex gap-5 pt-2">


            <div className="flex gap-4 my-2">
              <span className='font-medium text-[12px] text-[#0D0D0E] opacity-40 pt-1'>{date}</span>
              <Image
                src={src3}
                alt='alt'
                className='h-[27px] w-[11px]'
              />
              <span className='font-medium text-[12px] text-[#0D0D0E] opacity-40 pt-1'>{time}</span>
            </div>

          </div>
        </div>
      </div>
   
  )
}

export default BlogCard