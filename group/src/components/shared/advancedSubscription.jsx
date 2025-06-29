import { TikMark } from '../icons'
import Button from './botton'
import { pageShowFunc3 } from '@/redux/groupSlice'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
const AdvancedSubscription = () => {

    const dispatch = useDispatch();
    const router = useRouter()
    const handleClick = () => {
        dispatch(pageShowFunc3(true))
        router.push(`/plan`)
    }
    return (
        <div className='container'>
            <div className='lg:w-[724px] w-full drop-shadow-sm bg-white p-6 mt-5 rounded-2xl'>
                <h3 className='font-semibold text-[24px] text-[#637381] pb-6'>Your Plan</h3>
                <div className=" py-10 w-full lg:w-[362px] bg-white rounded-[16px] drop-shadow-xl  p-10">

                    <h3 className='font-normal text-[20px] text-BtnColor text-center pt-5'>Advanced</h3>
                    <h3 className='font-semibold text-[20px] text-primaryColor text-center pt-5'>$499/month or $5,000/year</h3>
                    <div className="flex gap-x-2 pt-10">
                        <TikMark className='mt-1' />
                        <p className='font-normal text-base text-primaryColor w-[262px]'>Priority featured placement on the homepage and top search results.</p>
                    </div>
                    <div className="flex gap-x-2 mt-2">
                        <TikMark className='mt-1' />
                        <p className='font-normal text-base text-primaryColor w-[253px]'>Access to advanced marketing tools.</p>
                    </div>
                    <div className="flex gap-x-2 mt-2">
                        <TikMark className='mt-1' />
                        <p className='font-normal text-base text-primaryColor w-[253px]'>Customizable profile enhancements</p>
                    </div>
                    <div className="flex gap-x-2 mt-2">
                        <TikMark className='mt-[6px]' />
                        <p className='font-normal text-base text-primaryColor w-[259px]'>Personalized performance consultations and marketing support.</p>
                    </div>
                    <div className="flex gap-x-2 mt-2">
                        <TikMark className='mt-[6px]' />
                        <p className='font-normal text-base text-primaryColor w-[259px]'>Invitation to exclusive high-value webinars and industry events.</p>
                    </div>
                    <Button className='!bg-transparent border !w-full text-normal text-base !text-[#282b2e] mt-10'>
                        Cancel Plan
                    </Button>
                </div>



                <div className="flex justify-end">
                    <Button onClick={handleClick} className='!bg-transparent border !border-BtnColor   text-normal text-base !text-BtnColor mt-10'>
                        Upgrade Plan
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default AdvancedSubscription