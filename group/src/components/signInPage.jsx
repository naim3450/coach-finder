"use client";
import React, { useState } from "react";
import Link from "next/link";
import Button from "./shared/botton";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { useDispatch } from "react-redux";
import axiosInstance from "@/lib/axios.config";
import useMe from "@/hooks/get-me";
import { resetPage, resetPageShow } from "@/redux/groupSlice";

export default function SignInPage() {
  const [worngPass, setworngPass] = useState("");
  const [eye, seteye] = useState(true);

  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const sendLoginToServer = {};
    const formData = new FormData(e.target);
    formData.forEach((val, key) => {
      sendLoginToServer[key] = val;
    });

    try {
      const response = await axiosInstance.post(
        "/auth/login",
        sendLoginToServer
      );

      if (response?.success) {
        if (response?.data?.user?.role !== "contributor") {
          alert("you are not authorized");
          return;
        }
        document.cookie = `auth_token=${response?.data?.token}`;
        router.push("/");
      }
    } catch (error) {
      setworngPass(error.response.data.message);
      if (
        error.response.data.message.toLowerCase() ==
        "Wrong password".toLowerCase()
      ) {
        setworngPass("Wrong password");
      }
    }
  };

  const { loading, data, success, error } = useMe();

  if (data && !loading && success) {
    router.push("/dashboard");
  } else {
    return (
      <section className="lg:h-screen   flex items-center justify-center">
        <div className="mx-auto w-[607px] py-20  max-sm:w-[90vw] max-sm:h-[160vw] bg-white shadow-xl rounded-[20px]">
          <div className="flex flex-col justify-center items-center">
            <div className="">
              <h3
                className={`font-medium text-[64px] text-primaryColor text-center pt-12 max-sm:text-[8vw] max-sm:font-semibold ${worngPass ? "max-sm:pt-[8vw]" : "max-sm:pt-[4vw]"
                  }`}
              >
                Sign in
              </h3>
              <h4 className="font-semibold text-base text-primaryColor text-center">
                Connect with great local businesses
              </h4>
              <p className="font-normal text-[14px] text-primaryColor text-center w-[445px] max-sm:w-full max-sm:px-[5vw] py-4">
                By tapping Continue with Email, Phone number, Google, Apple or
                Facebook, or by continue as Guest, you agree{" "}
                <span className="text-BtnColor text-center">
                  to Terms & Conditions
                </span>{" "}
                and <span className="text-BtnColor">Privacy Policy.</span>{" "}
              </p>
            </div>

            <div className="max-sm:w-[75vw] max-sm:mx-auto">
              <div className="auth-form pt-10 max-sm:pt-[5vw] w-[484px] max-sm:w-[75vw]">
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-[20px] max-sm:gap-[3vw]"
                >
                  <div className="relative border rounded-md p-[14px] w-full min-h-[48px] max-sm:h-[8vw]">
                    <label htmlFor="email">
                      <p className="text-[12px] text-[#919EAB] absolute -top-[10px] left-[12px] bg-white">
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

                  <div className="">
                    <div className="relative border rounded-md p-[14px] w-full min-h-[48px] max-sm:h-[8vw]">
                      <label htmlFor="password">
                        <p className="text-[12px] text-[#919EAB] absolute -top-[10px] left-[12px] bg-white">
                          Your password
                        </p>
                      </label>
                      <input
                        onChange={() => setworngPass("")}
                        required
                        type={!eye ? "text" : "password"}
                        name="password"
                        id="password"
                        className="w-full h-full border-none outline-none"
                      />
                      <Eye
                        onClick={() => seteye(true)}
                        className={`${eye ? "hidden" : "block"
                          } absolute top-1/2 -translate-y-1/2 left-[93%] max-sm:left-[87%] cursor-pointer opacity-55`}
                      />
                      <EyeOff
                        onClick={() => seteye(false)}
                        className={`${eye ? "block" : "hidden"
                          } absolute top-1/2 -translate-y-1/2 left-[93%] max-sm:left-[87%] cursor-pointer opacity-55`}
                      />
                    </div>
                    {worngPass && (
                      <p className="text-red-600 mt-1">{worngPass}</p>
                    )}
                  </div>

                  <div className="w-full">
                    <Button className="w-full max-sm:!py-1">Sign In</Button>

                    {worngPass && (
                      <h3
                        onClick={() => {
                          dispatch(resetPageShow(true));
                          router.push("/forgot-password");
                        }}
                        className="text-[#045560] max-sm:text-[14px] font-semibold text-center pt-2 max-sm:pt-1 cursor-pointer"
                      >
                        Forget your password?
                      </h3>
                    )}
                  </div>
                </form>
              </div>
              <div
                className={`pt-6 max-sm:pt-[3vw] text-center ${worngPass ? "max-sm:pt-mt-3" : "max-sm:pt-[7vw]"
                  }`}
              >
                <p className="frm_cr">
                  Don&apos;t have an account?{" "}
                  <Link
                    className="text-BtnColor text-base font-semibold"
                    href="/signup"
                  >
                    Sign up
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
