import React, { useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import Button from './botton'
import axiosInstance from '@/lib/axios.config'
import { ToastContainer, toast } from 'react-toastify';
import { Eye, EyeOff } from 'lucide-react'

const ChangePassword = () => {
    const [match, setmatch] = useState(false)
    const [eye, seteye] = useState(true)
    const [eye2, seteye2] = useState(true)
    const [eye3, seteye3] = useState(true)

    const notify = (message) => toast.success(message, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

    const handelChange = async (e) => {
        e.preventDefault()
        const formChangePass = {}
        const formData = new FormData(e.target);
        formData.forEach((val, key) => {
            formChangePass[key] = val
        })

        if (formChangePass.newPassword == formChangePass.confirmNewPassword) {
            const res = await axiosInstance.patch(`/auth/change-password`, { oldPassword: formChangePass.oldPassword, newPassword: formChangePass.confirmNewPassword })
            if (res.success) {
                notify(res.message)
            }
        } else {
            setmatch(true)
        }
    }

    return (
        <form onSubmit={handelChange} className="h-[434px] py-10 container rounded-[8px] bg-white drop-shadow-sm mt-4 p-6">
            <div>
                <ToastContainer />
            </div>
            <h3 className='text-[24px] font-semibold text-primaryColor'>Change Password</h3>
            <div className="relative mt-5">
                <Label htmlFor="oldPassword" className="absolute -top-[7px] left-3 bg-white font-normal text-[14px] text-[#919EAB]">Old Password</Label>
                <Input
                    id="oldPassword"
                    className="h-[50px] focus-visible:ring-0"
                    type={eye ? "password" : "text"}
                    placeholder="*******"
                    name="oldPassword"

                />
                <Eye onClick={() => seteye(true)} className={`${eye ? "hidden" : "block"} absolute top-1/2 -translate-y-1/2 left-[96%] max-sm:left-[87%] cursor-pointer opacity-55`} />
                <EyeOff onClick={() => seteye(false)} className={`${eye ? "block" : "hidden"} absolute top-1/2 -translate-y-1/2 left-[96%] max-sm:left-[87%] cursor-pointer opacity-55`} />
            </div>

            <div className="relative mt-5">
                <Label htmlFor="newPassword" className="absolute -top-[7px] left-3 bg-white font-normal text-[14px] text-[#919EAB]">New Password</Label>
                <Input
                    onChange={() => setmatch(false)}
                    id="newPassword"
                    name="newPassword"
                    className="h-[50px] focus-visible:ring-0"
                    type={eye2 ? "password" : "text"}
                    placeholder="*******"

                />
                <Eye onClick={() => seteye2(true)} className={`${eye2 ? "hidden" : "block"} absolute top-1/2 -translate-y-1/2 left-[96%] max-sm:left-[87%] cursor-pointer opacity-55`} />
                <EyeOff onClick={() => seteye2(false)} className={`${eye2 ? "block" : "hidden"} absolute top-1/2 -translate-y-1/2 left-[96%] max-sm:left-[87%] cursor-pointer opacity-55`} />
            </div>

            <div className="relative mt-5">
                <Label htmlFor="confirmNewPassword" className="absolute -top-[7px] left-3 bg-white font-normal text-[14px] text-[#919EAB]">Confirm New Password</Label>
                <Input
                    onChange={() => setmatch(false)}
                    name="confirmNewPassword"
                    id="confirmNewPassword"
                    className="h-[50px] focus-visible:ring-0"
                    type={eye3 ? "password" : "text"}
                    placeholder="*******"
                />
                <Eye onClick={() => seteye3(true)} className={`${eye3 ? "hidden" : "block"} absolute top-1/2 -translate-y-1/2 left-[96%] max-sm:left-[87%] cursor-pointer opacity-55`} />
                <EyeOff onClick={() => seteye3(false)} className={`${eye3 ? "block" : "hidden"} absolute top-1/2 -translate-y-1/2 left-[96%] max-sm:left-[87%] cursor-pointer opacity-55`} />
            </div>

            {match && <p className='text-BtnColor mt-2'>password doesn't match</p>}

            <Button type="submit" className='mt-4 !py-3'>Save Change</Button>
        </form>
    )
}

export default ChangePassword