"use client";

import Image from 'next/image';
import React, { useState } from 'react'
import { Click } from './icons';
import { HiArrowLeft } from 'react-icons/hi2';
import { useDispatch } from 'react-redux';
import { getplanObj1 } from '@/redux/groupSlice';


const CreateGroupStepOne = ({ index, dec, inc }) => {

  const [pictureUrl, setpictureUrl] = useState(null);
  const [name, setname] = useState(null);
  const [profile_picture, setprofile_picture] = useState(null);
  const [country, setcountry] = useState(null);
  const [city, setcity] = useState(null);
  const [about, setabout] = useState(null);

  const picUplod = (e) => {
    setprofile_picture(e.target.files[0])
    if (e.target.files[0].size <= 2 * 1024 * 1024) {
      setpictureUrl(URL.createObjectURL(e.target.files[0]))
    }
    else {
      alert("Max size of 2 MB")
    }
  }

  const dispatch = useDispatch()

  function decrement() {
    dec()
  }


  const [messageRq, setmessageRq] = useState(false)
  function handleSubmit(e) {
    e.preventDefault()
    if (name && profile_picture && country && city && about) {
      dispatch(getplanObj1({ name, profile_picture, country, city, about }))
      inc();
    } else {
      setmessageRq(true)
    }
  }

  return (

    <div className="">
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
            type="text"
            id="fullName"
            required
            onChange={(e) => setname(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-0"
          />
        </div>

        {/* Gender */}
        <div className="">
          <h3 className='font-bold text-base text-primaryColor pb-3'>Upload  group logo</h3>
          <div className="flex gap-x-5">
            <div className="border-2 bg-BgColor lg:w-[104px] w-[100px] h-[100px] lg:h-[104px] border-dashed rounded-full p-2 overflow-hidden ">

              <label htmlFor="profileImg">
                <div className="w-full h-full rounded-full relative">
                  {
                    pictureUrl ?
                      <Image
                        src={pictureUrl}
                        alt="description"
                        objectFit='cover'
                        layout="fill"
                        className='rounded-full'
                      />
                      :
                      <div className="flex w-full h-full rounded-full flex-col items-center">

                        <h3 className='text-[#919EAB] text-center lg:mt-8 mt-5 text-base'>Upload photo</h3>
                      </div>

                  }

                </div>
                <input type="file" id='profileImg' className='absolute hidden' accept='.jpg,.jpeg,.png,.svg,.gif' onChange={picUplod} />
              </label>

            </div>
            <div className="pt-12 relative">
              <h3 className='font-bold text-BtnColor text-[14px]'>Upload file</h3>
              <p className='text-[#545454] font-medium text-[14px]'>Make sure the file is below 2mb</p>


              <div className="h-10 w-10 bg-BgColor rounded-full absolute lg:top-20 top-16 -left-16 flex justify-center items-center">
                <Click className='' />
              </div>
            </div>
          </div>
        </div>

        {/* Current Organization */}
        <div className="mb-5 relative mt-6">
          <label htmlFor="country" className="block text-[#919EAB] font-normal text-[14px] mb-2 absolute left-2 -top-[10px] bg-white">
            Country
          </label>
          <input
            type="text"
            onChange={(e) => setcountry(e.target.value)}
            id="country"
            name='country'
            required
            placeholder="Ex: Abc Company"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-0"
          />
        </div>


        <div className="mb-5 relative mt-6">
          <label htmlFor="city" className="block text-[#919EAB] font-normal text-[14px] mb-2 absolute left-2 -top-[10px] bg-white">
            City
          </label>
          <input
            type="text"
            id="city"
            name='city'
            required
            placeholder="Ex: Abc Company"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-0"
            onChange={(e) => setcity(e.target.value)}
          />
        </div>

        {/* Industry */}
        <div className="relative">
          <label htmlFor="organization" className="block text-[#919EAB] font-normal text-[14px] mb-2 absolute left-3 top-[3px] bg-white">
            About Group
          </label>

          <textarea
            onChange={(e) => setabout(e.target.value)}
            required
            id="about"
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

export default CreateGroupStepOne