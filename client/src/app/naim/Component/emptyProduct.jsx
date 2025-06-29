import React from 'react'
import SectionTitle from './sectionTitle'

const EmptyProduct = () => {
    return (
        <div className='border rounded-[8px] h-[336px] flex flex-col items-center justify-center'>
            <SectionTitle text={"Product Comparison"} />
            <SectionTitle text={"(0 Products selected)"} className={"font-medium text-[#506A80]"} />
        </div>
    )
}

export default EmptyProduct