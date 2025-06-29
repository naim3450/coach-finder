import React from 'react'
import SectionTitle from './sectionTitle'
import Button from '@/Components/shared/button'

const ContactCard = ({ icon, text, text2, btn }) => {
    return (
        <div className='xl:w-[364px] lg:w-[310px] sm:w-[300px] w-[55vw] border sm:p-8 p-5 shadow-md flex flex-col gap-4 rounded-[22px]'>
            {icon}

            <SectionTitle text={text} />
            <SectionTitle text={text2} className={"font-normal text-[#456170]"} />

            <Button className='w-[163px] border !border-BtnColor !bg-transparent !text-BtnColor hover:!bg-BtnColor hover:!text-white duration-200 ease-linear'>
                {btn}
            </Button>
        </div>
    )
}

export default ContactCard