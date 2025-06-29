import React from 'react'
import Button from './botton'

const CallAction = () => {
    return (
        <div className="py-10 container rounded-[8px] bg-white drop-shadow-sm mt-4">
            <h2 className="text-[20px] font-semibold text-primaryColor mb-2">Call to action</h2>
            
            <div className="mb-5 relative mt-6">
                <label htmlFor="buttontext" className="block text-[#919EAB] font-normal text-[14px] mb-2 absolute left-2 -top-[10px] bg-white">
                Call to action button text
                </label>
                <input
                    type="text"
                    id="buttontext"
                    placeholder=""
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-0 h-[56px]"
                />
            </div>

            {/* Registration */}
            <div className="mb-6 relative">
                <label htmlFor="buttonlink" className="block text-[#919EAB] font-normal text-[14px] mb-2 absolute left-2 -top-[10px] bg-white">
                Call to action button link
                </label>
                <input
                    type="text"
                    id="buttonlink"
                    placeholder="link"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-0 h-[56px]"
                />
            </div>

            <Button className="!py-3">
                Add button
            </Button>
        </div>
    )
}

export default CallAction