"use client";
import React, { useState } from 'react'
import Button from './botton'
import Image from 'next/image'
import axiosInstance from '@/lib/axios.config';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import uploadImageToCloudinary from '@/utils/upload-images';

const PromotionalBanner = () => {
    const [promotional_banner, setpromotional_banner] = useState(null)
    const [promotional_bannerFile, setpromotional_bannerFile] = useState(null)

    const { userGroup } = useSelector((state) => state.groupInfo);

    const notify = (message) => toast.success(message, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

    const promotionUpload = (e) => {
        setpromotional_bannerFile(e.target.files[0])
        setpromotional_banner(URL.createObjectURL(e.target.files[0]))
    }

    const handlePromotion = async (e) => {
        e.preventDefault()
        const uploadImage = await uploadImageToCloudinary(promotional_bannerFile);
        if (uploadImage.success) {
            const res = await axiosInstance.patch(`/groups/${userGroup._id}`, { promotional_banner: uploadImage.data.urls[0] })
            console.log(res);
            if (res.success) {
                notify(res.message)
            }
        }
    }

    return (
        <div className="py-10  container rounded-[8px] bg-white drop-shadow-sm mt-4">
            <div>
                <ToastContainer />
            </div>
            <h3 className="text-[20px] font-semibold text-primaryColor mb-2">Add promotional banner</h3>
            <div className="">
                <h3 className='font-bold text-base text-primaryColor pb-3 mt-6'>Upload  cover photo</h3>
                <div className="flex gap-x-5">

                    <div className="bg-[#D9D9D9] w-[161px] h-[70px] rounded-[5px]">

                        <label htmlFor="coverImg">
                            <div className="w-full h-full relative">


                                {promotional_banner ?

                                    <Image
                                        src={promotional_banner}
                                        alt="description"
                                        objectFit='cover'
                                        layout="fill"
                                        className=' '
                                    />
                                    : false
                                }



                            </div>
                            <input type="file" id='coverImg' className='absolute hidden' accept='.jpg,.jpeg,.png,.svg,.gif' onChange={promotionUpload} />

                        </label>


                    </div>
                    <div className="relative pt-3">
                        <h3 className='font-bold text-BtnColor text-[14px]'>Upload file</h3>
                        <p className='text-[#545454] font-medium text-[14px]'>Make sure the file is below 10mb</p>
                    </div>
                </div>
            </div>


            <Button onClick={handlePromotion} className="!py-3 mt-4">
                Add banner
            </Button>
        </div>
    )
}

export default PromotionalBanner