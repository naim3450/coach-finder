"use client"
import React, { useState } from 'react'
import UserTabTitle from './userTabTitle'
import Button from '@/Components/shared/button'
import { IoEye, IoEyeOff } from 'react-icons/io5'
import axiosInstance from '@/lib/axios.config'



const ChangePass = () => { 
    const [eye, seteye] = useState(false)
    const [eye2, seteye2] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const sendToServerUpinfo = {}
        const formData = new FormData(e.target)
        formData.forEach((val, key) => {
            sendToServerUpinfo[key] = val
        })
        const res = await axiosInstance.patch('/users/update', sendToServerUpinfo)
        console.log(res);

    }

    return (
        <div className='pt-[56px] lg:px-[56px] px-2 lg:w-[748px] w-full'>
            <UserTabTitle text={"Change Password"} />

            <form onSubmit={handleSubmit} className='mt-8'>

                <div className={`relative border-2 rounded-lg p-[14px] xl:w-full max:lg:w-[65vw] sm:w-[65vw] max-sm:w-[65vw] h-[56px] mt-6`}>
                    <input name='oldPassword' type={eye ? "text" : "password"} placeholder='New Password' className='h-full w-full absolute top-0 left-0 outline-none p-[14px] rounded-lg' />
                    <IoEyeOff onClick={() => seteye(true)} className={`absolute top-1/2 text-[20px] -translate-y-1/2 left-[93%] cursor-pointer opacity-55 ${eye ? "hidden" : "block"}`} />
                    <IoEye onClick={() => seteye(false)} className={`absolute top-1/2 text-[20px] -translate-y-1/2 left-[93%] cursor-pointer opacity-55 ${eye ? "block" : "hidden"}`} />
                </div>

                <div className={`relative border-2 rounded-lg p-[14px] w-full h-[56px] mt-6`}>
                    <input name='newPassword' type={eye2 ? "text" : "password"} placeholder='Confirm New Password' className='h-full w-full absolute top-0 left-0 outline-none p-[14px] rounded-lg' />
                    <IoEyeOff onClick={() => seteye2(true)} className={`absolute top-1/2 text-[20px] -translate-y-1/2 left-[93%] cursor-pointer opacity-55 ${eye2 ? "hidden" : "block"}`} />
                    <IoEye onClick={() => seteye2(false)} className={`absolute top-1/2 text-[20px] -translate-y-1/2 left-[93%] cursor-pointer opacity-55 ${eye2 ? "block" : "hidden"}`} />
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

export default ChangePass