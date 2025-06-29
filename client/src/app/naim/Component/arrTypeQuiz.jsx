"use client"
import React, { useEffect, useState } from 'react'
import { Cross, Drop } from '../icons'
import { useDispatch } from 'react-redux'
import { margeObject } from '@/redux/dataSlice'

const ArrTypeQuiz = ({ stType, op, active, setactive, index, qs }) => {
    const [checkArr, setcheckArr] = useState([0])
    const [checkVal, setcheckVal] = useState([op[0].toLowerCase()])

    const handleMainBox = () => {
        active == index ? setactive(null) : setactive(index)
    }


    const handelCheck = (idx, option) => {
        if (checkArr.includes(idx)) {
            setcheckArr(checkArr.filter(item => item !== idx))
        } else {
            setcheckArr([...checkArr, idx])
        }
        if (checkVal.includes(option.toLowerCase())) {
            return setcheckVal(checkVal.filter(item => item !== option.toLowerCase()))
        } else {
            setcheckVal([...checkVal, option.toLowerCase()])
        }
        active == index ? setactive(null) : setactive(index)
    }

    function handleCross(event, option) {
        event.preventDefault()
        event.stopPropagation();
        if (option.toLowerCase() == op[0].toLowerCase()) {
            setcheckArr(checkArr.filter(item => item !== 0))
        }
        if (checkVal.includes(option.toLowerCase())) {
            setcheckVal(checkVal.filter(item => item !== option.toLowerCase()))
        }


    }

    let dispatch = useDispatch()

    useEffect(() => {
        if (checkVal.length > 0) {
            dispatch(margeObject({ question: qs, answer: checkVal }))
        }
    }, [checkVal])

    return (
        <div className="relative">
            <div onClick={handleMainBox} className="relative border rounded-md p-[14px] w-full min-h-[56px]">
                <p className='text-[12px] text-[#919EAB] absolute -top-[10px] bg-white'>
                    {stType}
                </p>

                <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-3 w-full h-full text-primaryColor text-sm">
                        {
                            checkVal?.map((el, idx) => (
                                <div key={idx} className='flex gap-1 px-3 items-center py-2 rounded-[50px] bg-[#F4F4F4]'>{el.charAt(0).toUpperCase() + el.slice(1)} <button onClick={(event) => handleCross(event, el)}><Cross /></button></div>
                            ))
                        }
                    </div>
                    <Drop />
                </div>
            </div>

            <div className={`bg-white rounded-md shadow-md w-full px-4 py-3 absolute top-[110%] z-10 left-0 flex flex-col gap-4 ${active == index ? "block" : "hidden"}`}>
                {
                    op.map((option, idx) => {
                        return (
                            <div key={idx} onClick={() => handelCheck(idx, option)} className="flex items-center gap-4 bg-white hover:bg-[#F4F4F4]">
                                <div className={`w-5 h-5 border-2 rounded-[4px] cursor-pointer relative ${checkArr.includes(idx) ? "bg-BtnColor" : "border-gray-500"} `}>
                                    <svg className={`w-full h-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white ${checkArr.includes(idx) ? "block" : "hidden"}`} fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                </div>

                                <h3 className='text-base text-SecondaryColor'>{option.charAt(0).toUpperCase() + option.slice(1)}</h3>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ArrTypeQuiz