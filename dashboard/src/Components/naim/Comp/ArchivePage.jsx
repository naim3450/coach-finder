import { useEffect, useState } from "react";
import { Close, Delet, Delet2, Delet3, Export, Search, Star } from "../icons";
import { IoFilterOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import GroupList from "./GroupList";
import axiosInstance from "../../../lib/axios.config";
import { ToastContainer, toast } from 'react-toastify';
import { deleteArived, fetchArchived, searchArchive, sortFuncArchive } from "../../../redux/ArchivedSlice";
import ToastPop from "./ToastPop";
import Loading from "../../loading";

//group
const ArchivePage = () => {
    const [chekDisplay, setchekDisplay] = useState(false);
    const [checkedArr, setcheckedArr] = useState([]);
    const [popUpDelet, setpopUpDelet] = useState(false);
    const [ischecked, setischecked] = useState(false);
    const [popUpArcive, setpopUpArcive] = useState(false);
    const [ischeckedAricvedPop, setischeckedAricvedPop] = useState(false);
    const [filter, setfilter] = useState(false);
    const [wantDelet, setwantDelet] = useState(false);
    const [wantunarchive, setwantunarchive] = useState(false);
    const [loading, setloading] = useState(false)

    let { ArchiveInfo } = useSelector((state) => state.ArchivedSlice);
    const dispatch = useDispatch();

    const searchChange = (e) => {
        dispatch(searchArchive(e.target.value));
    };

    const sortSubmit = (e) => {
        e.target.tagName.toLowerCase() === "div"
            ? false
            : dispatch(
                sortFuncArchive(
                    e.target.tagName.toLowerCase() === "button"
                        ? e.target.querySelector("span").innerHTML
                        : e.target.innerHTML
                )
            );
    };

    useEffect(() => {
        dispatch(fetchArchived())
    }, [])

    const notify = (message) => toast.success(message, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

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
        setloading(true)
        const rsl = await axiosInstance.delete(`/groups`, { data: { ids: checkedArr } });
        if (rsl.success) {
            notify('Groups successfully deleted')
            setloading(false)
            dispatch(deleteArived(checkedArr));
        }
        setchekDisplay(false);
        setcheckedArr([]);
        setpopUpDelet(false);
    }


    function handleAricvePopUp() {
        if (ischeckedAricvedPop == true) {
            setpopUpArcive(false);
        } else if (checkedArr.length > 0) {
            setpopUpArcive(true);
        }
    }

    const handlePatch = async () => {
        setloading(true)
        try {
            const res = await axiosInstance.patch(`/groups/archive`, { ids: checkedArr });
            if (res.success) {
                notify('Group(s) successfully restored')
                setloading(false)
                dispatch(deleteArived(checkedArr));
            }
        } catch (error) {

        }
        setcheckedArr([]);
        setpopUpArcive(false)
    }

    return (
        <div className="py-[47px] lg:pl-[38px] lg:pr-[60px] px-4 font-sans w-full h-[90vh] relative z-10">
            {loading && <Loading />}

            <div>
                <ToastContainer />
            </div>

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
                                    Don't show again
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

            {/* Unarchived part start  */}
            <ToastPop block={popUpArcive} ischecked={ischeckedAricvedPop} setischecked={setischeckedAricvedPop}
                handleClose={() => setpopUpArcive(false)} handleConfirm={handlePatch} text={"Are you sure you want to unarchive these Groups?"} text2={"The groups will be shortlisted to the website and become fully functional. "} />
            {/* Unarchived part end  */}

            <div className="md:flex justify-between">
                <h3 className="text-[24px] font-medium">
                    Archive
                </h3>

                {wantDelet ?
                    <button
                        onClick={ischecked ? handleDelet : handleDeletPopUp}
                        className="flex gap-2 items-center px-3 font-semibold bg-BtnColor   text-base text-white   py-3 rounded-[8px]"
                    >
                        <Delet />
                        Delete
                    </button>
                    :
                    wantunarchive ?
                        <button onClick={ischeckedAricvedPop ? handlePatch : handleAricvePopUp}
                            className="font-semibold bg-BtnColor text-base text-white px-6 py-3 rounded-[8px]">
                            Unarchive
                        </button>
                        :
                        <div className="flex gap-4 mt-6">
                            <button onClick={() => { setchekDisplay(true), setwantunarchive(true) }} className="font-semibold bg-BtnColor text-base text-white px-6 py-3 rounded-[8px]">
                                Publish Group
                            </button>
                            <button
                                onClick={() => { setchekDisplay(true), setwantDelet(true) }}
                                className="!bg-transparent font-semibold !border !text-[#14141A] rounded-[8px] px-3"
                            >
                                Detet Groups
                            </button>
                        </div>
                }
            </div>

            <div className="w-[95%] mt-[75px] mx-auto flex items-center justify-between">
                <h3 className="outline-none w-[115px] h-[35px] border rounded-md font-medium capitalize text-center content-center">Groups</h3>

                <div className="flex items-center">
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

            <div className="lg:w-[95%] w-full mx-auto mt-2">
                <div className="bg-[#6A8DAB] text-white p-5 font-semibold rounded-t-lg">
                    <div className="md:flex">
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
                    {ArchiveInfo?.map((el, idx) => {
                        return (
                            <GroupList key={idx} chekDisplay={chekDisplay} checkedArr={checkedArr} el={el}
                                onClick={() => handleCheckboxChange(el._id)} />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ArchivePage;
