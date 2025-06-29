"use client"
import { margeObject } from '@/redux/dataSlice'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Drop } from '../icons'

const StrTypeQuiz = ({ stType, op, active, setactive, index, qs, }) => {
    const [checkVal, setcheckVal] = useState(op[0])

    const handleMainBox = () => {
        active == index ? setactive(null) : setactive(index)
    }

    const handelCheck = (e) => {
        setcheckVal(e.target.innerHTML)
        active == index ? setactive(null) : setactive(index)
    }

    const dispatch = useDispatch()

    useEffect(() => {
        if (checkVal !== "") {
            dispatch(margeObject({ question: qs, answer: checkVal }))
        }
    }, [checkVal])

    return (
        <div className="relative">
            <div onClick={handleMainBox} className="relative border rounded-md p-[14px] w-full min-h-[56px]">
                <p className='text-[12px] text-[#919EAB] absolute -top-[10px] bg-white'>
                    {stType}
                </p>

                <div className="flex flex-wrap gap-5 w-full h-full font-medium text-primaryColor text-sm">
                    <div className='flex items-center justify-between w-full'>{checkVal.charAt(0).toUpperCase() + checkVal.slice(1)} <Drop />
                    </div>
                </div>
            </div>

            <div className={`bg-white rounded-md shadow-md w-full px-4 py-3 absolute top-[110%] z-10 left-0 flex flex-col gap-4 ${active == index ? "block" : "hidden"}`}>
                {
                    op.map((option, idx) => {
                        return (
                            <div key={idx} onClick={(e) => handelCheck(e)} className="text-base text-SecondaryColor bg-white hover:bg-[#F4F4F4]" >
                                {option.charAt(0).toUpperCase() + option.slice(1)}
                            </div>
                        )
                    })
                }
            </div>
        </div >
    )
}

export default StrTypeQuiz