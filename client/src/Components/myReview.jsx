"use client"
import React, { useEffect, useState } from 'react'
import MyReviewCard from './myReviewCard'
import UserTabTitle from '@/app/naim/Component/userTabTitle'
import axiosInstance from '@/lib/axios.config'
import useMe from '@/hooks/get-me'
import { ToastContainer, toast } from 'react-toastify';
import SubmitCard from '@/app/naim/Component/submitCard'

const MyReview = () => {
    const [review, setreview] = useState([])
    const [popUp, setpopUp] = useState(false)
    const [patchId, setpatchId] = useState(null)

    const { data, error, loading, success } = useMe()
    useEffect(() => {
        if (success) {
            async function featchreview(params) {
                const res = await axiosInstance.get(`/reviews?users=${data?._id}`)
                const recive = await res?.data
                setreview(recive.data);
            }
            featchreview()
        }
    }, [success])


    const notify = () => toast.error('Review successfully delete!', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

    const handleDelet = async (_id) => {
        const res = await axiosInstance.delete(`/reviews/${_id}`)
        if (res.success) {
            const update = review.filter((el) => el._id !== _id)
            setreview(update)
            notify()
        }
    }


    return (
        <div>
            <div>
                <ToastContainer />
            </div>
            <UserTabTitle text={"My Reviews"} />
            <div className="mt-6 flex gap-3 flex-col">
                {
                    review?.map((el, idx) => {
                        return <MyReviewCard key={idx} item={el} onClick={() => handleDelet(el._id)}
                            clickForPatch={() => { setpatchId(el._id), setpopUp(true) }} />
                    })
                }

                {popUp && <SubmitCard id={patchId} setpopUp={setpopUp} />}
            </div>
        </div>
    )
}

export default MyReview