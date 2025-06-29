import React from 'react'
import Button from './button'
import Link from 'next/link'
import useMe from '@/hooks/get-me'

const Davidwlc = () => {
    const { data, error, loading, success } = useMe()
    return (
        <div className="bg-primaryColor h-[411px] w-full">
            <div className='container py-20'>
                <h3 className='font-extrabold text-[40px] text-white text-center'>Welcome, {data?.first_name} {data?.last_name}!</h3>
                <p className='text-white font-normal text-base text-center py-5'>Start connecting with mentors and get ready to take your career to the next level!</p>

                <div className="flex justify-center">
                    <Link href={`/`}>
                        <Button className='!py-3'>
                            Go to homepage
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Davidwlc