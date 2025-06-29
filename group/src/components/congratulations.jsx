import React from 'react'
import Button from './shared/botton'
import Link from 'next/link'

const Congratulations = ({ index, dec, inc }) => {

  return (
    <div className='sm:w-[607px] mx-auto w-full'>
      <h3 className='font-bold text-[20px] text-primaryColor text-center '>Conratulations!</h3>
      <p className='font-medium text-[#545454] text-base text-center pt-2'>You  have successfully created your group</p>
      <div className="flex justify-center mt-8">
        <Link href={'/dashboard'}>
          <Button className=' '>
            Go to dashboard
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default Congratulations