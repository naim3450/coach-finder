import React from 'react'
import Button from './shared/botton'
import Link from 'next/link'




const SomethingsGreat = () => {
  return (
    <section className='lg:py-20'>
      <div className="bg-BtnColor container rounded-[24px] py-10">
        <h3 className="font-normal text-[8vw] lg:text-[56px] text-white text-center pt-10">Let`s Start Something Great</h3>
        <p className="font-normal text-[18px] text-white text-center w-full lg:w-[600px] mx-auto mt-4">Sign up with your email adress to be informed about discounts and new recruits from all campaigns!</p>

        <div className="flex justify-center mt-10">
          <Link href={'/signup'}>
            <Button className="!bg-white !text-BtnColor !px-14 h-[48px]">Sign Up Now</Button>
          </Link>
        </div>

      </div>
    </section>
  )
}

export default SomethingsGreat