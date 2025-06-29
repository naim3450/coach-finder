"use client";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/Components/ui/input-otp";
import Button from "@/Components/shared/button";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getOtp, otpStatusFunc } from "@/redux/dataSlice";
import { useRouter } from "next/navigation";

const OtpPage = () => {
  const [otpNum, setotpNum] = useState(false);
  const [alert, setalert] = useState(false);

  const { emailForFGP } = useSelector((state) => state.apiInfo)
  useEffect(() => {
    if (emailForFGP == false) {
      router.push('/signin')
    }
  }, [emailForFGP])

  const dispatch = useDispatch();
  const router = useRouter();

  const otpSubmit = async (e) => {
    e.preventDefault()
    if (!otpNum) {
      setalert("required all fild")
    } else {
      dispatch(getOtp(otpNum))
      dispatch(otpStatusFunc(false))
      router.push('/forgot-password/inbox')
    }
  };

  const onComplete = (otp) => {
    let otplenght = otp.split("")
    if (otplenght.length == 4) {
      setotpNum({ verificationCode: Number(otp) })
    } else {
      setotpNum(false)
    }
  };

  return (
    <section className="bg-BgColor h-screen flex items-center justify-center">
      <div className="container mx-auto w-[607px] h-[723px] max-sm:w-[90vw] max-sm:h-[140vw] flex flex-col items-center justify-center bg-white shadow-sm rounded-[20px]">
        <div className="">
          <h3 className="w-full mx-auto font-medium text-[64px] text-primaryColor text-center max-sm:text-[8vw] max-sm:font-semibold">
            Check Your Inbox
          </h3>
          <p className="text-center">
            We&apos;ve sent verification code to {emailForFGP.email}
          </p>
        </div>
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

          {alert && <p className="text-BtnColor text-center mt-5">{alert}</p>}
          <Button className="text-white w-full !mt-6">Reset Password</Button>
        </form>
      </div>
    </section>
  );
};

export default OtpPage;
