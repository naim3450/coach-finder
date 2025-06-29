"use client"
import React, { useState } from 'react'
import { LeftArr } from '../icons'
import ArrTypeQuiz from './arrTypeQuiz'
import StrTypeQuiz from './strTypeQuiz'

const QuizeRight = ({ data, continueFun, backFun }) => {

    const { question } = data

    const [active, setactive] = useState(null)

    return (
        <div className="flex flex-col gap-[48px] bg-white  py-10 lg:w-[578px] w-full rounded-[20px] p-6">

            <div className="space-y-6 max-sm:space-y-3 w-full max-sm:w-[90vw] mx-auto">
                {
                    question.map((el, idx) => (
                        <div key={idx}>

                            <label htmlFor="industry" className="block text-base font-semibold text-primaryColor mb-[10px] max-sm:text-sm">
                                {idx + 1}. {el.qs}
                            </label>

                            {
                                el.typeOfVal == "array" ?
                                    <ArrTypeQuiz stType={el.stType} op={el.op} active={active} setactive={setactive} index={idx} qs={el.qs} />
                                    :
                                    <StrTypeQuiz stType={el.stType} op={el.op} active={active} setactive={setactive} index={idx} qs={el.qs} />
                            }

                        </div>
                    ))
                }
            </div>

            <div className="flex justify-between w-full max-sm:w-[80vw] mx-auto">
                <button onClick={backFun} type="button" id="leftArr">
                    <LeftArr />
                </button>
                <button onClick={continueFun} type="button" id="continue-button"
                    className="w-[106px] h[48px] bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition">
                    Continue
                </button>
            </div>
        </div>
    )
}

export default QuizeRight