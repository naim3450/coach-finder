import { IoMenu } from "react-icons/io5";
import Logo from "../assets/log_logo.png";
import AddInfo from "./addInfo";
import Sidebar from "./naim/Comp/Sidebar";
import { useState } from "react";

const AddInfoPage = () => {
  const [first, setfirst] = useState(false)

  const handleMenu = () => {
    setfirst(true)
  }
  const handleClose = () => {
    setfirst(false)
  }
  return (
    <div>
      <div className="bg-white bg-opacity-60 shadow-[rgba(145,_158,_171,_0.10)_-8px_8px_24px_-4px] h-[90px] pl-[68px] pt-6">
        <img src={Logo} alt="Logo" className="h-[37px] w-[83px] object-cover" />
      </div>
      <div className="flex">
        <button onClick={handleMenu} className={first ? "hidden" : "absolute top-5 right-5 xl:hidden block"}>
          <IoMenu className='text-[26px]' />
        </button>
        <Sidebar className2={first ? "left-0" : "!left-[100%]"} onClick={handleClose} />
        <AddInfo />
      </div>
    </div>
  );
};

export default AddInfoPage;
