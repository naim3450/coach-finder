"use client"
import useMe from '@/hooks/get-me'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'

const Menu = () => {

  const { data, loading, success, error } = useMe();
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

  const path = usePathname()

  return (
    <div className="container w-[419px] mx-auto flex-1 hidden lg:block mb-4">
      <ul className="flex justify-between items-center ml-5">
        {
          list.map((el, idx) => (
            <Link key={idx} href={el.path}>
              <li className={`text-[rgba(13,13,14,0.6)]  text-base font-medium  duration-300 ${path == el.path ? "!text-BtnColor" : "!text-[rgba(13,13,14,0.6)]"}`}>
                {el.name}
              </li>
            </Link>
          ))
        }
      </ul>
    </div>
  )
}

export default Menu