import React, { useState } from 'react'
import Sidebar from './Sidebar'
import GroupPage from './GroupPage'
import Logo from "../../../assets/log_logo.png";
import { useSelector } from 'react-redux';
import Loading from '../../loading';
import { IoMenu } from "react-icons/io5";

const HomePage = () => {
    const { isLoading } = useSelector((state) => state.FilterSlice);

    const [first, setfirst] = useState(false)

    const handleMenu = () => {
        setfirst(true)
    }
    const handleClose = () => {
        setfirst(false)
    }
    return (
        <div>
            <div className={isLoading ? "hidden" : "block"}>
                <div className={`bg-white bg-opacity-60 shadow-[rgba(145,158,_171,_0.10)-8px_8px_24px_-4px] h-[90px] pl-[68px] pt-6`}>
                    <img
                        src={Logo}
                        alt="Logo"
                        className="h-[37px] w-[83px] object-cover"
                    />
                </div>
                <div className="flex relative">
                    <button onClick={handleMenu} className={first ? "hidden" : "absolute -top-16 right-5 xl:hidden block"}>
                        <IoMenu className='text-[26px]' />
                    </button>
                    <Sidebar className2={first ? "left-0" : "!left-[100%]"} onClick={handleClose} />

                    <GroupPage />
                </div>
            </div>

            {isLoading && <Loading />}
        </div>
    )
}

export default HomePage