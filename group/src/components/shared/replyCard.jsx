import React, { useState } from 'react'
import { Arrow, Star } from '../icons';
import axiosInstance from '@/lib/axios.config';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const ReplyCard = ({ comment }) => {
    const { userGroup } = useSelector((state) => state.groupInfo)


    const date = new Date(comment?.createdAt);
    const options = { year: 'numeric', month: 'long' };
    const formattedDate = date.toLocaleDateString('en-US', options)

    const [newReply, setNewReply] = useState("");
    const [isReplying, setIsReplying] = useState(null);
    const [responses, setresponses] = useState([])


    async function getResponseFunc(responseId) {
        const res = await axiosInstance.get(`/reviews/response/?review=${responseId}`)
        const recive = await res.data
        setresponses(recive);
    }


    const handleClick = (id) => {
        setIsReplying(id);
    }

    const handleAddReply = async (event) => {
        event.preventDefault()
        const res = await axiosInstance.post(`/reviews/response/${isReplying}`, { description: newReply })
        if (res.success) {
            getResponseFunc(isReplying)
            setIsReplying(null)
        }
    };

    useEffect(() => {
        getResponseFunc(comment?._id)
    }, [userGroup])

    const handleDeleteReply = async (replyId) => {
        try {
            const res = await axiosInstance.delete(`/reviews/response/${replyId}`)
            const recive = await res.data
            const up = responses?.filter((el) => el?._id !== recive?._id)
            if (res.success) {
                setresponses(up)
            }
        } catch (error) {
            console.log(error.message);
        }

    };

    return (
        <div
            className="space-y-1 border-b border-gray-200 pb-6 last:border-none"
        >
            {/* User Info */}
            <div className="lg:flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-300 rounded-full"></div>

                    <div>
                        <h4 className="font-semibold text-gray-800">{comment?.user?.first_name} {comment?.user?.last_name}</h4>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                            <span className="flex items-center gap-1">
                                {
                                    Array.from({ length: 5 }, (e, idx) => {
                                        return (
                                            <div key={idx}>
                                                {
                                                    comment?.rating >= idx + 1 ?
                                                        <Star className={"!h-4 !w-4"} /> :
                                                        <Star className={"fill-none stroke-[#FDAE53] !h-4 !w-4"} />

                                                }

                                            </div>
                                        )
                                    })
                                }
                            </span>
                            <span className="ml-2 text-blue-500">{comment.rating}</span>
                        </div>
                    </div>

                </div>
                <p className="text-sm text-gray-400 pl-16">{formattedDate}</p>
            </div>

            {/* Comment Text */}
            <p className="text-gray-700 pl-16   leading-relaxed">{comment.review}</p>

            {/* Replies Section */}
            <div className="pl-16  border-gray-200 space-y-4 relative">

                {responses?.length > 0 && <Arrow className={`absolute -top-8 left-5 md:w-[91px] md:h-[51px] w-[80px] h-[40px] hidden md:block`} />}


                {responses?.map((reply) => (
                    <div
                        key={reply?._id}
                        className="lg:flex justify-between items-center gap-4"
                    >
                        <div className="flex items-center gap-4 w-[50vw] ml-14">
                            <div className="lg:w-10 lg:h-9 h-4 w-4 max-sm:w-[4vw] max-sm:h-[4vw] bg-[#D9D9D9] rounded-full"></div>
                            <p className="text-[#97979C] text-sm w-[180px] md:w-full">{reply?.description}</p>
                        </div>
                        <button
                            className="text-BtnColor text-sm hover:underline w-60"
                            onClick={() => handleDeleteReply(reply?._id)}
                        >
                            Delete comment
                        </button>
                    </div>
                ))}

            </div>

            {/* Reply Button */}

            {
                isReplying !== comment._id ?
                    <button
                        className="pl-16 text-blue-500 text-sm hover:underline"
                        onClick={() => { handleClick(comment?._id), setNewReply("") }}>
                        Reply
                    </button>
                    :
                    <form onSubmit={handleAddReply} className="pl-16">
                        <input
                            type="text"
                            placeholder="Write a reply..."
                            className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-0"
                            value={newReply}
                            onChange={(e) => setNewReply(e.target.value)}
                        />
                        <div className="flex items-center gap-4 mt-2">
                            <button
                                className="text-[#0674DF] text-sm hover:underline"
                                type="submit"
                                disabled={!newReply.trim()}
                            >
                                Submit
                            </button>
                            <button
                                type="submit"
                                className="text-gray-500 text-sm hover:underline"
                                onClick={() => setIsReplying(null)}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
            }
        </div>
    )
}

export default ReplyCard