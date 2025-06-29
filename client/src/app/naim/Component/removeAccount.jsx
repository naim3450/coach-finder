"use client"
import React, { useState } from 'react'
import UserTabTitle from './userTabTitle'
import Button from '@/Components/shared/button'

const RemoveAccount = () => {
    const [deletPop, setdeletPop] = useState(false);
    return (
        <div className='pt-[56px] lg:px-[56px] px-1 lg:w-[748px] w-full'>
            <UserTabTitle text={"Remove Account"} />
            <p className='text-base leading-[24px] text-[#919EAB]'>Close your account permanently</p>
            <h3 className='text-[#CE0000] text-base leading-[32px]'>Warning: <span className='text-[#51525B]'>If you close your account, you will lose access forever.</span></h3>
            <p className='text-base leading-[24px] text-primaryColor'>Are you sure you want to remove your account?</p>

            <div className={`relative border-2 rounded-lg p-[14px] lg:w-[400px] w-full h-[56px] mt-6`}>
                <input type="text" placeholder='Enter your passwoard' className='h-full w-full absolute top-0 left-0 outline-none p-[14px] rounded-lg' />
            </div>

            <div className="xl:flex justify-end mt-6">
                <Button onClick={() => setdeletPop(true)} type="submit" className='!rounded-md !px-8 !py-4'>
                    Continue
                </Button>
            </div>

            <div className={`${deletPop ? "block" : "hidden"} fixed top-0 left-0 w-full  h-screen bg-[#101010] bg-opacity-40 flex justify-center content items-center`}>
                <div className="bg-white p-8 lg:w-[520px] w-full lg:h-[248px] py-4 text-center rounded-[16px]">
                    <h3 className='text-[24px] text-primaryColor font-medium'>Are you sure you want to remove your account?</h3>
                    <h4 className='text-[16px] text-primaryColor'>
                        You won&apos;t be able to use the dashboard or email to keep in touch anymore. We&apos;ll miss you!
                    </h4>

                    <div className="flex justify-end mt-6 gap-4">
                        <Button onClick={() => setdeletPop(false)} type="submit" className='!rounded-md !px-8 !py-3 !bg-transparent border-2 !text-primaryColor'>
                            Cancel
                        </Button>
                        <Button onClick={() => setdeletPop(false)} type="submit" className='!rounded-md !px-8 !py-3'>
                            Remove
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RemoveAccount