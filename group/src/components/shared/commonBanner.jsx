"use client";

import React, { useState } from 'react'
import Camera from '../../assets/camera.png'
import Image from 'next/image'
 
const CommonBanner = ({plan}) => {

  const [pictureUrl, setpictureUrl] = useState(null)

  const picUplod = (e) => {
    if (e.target.files[0].size <= 2 * 1024 * 1024) {

      setpictureUrl(URL.createObjectURL(e.target.files[0]))
    }
    else {
      alert("Max size of 2 MB")
    }
  }

  // banner
  const [coverPic, setcoverPic] = useState(null)

  const coverUpload = (e) => {
    if (e.target.files[0].size <= 50 * 1024 * 1024) {

      setcoverPic(URL.createObjectURL(e.target.files[0]))
    }
    else {
      alert("Max size of 50 MB")
    }
  }
  console.log(coverPic);



  return (
    <div className='bg-BgColor pt-8'>
      <div className="w-[1200px] mx-auto h-[420px] bg-white rounded-lg drop-shadow-sm">
        {/* Header Section */}
        <div className="relative bg-[#D9D9D9] h-[220px] mx-auto w-[1200px] rounded-[10px]">

          <div className="">
            <div className="w-full h-full absolute top-0 left-0">

              {coverPic ?

                <Image
                  src={coverPic}
                  alt="description"
                  objectFit='cover'
                  layout="fill"
                  className='rounded-[12px]'
                />
                : false
              }


            </div>

          </div>


          <button className="absolute bottom-2 right-8 h-10 w-10 border border-white p-2 rounded-sm">
            <label htmlFor="coverImg">
              <Image src={Camera} alt="Camera" />
              <input type="file" id='coverImg' className='absolute hidden' accept='.jpg,.jpeg,.png,.svg,.gif' onChange={coverUpload} />

            </label>
          </button>
        </div>

        {/* Profile Details */}
        <div className="p-6 relative">
          <div className="flex gap-x-5 absolute -top-16">

            <div className="border-2 bg-BgColor w-[144px] h-[144px] border-gray-300 rounded-full p-2 overflow-hidden relative">
              <div className="w-full h-full rounded-full ">

                <label htmlFor="picUplod">
               

                  {pictureUrl ?
                    <Image
                      src={pictureUrl}
                      alt="description"
                      objectFit='cover'
                      layout="fill"
                      className='rounded-full'
                    />
                    : false

                  }
                  <input type="file" id='picUplod' className='absolute hidden' accept='.jpg,.jpeg,.png,.svg,.gif' onChange={picUplod} />

                </label>
              </div>
            </div>


            <div className="mt-20 relative">
             <div className="">

             <h3 className='font-semibold text-primaryColor text-[32px] uppercase'>DIGITAL TRANSFORMATIONS AND BEYOND</h3>
              <p className='text-[#545454] font-medium text-[14px]'>davidcannon@armyspy.com</p>

             </div>

              <div className="mt-4  ">
            <span className="inline-block bg-[#E0E0E0] text-[#262626] text-xs px-4 py-2 rounded-[8px]">
           {plan}
            </span>
          </div>
            </div>


            
          </div>

          {/* Plan Section */}

        </div>
      </div>
    </div>
  )
}

export default CommonBanner