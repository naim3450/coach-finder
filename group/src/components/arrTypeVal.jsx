"use client";


import { useState } from 'react';
import { HiArrowLeft } from 'react-icons/hi2';
import { useDispatch } from 'react-redux';
import ArryVal from './arryVal';
import { getplanObj2 } from '@/redux/groupSlice';



const ArrTypeVal = ({ index, dec, inc }) => {

  const [active, setactive] = useState(null)
  const groupIndustry = [
    "Finance",
    "Healthcare",
    "Consumer Goods",
    "Manufacturing",
    "Real Estate",
    "Education",
    "Media",
  ];
  const primaryGoals = [
    "Networking",
    "Scaling my business",
    "Personal development",
    "Leadership insights",
    "Accountability",
    "Problem-solving",
    "Exploring new markets",
    "Mentorship",
  ];
  const focusArea = [
    "Integrity",
    "Innovation",
    "Collaboration",
    "Growth mindset",
    "Accountability",
    "Transparency",
    "Inclusivity",
  ];
  const keyTopics = [
    "Scaling the business",
    "Managing teams",
    "Fundraising",
    "Market competition",
    "Personal development",
    "Operations efficiency",
    "Sales and marketing",
    "Innovation and product development",
  ];

  const dispatch = useDispatch()

  const [industry, setindustry] = useState([])
  const [goals, setgoals] = useState([])
  const [focus_area, setfocus_area] = useState([])
  const [key_topics, setkey_topics] = useState([])

  function decrement(params) {
    dec()
  }

  function increment(params) {
    inc()
    const obj = { industry, goals, focus_area, key_topics };
    dispatch(getplanObj2(obj))
  }

  return (
    <div className="">
      {/* Header */}
      <h2 className="text-[20px] font-bold text-center text-primaryColor">Create Your Group</h2>
      <p className="text-center font-medium text-base text-[#545454] mb-6">Enter your Group details</p>
      <div className="flex flex-col gap-6">

        <ArryVal index={1} val={groupIndustry} stType={"Industry"} active={active} setactive={setactive}
          giveToParent={setindustry} />
        <ArryVal index={2} val={primaryGoals} stType={"Primary  Goals"} active={active} setactive={setactive}
          giveToParent={setgoals} />
        <ArryVal index={3} val={focusArea} stType={"Focus Area"} active={active} setactive={setactive}
          giveToParent={setfocus_area} />
        <ArryVal index={4} val={keyTopics} stType={"Key Topics"} active={active} setactive={setactive}
          giveToParent={setkey_topics} />
      </div>

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
  )
}

export default ArrTypeVal