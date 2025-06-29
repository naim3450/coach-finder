"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import blog_intro_img from '../../../assets/blog_intro_img.png'
import { Cross, LogOut, Pass, Remove, Rivew, Save, User } from '../icons'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import useMe from '@/hooks/get-me'
import { Menu } from 'lucide-react'

const UserTabs = ({ profile }) => {

    let tabList = [
        {
            name: "My Profile",
            icon: <User className={profile == "profile" ? "!stroke-[#222B60]" : "!stroke-white"} />,
            path: "profile"
        },
        {
            name: "Saved Group",
            icon: <Save className={profile == "saved-group" ? "!stroke-[#222B60] !fill-none" : "!stroke-white !fill-none"} />,
            path: "saved-group"
        },
        {
            name: "My Review",
            icon: <Rivew className={profile == "review" ? "!stroke-[#222B60]" : "!stroke-white"} />,
            path: "review"
        },
        {
            name: "Change Password",
            icon: <Pass className={profile == "change-password" ? "!stroke-[#222B60]" : "!stroke-white"} />,
            path: "change-password"
        },
        {
            name: "Log Out",
            icon: <LogOut className={profile == "log-out" ? "!stroke-[#222B60]" : "!stroke-white"} />,
            path: false
        },
        {
            name: "Remove Account",
            icon: <Remove className={profile == "remove-account" ? "fill-[#222B60]" : "fill-white"} />,
            path: "remove-account"
        },
    ]
    const router = useRouter()


    const logOut = () => {
        document.cookie = 'auth_token=; Max-Age=0; path=/'; // Clear the cookie
        router.push('/')
    }

    const aboutUser = useMe();

    const date = new Date(aboutUser?.data?.createdAt);
    const year = date.getFullYear();
    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul",
        "Aug", "Sep", "Oct", "Nov", "Dec"
    ]
    const month = months[date.getMonth()];
    const day = date.getDate();

    const [changeSide, setchangeSide] = useState(false)

    return (
        <div className="">
            <button onClick={() => setchangeSide(true)} className="lg:hidden block">
                <Menu />
            </button>
            <div className='p-[40px] !w-[364px] rounded-tl-[24px] rounded-bl-[24px] bg-primaryColor hidden lg:block'>
                <div className="w-[144px] h-[144px] relative p-2 rounded-full overflow-hidden border-2 border-[#2c8694] mt-6  ml-6">
                    {
                        aboutUser?.data?.profile_picture ?
                            <Image src={aboutUser?.data?.profile_picture} alt='profile_picture' layout="fill"
                                objectFit="cover" className='rounded-full' />
                            :
                            <div className=" uppercase text-white font-semibold text-[48px] flex items-center justify-center w-full h-full bg-primaryColor">{aboutUser?.data?.first_name.charAt(0)}</div>
                    }

                </div>

                {/* user name & dob start */}
                <div className="flex flex-col gap-2 ml-6 w-full mt-4">
                    <h3 className='text-[32px] text-white font-medium capitalize'>{aboutUser?.data?.first_name} {aboutUser?.data?.last_name}</h3>
                    <h4 className='text-[16px] text-white capitalize'>
                        Joind {month} {day}, {+year}
                    </h4>
                </div>
                {/* user name & dob end */}

                {/* category profile start */}
                <div className="mt-12">
                    {
                        tabList.map((el, idx) => {
                            if (el.name == "Log Out") {
                                return (
                                    <div key={idx} onClick={logOut}
                                        className={`w-full p-4 cursor-pointer ${profile == el.path ? "bg-white text-primaryColor" : "bg-transparent text-white"}  font-medium text-[18px] flex items-center gap-2 rounded-[8px] capitalize`}>
                                        {el.icon} {el.name}
                                    </div>
                                )
                            }
                            else {
                                return (
                                    <Link key={idx} href={el.path}>
                                        <div
                                            className={`w-full p-4 ${profile == el.path ? "bg-white text-primaryColor" : "bg-transparent text-white"}  font-medium text-[18px] flex items-center gap-2 rounded-[8px] capitalize`}>
                                            {el.icon} {el.name}
                                        </div>
                                    </Link>
                                )
                            }

                        }


                        )
                    }
                </div>
                {/* category profile end */}
            </div >

            {/* responsive */}
            <div className={`p-[40px] !w-[50%] h-screen rounded-tl-[24px] rounded-bl-[24px] bg-primaryColor lg:hidden block fixed top-0 duration-200 z-50 ${changeSide ? "left-0" : "-left-[100%]"} `}>
                <button onClick={() => setchangeSide(false)} className='bg-white rounded-full absolute right-5'>
                    <Cross className={"!h-7 !w-7"} />
                </button>
                <div className="w-[144px] h-[144px] p-2 relative  rounded-full overflow-hidden border-2 border-[#2c8694] mt-6  ml-6">
                    {
                        aboutUser?.data?.profile_picture ?
                            <Image src={aboutUser?.data?.profile_picture}
                                layout="fill"
                                objectFit="cover" alt='profile_picture' className='rounded-full' /> :
                            <div className=" uppercase text-white font-semibold text-[48px] flex items-center justify-center w-full h-full bg-primaryColor">{aboutUser?.data?.first_name.charAt(0)}</div>
                    }

                </div>

                {/* user name & dob start */}
                <div className="flex flex-col gap-2 ml-6 w-full mt-4">
                    <h3 className='text-[32px] text-white font-medium capitalize'>{aboutUser?.data?.first_name} {aboutUser?.data?.last_name}</h3>
                    <h4 className='text-[16px] text-white capitalize'>
                        Joind {month} {day}, {+year}
                    </h4>
                </div>
                {/* user name & dob end */}

                {/* category profile start */}
                <div className="mt-12">
                    {
                        tabList.map((el, idx) => {
                            if (el.name == "Log Out") {
                                return (
                                    <div key={idx} onClick={logOut}
                                        className={`w-full p-4 cursor-pointer ${profile == el.path ? "bg-white text-primaryColor" : "bg-transparent text-white"}  font-medium text-[18px] flex items-center gap-2 rounded-[8px] capitalize`}>
                                        {el.icon} {el.name}
                                    </div>
                                )
                            }
                            else {
                                return (
                                    <Link key={idx} href={el.path}>
                                        <div
                                            className={`w-full p-4 ${profile == el.path ? "bg-white text-primaryColor" : "bg-transparent text-white"}  font-medium text-[18px] flex items-center gap-2 rounded-[8px] capitalize`}>
                                            {el.icon} {el.name}
                                        </div>
                                    </Link>
                                )
                            }

                        }


                        )
                    }
                </div>
                {/* category profile end */}
            </div >
        </div>
    )
}

export default UserTabs