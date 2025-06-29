import React, { useEffect, useState } from 'react'
import { Star } from '../icons';
import axiosInstance from '../../../lib/axios.config';
import { useDispatch } from 'react-redux';
import { getTable } from '../../../redux/FilterSice';

const GroupList = ({ onMouseDown, onMouseUp, chekDisplay, checkedArr, el, arr, onClick }) => {
    const [userReview, setuserReview] = useState([])
    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    async function fetchReview() {
        try {
            const res = await axiosInstance.get(`/reviews?group=${el._id}`);
            if (res.success) {
                const data = res?.data?.data;
                setuserReview(data?.filter((elm) => elm?.group?._id == el._id));
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    fetchReview();

    let date = new Date(el.createdAt);
    const year = date.getFullYear();
    const month = months[date.getMonth()];
    const day = date.getDate();

    const table = arr?.map((el) => {
        return {
            "Groups": el.name,
            "Location": `${el.country}, ${el.city}`,
            "Created By": `${el.user.first_name} ${el.user.last_name}`,
            "Date": `${day} ${month} ${year}`,
            "Rating": `${userReview.length} reviews`,
        }

    })
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getTable(table))
    }, [])

    return (
        <div
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            className="lg:flex items-center lg:px-[50px] py-[17px] relative"
        >
            <div
                className={`absolute left-0 top-1/2 -translate-y-1/2 ${chekDisplay ? "block" : "hidden"
                    }`}
            >
                <div
                    className={`w-4 h-4 border-2   top-0 left-0 ${checkedArr.includes(el._id)
                        ? "border-BtnColor"
                        : "border-gray-300"
                        } rounded cursor-pointer relative`}
                    onClick={onClick}
                >
                    <svg
                        className={`w-3 h-3  text-BtnColor absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${checkedArr.includes(el._id) ? "block" : "hidden"
                            }`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                        ></path>
                    </svg>
                </div>
            </div>

            <div className="w-[25%] text-left text-[#EB3743] text-xm font-normal">
                {el.name}
            </div>
            <div className="w-[25%] text-left text-[#1A1A1A] text-xm font-normal capitalize">
                {el.country},{el.city}
            </div>
            <div className="w-[25%] text-left text-[#1A1A1A] text-xm font-normal capitalize">
                {el.user.first_name} {el.user.last_name}
            </div>
            <div className="w-[25%] text-left text-[#1A1A1A] text-xm font-normal">
                {day} {month} {year}
            </div>
            <div className="w-[25%] flex items-center gap-2">
                <div className="flex items-center gap-[5px]">
                    {Array.from({ length: 5 }, (_, idx) => (
                        <Star
                            key={idx}
                            className={
                                idx === 4 ? "stroke-[#FDAE53] fill-none" : false
                            }
                        />
                    ))}
                </div>
                <span className="text-gray-500">({`${userReview?.length}`} reviews)</span>
            </div>
        </div >
    )
}

export default GroupList