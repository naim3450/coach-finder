"use client"
import React, { useState } from 'react'
import UserTabTitle from './userTabTitle'
import { Camera } from '../icons'
import Image from 'next/image'
import Button from '@/Components/shared/button'
import useMe from '@/hooks/get-me'
import axiosInstance from '@/lib/axios.config'
import { data } from 'autoprefixer'
import uploadImageToCloudinary from '@/utils/upload-images'
import Loading from '@/Components/shared/loading'

const Profile = () => {
    const [pictureUrl, setpictureUrl] = useState(null)
    const [loading, setloading] = useState(false);
    const [prUserUpdate, setprUserUpdate] = useState(false);

    const picUplod = (e) => {
        console.log(e.target.files[0].size <= 3.1 * 1024 * 1024);

        if (e.target.files[0].size <= 3.1 * 1024 * 1024) {
            setpictureUrl(URL.createObjectURL(e.target.files[0]))
        }
        else {
            alert("Max size of 3.1 MB")
        }
    }

    const aboutUser = useMe();


    function getFileExtension(path) {
        // Match the extension after the last period (.)
        const extension = path?.split('.')?.pop()?.toLowerCase();

        // Return the extension if it exists, otherwise return null
        return extension ? extension : null;
    }


    const imageFile = new File([aboutUser?.data?.profile_picture], getFileExtension(aboutUser?.data?.profile_picture));


    const handleSubmit = async (e) => {
        e.preventDefault()
        setloading(true)

        const sendToServerUpinfo = {}

        // const sendToServerUpinfo = {
        //     first_name: aboutUser?.data?.first_name,
        //     last_name: aboutUser?.data?.last_name,
        //     profile_picture: aboutUser?.data?.profile_picture,
        //     phone: aboutUser?.data?.phone,
        // }

        const formData = new FormData(e.target)
        formData.forEach((val, key) => {
            sendToServerUpinfo[key] = val
        })

        const uploadImage = await uploadImageToCloudinary(sendToServerUpinfo?.profile_picture);

        if (uploadImage.success) {
            sendToServerUpinfo.profile_picture = uploadImage?.data.urls[0];
        }

        try {
            const res = await axiosInstance.put('/users/update', sendToServerUpinfo)
            console.log(res);
        } catch (error) {
        }
        finally {
            setloading(false)
        }

    }


    return (
        <div className='lg:pt-[56px] pt-5 lg:px-[56px] px-1'>
            {loading && <Loading />}
            <UserTabTitle text={"Profile Info"} />
            <form onSubmit={handleSubmit} className='mt-8'>
                <div className="border-2 border-[#01C8FC] xl:w-[144px] xl:h-[144px] w-[100px] h-[100px] border-dashed rounded-full p-2 overflow-hidden">
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
                                        <Camera className="!h-7 !w-7 mt-[30px]" />
                                        <h3 className='text-[#919EAB] text-center lg:mt-2  text-base'>Upload photo</h3>
                                    </div>
                            }
                        </div>

                        <input type="file" id='profileImg' name='profile_picture' className='absolute hidden' accept='.jpg,.jpeg,.png,.svg,.gif' onChange={picUplod} />
                    </label>
                </div>


                <div className="lg:flex justify-between gap-4 mt-8">

                    <div className={`relative border rounded-lg p-[14px] lg:w-[330px] sm:w-[65vw] max-sm:w-[65vw] h-[56px]`}>
                        <p className='text-[12px] text-[#919EAB] absolute -top-[10px] bg-white z-10'>
                            First Name
                        </p>
                        <input defaultValue={aboutUser?.data?.first_name} type="text" name='first_name' className='h-full w-full absolute top-0 left-0 outline-none p-[14px] rounded-lg' />
                    </div>

                    <div className={`relative border rounded-lg p-[14px] lg:w-[330px] sm:w-[65vw] max-sm:w-[65vw] h-[56px] max-lg:mt-4`}>
                        <p className='text-[12px] text-[#919EAB] absolute -top-[10px]  bg-white z-10'>
                            Last Name
                        </p>
                        <input defaultValue={aboutUser?.data?.last_name} type="text" name='last_name' className='h-full w-full absolute top-0 left-0 outline-none p-[14px] rounded-lg' />
                    </div>

                </div>

                <div className={`relative border rounded-lg p-[14px] w-full h-[56px] mt-6`}>
                    <p className='text-[12px] text-[#919EAB] absolute -top-[10px] bg-white z-10'>
                        Phone Number
                    </p>
                    <input defaultValue={aboutUser?.data?.phone} type="text" name='phone' className='h-full w-full absolute top-0 left-0 outline-none p-[14px] rounded-lg' />
                </div>

                <div className="flex justify-end mt-6">
                    <Button type="submit" className='!rounded-md !px-8 !py-4'>
                        Save Changes
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default Profile