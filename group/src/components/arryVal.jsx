"use client";

import { Cross } from '@/assets/icons/cross';
import { Drop } from '@/assets/icons/drop';
import React, { useEffect, useState } from 'react'

const ArryVal = ({ val, stType, active, setactive, index, className, giveToParent }) => {


    const [checkArr, setcheckArr] = useState([0])
    const [checkVal, setcheckVal] = useState([val[0].toLowerCase()])

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
        if (option.toLowerCase() == val[0].toLowerCase()) {
            setcheckArr(checkArr.filter(item => item !== 0))
        }
        if (checkVal.includes(option.toLowerCase())) {
            setcheckVal(checkVal.filter(item => item !== option.toLowerCase()))
        }
    }


    useEffect(() => {
        giveToParent(checkVal)
    }, [checkVal])


    return (
        <div className={`relative ${className}`}>

            <div onClick={handleMainBox} className="relative border rounded-md p-[12px] w-full min-h-[48px]">

                <p className='text-[12px] text-[#919EAB] absolute -top-[10px] bg-white'>

                    {stType}

                </p>
                <div className="flex items-center justify-between">

                    <div className="flex flex-wrap gap-3 w-full h-full text-primaryColor text-sm">

                        {

                            checkVal?.map((el, idx) => (

                                <div key={idx} className='flex gap-1 px-3 items-center py-2 rounded-[50px] bg-[#F4F4F4]'>{el.charAt(0).toUpperCase() + el.slice(1)} <button onClick={(event) => handleCross(event, el)}> <Cross /> </button></div>

                            ))

                        }
                    </div>

                    <Drop className="stroke-[#637381]" />

                </div>

            </div>



            <div className={`bg-white rounded-md shadow-md w-full px-4 py-3 absolute top-[110%] z-10 left-0 flex flex-col gap-4 ${active == index ? "block" : "hidden"}`}>

                {

                    val.map((option, idx) => {

                        return (

                            <div key={idx} onClick={() => handelCheck(idx, option)} className="flex items-center   bg-white hover:bg-[#F4F4F4]">

                                <h3 className='text-base text-SecondaryColor'>{option.charAt(0).toUpperCase() + option.slice(1)}</h3>

                            </div>

                        )

                    })

                }

            </div>

        </div>

    )
}

export default ArryVal