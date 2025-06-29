"use client";
import React, { useEffect, useState } from "react";
import Others from "@/assets/icons/others";
import { Female } from "./icons";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import useMe from "@/hooks/get-me";
import { useDispatch } from "react-redux";
import { getGender } from "@/redux/groupSlice";
import { HiArrowLeft } from "react-icons/hi2";



const UserProfileForm = ({ index, dec, inc }) => {

  const { loading, data, error, success, } = useMe();

  const gender = [
    {
      icon: <Others />,
      name: "Meal",
    },
    {
      icon: <Female />,
      name: "Femeal",
    },
    {
      icon: <Others />,
      name: "Other",
    },
  ]

  const [active, setactive] = useState(0)
  const [name, setname] = useState("")

  const dispatch = useDispatch();


  function decrement() {
    dec()
  }
  function increment() {
    inc()
  }

  useEffect(() => {
    if (success) {
      setname(`${data?.first_name} ${data?.last_name}`)
    }
  }, [success])



  return (
    <div className="">
      <div className="">
        {/* Header */}
        <h2 className="text-[20px] font-bold text-center text-primaryColor">Create user profile</h2>
        <p className="text-center font-medium text-base text-[#545454] mb-6">
          Enter your personal details
        </p>

        {/* Form part strat*/}
        <div>
          {/* Full Name */}
          <div className="mb-4 relative">
            <label htmlFor="fullName" className="block text-[#919EAB] font-normal text-[14px] mb-2 absolute left-2 -top-[10px] bg-white">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              defaultValue={name}
              disabled
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-0"
            />
          </div>

          {/* Gender */}
          <div className="mb-4 hidden sm:block">
            <label className="block text-primaryColor font-medium mb-2">Gender*</label>
            <div className="flex   gap-4">

              {
                gender.map((el, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setactive(idx), dispatch(getGender(el.name))
                    }}
                    className={`px-9 py-3  capitalize flex items-center gap-2 border rounded-lg text-sm font-medium text-primaryColor ${active == idx ? "border-BtnColor bg-MenuHColor" : "border-[#B8BFB2]"} border-dashed`}
                  >
                    {el.icon}
                    {el.name}
                  </button>
                ))
              }

            </div>
          </div>


          {/* responsive gender start */}
          <div className="  block sm:hidden py-5 mt-4">
            <Splide
              className=""
              options={{
                perPage: 2,
                perMove: 2,
                arrows: false,
                pagination: false,
                gap: 2,
              }}
              aria-label="My Favorite Images"
            >
              <SplideSlide >
                <div className="relative group">
                  <button
                    className='px-9 py-3 border rounded-lg text-sm font-medium text-primaryColor border-[#B8BFB2] hover:border-BtnColor hover:bg-MenuHColor  border-dashed'
                  >
                    Male
                  </button>
                  <Others className="absolute top-2 left-3" />
                </div>

              </SplideSlide>
              <SplideSlide >
                <div className="relative">
                  <button
                    className='px-9 py-3 border rounded-lg text-sm font-medium text-primaryColor border-[#B8BFB2] border-dashed hover:border-BtnColor hover:bg-MenuHColor '
                  >
                    Female
                  </button>
                  <Female className="absolute top-3 left-3" />
                </div>
              </SplideSlide>
              <SplideSlide >
                <div className="relative">
                  <button

                    className='px-9 py-3 border rounded-lg text-sm font-medium text-primaryColor border-[#B8BFB2] border-dashed hover:border-BtnColor hover:bg-MenuHColor '
                  >
                    Others
                  </button>
                  <Others className="absolute top-2 left-3" />
                </div>
              </SplideSlide>

            </Splide>
          </div>
          {/* responsive gender end */}

          {/* Current Organization */}
          <div className="mb-5 relative mt-6">
            <label htmlFor="organization" className="block text-[#919EAB] font-normal text-[14px] mb-2 absolute left-2 -top-[10px] bg-white">
              Current Organization/Institute*
            </label>
            <input
              type="text"
              id="organization"
              placeholder="Ex: Abc Company"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-0"
            />
          </div>

          {/* Industry */}
          <div className="mb-6 relative">
            <label htmlFor="industry" className="block text-[#919EAB] font-normal text-[14px] mb-2 absolute left-2 -top-[10px] bg-white">
              Industry
            </label>
            <input
              type="text"
              id="industry"
              placeholder="Ex: Product Design"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-0"
            />
          </div>

          {/* Buttons */}
          <div className={`lg:w-[531px] w-full flex justify-between items-center mt-5 ${index == 4 ? "hidden" : "block"}`}>
            <button
              onClick={decrement}
              className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300"
            >
              <HiArrowLeft />
            </button>
            <button
              onClick={increment}
              type="submit"
              className="px-6 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600"
            >
              Continue
            </button>
          </div>

        </div>
        {/* Form part end*/}
      </div>
    </div>
  );
};

export default UserProfileForm;
