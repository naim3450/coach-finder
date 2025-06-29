"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Menu = ({ className }) => {
  let list = [
    {
      name: "Home",
      path: "/"
    },
    {
      name: "Peer Groups",
      path: "/peer-group"
    },
    {
      name: "Reviews",
      path: "/reviews"
    },
    {
      name: "About us",
      path: "/about-us"
    },
    {
      name: "Contact Us",
      path: "/contact-us"
    },
  ]

  const pathname = usePathname()

  let path = pathname.slice(1)


  return (
    <div className={`container w-[580px] mx-auto flex-1 hidden lg:block pb-4 ${className}`}>
      <ul className="flex justify-between items-center">
        {
          list.map((el, idx) => (
            <Link key={idx} href={el.path}>
              <li className={`text-base font-medium  duration-300 ${path == el.path ? "!text-BtnColor font-semibold" : "!text-[rgba(13,13,14,0.6)]"}`}>
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