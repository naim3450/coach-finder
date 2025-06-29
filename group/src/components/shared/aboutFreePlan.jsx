 


"use client";

import React, { useState } from 'react'
import Camera from '../../assets/camera.png'
 import Image from 'next/image'
import { Click } from '../icons';
const AboutFreePlan = () => {

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
const [ coverPic, setcoverPic] = useState(null)

  const coverUpload = (e) => {
    if (e.target.files[0].size <= 50 * 1024 * 1024) {

      setcoverPic(URL.createObjectURL(e.target.files[0]))
    }
    else {
      alert("Max size of 50 MB")
    }
  }



  return (  
    <div>
      <div className="w-[1200px] mx-auto h-[420px] bg-white rounded-lg drop-shadow-sm">
        {/* Header Section */}
        <div className="relative bg-[#D9D9D9] h-[220px] mx-auto w-[1200px] rounded-[10px]">
           <label htmlFor="coverImg">
                            <div className="w-full h-full relative">
                              
                                 {coverPic? 
                                  
                                  <Image
                                    src={coverPic}
                                    alt="description"
                                    objectFit='cover'
                                    layout="fill"
                                    className=' '
                                  />
                                  : false
                                  }
                                  
          
                            </div>
                            <input type="file" id='coverImg' className='absolute hidden' accept='.jpg,.jpeg,.png,.svg,.gif' onChange={coverUpload} />
          
                          </label>
          <button className="absolute bottom-2 right-8 h-10 w-10 border border-white p-2 rounded-sm">
            <Image src={Camera} alt="Camera" />
          </button>
        </div>

        {/* Profile Details */}
        <div className="p-6">
          <div className="flex gap-x-5">
                       <div className="border-2 bg-BgColor w-[144px] h-[144px] border-dashed rounded-full p-2 overflow-hidden ">
         
                         <label htmlFor="profileImg">
                           <div className="w-full h-full rounded-full relative">
                             
                                {pictureUrl? 
                                 <Image
                                   src={pictureUrl}
                                   alt="description"
                                   objectFit='cover'
                                   layout="fill"
                                   className='rounded-full'
                                 />
                                 : false
                                 
                                 }
                                 
                 
                           </div>
                           <input type="file" id='profileImg' className='absolute hidden' accept='.jpg,.jpeg,.png,.svg,.gif' onChange={picUplod} />
         
                         </label>
                         
                          
                       </div>
                       <div className="pt-12 relative">
                         <h3 className='font-bold text-BtnColor text-[14px]'>Upload file</h3>
                         <p className='text-[#545454] font-medium text-[14px]'>Make sure the file is below 2mb</p>
         
         
                         <div className="h-10 w-10 bg-BgColor rounded-full absolute top-24 -left-16 flex justify-center items-center">
                              <Click className=''/>
                           </div>
                       </div>
                     </div>

          {/* Plan Section */}
          <div className="mt-4 ml-28">
            <span className="inline-block bg-[#E0E0E0] text-[#262626] text-xs px-4 py-2 rounded-[8px]">
              Free Plan
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutFreePlan