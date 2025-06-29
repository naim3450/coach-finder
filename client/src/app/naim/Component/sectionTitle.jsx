import React from 'react'

const SectionTitle = ({ className, text }) => {
    return (
        <h3 className={`${className} text-[#333] text-base font-bold leading-[150%]`}>
            {text}
        </h3>

    )
}

export default SectionTitle