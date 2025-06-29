"use client";

import Image from 'next/image';
import React, { useState } from 'react'
import { Click } from '../../components/icons';
import { HiArrowLeft } from 'react-icons/hi2';
import { getplanObj1 } from '@/redux/groupSlice';
import { useDispatch } from 'react-redux';


const PremiumStepOne = ({ index, dec, inc }) => {

  const [pictureFile, setpictureFile] = useState(null)
  const [coverFile, setcoverFile] = useState(null)
  const [pictureUrl, setpictureUrl] = useState(null)
  const [coverPic, setcoverPic] = useState(null)
  const [name, setname] = useState(null)
  const [country, setcountry] = useState(null)
  const [city, setcity] = useState(null)
  const [about, setabout] = useState(null)

  const picUplod = (e) => {
    if (e.target.files[0].size <= 2 * 1024 * 1024) {
      setpictureFile(e.target.files[0])
      setpictureUrl(URL.createObjectURL(e.target.files[0]))
    }
    else {
      alert("Max size of 2 MB")
    }
  }


  const coverUpload = (e) => {
    if (e.target.files[0].size <= 10 * 1024 * 1024) {
      setcoverFile(e.target.files[0])
      setcoverPic(URL.createObjectURL(e.target.files[0]))
    }
    else {
      alert("Max size of 10 MB")
    }
  }

  const dispatch = useDispatch()

  function decrement() {
    dec()
  }

  const [messageRq, setmessageRq] = useState(false)
  function handleSubmit(e) {
    e.preventDefault()
    if (name && pictureFile && coverFile && country, city && about) {
      dispatch(getplanObj1({ name, profile_picture: pictureFile, cover_picture: coverFile, country, city, about }))
      inc();
    } else {
      setmessageRq(true)
    }
  }


  return (
    <div className=" ">
      {/* Header */}
      <h2 className="text-[20px] font-bold text-center text-primaryColor">Create Your Group</h2>
      <p className="text-center font-medium text-base text-[#545454] mb-6">Enter your Group details</p>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        {/* Full Name */}
        <div className="mb-4 relative">
          <label htmlFor="fullName" className="block text-[#919EAB] font-normal text-[14px] mb-2 absolute left-2 -top-[10px] bg-white">
            Group Name
          </label>
          <input
            required
            onChange={(e) => setname(e.target.value)}
            type="text"
            id="fullName"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-0"
          />
        </div>

        {/* Gender */}
        <div className="">
          <h3 className='font-bold text-base text-primaryColor pb-3'>Upload  group logo</h3>
          <div className="flex gap-x-5">
            <div className="border-2 bg-BgColor lg:w-[104px] lg:h-[104px] h-[95px] w-[95px] border-dashed rounded-full p-2 overflow-hidden ">
              <label htmlFor="profileImg">
                <div className="w-full h-full rounded-full relative">

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




                </div>
                <input type="file" id='profileImg' className='absolute hidden' accept='.jpg,.jpeg,.png,.svg,.gif' onChange={picUplod} />

              </label>
            </div>

            <div className="lg:pt-10 pt-5 relative">
              <h3 className='font-bold text-BtnColor text-[14px]'>Upload file</h3>
              <p className='text-[#545454] font-medium text-[14px]'>Make sure the file is below 2mb</p>
              <div className="h-10 w-10 bg-BgColor rounded-full absolute top-[65px] -left-16 flex justify-center items-center">
                <Click className='' />
              </div>
            </div>

          </div>
        </div>

        {/* cover upload start */}
        <div className="">
          <h3 className='font-bold text-base text-primaryColor pb-3'>Upload  cover photo</h3>
          <div className="flex gap-x-5">

            <div className="bg-[#D9D9D9] w-[161px] h-[70px] rounded-[5px]">

              <label htmlFor="coverImg">
                <div className="w-full h-full relative">

                  {coverPic ?

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


            </div>
            <div className="relative pt-3">
              <h3 className='font-bold text-BtnColor text-[14px]'>Upload file</h3>
              <p className='text-[#545454] font-medium text-[14px]'>Make sure the file is below 10mb</p>
            </div>
          </div>
        </div>
        {/* cover upload end */}

        {/* Current Organization */}
        <div className="mb-5 relative mt-6">
          <label htmlFor="organization" className="block text-[#919EAB] font-normal text-[14px] mb-2 absolute left-2 -top-[10px] bg-white">
            Country
          </label>
          <input
            onChange={(e) => setcountry(e.target.value)}
            type="text"
            id="organization"
            placeholder="Ex: Abc Company"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-0"
          />
        </div>

        <div className="mb-5 relative mt-6">
          <label htmlFor="organization" className="block text-[#919EAB] font-normal text-[14px] mb-2 absolute left-2 -top-[10px] bg-white">
            City
          </label>
          <input
            onChange={(e) => setcity(e.target.value)}
            type="text"
            id="organization"
            placeholder="Ex: Abc Company"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-0"
          />
        </div>

        {/* Industry */}
        <div className="relative">
          <label htmlFor="organization" className="block text-[#919EAB] font-normal text-[14px] mb-2 absolute left-3 top-[3px] bg-white">
            About Group
          </label>

          <textarea
            required
            id="about"
            onChange={(e) => setabout(e.target.value)}
            maxLength="100"
            name="about"
            placeholder="..."

            className="border w-full rounded-[8px] outline-none mt-3 font-medium text-[12px] text-[#949494] pl-[23px] pr-8 pt-[20px] !h-[120px]"
          />
        </div>

        {messageRq && <p className='text-BtnColor font-medium'>fil all fild</p>}

        {/* Buttons */}
        <div className={`lg:w-[531px] w-full flex justify-between items-center mt-5 ${index == 4 ? "hidden" : "block"}`}>
          <button
            onClick={decrement}
            className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300"
          >
            <HiArrowLeft />
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600"
          >
            Continue
          </button>
        </div>


      </form>
    </div>



  )
}

export default PremiumStepOne