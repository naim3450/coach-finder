"use client"
import React, { useState } from 'react'
import CustomerSayCard from './shared/customerSayCard'
import Say_one from '../assets/say_one.png'
import Say_two from '../assets/say_two.png'
import Say_three from '../assets/say_three.png'
import Say_four from '../assets/say_four.png'
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";


const CustomarSay = () => {
  const slideArr = [1, 2, 3]
  const [active, setactive] = useState(0)
  return (
    <section className=' container py-32'>
      <div className="">
        <h3 className='font-bold text-[40px] text-[#1B2534] text-center'>What our customers say</h3>
        <p className='font-normal text-[18px] text-[#545863] text-center pt-4'>We are providing our clients two cards for their one mission and finance.</p>
      </div>

      <div className="xl:block hidden">
        <Splide hasTrack={false}
          options={{
            // type: "loop",
            perPage: 1,
            perMove: 1,
            arrows: true,
            pagination: false,
            gap: 50,
          }}
          aria-label="My Favorite Images">

          <SplideTrack>
            {
              Array(3).fill(0).map((_, idx) => {
                return (
                  <SplideSlide key={idx} className="pl-12 py-10">
                    <div className="pt-10 grid grid-cols-2 gap-10 w-full">
                      <CustomerSayCard
                        className={"!w-[510px]"}
                        heading={`“The Best Coach Site”`}
                        description={`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad`}
                        h4heading={`John Carter`}
                        intro={`San Francisco, CA`}
                        src={Say_one}

                      />
                      <CustomerSayCard
                        className={"!w-[510px]"}
                        heading={`“They Providing Great Services”`}
                        description={`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad`}
                        h4heading={`John Carter`}
                        intro={`San Francisco, CA`}
                        src={Say_two}

                      />
                      <CustomerSayCard
                        className={"!w-[510px]"}
                        heading={`“Amazing Coach Platform”`}
                        description={`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad`}
                        h4heading={`Valentina`}
                        intro={`San Francisco, CA`}
                        src={Say_three}

                      />
                      <CustomerSayCard
                        className={"!w-[510px]"}
                        heading={`“Money Transfer So Easy”`}
                        description={`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad`}
                        h4heading={`John Carter`}
                        intro={`San Francisco, CA`}
                        src={Say_four}

                      />
                    </div>
                  </SplideSlide>
                )
              })
            }
          </SplideTrack>

          <div className="absolute mt-16 flex items-center gap-3">
            {
              slideArr.map((el, idx) => {
                return (
                  <div key={idx} className="w-[48px] rounded-full overflow-hidden h-[2px] ">
                    <div className={`${active == idx ? "bg-BtnColor" : "bg-gray-500"} !w-full  !h-full !rounded-full`}></div>
                  </div>
                )
              })
            }
          </div>

          <div className="bg-red-500 absolute w-[130px] right-0 mt-16">
            <div className="splide__arrows sliderBtn">
              <button onClick={() => setactive(active - 1)} className="splide__arrow splide__arrow--prev left-0" >

                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="13" viewBox="0 0 18 13" fill="none">
                  <path d="M1.1499 6.24219H16.8499" stroke="#07101A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="bevel" />
                  <path d="M12.4497 11.0222L16.5597 6.9122C16.746 6.72483 16.8505 6.47138 16.8505 6.2072C16.8505 5.94301 16.746 5.68956 16.5597 5.5022L12.5597 1.5022" stroke="#07101A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="bevel" />
                </svg>


              </button>

              <button onClick={() => setactive(active + 1)} className="splide__arrow splide__arrow--next right-0"

              >
                <div className="rotate-[180deg]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="12" viewBox="0 0 20 12" fill="none">
                    <path d="M18.0702 6.24219H1.93018" stroke="#07101A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="bevel" />
                    <path d="M6.32999 1.46216L2.21999 5.57216C2.03374 5.75952 1.9292 6.01297 1.9292 6.27716C1.9292 6.54134 2.03374 6.7948 2.21999 6.98216L6.21999 10.9822" stroke="#07101A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="bevel" />
                  </svg>
                </div>
              </button>
            </div>
          </div>

        </Splide>
      </div>

      <div className="xl:hidden block max-sm:hidden">
        <Splide hasTrack={false}
          options={{
            // type: "loop",
            perPage: 1,
            perMove: 1,
            arrows: true,
            pagination: false,
            gap: 50,
          }}
          aria-label="My Favorite Images">

          <SplideTrack>
            {
              Array(3).fill(0).map((_, idx) => {
                return (
                  <SplideSlide key={idx} className="pl-12 py-6">
                    <div className="pt-10 grid gap-10 w-full">
                      <CustomerSayCard
                        className={"!w-full"}
                        heading={`“The Best Coach Site”`}
                        description={`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad`}
                        h4heading={`John Carter`}
                        intro={`San Francisco, CA`}
                        src={Say_one}

                      />
                      <CustomerSayCard
                        className={"!w-full"}
                        heading={`“They Providing Great Services”`}
                        description={`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad`}
                        h4heading={`John Carter`}
                        intro={`San Francisco, CA`}
                        src={Say_two}

                      />
                      <CustomerSayCard
                        className={"!w-full"}
                        heading={`“Amazing Coach Platform”`}
                        description={`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad`}
                        h4heading={`Valentina`}
                        intro={`San Francisco, CA`}
                        src={Say_three}

                      />
                      <CustomerSayCard
                        className={"!w-full"}
                        heading={`“Money Transfer So Easy”`}
                        description={`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad`}
                        h4heading={`John Carter`}
                        intro={`San Francisco, CA`}
                        src={Say_four}

                      />
                    </div>
                  </SplideSlide>
                )
              })
            }
          </SplideTrack>

          <div className="absolute mt-16 flex items-center gap-3">
            {
              slideArr.map((el, idx) => {
                return (
                  <div key={idx} className="w-[48px] rounded-full overflow-hidden h-[2px] ">
                    <div className={`${active == idx ? "bg-BtnColor" : "bg-gray-500"} !w-full  !h-full !rounded-full`}></div>
                  </div>
                )
              })
            }
          </div>

          <div className="bg-red-500 absolute w-[130px] right-0 mt-16">
            <div className="splide__arrows sliderBtn">
              <button onClick={() => setactive(active - 1)} className="splide__arrow splide__arrow--prev left-0" >

                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="13" viewBox="0 0 18 13" fill="none">
                  <path d="M1.1499 6.24219H16.8499" stroke="#07101A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="bevel" />
                  <path d="M12.4497 11.0222L16.5597 6.9122C16.746 6.72483 16.8505 6.47138 16.8505 6.2072C16.8505 5.94301 16.746 5.68956 16.5597 5.5022L12.5597 1.5022" stroke="#07101A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="bevel" />
                </svg>


              </button>

              <button onClick={() => setactive(active + 1)} className="splide__arrow splide__arrow--next right-0"

              >
                <div className="rotate-[180deg]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="12" viewBox="0 0 20 12" fill="none">
                    <path d="M18.0702 6.24219H1.93018" stroke="#07101A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="bevel" />
                    <path d="M6.32999 1.46216L2.21999 5.57216C2.03374 5.75952 1.9292 6.01297 1.9292 6.27716C1.9292 6.54134 2.03374 6.7948 2.21999 6.98216L6.21999 10.9822" stroke="#07101A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="bevel" />
                  </svg>
                </div>
              </button>
            </div>
          </div>

        </Splide>
      </div>

      <div className="hidden max-sm:block">
        <Splide hasTrack={false}
          options={{
            // type: "loop",
            perPage: 1,
            perMove: 1,
            arrows: true,
            pagination: false,
            gap: 50,
          }}
          aria-label="My Favorite Images">

          <SplideTrack>
            {
              Array(3).fill(0).map((_, idx) => {
                return (
                  <SplideSlide key={idx} className="pl-12 py-6">
                    <div className="pt-10 grid gap-10 w-full max-sm:w-[80vw] mx-auto">
                      <CustomerSayCard
                        className={"max-sm:!w-[75vw] max-sm:!h-full max-sm:!py-10"}
                        textStyle={"max-sm:!w-[50vw]"}
                        heading={`“The Best Coach Site”`}
                        description={`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad`}
                        h4heading={`John Carter`}
                        intro={`San Francisco, CA`}
                        src={Say_one}

                      />
                      <CustomerSayCard
                        className={"max-sm:!w-[75vw] max-sm:!h-full max-sm:!py-10"}
                        textStyle={"max-sm:!w-[50vw]"}
                        heading={`“They Providing Great Services”`}
                        description={`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad`}
                        h4heading={`John Carter`}
                        intro={`San Francisco, CA`}
                        src={Say_two}

                      />
                      <CustomerSayCard
                        className={"max-sm:!w-[75vw] max-sm:!h-full max-sm:!py-10"}
                        textStyle={"max-sm:!w-[50vw]"}
                        heading={`“Amazing Coach Platform”`}
                        description={`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad`}
                        h4heading={`Valentina`}
                        intro={`San Francisco, CA`}
                        src={Say_three}

                      />
                      <CustomerSayCard
                        className={"max-sm:!w-[75vw] max-sm:!h-full max-sm:!py-10"}
                        textStyle={"max-sm:!w-[50vw]"}
                        heading={`“Money Transfer So Easy”`}
                        description={`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad`}
                        h4heading={`John Carter`}
                        intro={`San Francisco, CA`}
                        src={Say_four}

                      />
                    </div>
                  </SplideSlide>
                )
              })
            }
          </SplideTrack>

          <div className="absolute mt-16 flex items-center gap-3">
            {
              slideArr.map((el, idx) => {
                return (
                  <div key={idx} className="w-[48px] rounded-full overflow-hidden h-[2px] ">
                    <div className={`${active == idx ? "bg-BtnColor" : "bg-gray-500"} !w-full  !h-full !rounded-full`}></div>
                  </div>
                )
              })
            }
          </div>

          <div className="bg-red-500 absolute w-[130px] right-0 mt-16">
            <div className="splide__arrows sliderBtn">
              <button onClick={() => setactive(active - 1)} className="splide__arrow splide__arrow--prev left-0" >

                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="13" viewBox="0 0 18 13" fill="none">
                  <path d="M1.1499 6.24219H16.8499" stroke="#07101A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="bevel" />
                  <path d="M12.4497 11.0222L16.5597 6.9122C16.746 6.72483 16.8505 6.47138 16.8505 6.2072C16.8505 5.94301 16.746 5.68956 16.5597 5.5022L12.5597 1.5022" stroke="#07101A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="bevel" />
                </svg>


              </button>

              <button onClick={() => setactive(active + 1)} className="splide__arrow splide__arrow--next right-0"

              >
                <div className="rotate-[180deg]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="12" viewBox="0 0 20 12" fill="none">
                    <path d="M18.0702 6.24219H1.93018" stroke="#07101A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="bevel" />
                    <path d="M6.32999 1.46216L2.21999 5.57216C2.03374 5.75952 1.9292 6.01297 1.9292 6.27716C1.9292 6.54134 2.03374 6.7948 2.21999 6.98216L6.21999 10.9822" stroke="#07101A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="bevel" />
                  </svg>
                </div>
              </button>
            </div>
          </div>

        </Splide>
      </div>


    </section>
  )
}

export default CustomarSay  