import { Link, useParams } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import Sidebar from "./Sidebar";
import Logo from "../../../assets/log_logo.png";
import { useSelector } from "react-redux";
import AccountPage from "./AccountPage";
import ReviewPage from "./ReviewPage";
import Loading from "../../loading";
import ArchivePage from "./ArchivePage";
import AnalyticsPage from "./AnalyticsPage";
import { IoMenu } from "react-icons/io5";
import { useState } from "react";


const PageCategory = () => {
  const { category } = useParams();

  const { isLoading } = useSelector((state) => state.FilterSlice)

  const [first, setfirst] = useState(false)

  const handleMenu = () => {
    setfirst(true)
  }
  const handleClose = () => {
    setfirst(false)
  }

  if (
    category == "users" ||
    category == "analytics" ||
    category == "reviews" ||
    category == "settings" ||
    category == "archive"
  ) {
    return (
      <div>
        <div className={isLoading ? "hidden" : "block"}>
          <div className={`bg-white bg-opacity-60 shadow-[rgba(145,158,_171,_0.10)-8px_8px_24px_-4px] h-[90px] pl-[68px] pt-6 flex justify-between`}>
            <div className="">
              <Link to={`/`} className="cursor-pointe">
                <img
                  src={Logo}
                  alt="Logo"
                  className="h-[37px] w-[83px] object-cover !"
                />
              </Link>
            </div>

          </div>
          <div className="flex relative">

            <button onClick={handleMenu} className={first ? "hidden" : "absolute top-5 right-5 xl:hidden block"}>
              <IoMenu className='text-[26px]' />
            </button>
            <Sidebar className2={first ? "left-0" : "!left-[100%]"} onClick={handleClose} />

            {category == "users" && <AccountPage />}
            {category == "analytics" && <AnalyticsPage text={'Reviews'} />}
            {category == "reviews" && <ReviewPage />}
            {category == "settings" && <AnalyticsPage text={'Settings'} />}
            {category == "archive" && <ArchivePage />}
          </div>
        </div>

        {isLoading && <Loading />}
      </div>
    );
  }
  else {
    return <ErrorPage />;
  }
};

export default PageCategory;
