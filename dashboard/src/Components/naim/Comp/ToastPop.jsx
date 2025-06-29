import React from 'react'
import { Close, Delet2, Delet3 } from '../icons'

const ToastPop = ({ block, handleClose, ischecked, setischecked, handleConfirm, text, text2 }) => {
    return (
        <div
            className={`bg-[#00000064]  h-screen w-full absolute left-0 top-0 z-20 flex flex-col items-center justify-center ${block ? "block" : "hidden"
                }`}
        >
            <div className="p-6 rounded-xl bg-white md:w-[544px] w-full flex gap-4">
                <div className="relative w-[55px] h-[55px]">
                    <Delet2 />
                    <div className="!absolute !top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <Delet3 />
                    </div>
                </div>

                <div className="">
                    <h3 className="text-gray-900 font-urbanist text-xl font-semibold leading-7 flex items-center justify-between">
                        {text}
                        <Close onClick={handleClose} />
                    </h3>

                    <p className="text-[#535862] text-base leading-[24px] mt-[6px]">
                        {text2}
                    </p>

                    <div className="md:flex justify-between">
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={ischecked}
                                onChange={() => setischecked(!ischecked)}
                            />
                            <h4 className="text-[#414651] text-sm font-semibold">
                                Don’t show again
                            </h4>
                        </div>

                        <div className="flex gap-4 mt-2">
                            <button
                                onClick={handleClose}
                                className="!bg-transparent !border !text-[#14141A] rounded-[8px] px-3"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleConfirm}
                                className="!bg-[#F31A1A] font-bold text-base text-white px-6 py-3 rounded-[8px]"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ToastPop