"use client";
import React, { useEffect, useState } from "react";
import Button from "@/Components/shared/button";
import { useSelector } from "react-redux";
import axiosInstance from "@/lib/axios.config";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";


export default function ResetPassPage() {

    const [otpStatus, setotpStatus] = useState(false);
    const [eye, seteye] = useState(true);
    const [eye2, seteye2] = useState(true);
    const { tOtpForFGP, emailForFGP, otpStatusValid } = useSelector((state) => state.apiInfo);
    const router = useRouter();
    const [matchPass, setmatchPass] = useState(otpStatusValid);

    const handleSubmit = async (e) => {
        e.preventDefault()
        const newPass = {};
        const formData = new FormData(e.target)
        formData.forEach((val, key) => {
            newPass[key] = val
        });

        if (newPass.newPassword.toLowerCase() == newPass.ConfirmNewPassword.toLowerCase()) {
            setmatchPass(false)
            const chiefObj = Object.assign({}, emailForFGP, tOtpForFGP, { newPassword: newPass.ConfirmNewPassword })
            try {
                const response = await axiosInstance.patch('/auth/reset-password', chiefObj);
                if (response?.success) {
                    router.push('/signin')
                }
            }
            catch (error) {
                if (error.response.data.success == false && error.response.data.message === 'Invalid verification code') {
                    setotpStatus(true)
                }
            }
        }
        else {
            setmatchPass(true)
        }
    };

    useEffect(() => {
        if (tOtpForFGP == false) {
            router.push('/signin')
        }
    }, [tOtpForFGP])

    return (
        <section className="bg-BgColor flex items-center justify-center h-screen">
            <div className="container mx-auto w-[676px] max-sm:w-[90vw] max-sm:h-[140vw] flex items-center justify-center py-32 bg-white shadow-sm rounded-[20px]">
                <div className="flex flex-col justify-center items-center">
                    <div className="">
                        <h3 className="font-medium text-[64px] text-primaryColor text-center pt-8 max-sm:text-[8vw] max-sm:font-semibold">
                            Reset Password
                        </h3>

                    </div>
                    <div className="w-[550px] mx-auto max-sm:w-[80vw]">

                        <div className="auth-form pt-6">
                            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                                <div className="w-full">
                                    <div className="relative border rounded-md p-[14px] w-full min-h-[48px] max-sm:h-[8vw]">
                                        <label htmlFor="newPassword">
                                            <p className='text-[12px] text-[#919EAB] absolute -top-[10px] left-[12px] bg-white'>
                                                New password
                                            </p>
                                        </label>
                                        <input onChange={() => setmatchPass('')} required type={!eye ? "text" : "password"} name="newPassword" id="newPassword" className="w-full h-full border-none outline-none" />
                                        <Eye onClick={() => seteye(true)} className={`${eye ? "hidden" : "block"} absolute top-1/2 -translate-y-1/2 left-[93%] max-sm:left-[87%] cursor-pointer opacity-55`} />
                                        <EyeOff onClick={() => seteye(false)} className={`${eye ? "block" : "hidden"} absolute top-1/2 -translate-y-1/2 left-[93%] max-sm:left-[87%] cursor-pointer opacity-55`} />
                                    </div>
                                </div>

                                <div className="w-full">
                                    <div className="relative border rounded-md p-[14px] w-full min-h-[48px] max-sm:h-[8vw]">
                                        <label htmlFor="ConfirmNewPassword">
                                            <p className='text-[12px] text-[#919EAB] absolute -top-[10px] left-[12px] bg-white'>
                                                Confirm New Password
                                            </p>
                                        </label>
                                        <input onChange={() => setmatchPass('')} required type={!eye2 ? "text" : "password"} name="ConfirmNewPassword" id="ConfirmNewPassword" className="w-full h-full border-none outline-none" />
                                        <Eye onClick={() => seteye2(true)} className={`${eye2 ? "hidden" : "block"} absolute top-1/2 -translate-y-1/2 left-[93%] max-sm:left-[87%] cursor-pointer opacity-55`} />
                                        <EyeOff onClick={() => seteye2(false)} className={`${eye2 ? "block" : "hidden"} absolute top-1/2 -translate-y-1/2 left-[93%] max-sm:left-[87%] cursor-pointer opacity-55`} />
                                    </div>
                                    {matchPass && <p className="text-BtnColor mt-2">password doesn&apos;t match</p>}
                                    {otpStatus && <p className="text-BtnColor mt-2">Invalid verification code</p>}
                                </div>

                                <div className="w-full h-[48px]">
                                    <Button className="w-full h-full max-sm:!py-1">Reset Password</Button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
