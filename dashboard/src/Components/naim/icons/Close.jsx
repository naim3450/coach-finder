import React from 'react'

export const Close = ({className, ...props }) => {
    return (
        <svg {...props} className={`stroke-[#717680] ${className}`} xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M13 1L1 13M1 1L13 13"   strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )


    
}
