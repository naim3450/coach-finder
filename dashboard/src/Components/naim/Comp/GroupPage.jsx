import { useEffect, useState } from "react";
import { Close, Delet, Delet2, Delet3, Export, Search, Star } from "../icons";
import { IoFilterOutline } from "react-icons/io5";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUpdate,
  fetchGroups,
  searchFeatch,
  sortFunc,
  toastFunc,
} from "../../../redux/FilterSice";
import GroupList from "./GroupList";
import axiosInstance from "../../../lib/axios.config";
import * as XLSX from 'xlsx'; // Import the xlsx library
import Loading from "../../loading";

//group
const GroupPage = () => {
  const [chekDisplay, setchekDisplay] = useState(false);
  const [checkedArr, setcheckedArr] = useState([]);
  const [popUpDelet, setpopUpDelet] = useState(false);
  const [ischecked, setischecked] = useState(false);
  const [toast, settoast] = useState(false);
  const [filter, setfilter] = useState(false);
  const [deletLoading, setdeletLoading] = useState(false);

  let holdTimeout;

  function msDown() {
    holdTimeout = setTimeout(() => {
      setchekDisplay(true);
    }, 300);
  }

  function msUp() {
    clearInterval(holdTimeout);
  }

  let { dataInfo, toastName, tableData } = useSelector((state) => state.FilterSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGroups());
  }, []);

  const searchChange = (e) => {
    dispatch(searchFeatch(e.target.value));
  };

  const sortSubmit = (e) => {
    e.target.tagName.toLowerCase() === "div"
      ? false
      : dispatch(
        sortFunc(
          e.target.tagName.toLowerCase() === "button"
            ? e.target.querySelector("span").innerHTML
            : e.target.innerHTML
        )
      );
  };

  function handleCheckboxChange(id) {
    if (checkedArr.includes(id)) {
      return setcheckedArr(checkedArr.filter((item) => item !== id));
    } else {
      return setcheckedArr([...checkedArr, id]);
    }
  }

  function handleDeletPopUp() {
    if (ischecked == true) {
      setpopUpDelet(false);
    } else if (checkedArr.length > 0) {
      setpopUpDelet(true);
    }
  }

  async function handleDelet() {
    setdeletLoading(true)
    try {
      const rsl = await axiosInstance.patch('groups/archive', { ids: checkedArr });
      if (rsl.success) {
        settoast(true)
        dispatch(toastFunc('Group(s) successfully archived'));
        setdeletLoading(false)
      }
    } catch (error) {

    }

    dispatch(deleteUpdate(checkedArr));
    setchekDisplay(false);
    setcheckedArr([]);
    setpopUpDelet(false);
    setTimeout(() => {
      settoast(false);
    }, 1500);
  }

  const handleExport = () => {
    const ws = XLSX.utils.json_to_sheet(tableData); // Convert JSON to worksheet
    const wb = XLSX.utils.book_new(); // Create a new workbook
    XLSX.utils.book_append_sheet(wb, ws, "Groups"); // Append the worksheet to the workbook
    XLSX.writeFile(wb, "group_data.xlsx"); // Download the file
  }


  return (
    <div className="py-[47px] lg:pl-[38px] px-4  lg:pr-[60px] font-sans  w-full h-[90vh] relative z-10">
      {deletLoading && <Loading />}
      {/* popup start */}
      <div
        className={`bg-[#00000064]  h-screen w-full absolute left-0 top-0 z-20 flex flex-col items-center justify-center ${popUpDelet ? "block" : "hidden"
          }`}
      >
        <div className="p-6 rounded-xl bg-white md:w-[544px] w-full flex gap-4">
          <div className="relative w-[55px] h-[55px]">
            <Delet2 />
            <div className="!absolute !top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <Delet3 />
            </div>
          </div>

          <div className="">
            <h3 className="text-gray-900 font-urbanist text-xl font-semibold leading-7 flex items-center justify-between">
              Are you sure you want to delete this Group?
              <Close onClick={() => setpopUpDelet(false)} />
            </h3>

            <p className="text-[#535862] text-base leading-[24px] mt-[6px]">
              The group will be archived. You can unable the group from archive
              section.
            </p>

            <div className="md:flex justify-between">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={ischecked}
                  onChange={() => setischecked(!ischecked)}
                />
                <h4 className="text-[#414651] text-sm font-semibold">
                  Don’t show again
                </h4>
              </div>

              <div className="flex gap-4 mt-2">
                <button
                  onClick={() => setpopUpDelet(false)}
                  className="!bg-transparent !border !text-[#14141A] rounded-[8px] px-3"
                >
                  Cancel
                </button>

                <button
                  onClick={handleDelet}
                  className="!bg-[#F31A1A] font-bold text-base text-white px-6 py-3 rounded-[8px]"
                >
                  Confirm
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
      {/* popup end */}

      {/* toast start */}
      <div
        className={`w-[544px] shadow-xl p-6 flex gap-4 rounded-2xl bg-white duration-1000 ease-linear absolute ${toast ? "top-0 block" : "bottom-[100%] hidden"
          } left-1/2 -translate-x-1/2`}
      >
        <div className="relative w-[55px] h-[55px]">
          <Delet2 />
          <div className="!absolute !top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Delet3 />
          </div>
        </div>

        <div className="">
          <h3 className="text-gray-900 font-urbanist text-xl font-semibold leading-7 flex items-center justify-between">
            {toastName}
            <Close onClick={() => setpopUpDelet(false)} />
          </h3>

          <p className="text-[#535862] text-base leading-[24px] mt-[6px]">
            The group is archived. You can check the group from{"archive"}
            <span className="text-[#0BF] cursor-pointer">here.</span>
          </p>
        </div>
      </div>
      {/* toast end */}

      {/* title part start */}
      <div className="lg:flex justify-between">
        <h3 className="text-[24px] font-medium">
          {chekDisplay ? "Manage Groups" : "Groups"}
        </h3>

        {chekDisplay ? (
          <button
            onClick={ischecked ? handleDelet : handleDeletPopUp}
            className="flex gap-2 items-center px-3 font-semibold bg-BtnColor   text-base text-white   py-3 rounded-[8px]"
          >
            <Delet />
            Delete
          </button>
        ) : (
          <div className="flex gap-4 mt-5">
            <Link to={`/groups/add-info`}>
              <button className="font-semibold bg-BtnColor text-base text-white px-6 py-3 rounded-[8px]">
                Add Group
              </button>
            </Link>
            <button
              onClick={() => setchekDisplay(true)}
              className="!bg-transparent font-semibold !border !text-[#14141A] rounded-[8px] px-3"
            >
              Manage Groups
            </button>
          </div>
        )}
      </div>

      {/* title part end */}
      <div className="w-[95%] mt-[75px] mx-auto lg:flex items-center justify-between">
        <h3 className="outline-none w-[115px] h-[35px] border rounded-md font-medium capitalize text-center content-center">
          All groups
        </h3>

        <div className="flex items-center">
          <button onClick={handleExport} className="flex gap-2 items-center text-sm text-[#787878]">
            <Export /> Export
          </button>

          <div className="relative ml-6 mr-2 bg-[#F2F2F2]">
            <Search className="absolute top-1/2 -translate-y-1/2 left-[12px]" />
            <input
              onChange={searchChange}
              type="text"
              className="outline-none !bg-transparent border rounded w-[148px] pl-[39px] pr-[15px] py-2 text-sm h-[30px]"
              placeholder="Search here"
            />
          </div>

          <div className="relative">
            <button
              onClick={() => setfilter(!filter)}
              className={`flex gap-2 items-center text-sm font-semibold bg-BtnColor   text-white px-6 py-3 rounded-[8px] ${filter ? false : "bg-[#F2F2F2] !text-[#787878]"
                } py-2 px-[10px] `}
            >
              <IoFilterOutline />
              Filter
            </button>

            <div
              onClick={sortSubmit}
              className={`w-64 absolute right-0 top-[110%] z-50 bg-white shadow-lg rounded-md p-4 space-y-2 text-gray-800 duration-500 ease-linear ${filter ? "block scale-1" : "hidden scale-x-0"
                }`}
            >
              <button className="block w-full text-left hover:bg-gray-100 px-4 py-2 rounded-md">
                Alphabetical <span className="font-bold">A-Z</span>
              </button>
              <button className="block w-full text-left hover:bg-gray-100 px-4 py-2 rounded-md">
                Alphabetical <span className="font-bold">Z-A</span>
              </button>
              <button className="block w-full text-left hover:bg-gray-100 px-4 py-2 rounded-md">
                Dates - <span className="font-bold">Ascending</span>
              </button>
              <button className="block w-full text-left hover:bg-gray-100 px-4 py-2 rounded-md">
                Dates - <span className="font-bold">Descending</span>
              </button>
            </div>

          </div>

        </div>

      </div>

      <div className="lg:w-[95%] mx-auto mt-2">
        <div className="bg-[#6A8DAB] text-white p-5 font-semibold rounded-t-lg">
          <div className="lg:flex">
            <div className="w-[25%]">Groups</div>
            <div className="w-[25%]">Location</div>
            <div className="w-[25%]">Created by</div>
            <div className="w-[25%]">Date</div>
            <div className="w-[25%]">Rating</div>
          </div>
        </div>
      </div>

      <div className="w-full mx-auto overflow-y-auto h-[58vh]">
        <div className="flex flex-col gap-2">
          {dataInfo?.map((el, idx, arr) => {
            return (
              <GroupList key={idx} onMouseDown={msDown} onMouseUp={msUp} chekDisplay={chekDisplay} checkedArr={checkedArr} el={el}
                onClick={() => handleCheckboxChange(el._id)} arr={arr} />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GroupPage;