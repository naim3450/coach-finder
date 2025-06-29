import React from 'react'
import WeworkCard from './shared/weworkCard'
import Work_one from '../assets/work_one.svg'
import Work_two from '../assets/work_two.svg'
import Work_three from '../assets/work_three.svg'
import Work_four from '../assets/work_four.svg'
import Button from './shared/botton'
import { GoArrowRight } from "react-icons/go";
import Link from 'next/link'







const WeWork = () => {
  return (
    <section className='lg:py-20 py-10 container'>
      <div className="lg:flex  lg:justify-between">
        <div className="">
          <h3 className='font-semibold text-[40px] text-[#282938]'>How we work</h3>
          <p className='font-normal text-base text-[#282938] w-full lg:w-[350px] pt-2'>All of our mentors see this as an opportunity to give back to their community, build karma, and grow their personal brand.</p>
          <div className="mt-6 relative">
            <Link href={'/signup'}>
              <Button className="!px-14 !py-3 text-left ">Sign Up Now</Button>
            </Link>
            <GoArrowRight className="text-white absolute top-3 left-40 h-7 w-6" />
          </div>
        </div>

        <div className=" grid lg:grid-cols-2 grid-cols-1 gap-6 mt-5">

          <WeworkCard
            src={Work_one}
            alt={`Work_one`}
            heading={`Login or sign up to be able use our platform`}
            peragraph={`Euismod faucibus turpis eu gravida mi. Pellentesque et velit aliquam .`}
          />
          <WeworkCard
            src={Work_two}
            alt={`Work_two`}
            heading={`Enter Coaches or Peer Group Information`}
            peragraph={`Euismod faucibus turpis eu gravida mi. Pellentesque et velit aliquam .`}
          />

          <WeworkCard
            src={Work_three}
            alt={`Work_three`}
            heading={`Join the CoatchFinder Platform`}
            peragraph={`Euismod faucibus turpis eu gravida mi. Pellentesque et velit aliquam .`}
          />
          <WeworkCard
            src={Work_four}
            alt={`Work_four`}
            heading={`Service the User`}
            peragraph={`Euismod faucibus turpis eu gravida mi. Pellentesque et velit aliquam .`}
          />


        </div>

      </div>
    </section>
  )
}

export default WeWork