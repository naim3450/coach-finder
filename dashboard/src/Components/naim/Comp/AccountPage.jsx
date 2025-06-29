import { useEffect, useState } from "react";
import { Export, Search } from "../icons";
import { IoFilterOutline } from "react-icons/io5";
import axiosInstance from "../../../lib/axios.config";
import { Link } from "react-router";
import { useSelector } from "react-redux";
import * as XLSX from "xlsx"; // Import the xlsx library
import Loading from "../../loading";
import { useDispatch } from "react-redux";
import { getTable } from "../../../redux/FilterSice";

// ************

const UserComponent = ({ el, arr }) => {

  const [userReview, setuserReview] = useState([]);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let date = new Date(el.createdAt);
  const year = date.getFullYear();
  const month = months[date.getMonth()];
  const day = date.getDate();

  async function fetchReview() {
    try {
      const res = await axiosInstance.get(`/reviews?users=${el._id}`);
      const data = res.data.data;
      let userReviewStatus = data.filter((elm) => {
        if (elm?.user?._id == el._id) {
          return elm;
        }
      });
      setuserReview(userReviewStatus);
    } catch (error) {
      throw new Error(error);
    }
  }
  fetchReview();

  const table = arr?.map((el) => {
    return {
      Groups: `${el.first_name} ${el.last_name}`,
      Location: `${el.email}`,
      "Created By": `${el.account_type}`,
      Date: `${day} ${month} ${year}`,
      Rating: `${userReview.length} reviews`,
    };
  });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTable(table));
  }, []);

  return (
    <div className="grid grid-cols-6 gap-6 items-center px-[50px] py-[17px] relative">
      <div className=" text-left text-[#EB3743] text-xm font-normal">
        {el.first_name} {el.last_name}
      </div>

      <div className=" text-left text-[#EB3743] text-xm font-normal">
        {el.email.slice(0, 15)}
      </div>

      <div className=" text-left text-[#1A1A1A] text-xm font-normal capitalize">
        {el.account_type.toLowerCase() == "basic".toLowerCase()
          ? "free"
          : el.account_type}
      </div>

      <div className=" text-left text-[#1A1A1A] text-xm font-normal capitalize">
        {day} {month} {year}
      </div>

      <div className=" text-left text-[#1A1A1A] text-xm font-normal">
        {/* {userReview.length} */}
      </div>

      <div className=" text-left text-[#1A1A1A] text-xm font-normal">
        {userReview.length}
      </div>
    </div>
  );
};

// **************

const AccountPage = () => {
  const [allUser, setallUser] = useState([]);
  const [filterser, setfilterser] = useState([]);
  const [loading, setloading] = useState(true);

  const { tableData } = useSelector((state) => state.FilterSlice);

  useEffect(() => {
    async function getUser() {
      try {
        const res = await axiosInstance.get("/users");
        const data = res.data.data;
        setallUser(data);
        setfilterser(data);
        setloading(false);
      } catch (error) {
        throw new Error(error);
      }
    }
    getUser();
  }, []);

  const handleExport = () => {
    const ws = XLSX.utils.json_to_sheet(tableData); // Convert JSON to worksheet
    const wb = XLSX.utils.book_new(); // Create a new workbook
    XLSX.utils.book_append_sheet(wb, ws, "Groups"); // Append the worksheet to the workbook
    XLSX.writeFile(wb, "group_data.xlsx"); // Download the file
  };

  const handleSearch = (e) => {
    let search = filterser.filter((elm) => {
      if (e.target.value === "") {
        return elm
      }
      else if (elm.first_name.toLowerCase().startsWith(e.target.value.toLowerCase())) {
        return elm
      }
    })
    setallUser(search);
  }
  return (
    <div className="py-[47px] lg:pl-[38px] lg:pr-[60px] px-2 font-sans w-full h-[90vh] relative z-10">
      {loading && <Loading />}
      <div className="lg:w-[95%] w-full lg:mt-[75px] mx-auto lg:flex items-center justify-between">
        <h3 className="outline-none w-[115px] h-[35px] border rounded-md font-medium capitalize text-center content-center">All Users</h3>

        <div className="flex items-center mt-4">
          <button onClick={handleExport} className="flex gap-2 items-center text-sm text-[#787878]">
            <Export /> Export
          </button>

          <div className="relative ml-6 mr-2 bg-[#F2F2F2]">
            <Search className="absolute top-1/2 -translate-y-1/2 left-[12px]" />
            <input
              onChange={handleSearch}
              type="text"
              className="outline-none !bg-transparent border rounded w-[148px] pl-[39px] pr-[15px] py-2 text-sm h-[30px]"
              placeholder="Search here"
            />
          </div>

          <div className="relative">
            <button
              className={`flex gap-2 items-center text-sm font-semibold  rounded-[8px] bg-[#F2F2F2] !text-[#787878] py-2 px-[10px] `}
            >
              <IoFilterOutline />
              Filter
            </button>
          </div>
        </div>
      </div>

      <div className="xl:w-[95%] w-full  mx-auto mt-2">
        <div className="bg-[#6A8DAB] text-white p-5 font-semibold rounded-t-lg">
          <div className="grid md:grid-cols-6">
            <div className="">Groups</div>
            <div className="">Email</div>
            <div className="">Plan</div>
            <div className="">Joined</div>
            <div className="">Group</div>
            <div className="">Reviews</div>
          </div>
        </div>
      </div>

      <div className="w-full mx-auto overflow-y-auto h-[58vh]">
        <div className="flex flex-col gap-2">
          {allUser?.map((el, idx, arr) => {
            return (
              <Link key={idx} to={`/users/${el._id}`}>
                <UserComponent el={el} arr={arr} />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
