"use client";

import React, { useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { HiArrowLeft } from 'react-icons/hi2';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import axiosInstance from '@/lib/axios.config';
import uploadImageToCloudinary from '@/utils/upload-images';

const CreateGroupStepFour = ({ index, dec, inc, advance }) => {


    const [swipe, setswipe] = useState(false);
    const [coverPic, setcoverPic] = useState(null)

    const reviewsStatus = () => {
        setswipe(!swipe);
    };

    const { gender, planObj1, planObj2, planObj3 } = useSelector((state) => state.groupInfo)

    const coverUpload = (e) => {
        if (e.target.files[0].size <= 10 * 1024 * 1024) {
            setcoverPic(URL.createObjectURL(e.target.files[0]))
        }
        else {
            alert("Max size of 10 MB")
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const obj = { review: swipe }
        const formData = new FormData(e.target);
        formData.forEach((val, key) => {
            obj[key] = val
        })

        const uploadImage = await uploadImageToCloudinary(planObj1.profile_picture);
        const uploadCoverImave = await uploadImageToCloudinary(planObj1.cover_picture);


        const marge = Object.assign({}, { gender }, planObj1, planObj2, obj)

        marge.pricing = Number(marge.pricing);

        if (uploadImage.success) {
            marge.profile_picture = uploadImage.data.urls[0];
        }

        if (uploadCoverImave.success) {
            marge.cover_picture = uploadCoverImave.data.urls[0];
        }

        const res = await axiosInstance.post('/groups', [marge])

        if (res.success) {
            inc()
        }
    }

    function decrement(params) {
        dec()
    }

    return (
        <div className="">
            <form onSubmit={handleSubmit}>
                <div className="">
                    {/* Header */}
                    <h2 className="text-[20px] font-bold text-center text-primaryColor">Create user profile</h2>
                    <p className="text-center font-medium text-base text-[#545454] mb-6">Enter your personal details</p>

                    {/* Form */}
                    <div>
                        {/* Meeting Format */}
                        <div className="mb-4 relative">
                            <label htmlFor="meeting_format" className="block text-[#919EAB] font-normal text-[14px] mb-2 absolute left-2 -top-[10px] bg-white">
                                Meeting Format
                            </label>
                            <Select name='meeting_format' defaultValue='In person'>
                                <SelectTrigger className="lg:w-[541px] w-full h-[56px]">
                                    <SelectValue placeholder="In person" />
                                </SelectTrigger>
                                <SelectContent className=" ">
                                    <SelectItem className=" " value="In person">In person</SelectItem>
                                    <SelectItem value="Virtual">Virtual</SelectItem>
                                    <SelectItem value="Hybrid">Hybrid</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>


                        {/* Pricing */}
                        <div className="mb-5 relative mt-6">
                            <label htmlFor="pricing" className="block text-[#919EAB] font-normal text-[14px] mb-2 absolute left-2 -top-[10px] bg-white">
                                Pricing
                            </label>
                            <input
                                type="text"
                                id="pricing"
                                required
                                name='pricing'
                                placeholder="/hr"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-0 h-[56px]"
                            />
                        </div>

                        {/* Registration */}
                        <div className="mb-6 relative">
                            <label htmlFor="registration_link" className="block text-[#919EAB] font-normal text-[14px] mb-2 absolute left-2 -top-[10px] bg-white">
                                Registration Link
                            </label>
                            <input
                                type="text"
                                required
                                id="registration_link"
                                name='registration_link'
                                placeholder=" "
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-0 h-[56px]"
                            />
                        </div>


                        {/* cover upload start */}
                        {/* <div className="">
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
                        </div> */}
                        {/* cover upload end */}

                        <div className="flex gap-2 mt-6">
                            <div
                                onClick={reviewsStatus}
                                className={`h-[20px] w-9  rounded-2xl relative before:h-4 before:w-4 before:rounded-full before:bg-white before:absolute before:top-1/2 before:-translate-y-1/2 ${swipe
                                    ? "before:right-[2px] before:duration-300 bg-blue-600"
                                    : "before:left-[2px] before:duration-300 bg-gray-400"
                                    }`}
                            ></div>
                            <h3 className="font-semibold text-[12px] text-primaryColor">
                                Enable reviews
                            </h3>
                        </div>

                    </div>
                </div>

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

export default CreateGroupStepFour