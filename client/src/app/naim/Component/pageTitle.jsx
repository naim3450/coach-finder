import React from 'react'

const PageTitle = ({ text }) => {
    return (
        <div className="w-full md:h-[180px] h-[25vw] bg-[#222B60] md:text-[40px] text-[7vw] text-[#FFF] font-bold text-center content-center">
            {text}
        </div>
    )
}

export default PageTitle