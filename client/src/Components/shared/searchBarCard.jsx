import Image from 'next/image'
import Idcol from '../../assets/idcol.png'
import Map from "../../assets/map.svg";
import Clock from "../../assets/clock.svg";
const SearchBarCard = () => {
    return (
        <div className="w-[404px] container py-14 bg-white shadow-lg rounded-[12px] p-5 fixed top-20 z-50">
            <div className='flex gap-5'>
                <Image
                    src={Idcol}
                    alt='Idcol'
                />
                <div className="">
                    <h3 className='font-extrabold text-base text-primaryColor'>Infrastructure Development Company Limited (IDCOL)</h3>
                    <div className="flex gap-1 mt-2">
                        <Image src={Map} alt="Map" className=" " />
                        <p className='text-[#0D0D0E] opacity-40 text-[14px] font-medium'>New York,USA</p>
                    </div>
                    <div className="flex mt-2">
                        <Image src={Clock} alt="alt" className="mr-1" />
                        <p className='text-[#0D0D0E] opacity-40 text-[14px] font-medium'>Sunday, January 19, 2025
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchBarCard
