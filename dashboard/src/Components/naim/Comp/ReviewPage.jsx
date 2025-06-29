import React, { useEffect, useState } from 'react'
import { Export, Search, Star } from '../icons';
import { IoFilterOutline } from 'react-icons/io5';
import axiosInstance from '../../../lib/axios.config';
import { FaStarHalfAlt } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';

const ReviewPage = () => {
    let [reviewData, setreviewData] = useState([]);
    let [copeyInfo, setcopeyInfo] = useState();
    const [filter, setfilter] = useState(false);


    useEffect(() => {
        async function getReview() {
            try {
                const res = await axiosInstance.get('/reviews/?isPending=true');
                const data = res.data.data;
                setreviewData(data);
                setcopeyInfo(data);
            } catch (error) {
                throw new Error(error)
            }
        }
        getReview()
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

    const handleAprove = async (reviewItem) => {
        try {
            const res = await axiosInstance.patch(`/reviews/approve/${reviewItem._id}`,
                { rating: reviewItem.rating, review: reviewItem.review })
            if (res.success) {
                setreviewData(reviewData.filter((el) => el._id != reviewItem._id))
                notify(res.message)
            }

        } catch (error) {
            console.log(error);
        }
    }

    const handleRemove = async (reviewItem) => {
        try {
            const res = await axiosInstance.delete(`/reviews/${reviewItem._id}`, { rating: reviewItem.rating, review: reviewItem.review })
            console.log(res);
            
            if (res.success) {
                setreviewData(reviewData.filter((el) => el._id != reviewItem._id))
                notify(res.message)
            }

        } catch (error) {
            console.log(error);
        }
    }

    const handleSearch = (e) => {
        let search = copeyInfo.filter((elm) => {
            if (e.target.value === "") {
                return elm
            }
            else if (elm.group.name.startsWith(e.target.value)) {
                return elm
            }
        })
        setreviewData(search);
    }

    const filterList = ['Last 1 hour', 'Last 6 hours', 'Last 24 hours', '10 days ago', '1 month ago', 'Lifetime']

    const [active, setactive] = useState(0);
    const sortSubmit = (e, idx) => {
        setactive(idx)
    };


    return (
        <div className='w-full'>
            <div>
                <ToastContainer />
            </div>
            <div className="py-[47px] lg:pl-[38px] lg:pr-[60px] px-1 font-sans w-full h-[90vh] relative z-10">

                <div className="lg:w-[95%] w-full lg:mt-[75px] mx-auto md:flex items-center justify-between">
                    <h3 className="outline-none w-[115px] h-[35px] border rounded-md font-medium capitalize md:text-center md:content-center ml-5 pl-2">All Reviews</h3>

                    <div className="flex items-center mt-3">
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
                                onClick={() => setfilter(!filter)}
                                className={`flex gap-2 items-center text-sm font-semibold bg-BtnColor   text-white px-6 py-3 rounded-[8px] ${filter ? false : "bg-[#F2F2F2] !text-[#787878]"
                                    } py-2 px-[10px] `}
                            >
                                <IoFilterOutline />
                                Filter
                            </button>

                            <div
                                className={`w-64 absolute right-0 top-[110%] z-50 bg-white shadow-lg rounded-md p-4 space-y-2 text-gray-800 duration-500 ease-linear ${filter ? "block scale-1" : "hidden scale-x-0"
                                    }`}
                            >
                                {
                                    filterList?.map((el, idx) => (
                                        <button onClick={(e) => sortSubmit(e, idx)} key={idx} className={`block w-full text-left  hover:bg-gray-100 px-4 py-2 rounded-md ${active == idx ? "font-medium" : "font-normal"}`}>
                                            {el}
                                        </button>
                                    ))
                                }
                            </div>

                        </div>
                    </div>

                </div>

                <div className="w-[95%] mx-auto mt-2">
                    <div className="bg-[#6A8DAB] text-white p-5 font-semibold rounded-t-lg">
                        <div className="grid grid-cols-5">
                            <div className="">Groups</div>
                            <div className="">Review</div>
                            <div className="">Rating</div>
                            <div className="">By</div>
                        </div>
                    </div>
                </div>

                <div className="w-full mx-auto overflow-y-auto h-[58vh]">
                    <div className="flex flex-col gap-2">
                        {reviewData?.map((el, idx) => {
                            return (
                                <div
                                    key={idx}
                                    className="grid xl:grid-cols-5 items-center px-[50px] py-[17px] relative"
                                >
                                    <div className=" text-left text-[#EB3743] text-xm font-normal">
                                        {el?.group?.name}
                                    </div>

                                    <div className=" text-left text-[#EB3743] text-xm font-normal">
                                        {el?.review.slice(0, 12)}....
                                    </div>

                                    <div className=" 2xl:flex items-center gap-2">
                                        <div className="flex items-center gap-[5px]">
                                            {Array.from({ length: 5 }, (_, idx) => {
                                                let number = idx + 0.5
                                                return <div key={idx} onClick={() => renderReview(idx)}>
                                                    {
                                                        el.rating >= idx + 1 ?
                                                            <Star /> :
                                                            el.rating >= number ?
                                                                <FaStarHalfAlt className='text-[#FDAE53] text-[19px]' /> :
                                                                <Star className={"fill-none stroke-[#FDAE53]"} />

                                                    }

                                                </div>
                                            })}
                                        </div>
                                        <span className="text-gray-500">(35 reviews)</span>
                                    </div>

                                    <div className=" text-left text-[#EB3743] text-xm font-normal capitalize">
                                        {el.user.first_name} {el.user.first_name}
                                    </div>

                                    <div className="text-left flex gap-[36px] text-[#1A1A1A] text-xm font-normal capitalize">
                                        <button onClick={() => handleAprove(el)} className=' py-2 px-3 rounded-[8px] bg-[#008944] text-white'>
                                            Approve
                                        </button>
                                        <button onClick={() => handleRemove(el)} className=' py-2 px-3 rounded-[8px] bg-[#EB3743] text-white'>
                                            Decline
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReviewPage