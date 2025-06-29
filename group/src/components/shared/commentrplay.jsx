"use client";
import React, { useEffect, useState } from "react";
import { Star } from "../icons";
import { useSelector } from "react-redux";
import axiosInstance from "@/lib/axios.config";
import ReplyCard from "./replyCard";

const CommentReply = () => {

  const { userGroup } = useSelector((state) => state.groupInfo)

  const [review, setreview] = useState([])

  useEffect(() => {
    async function getReview() {
      const res = await axiosInstance.get(`/reviews/?group=${userGroup?._id}`)
      const recive = await res.data.data;
      setreview(recive)
    }
    getReview()
  }, [userGroup])

  const total = review.map((el) => el.rating).reduce((sum, rating) => sum + rating, 0)
  const average = total / review.length;


  const [comments, setComments] = useState([
    {
      id: 1,
      name: "Gertrude Culbertson",
      rating: 4.6,
      date: "February 2020",
      text: "I've improved my negotiation skill thanks to this course.",
      replies: [
        { id: 1, text: "Thank you so much! Much appreciated!" },
      ],
    },
    {
      id: 2,
      name: "John Doe",
      rating: 4.8,
      date: "March 2021",
      text: "This course helped me achieve my career goals.",
      replies: [
        { id: 1, text: "So happy to hear that!" },
      ],
    },
    {
      id: 3,
      name: "Jane Smith",
      rating: 4.5,
      date: "January 2022",
      text: "Highly recommend this course to anyone looking to improve their skills.",
      replies: [
        { id: 1, text: "Thank you for the recommendation!" },
      ],
    },
  ]);


  return (
    <div className="lg:w-[760px] w-full bg-white p-6 rounded-lg space-y-6">

      <div className="md:flex justify-between">
        <h2 className="text-xl font-semibold text-gray-800">Reviews</h2>
        <div className="text-[16px] font-normal text-primaryColor flex items-center gap-2">
          <div className="flex items-center">
            <Star />
            <span className="ml-1">{average ? average?.toFixed(1) : 0} course rating</span>
          </div>
          <span>{review.length} ratings</span>
        </div>
      </div>

      {/* Cards */}
      {review.map((comment, idx) => {
        return (
          <ReplyCard key={idx} comment={comment} />
        )
      })}
    </div>
  );
};

export default CommentReply;
