import React from 'react'

const AnalyticsPage = ({ text }) => {
    return (
        <div className='w-full'>
            <h3 className="text-[24px] font-medium pt-10">
                {text}
            </h3>

            <div className="h-[70vh] text-gray-500 w-full flex justify-center items-center text-center">No data for now</div>
        </div>
    )
}

export default AnalyticsPage