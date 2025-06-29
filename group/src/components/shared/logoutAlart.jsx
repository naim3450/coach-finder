import React from 'react'
import Button from './botton'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const LogoutAlart = ({ onClick }) => {
    const logOut = () => {
        document.cookie = "auth_token=; Max-Age=0; path=/"; // Clear the cookie
        window.location.reload();
    }
    return (
        <div className=' py-8 md:w-[520px] sm:w-full mx-auto bg-white rounded-[16px] drop-shadow-sm p-8'>
            <h3 className='font-medium text-primaryColor text-[20px] lg:text-[24px] text-center'>Are you sure you want to logout?</h3>
            <p className='font-normal text-primaryColor  text-[14px] md:text-base text-center'>You can easily login with your credentials next time.</p>
            <div className="flex justify-end gap-4 mt-5">
                <Button onClick={onClick} className='!bg-transparent border !text-[#60666C]'>
                    Cancel
                </Button>
                <Link href={'/signin'}>
                    <Button onClick={logOut}>
                        Logout
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default LogoutAlart