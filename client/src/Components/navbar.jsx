"use client";
import React, { useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import Image from "next/image";
import Logo2 from "../assets/logo2.png";
import Button from "./shared/button";
import { Input } from "./ui/input";
import CompareIcon from "./compareIcon";
import Link from "next/link";
import { LogOut, User } from "@/app/naim/icons";
import { usePathname, useRouter } from "next/navigation";
import useMe from "@/hooks/get-me";
import { Menu, Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGroups } from "@/redux/dataSlice";
import SearchBarCard from "./shared/searchBarCard";

const Navbar = () => {

  const [searchComponentVisible, setSearchComponentVisible] = useState(false);  //search bar
  const componentRef = useRef(null); //


  const [userInfo, setuserInfo] = useState(false);
  const [search, setsearch] = useState(false);
  const [menu, setmenu] = useState(false);
  const router = useRouter();

  const aboutMe = useMe();

  const date = new Date(aboutMe?.data?.createdAt);
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

  const { compareVal } = useSelector((state) => state.apiInfo)


  const logOut = () => {
    document.cookie = "auth_token=; Max-Age=0; path=/"; // Clear the cookie
    setuserInfo(!userInfo);
    window.location.reload();
    router.push("/");
  };

  let list = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Peer Groups",
      path: "/peer-group",
    },
    {
      name: "Reviews",
      path: "/reviews",
    },
    {
      name: "About us",
      path: "/about-us",
    },
    {
      name: "Contact Us",
      path: "/contact-us",
    },
  ];
  // search bar 
  const handleSearchBarClick = () => {
    setSearchComponentVisible(true); // Show the component when clicked
  };


  // Handle click outside
  const handleClickOutside = (event) => {
    if (
      componentRef.current &&
      !componentRef.current.contains(event.target)
    ) {
      setSearchComponentVisible(false); // Hide the component
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);



  //search bar end


  const pathname = usePathname();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchGroups());
  }, []);

  return (
    <section className="bg-white">
      <div className="container flex justify-between xl:py-5 py-7 ">
        <div className="flex items-center justify-between w-full relative">
          <Link href="/">
            {" "}
            <Image
              src={Logo2}
              alt="Logo"
              className="xl:w-[100%] lg:w-[100%] w-[45vw]"
            />
          </Link>

          <div className="">
            <div
              className={`relative xl:w-[400px] lg:w-[300px] w-[30vw] lg:block ${search ? "block" : "hidden"
                }`}
            >
              <Input onClick={handleSearchBarClick} placeholder="Search" className="py-6 pl-14 w-full" />
              <CiSearch className="h-[22px] w-[22px] absolute top-[14px] left-4 cursor-pointer text-[#BDBDBD]" />
            </div>
            {searchComponentVisible && (
              <div ref={componentRef}>
                <SearchBarCard />
              </div>
            )}

          </div>

          <div className="lg:hidden flex items-center gap-3">
            <div
              onClick={() => setsearch(!search)}
              className="px-[2vw] py-[1vw] bg-BtnColor text-white rounded-md"
            >
              <Search />
            </div>

            <div
              onClick={() => setmenu(!menu)}
              className="px-[2vw] py-[1vw] bg-BtnColor text-white rounded-md"
            >
              <Menu />
              {aboutMe?.success ? (
                <div
                  className={`absolute rounded-md p-5 bg-white mt-6 z-[9999] ${menu ? "right-0 block " : "hidden"
                    }`}
                >
                  <div className="">
                    <ul className="flex flex-col items-center gap-4">
                      {list.map((el, idx) => (
                        <Link key={idx} href={el.path}>
                          <li
                            className={`text-[rgba(13,13,14,0.6)]  text-base font-semibold duration-300 ${pathname.slice(1) == el.path
                              ? "!text-BtnColor"
                              : "!text-[rgba(13,13,14,0.6)]"
                              }`}
                          >
                            {el.name}
                          </li>
                        </Link>
                      ))}
                    </ul>
                  </div>

                  <div
                    className={`w-full mx-auto bg-white rounded-md shadow-md mt-5`}
                  >
                    <div className="flex flex-col gap-3">
                      <Link href={"/profile"}>
                        <button
                          onClick={() => setuserInfo(false)}
                          className="group w-[150px]"
                        >
                          <div
                            className={`w-full font-medium text-[18px] text-white py-2 justify-center bg-BtnColor flex items-center gap-2 rounded-[8px] capitalize duration-100 ease-linear`}
                          >
                            <User
                              className={
                                "!stroke-white peer duration-100 ease-linear"
                              }
                            />{" "}
                            My Profile
                          </div>
                        </button>
                      </Link>

                      <Link href={"/compare"}>
                        <button
                          onClick={() => setuserInfo(false)}
                          className="group w-[150px]"
                        >
                          <div
                            className={`w-full font-medium text-[18px] relative text-white py-2 justify-center bg-BtnColor flex items-center gap-2 rounded-[8px] capitalize duration-100 ease-linear`}
                          >
                            <CompareIcon className={"!stroke-white"} /> Compare
                            <p className="text-BtnColor font-medium bg-white h-5 flex items-center justify-center text-xs w-5 -top-1 -right-1 rounded-full absolute">{compareVal?.length}</p>
                          </div>
                        </button>
                      </Link>

                      <button onClick={logOut} className="group w-[150px]">
                        <div
                          className={`w-full font-medium text-[18px] text-white bg-BtnColor flex items-center justify-center py-2 gap-2 rounded-[8px] capitalize  duration-100 ease-linear`}
                        >
                          <LogOut
                            className={
                              "!stroke-white peer duration-100 ease-linear"
                            }
                          />{" "}
                          Log Out
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  className={`bg-[#F4F4F4]  absolute p-5 rounded-md mt-6 z-[9999] ${menu ? "right-0 block " : "hidden"
                    } ${aboutMe?.loading ? "hidden" : "block"} `}
                >
                  <div className="">
                    <ul className="flex flex-col items-center gap-4">
                      {list.map((el, idx) => (
                        <Link key={idx} href={el.path}>
                          <li
                            className={`text-[rgba(13,13,14,0.6)]  text-base font-semibold  duration-300 ${pathname.slice(1) == el.path
                              ? "!text-BtnColor"
                              : "!text-[rgba(13,13,14,0.6)]"
                              }`}
                          >
                            {el.name}
                          </li>
                        </Link>
                      ))}
                    </ul>
                  </div>

                  <div className="flex lg:flex-row flex-col items-center gap-2 mt-4">
                    <Link href={"https://group.coachfinder.app/"}>
                      <Button className="!py-3">Are you a business?</Button>
                    </Link>


                    <div className="flex gap-2 items-center">
                      <Link href={"/signin"}>
                        <Button className="!bg-transparent !text-primaryColor !bg-[#F4F4F4] !py-3 !border">
                          Login
                        </Button>
                      </Link>
                      <Link href={"/signup"}>
                        <Button className="!py-3">Sign Up</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>


          </div>

          {aboutMe?.success ? (
            <div className="lg:flex items-center gap-4 relative hidden">
              <Link href="peer-group">
                <Button className="mr-3 text-white !py-3">Browse All</Button>
              </Link>
              <Link href="/compare">
                <div className="h-12 w-12 bg-HighlightColor rounded-[12px] flex justify-center items-center relative">
                  <CompareIcon />
                  <p className="text-white font-medium bg-BtnColor h-5 flex items-center justify-center text-xs w-5 -top-1 -right-1 rounded-full absolute">{compareVal?.length}</p>
                </div>
              </Link>

              {aboutMe?.data?.profile_picture ? (
                <Image
                  onClick={() => setuserInfo(!userInfo)}
                  className="h-[48px] cursor-pointer w-[48px] object-cover rounded-[12px]"
                  src={aboutMe?.data?.profile_picture}
                  alt="profile picture"
                  height={100}
                  width={100}
                />
              ) : (
                <button
                  onClick={() => setuserInfo(!userInfo)}
                  className="h-[48px] cursor-pointer w-[48px] bg-primaryColor text-center content-center capitalize text-white rounded-[12px]"
                >
                  {aboutMe?.data?.first_name.charAt(0)}
                </button>
              )}

              <div
                className={`py-[26px] px-5 w-full absolute right-0 top-[110%] z-50 bg-white rounded-[12px] shadow-md ${userInfo ? "block" : "hidden"
                  }`}
              >
                <div className="flex flex-col gap-1">
                  <h3 className="text-[20px] text-primaryColor font-semibold capitalize">
                    {aboutMe?.data?.first_name} {aboutMe?.data?.last_name}
                  </h3>
                  <h4 className="text-[14px] text-[#60666C] capitalize">
                    Joind {month} {day}, {+year}
                  </h4>
                </div>

                <div className="flex flex-col gap-5 mt-[20px]">
                  <Link href={"/profile"}>
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
                        />{" "}
                        My Profile
                      </div>
                    </button>
                  </Link>

                  <button onClick={logOut} className="group w-full">
                    <div
                      className={`w-full font-medium text-[18px] text-primaryColor flex items-center gap-2 rounded-[8px] capitalize  group-hover:text-BtnColor duration-100 ease-linear`}
                    >
                      <LogOut
                        className={
                          "!stroke-primaryColor peer group-hover:!stroke-BtnColor duration-100 ease-linear"
                        }
                      />{" "}
                      Log Out
                    </div>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="lg:flex items-center gap-2 hidden">
              <Link href={'https://group.coachfinder.app/'}>
                <Button className="!py-3">Are you a business?</Button>
              </Link>
              <Link href={"/signin"}>
                <Button className="!bg-transparent !text-primaryColor !bg-white !py-3 border">
                  Login
                </Button>
              </Link>
              <Link href={"/signup"}>
                <Button className="!py-3">Sign Up</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Navbar;
