"use client"
import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import Image from "next/image";
import Logo from "../assets/logo.png";
import Button from "./shared/botton";
import { Input } from "./ui/input";
import Link from "next/link";
import { Menu } from "lucide-react";
import useMe from "@/hooks/get-me";
import { User } from "./icons";
import { Logout } from "@/assets/icons/logout";
import CompareIcon from "@/assets/icons/compareIcon";

const Navbar = () => {
    const [search, setsearch] = useState(false);
    const [menu, setmenu] = useState(false);
    const [userInfo, setuserInfo] = useState(false);
    const { data, loading, success, error } = useMe()

    let list = [
        {
            name: "Home",
            path: "/"
        },
        {

            name: data ? "My Groups" : "Peer Groups",
            path: data ? "/my-group" : "https://coachfinder.app/peer-group",
        },
        {
            name: "About us",
            path: "https://coachfinder.app/about-us"
        },
        {
            name: "Contact Us",
            path: "https://coachfinder.app/contact-us"
        },
    ];

    const [active, setactive] = useState(0)
    const date = new Date(data?.createdAt);
    const year = date.getFullYear();
    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];
    const month = months[date.getMonth()];
    const day = date.getDate();

    const logOut = () => {
        document.cookie = "auth_token=; Max-Age=0; path=/"; // Clear the cookie
        setuserInfo(!userInfo);
        window.location.reload();
        router.push("/");
    };

    return (
        <section className="bg-white">
            <div className="container justify-between py-5 lg:flex hidden">
                <div className="w-[280px] flex items-center content-center justify-between">
                    <Link href='/'> <Image src={Logo} alt="Logo" /></Link>
                </div>

                <div className="relative w-[421px]  mt-2 mr-10">
                    <Input placeholder="Search" className="py-5 pl-14 w-full" />
                    <CiSearch className="h-[22px] w-[22px] absolute top-[9px] left-6 cursor-pointer text-[#BDBDBD]" />
                </div>


                {
                    data ?
                        <div className="lg:flex items-center gap-4 relative hidden">
                            <Link href="/compare">
                                <div className="h-12 w-12 bg-HighlightColor rounded-[12px] flex justify-center items-center relative">
                                    <CompareIcon className={"!stroke-[#EB3743]"} />
                                </div>
                            </Link>

                            {data?.profile_picture ? (
                                <Image
                                    onClick={() => setuserInfo(!userInfo)}
                                    className="h-[48px] cursor-pointer w-[48px] object-cover rounded-[12px]"
                                    src={data?.profile_picture}
                                    alt="profile picture"
                                    height={100}
                                    width={100}
                                />
                            ) : (
                                <button
                                    onClick={() => setuserInfo(!userInfo)}
                                    className="h-[48px] cursor-pointer w-[48px] bg-primaryColor text-center content-center capitalize text-white rounded-[12px]"
                                >
                                    {data?.first_name.charAt(0)}
                                </button>
                            )}

                            <div
                                className={`py-[26px] px-5 w-[250px] absolute right-0 top-[110%] z-50 bg-white rounded-[12px] shadow-md ${userInfo ? "block" : "hidden"
                                    }`}
                            >
                                <div className="flex flex-col gap-1">
                                    <h3 className="text-[20px] text-primaryColor font-semibold capitalize">
                                        {data?.first_name} {data?.last_name}
                                    </h3>
                                    <h4 className="text-[14px] text-[#60666C] capitalize">
                                        Joind {month} {day}, {+year}
                                    </h4>
                                </div>

                                <div className="flex flex-col gap-5 mt-[20px]">
                                    <Link href={"/dashboard"}>
                                        <button
                                            onClick={() => setuserInfo(false)}
                                            className="group w-full"
                                        >
                                            <div
                                                className={`w-full font-medium text-[18px] text-primaryColor flex items-center gap-2 rounded-[8px] capitalize group-hover:text-BtnColor duration-100 ease-linear`}
                                            >
                                                <User
                                                    className={
                                                        "!stroke-primaryColor peer group-hover:!stroke-BtnColor duration-100 ease-linear"
                                                    }
                                                /> 
                                                My Profile
                                            </div>
                                        </button>
                                    </Link>

                                    <button onClick={logOut} className="group w-full">
                                        <div
                                            className={`w-full font-medium text-[18px] text-primaryColor flex items-center gap-2 rounded-[8px] capitalize  group-hover:text-BtnColor duration-100 ease-linear`}
                                        >
                                            <Logout
                                                className={
                                                    "!stroke-primaryColor peer group-hover:!stroke-BtnColor duration-100 ease-linear"
                                                }
                                            /> 
                                            Log Out
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                        :
                        <div className="w-[200px] flex items-center justify-end">
                            <Link href='/signup'>
                                <Button className=" text-white font-bold text-base !py-3">Create Your Account</Button>
                            </Link>
                        </div>
                }

            </div>

            <div className="container justify-between items-center py-5 lg:hidden flex">
                <div className="md:w-[280px] w-[30vw] flex items-center content-center justify-between">
                    <Link href='/'> <Image src={Logo} alt="Logo" className="w-full" /></Link>
                </div>

                <div className="relative w-[20vw]">
                    <Input placeholder="Search" className="py-5 pl-2 w-full" />
                </div>

                <div className="flex gap-2">
                    <div
                        onClick={() => setsearch(!search)}
                        className="px-[1.5vw] py-[1vw] bg-BtnColor text-white rounded-md flex gap-2 items-center justify-center"
                    >
                        <CiSearch className="!text-[#BDBDBD] text-xl" />
                        Search
                    </div>

                    <div
                        onClick={() => setmenu(!menu)}
                        className="px-[2vw] py-[1vw] bg-BtnColor text-white rounded-md relative">
                        <Menu />

                        <div className={`absolute top-[100%] right-0 p-3 flex flex-col gap-4 bg-white ${menu ? "block" : "hidden"}`}>
                            <ul className="flex flex-col justify-center gap-3 text-center items-center ml-5">
                                {
                                    list.map((el, idx) => (
                                        <Link key={idx} href={el.path}>
                                            <li onClick={() => setactive(idx)} className={`text-[rgba(13,13,14,0.6)]  text-base font-semibold  duration-300 ${active == idx ? "!text-BtnColor" : "!text-[rgba(13,13,14,0.6)]"}`}>
                                                {el.name}
                                            </li>
                                        </Link>
                                    ))
                                }
                            </ul>

                            <div className="w-[200px] flex items-center justify-end">
                                <Link href='/signup'>
                                    <Button className=" text-white font-bold text-base !py-3">Create Your Account</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Navbar;
