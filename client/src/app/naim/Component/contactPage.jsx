"use client"
import React, { useState } from 'react'
import PageTitle from './pageTitle'
import ContactCard from './contactCard'
import { Email, Location, Phone, PhoneV2, Time } from '../icons'
import { Label } from '@/Components/ui/label'
import { Input } from '@/Components/ui/input'
import SectionTitle from './sectionTitle'
import Image from 'next/image'
import frame from '../../../assets/frame.png'
import Button from '@/Components/shared/button'
import Questions from './questions'

const ContactPage = () => {
    const [info, setinfo] = useState({
        name: "",
        email: "",
        message: ""
    })

    function handleSubmit(e) {
        e.preventDefault()
        alert("done")
    }


    return (
        <div className='mt-[24px]'>
            <PageTitle text={"Contact Us"} />
            <div className="container">

                <div className="flex flex-wrap lg:justify-between lg:gap-0 gap-[40px] justify-center mt-[88px]">
                    <ContactCard icon={<Email />} text={"Email"} text2={"Support@prosit.com"} btn={"Contact"}/>
                    <ContactCard icon={<Phone />} text={"Phone"} text2={"Office : +61 00-33489"} btn={"Call"} />
                    <ContactCard icon={<Location />} text={"Address"} text2={"4517 Washington Ave. Manchester"} btn={"Location"} />
                </div>

                <div className="py-[80px] my-[120px] flex lg:flex-row flex-col justify-between">
                    <div className="lg:block flex flex-col items-center justify-center">
                        <SectionTitle text={"Contact Us"} className={"!text-BtnColor !font-bold"} />
                        <h2 className="text-[#333] text-[32px] font-bold leading-[120%] lg:text-left text-center">
                            Have a any question? <br />
                            Let&apos;s get in touch with us!
                        </h2>

                        <div className="relative lg:mt-0 mt-5">
                            <Image src={frame} alt='frame' />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                <h3 className='text-base font-bold text-[#012C3D] flex items-center gap-3'>
                                    <Time />  Visit time
                                </h3>
                                <SectionTitle text={"Monday-Saturday"} className={"font-normal text-[#456170] !mt-[12px]"} />
                                <SectionTitle text={"9AM to 7PM"} className={"font-normal text-[#456170]"} />

                                <div className="text-[#456170] text-sm mt-6">
                                    <h3 className='flex items-center gap-2'>
                                        <Email className={"!fill-[#012C3D] !w-[20px]"} />
                                        yourname@mail.com
                                    </h3>
                                    <h3 className='flex items-center gap-2 mt-6'>
                                        <PhoneV2 className={"!fill-[#012C3D] !w-[20px]"} />
                                        786393098
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='lg:block flex flex-col items-center justify-center lg:mt-0 mt-5'>
                        <form onSubmit={handleSubmit} className="px-8 py-10 sm:w-[546px] shadow-md bg-white rounded-[12px]">
                            <div className="flex flex-col gap-[20px]">
                                <Label htmlFor="name" name="name" className="!text-[#333] !text-base !font-bold">Name</Label>
                                <Input onChange={(e) => setinfo((prev) => ({ ...prev, name: e.target.value }))} id="name" className="!rounded-[8px] !border-[#D2D1E0]" required />
                            </div>

                            <div className="flex flex-col gap-[20px] mt-6">
                                <Label htmlFor="Email" name="Email" className="!text-[#333] !text-base !font-bold">Email</Label>
                                <Input onChange={(e) => setinfo((prev) => ({ ...prev, email: e.target.value }))} id="Email" className="!rounded-[8px] !border-[#D2D1E0]" required />
                            </div>

                            <div className="flex flex-col gap-[20px] mt-6">
                                <Label htmlFor="Message" name="Message" className="!text-[#333] !text-base !font-bold">Message</Label>
                                <textarea onChange={(e) => setinfo((prev) => ({ ...prev, message: e.target.value }))} name="" id="" className='outline-none border h-[98px] rounded-[8px] resize-none px-3 py-1 !border-[#D2D1E0]' required></textarea>
                            </div>

                            <div className="flex items-center gap-3 mt-4">
                                <input type="checkbox" className='sm:w-4 sm:h-4 w-[14px] h-[14px]' required />
                                <h4 className='text-[#012C3D] sm:text-base text-sm'>
                                    I agree <span className='font-extrabold'>to Privacy policy</span> and <span className='font-extrabold'>Terms of use</span>
                                </h4>
                            </div>

                            <Button type="submit" className='mt-6 w-full'>
                                Submit
                            </Button>
                        </form>
                    </div>
                </div>

                <div className="pb-[80px]">
                    <h3 className="lg:text-[40px] text-[5vw] text-primaryColor font-extrabold text-center">
                        Frequently Asked Questions
                    </h3>

                    <div className="lg:mt-[48px] mt-10">
                        <Questions />
                    </div>
                </div>
            </div>
        </div >
    )
}

export default ContactPage