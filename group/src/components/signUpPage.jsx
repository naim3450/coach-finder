"use client";
import React, { useState } from "react";
import Link from "next/link";
import { GroupIcon } from "./icons";
import { ToastContainer, toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";
import Button from "./shared/botton";
import axiosInstance from "@/lib/axios.config";
import Loading from "./Loading";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { pageShowFunc, singUpData } from "@/redux/groupSlice";
import useMe from "@/hooks/get-me";

export default function SignUpPage() {
  const router = useRouter();
  const [eye, seteye] = useState(true);

  const { loading, data, success, error } = useMe();

  const dispatch = useDispatch();

  const passwordRegex = /^(?=.*[A-Z])(?=.*[@$!%*?&]).{8,}$/;

  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isLoading, setisLoading] = useState(false);

  const notify = (message) =>
    toast.error(message, {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const signUpDataForServer = {
      role: "contributor",
    };
    const formData = new FormData(e.target);

    formData.forEach((val, key) => {
      signUpDataForServer[key] = val;
    });

    // Invalid verification code
    setisLoading(true);
    if (passwordRegex.test(e.target.password.value)) {
      setIsPasswordValid(true);
      try {
        const res = await axiosInstance.post(
          "/users/register",
          signUpDataForServer
        );
        console.log(res);

        const data = await res.data;
        if (res.success) {
          setisLoading(false);
          dispatch(singUpData(signUpDataForServer));
          router.push("/signup-otp");
          dispatch(pageShowFunc(true));
        }
      } catch (error) {
        setisLoading(false);
        console.log(error);
        if (error.response.data.message == "User already exists") {
          notify(error.response.data.message);
        }
      }
    } else {
      setIsPasswordValid(false);
      setisLoading(false);
    }
  };

  if (data && !loading && success) {
    router.push("/dashboard");
    return;
  }
  else {
    return (
      <section className="bg-BgColor py-10 h-screen flex items-center justify-center">
        {isLoading && <Loading />}
        <div>
          <ToastContainer />
        </div>
        <div className="mx-auto w-[607px] py-20  max-sm:w-[90vw]  bg-white shadow-sm rounded-[20px]">
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
                Facebook, or by continue as Guest, you agree to{" "}
                <Link
                  href={"https://coachfinder.app/our-commitment"}
                  className="text-BtnColor text-center"
                >
                  Terms & Conditions
                </Link>{" "}
                and{" "}
                <Link
                  href={"https://coachfinder.app/our-commitment"}
                  className="text-BtnColor"
                >
                  Privacy Policy.
                </Link>{" "}
              </p>
            </div>

            <div className="max-sm:w-[75vw] max-sm:mx-auto">
              <h4 className="font-normal text-primaryColor text-base">
                Create account as
              </h4>
              <div className="flex md:gap-6 gap-3 ">
                <div className="relative group">
                  <button className="flex justify-center content-center gap-4 rounded-[8px] border  w-[140px] sm:w-[232px] py-3 lg:py-[9px] font-medium text-base bg-MenuHColor border-BtnColor text-BtnColor">
                    <GroupIcon className="  fill-BtnColor" />
                    Peer Group
                  </button>
                </div>
                <div className="relative  group">
                  <button className="flex justify-center content-center gap-4 rounded-[8px] border border-BorderColor w-[140px] sm:w-[232px] py-3 lg:py-[9px] text-[#919EAB] font-medium text-base">
                    <GroupIcon className="  " />
                    Coach
                  </button>
                </div>
              </div>

              <h4 className="auth_title pt-5 text-center max-sm:pt-[3vw]">
                Or sign Up with
              </h4>

              <div className="auth-form pt-6 w-[484px] max-sm:pt-[5vw] max-sm:w-[75vw]">
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-[20px] max-sm:gap-[3vw]"
                >
                  <div className="md:flex  gap-[20px]">
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

                    <div className="relative border rounded-md p-[14px] w-full h-[48px] max-sm:h-[11.5vw] max-md:mt-5">
                      <label htmlFor="last_name">
                        <p className="text-[12px] text-[#919EAB] absolute -top-[10px] left-[10px] bg-white ">
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
                    <label htmlFor="phone">
                      <p className="text-[12px] text-[#919EAB] absolute -top-[10px] left-[10px] bg-white">
                        Phone Number
                      </p>
                    </label>
                    <input
                      required
                      type="text"
                      name="phone"
                      id="phone"
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
                      onChange={() => setIsPasswordValid(true)}
                      id="password"
                      className="w-full h-full border-none outline-none"
                    />
                    <Eye
                      onClick={() => seteye(true)}
                      className={`${eye ? "hidden" : "block"
                        } absolute top-1/2 -translate-y-1/2 left-[93%] cursor-pointer opacity-55`}
                    />
                    <EyeOff
                      onClick={() => seteye(false)}
                      className={`${eye ? "block" : "hidden"
                        } absolute top-1/2 -translate-y-1/2 left-[93%] cursor-pointer opacity-55`}
                    />
                  </div>

                  {!isPasswordValid && (
                    <h3 className="text-BtnColor">
                      Password must be at least 8 characters long, include one
                      uppercase letter, and one special character
                    </h3>
                  )}

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
}
