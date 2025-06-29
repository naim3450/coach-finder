"use client"
import React, { useEffect, useState } from 'react'
import { qsData } from './quzieData'
import QuizeLeft from './quzieLeft'
import QuizeRight from './quzieRight'
import { useDispatch, useSelector } from 'react-redux'
import axiosInstance from '@/lib/axios.config'
import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';
import { getsucessfully } from '@/redux/dataSlice'
import Loading from '@/Components/shared/loading'

const QuizePage = () => {
    let [index, setindex] = useState(0)
    let [qs, setqs] = useState(qsData[index])
    let [indexStatus, setindexStatus] = useState(false)
    let [accountStatus, setaccountStatus] = useState(false)
    const [exist, setexist] = useState(false)
    const [loading, setloading] = useState(false)
    let [bar, setbar] = useState({
        one: 0,
        two: 0,
        three: 0,
        four: 0,
    })

    const dispatch = useDispatch()
    let { quizArr, createAccount } = useSelector((state) => state.apiInfo)

    const router = useRouter()

    async function inc() {
        if (index == 4) {
            setqs(qsData[4])
        }
        else if (index < qsData.length) {
            setindex(++index)
            setqs(qsData[index])
        }

        if (index == 1) {
            setbar((prev) => ({ ...prev, one: 100 }))
        }
        else if (index == 2) {
            setbar((prev) => ({ ...prev, two: 100 }))
        }
        else if (index == 3) {
            setbar((prev) => ({ ...prev, three: 100 }))
        }
        else if (index == 4) {
            setbar((prev) => ({ ...prev, four: 100 }))
        }

        if (indexStatus === true) {
            let quiz = { quiz: quizArr };
            let mergedObject = { ...createAccount, ...quiz };
            try {
                setloading(true)
                const response = await axiosInstance.post("/users/register", mergedObject);
                if (response.success) {
                    const data = response.data
                    setaccountStatus(true)
                    const res = await axiosInstance.post("/auth/login", { email: mergedObject.email, password: mergedObject.password });
                    if (res.success) {
                        document.cookie = `auth_token=${res?.data?.token}`;
                        dispatch(getsucessfully(true))
                        router.push('/sucessfully-logged')
                    }
                } else {
                    console.log(data.message);
                }

            } catch (error) {
                if (error.response.data.message === "User already exists") {
                    setexist("User already exists")
                }
            }
            finally {
                setloading(false)
            }
        }
    }

    function dec() {
        if (index == 0) {
            setindex(0)
            setqs(qsData[index])
        }
        else {
            setindex(--index)
            setqs(qsData[index])
        }


        if (index == 0) {
            setbar((prev) => ({ ...prev, one: 0 }))
        }
        else if (index == 1) {
            setbar((prev) => ({ ...prev, two: 0 }))
        }
        else if (index == 2) {
            setbar((prev) => ({ ...prev, three: 0 }))
        }
        else if (index == 3) {
            setbar((prev) => ({ ...prev, four: 0 }))
        }

    }

    useEffect(() => {
        if (index == 4) {
            setindexStatus(true)
        }
    }, [index])

    const notify = () => toast.error('User already exists!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

    useEffect(() => {
        if (exist) {
            notify()
            setexist(false)
            router.push('/signin')
        }
    }, [exist])



    return (
        <div className="h-screen flex justify-center items-center">
            <div>
                <ToastContainer />
            </div>
            {loading && <Loading />}
            <div className="flex lg:justify-between lg:gap-[45px] justify-center items-center">
                <QuizeLeft idx={index} className={"lg:block hidden"} />
                <div className="w-[578px] flex justify-center items-center py-[30px] rounded-[20px]">
                    <div className="w-[482px]">
                        <div className="flex space-x-3 items-center mt-10 justify-center mb-[32px]">

                            {/* 1st point  */}
                            <span className={`w-3 h-3 max-sm:h-2 max-sm:w-2 rounded-full ${bar.one == 100 ? "bg-BtnColor" : "bg-[#919EAB]"}`}></span>

                            <div className="w-[54px] rounded-full overflow-hidden h-[5px]">
                                <div className={`bg-BtnColor ${bar.one == 100 ? "w-full" : "w-[0px]"}  h-full`}></div>
                            </div>
                            {/* 1st point  */}

                            {/* 2nd point  */}
                            <span className={`w-3 h-3 max-sm:h-2 max-sm:w-2 rounded-full ${bar.two == 100 ? "bg-BtnColor" : "bg-[#919EAB]"}`}>
                            </span>

                            <div className="w-[54px] rounded-full overflow-hidden h-[5px]">
                                <div className={`bg-BtnColor ${bar.two == 100 ? "w-full" : "w-[0px]"} h-full`}></div>
                            </div>
                            {/* 2nd point  */}

                            {/* 3rd point  */}
                            <span className={`w-3 h-3 max-sm:h-2 max-sm:w-2 rounded-full ${bar.three == 100 ? "bg-BtnColor" : "bg-[#919EAB]"}`}>
                            </span>

                            <div className="w-[54px] rounded-full overflow-hidden h-[5px]">
                                <div className={`bg-BtnColor ${bar.three == 100 ? "w-full" : "w-[0px]"} h-full`}></div>
                            </div>
                            {/* 3rd point  */}

                            {/* 4th point  */}
                            <span className={`w-3 h-3 max-sm:h-2 max-sm:w-2 rounded-full ${bar.four == 100 ? "bg-BtnColor" : "bg-[#919EAB]"}`}>
                            </span>

                            <div className="w-[54px] rounded-full overflow-hidden h-[5px]">
                                <div className={`bg-BtnColor ${bar.four == 100 ? "w-full" : "w-[0px]"} h-full`}></div>
                            </div>
                            {/* 4th point  */}

                            {/* 5th point  */}
                            <span className={`w-3 h-3 max-sm:h-2 max-sm:w-2 rounded-full ${accountStatus ? "bg-BtnColor" : "bg-[#919EAB]"}`}>
                            </span>

                        </div>

                        {index == 0 && <QuizeRight data={qs} continueFun={inc} backFun={dec} />}
                        {index == 1 && <QuizeRight data={qs} continueFun={inc} backFun={dec} />}
                        {index == 2 && <QuizeRight data={qs} continueFun={inc} backFun={dec} />}
                        {index == 3 && <QuizeRight data={qs} continueFun={inc} backFun={dec} />}
                        {index == 4 && <QuizeRight data={qs} continueFun={inc} backFun={dec} />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QuizePage