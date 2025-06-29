"use client"
import SectionTitle from './sectionTitle'
import Button from '@/Components/shared/button'
import Image from 'next/image'
import { Contact, Flag, Star } from '../icons'
import { CardContent, CardDescription } from '@/Components/ui/card'
import { deletCompareData } from '@/redux/dataSlice'
import { useDispatch, useSelector } from 'react-redux'

const CompareList = ({ }) => {

  const { compareVal } = useSelector((state) => state.apiInfo)

  const dispatch = useDispatch()

  const clear = () => {
    localStorage.removeItem('compareData')
    dispatch(deletCompareData())
  }

  return (
    <div className="flex flex-col gap-[20px]">

      <div className="flex sm:gap-5 max-sm:gap-2">

        <div className="">
          <div className='border rounded-[8px] md:w-[384px] h-[138px] w-full py-4 px-4 flex flex-col items-center justify-center'>
            <SectionTitle text={"Product Comparison"} className={"lg:text-base sm:text-sm max-sm:text-xs lg:text-left text-center"} />
            <SectionTitle text={`(${compareVal.length} Products selected)`} className={"font-medium text-[#506A80] lg:text-base sm:text-sm max-sm:text-xs lg:text-left text-center"} />
            <Button onClick={clear} className='!border !border-BtnColor !bg-transparent !text-BtnColor !text-base font-semibold mt-[12px] lg:!text-base sm:!text-sm max-sm:!text-xs !px-2 max-sm:!py-1 !rounded-md'>
              Clear All
            </Button>
          </div>

          <div className="border-b md:w-[384px] h-[83px] w-full flex items-center sm:p-4 p-2">
            <h5 className='text-[#333] text-base font-bold sm:leading-[150%]'>
              About
            </h5>
          </div>

          <div className="border-b md:w-[384px] h-[83px] w-full flex items-center sm:p-4 p-2">
            <h5 className='text-[#333] sm:text-base text-sm sm:font-bold font-semibold sm:leading-[150%]'>
              Price
            </h5>
          </div>

          <div className="border-b md:w-[384px] h-[83px] w-full flex items-center sm:p-4 p-2">
            <h5 className='text-[#333] sm:text-base text-sm sm:font-bold font-semibold sm:text-left text-center sm:leading-[150%]'>
              Rating & Review
            </h5>
          </div>

          <div className="border-b md:w-[384px] h-[83px] w-full flex items-center p-4">
            <h5 className='text-[#333] sm:text-base text-sm sm:font-bold font-semibold sm:text-left text-center sm:leading-[150%]'>
              Location
            </h5>
          </div>

          <div className="border-b md:w-[384px] h-[83px] w-full flex items-center p-4 ">
            <h5 className='text-[#333] sm:text-base text-sm sm:font-bold font-semibold sm:text-left text-center sm:leading-[150%]'>
              Meeting Format
            </h5>
          </div>

          <div className="border-b md:w-[384px] h-[83px] w-full flex items-center p-4 ">
            <h5 className='text-[#333] sm:text-base text-sm sm:font-bold font-semibold sm:text-left text-center sm:leading-[150%]'>
              Tag
            </h5>
          </div>

        </div>

        {
          compareVal.map((el, idx) => (
            <div key={idx} className="">

              <div className='border rounded-[8px] md:w-[384px] h-[138px] w-full py-4 sm:px-4 px-2 flex lg:flex-row flex-col lg:justify-start justify-center items-center lg:gap-6 gap-3'>
                <div className="lg:w-[80px] lg:h-[80px] w-[50px] h-[50px] relative">
                  <Image src={el.profile_picture} alt='profile_picture' objectFit='cover' layout="fill" />
                </div>
                <h2 className="text-[#333] lg:text-base sm:text-sm max-sm:text-xs font-semibold lg:font-extrabold lg:leading-[24px] lg:text-left text-center">
                  {el.name}
                </h2>
              </div>

              <div className="border-b md:w-[384px] h-[83px] w-full items-center sm:p-4 p-2 sm:flex hidden">
                <p className='text-sm text-[#333] font-medium'>{el.about}</p>
              </div>

              {/* about responsive part start  */}
              <div className="border-b md:w-[384px] h-[83px] w-full  items-center sm:p-4 p-2 sm:hidden block">
                <p className='text-sm text-[#333] font-medium'>{el.about?.slice(0, 40)}....</p>
              </div>
              {/*about responsive part end  */}

              <div className="border-b md:w-[384px] h-[83px] w-full flex items-center sm:p-4 p-2">
                <h1 className="text-primary font-lato sm:text-[20px] text-sm sm:font-extrabold font-semibold leading-[44.8px]">
                  ${el.pricing}
                  <span className='text-black/50 text-[12px] font-normal'>/Hour</span>
                </h1>
              </div>

              <div className="border-b md:w-[384px] h-[83px] w-full sm:p-4 p-2 flex justify-center flex-col">
                {
                  <div className="flex sm:justify-start justify-center space-x-1">
                    {
                      Array.from({ length: 5 }, (e, idx) => {
                        return <Star key={idx} className={"sm:!h-5 sm:!w-5 !h-3 !w-3"} />
                      })
                    }
                  </div>
                }
                <p className="text-primaryColor font-medium sm:text-base text-xs sm:text-left text-center mt-2">4.6(35 reviews)</p>
              </div>

              <div className="border-b md:w-[384px] h-[83px] w-full p-4 flex items-center">
                <CardDescription className="font-medium sm:text-[16px] text-sm text-primaryColor opacity-40 flex sm:flex-row flex-col sm:text-left text-center items-center gap-2">
                  <Flag />
                  {el.city}, {el.country}
                </CardDescription>
              </div>

              <div className="border-b md:w-[384px] h-[83px] w-full p-4 flex items-center">
                <h5 className='text-xs text-black/50 flex sm:flex-row flex-col max-sm:justify-center max-sm:text-center items-center gap-1 capitalize font-medium'><Contact /> {el.meeting_format}</h5>
              </div>

              <div className="border-b md:w-[384px] h-[83px] w-full p-4 min items-center">
                <CardContent className="flex flex-wrap gap-2 p-0 w-full">
                  {
                    el.key_topics?.map((elm, idx) => (
                      <Button key={idx}
                        className="!bg-[#F5F5F5] font-normal xl:text-[12px] text-[10px] !text-[#333] !px-2 rounded-lg xl:!py-1 !py-2 xl:!rounded-[43px]">
                        {elm}
                      </Button>
                    ))
                  }
                </CardContent>
              </div>

            </div>
          ))
        }

      </div>

    </div>
  )
}

export default CompareList