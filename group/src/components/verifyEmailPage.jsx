"use client";
import { useState } from "react";
import Button from "./shared/botton";
import { HiArrowLeft } from "react-icons/hi2";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "@/lib/axios.config";
import Link from "next/link";
import { useEffect } from "react";
import { pageShowFunc2 } from "@/redux/groupSlice";

const VerifyEmailPage = () => {
  const [timer, setTimer] = useState(30);
  const [otpCode, setotpCode] = useState(false);
  const [inValidCode, setinValidCode] = useState(false);
  const [alert, setalert] = useState(false);
  const [resend, setresend] = useState(false);


  const router = useRouter()
  const { createAccount, tOtpForFGP } = useSelector((state) => state.groupInfo)

  if (!tOtpForFGP) {
    router.push('/signup')
    return;
  }

  // Simulate countdown timer
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
    if (timer == 0) {
      setresend(true)
    }
  }, [timer]);


  const dispatch = useDispatch()

  const onComplete = (otp) => {
    let otplenght = otp.split("")
    if (otplenght.length == 4) {
      setotpCode(Number(otp))
    } else {
      setotpCode(false)
    }
  };


  async function patchverify() {
    try {
      const res = await axiosInstance.patch('/auth/verify', { email: createAccount.email, verificationCode: otpCode })
      if (res.success) {
        const logRes = await axiosInstance.post('/auth/login',
          { email: createAccount.email, password: createAccount.password })

        if (logRes.success) {
          document.cookie = `auth_token=${logRes?.data?.token}`
          dispatch(pageShowFunc2(true))
          router.push('/verify-email')
        }
      }
    } catch (error) {
      if (error.response.data.message == "Invalid verification code") {
        setinValidCode(error.response.data.message)
      }
    }
    // Invalid verification code
  }

  const otpSubmit = async (e) => {
    e.preventDefault()
    if (!otpCode) {
      setalert("required all fild")
    } else {
      patchverify()
    }
  };

  const handleResend = () => {
    setTimer(30);
    setresend(false);
    console.log("resend code");

  }


  return (
    <div className="bg-BgColor py-10">
      <div className="container h-[723px] w-[607px] bg-white p-8 rounded-[20px] shadow-lg mt-10">
        {/* Header */}
        <h3 className="font-medium text-primaryColor text-[64px] text-center pt-20 w-[484px] mx-auto leading-snug">
          Please verify your email
        </h3>
        <p className="text-center text-gray-500 mt-2">
          We've sent a verification code to{" "}
          <span className="font-medium text-primaryColor">{createAccount.email}</span>
        </p>

        {/* Verification Input */}
        <form onSubmit={otpSubmit}>
          <div className="flex justify-center mt-5">
            <InputOTP onComplete={onComplete} maxLength={4} className=" ">
              <InputOTPGroup>
                <InputOTPSlot required index={0} className="p-7" />
              </InputOTPGroup>
              <InputOTPGroup>
                <InputOTPSlot required index={1} className="p-7" />
              </InputOTPGroup>
              <InputOTPGroup>
                <InputOTPSlot required index={2} className="p-7" />
              </InputOTPGroup>
              <InputOTPGroup>
                <InputOTPSlot required index={3} className="p-7" />
              </InputOTPGroup>
            </InputOTP>
          </div>
        </form>


        {/* Resend and Timer */}
        {
          alert ?
            <h3 className="text-BtnColor font-medium">{alert}</h3>
            :
            inValidCode ?
              <h3 className="text-BtnColor font-medium">{inValidCode}</h3>
              :

              <div className={`flex items-center  mt-6 text-sm text-gray-500 ${resend ? "justify-between" : "justify-end"}`}>
                {
                  resend &&

                  <span className="font-normal text-[14px] text-[#777777]">
                    Didn't receive a code?{" "}
                    <button
                      className="font-semibold text-primaryColor text-[14px]"
                      disabled={timer > 0}
                      onClick={handleResend}
                    >
                      Resend Code
                    </button>
                  </span>
                }
                <span className="text-gray-400">(00:{timer.toString().padStart(2, "0")})</span>
              </div>
        }


        {/* Buttons */}
        <div className="flex items-center justify-between mt-6">
          <Link href={'/signup'}>
            <button className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300">
              <HiArrowLeft />
            </button>
          </Link>


          <Button onClick={otpSubmit} className="!py-4">
            Verify Email
          </Button>
        </div>

      </div>
    </div>
  );
};

export default VerifyEmailPage;
