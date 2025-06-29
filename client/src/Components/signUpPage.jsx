"use client";
import React, { useState } from "react";
import Link from "next/link";
import Button from "@/Components/shared/button";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { quizStatus, singUpData } from "@/redux/dataSlice";
import { Eye, EyeOff } from "lucide-react";

export default function SignUpPage() {
  const router = useRouter();
  const [eye, seteye] = useState(true);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const signUpData = {};
    const formData = new FormData(e.target);
    formData.forEach((val, key) => {
      signUpData[key] = val;
    });
    dispatch(singUpData(signUpData));
    dispatch(quizStatus(true));

    router.push("/quiz");
  };

  return (
    <section className="bg-BgColor py-10 h-screen flex items-center justify-center">
      <div className="mx-auto w-[607px] h-[790px] max-sm:w-[90vw] max-sm:h-[160vw] bg-white shadow-sm rounded-[20px]">
        <div className="flex flex-col justify-center items-center">
          <div className="">
            <h3 className="font-medium text-[64px] text-primaryColor text-center max-sm:text-[8vw] max-sm:font-semibold pt-8">
              Sign Up
            </h3>
            <h4 className="font-semibold text-base text-primaryColor text-center">
              Connect with great local businesses
            </h4>
            <p className="font-normal text-[14px] text-primaryColor text-center w-[460px] max-sm:w-full max-sm:px-[5vw] py-4">
              By tapping Continue with Email, Phone number, Google, Apple or
              Facebook, or by continue as Guest, you agree  to
              <Link href={`/our-commitment`} className="text-BtnColor !font-medium text-center cursor-pointer mr-1">
                Terms & Conditions   
              </Link> 
                and 
           
              <Link href={`/our-commitment`} className="text-BtnColor text-center cursor-pointer !font-medium  ml-1">
              Privacy Policy.
              </Link> 
            </p>
          </div>
          <div className="max-sm:w-[75vw] max-sm:mx-auto">
          

            <h4 className="auth_title pt-5 text-center max-sm:pt-[3vw]">
              Or sign Up with
            </h4>
            <div className="auth-form pt-6 w-[484px] max-sm:pt-[5vw] max-sm:w-[75vw]">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-[20px] max-sm:gap-[3vw]"
              >
                <div className="flex gap-[20px]">
                  <div className="relative border rounded-md p-[14px] w-full h-[48px] max-sm:h-[11.5vw]">
                    <label htmlFor="first_name">
                      <p className="text-[12px] text-[#919EAB] absolute -top-[10px] left-[10px] bg-white">
                        First Name
                      </p>
                    </label>
                    <input
                      required
                      type="text"
                      name="first_name"
                      id="first_name"
                      className="w-full h-full border-none outline-none"
                    />
                  </div>

                  <div className="relative border rounded-md p-[14px] w-full h-[48px] max-sm:h-[11.5vw]">
                    <label htmlFor="last_name">
                      <p className="text-[12px] text-[#919EAB] absolute -top-[10px] left-[10px] bg-white">
                        last Name
                      </p>
                    </label>
                    <input
                      required
                      type="text"
                      name="last_name"
                      id="last_name"
                      className="w-full h-full border-none outline-none"
                    />
                  </div>
                </div>

                <div className="relative border rounded-md p-[14px] w-full min-h-[48px] max-sm:h-[11.5vw]">
                  <label htmlFor="email">
                    <p className="text-[12px] text-[#919EAB] absolute -top-[10px] left-[10px] bg-white">
                      Your email address
                    </p>
                  </label>
                  <input
                    required
                    type="email"
                    name="email"
                    id="email"
                    className="w-full h-full border-none outline-none"
                  />
                </div>

                <div className="relative border rounded-md p-[14px] w-full min-h-[48px] max-sm:h-[11.5vw]">
                  <label htmlFor="password">
                    <p className="text-[12px] text-[#919EAB] absolute -top-[10px] left-[10px] bg-white">
                      Your password
                    </p>
                  </label>
                  <input
                    type={!eye ? "text" : "password"}
                    required
                    name="password"
                    id="password"
                    className="w-full h-full border-none outline-none"
                  />
                  <Eye
                    onClick={() => seteye(true)}
                    className={`${
                      eye ? "hidden" : "block"
                    } absolute top-1/2 -translate-y-1/2 left-[93%] cursor-pointer opacity-55`}
                  />
                  <EyeOff
                    onClick={() => seteye(false)}
                    className={`${
                      eye ? "block" : "hidden"
                    } absolute top-1/2 -translate-y-1/2 left-[93%] cursor-pointer opacity-55`}
                  />
                </div>

                <Button>Sign Up</Button>
              </form>
            </div>
            <div className="pt-5 text-center">
              <p className="frm_cr">
                Already have an account?{" "}
                <Link
                  className="text-BtnColor font-semibold text-base"
                  href="/signin"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
