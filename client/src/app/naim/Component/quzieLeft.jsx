import React from 'react'

const QuizeLeft = ({ idx, className }) => {
    return (
        <div className={`${className}`}>
            <div className="xl:w-[468px] w-[300px]">
                <h1 className="text-primaryColor xl:text-[24px] font-semibold text-[1.8vw]">{idx + 1} of 5</h1>
                <h2 className="xl:text-[40px] font-semibold text-primaryColor xl:leading-[50px] xl:mt-8 mt-4">
                    Peer Group Preferences & Challenges and Areas for Support</h2>
                <p className="text-primaryColor font-medium text-base xl:mt-8 mt-4">
                    A seasoned professional focused on driving efficiency and innovation, committed to aligning business strategies with impactful solutions to achieve sustainable growth.
                </p>
            </div>
        </div>
    )
}

export default QuizeLeft