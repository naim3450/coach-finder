"use client";
import Button from "@/Components/shared/button";
import axiosInstance from "@/lib/axios.config";
import { getEmail } from "@/redux/dataSlice";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";



export default function ResetPage() {

  const router = useRouter()
  const dispatch = useDispatch()

  const { forgetStatus } = useSelector((state) => state.apiInfo)
  useEffect(() => {
    if (forgetStatus == false) {
      router.push('/signin')
    }
  }, [forgetStatus])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const sendResetEmail = {}
    const formData = new FormData(e.target)

    formData.forEach((val, key) => {
      sendResetEmail[key] = val
    });

    try {
      const res = await axiosInstance.post('/auth/forgot-password', sendResetEmail)
      if (res?.success) {
        dispatch(getEmail(sendResetEmail))
        router.push('/forgot-password/verification-code')
      }
    } catch (error) {
      console.log(error);
    }

  }


  return (
    <section className="bg-BgColor h-screen flex items-center justify-center">
      <div className="container mx-auto w-[600px] h-[723px] max-sm:w-[90vw] max-sm:h-[140vw] flex flex-col items-center justify-center bg-white shadow-sm rounded-[20px] p-10">
        <div className="">
          <h3 className="font-medium  text-[64px] text-primaryColor text-center pt-40 max-sm:text-[8vw] max-sm:font-semibold">
            Reset Password
          </h3>
        </div>
        <div className="w-full mx-auto mt-3">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4">

              {/* auth/forgot-password */}
              <div className="relative border rounded-md p-[14px] w-full min-h-[48px] max-sm:h-[8vw]">
                <label htmlFor="email">
                  <p className='text-[12px] text-[#919EAB] absolute -top-[10px] left-[12px] bg-white'>
                    Your email address
                  </p>
                </label>
                <input required type="email" name="email" id="email" className="w-full h-full border-none outline-none" />
              </div>

              <Button className="text-white w-full !mt-6">
                Reset Password
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
