import React, { useState } from 'react'
import { Analytics, Archive, Close, DashboardIcon, Gropus, Setting, Star, Users, } from '../icons'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { IoLogInOutline } from "react-icons/io5";


const Sidebar = ({ className, className2, onClick }) => {

    let list = [

        {
            name: "Dashboard",
            icon: <DashboardIcon />,
            path: false
        },
        {
            name: "Groups",
            icon: <Gropus />,
            path: "/"
        },
        {
            name: "Accounts",
            icon: <Users />,
            path: "/users"
        },
        {
            name: "Analytics",
            icon: <Analytics />,
            path: "/analytics"
        },
        {
            name: "Reviews",
            icon: <Star className={"!fill-none !stroke-[#141B34] !h-6 !w-6"} />,
            path: "/reviews"
        },
        {
            name: "Settings",
            icon: <Setting />,
            path: "/settings"
        },
        {
            name: "Archive",
            icon: <Archive />,
            path: "/archive"
        },
        {
            name: "Log out",
            icon: <IoLogInOutline className='text-[28px]' />,
            path: false
        },
    ]
    const navigate = useNavigate();
    const location = useLocation();

    const logout = (name) => {
        if (name == "Log out") {
            localStorage.removeItem("authToken");
            window.location.reload()
        }
    }
    

    return (
        <div className="">
            <div className={`h-full 2xl:w-[283px]  xl:w-[190px] max:lg:w-[200px]  pt-[44px] pl-[68px] hidden xl:block  ${className}`}>
                <ul className='flex flex-col gap-8'>
                    {
                        list.map((el, idx) => (
                            <Link onClick={() => logout(el.name)} key={idx} to={el.path ? `${el.path}` : false}>
                                <li className={`flex items-center gap-[17px] text-base font-semibold text-primaryColor 
                                    ${location.pathname == el.path ? "border-r-4 border-BtnColor" : false}`}>{el.icon} {el.name}</li>
                            </Link>
                        )
                        )
                    }
                </ul>
            </div>
            <div className={`h-full lg:w-[293px]  pt-[44px] px-10 xl:!hidden !block !fixed !top-0 bg-gray-300 z-50 ${className2}`}>
                <button onClick={onClick} className='absolute top-4 right-5'>
                    <Close className='text-[26px]' />
                </button>
                <ul className='flex flex-col gap-8'>
                    {
                        list.map((el, idx) => (
                            <Link onClick={() => logout(el)} key={idx} to={el.path ? `${el.path}` : false}>
                                <li className={`flex items-center gap-[17px] text-base font-semibold text-primaryColor 
                                    ${location.pathname == el.path ? "border-r-4 border-BtnColor" : false}`}>{el.icon} {el.name}</li>
                            </Link>
                        )
                        )
                    }
                </ul>
            </div>
        </div>
    )
}

export default Sidebar