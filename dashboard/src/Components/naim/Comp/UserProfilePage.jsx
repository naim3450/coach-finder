import React, { useEffect, useState } from 'react'
import Logo from "../../../assets/log_logo.png";
import Sidebar from './Sidebar'
import UserProfile from './userProfile'
import { useParams } from 'react-router';
import axiosInstance from '../../../lib/axios.config';
import Loading from '../../loading';
import { IoMenu } from 'react-icons/io5';

const UserProfilePage = () => {
    const { id } = useParams()

    const [usersId, setusersId] = useState([]);
    const [userData, setuserData] = useState([]);
    const [isLoading, setisLoading] = useState(true);
    const [userReview, setuserReview] = useState([]);

    useEffect(() => {
        async function getUser() {
            try {
                const res = await axiosInstance.get('/users');
                const response = await axiosInstance.get(`/users/${id}`);
                setuserData(response?.data)
                const data = res.data.data;
                let idArray = data.map((el) => {
                    return el._id
                })
                setusersId(idArray)
            } catch (error) {
                throw new Error(error)
            }
            finally {
                setisLoading(false)
            }
        }
        getUser()

        async function fetchReview() {
            try {
                const res = await axiosInstance.get(`/reviews?users=${id}`);
                const data = res.data.data;
                let userReviewStatus = data.filter((elm) => {
                    if (elm.user._id == id) {
                        return elm
                    }
                })
                setuserReview(userReviewStatus)
            } catch (error) {
                throw new Error(error)
            }
        }
        fetchReview()
    }, []);


    const [first, setfirst] = useState(false)

    const handleMenu = () => {
        setfirst(true)
    }
    const handleClose = () => {
        setfirst(false)
    }

    if (usersId?.includes(id)) {
        return (
            <div>
                <div className="bg-white bg-opacity-60 shadow-[rgba(145,_158,_171,_0.10)_-8px_8px_24px_-4px] h-[90px] pl-[68px] pt-6">
                    <img src={Logo} alt="Logo" className="h-[37px] w-[83px] object-cover" />
                </div>
                <div className="flex relative">
                    <button onClick={handleMenu} className={first ? "hidden" : "absolute -top-16 right-5 xl:hidden block"}>
                        <IoMenu className='text-[26px]' />
                    </button>
                    <Sidebar className2={first ? "left-0" : "!left-[100%]"} onClick={handleClose} />
                    <UserProfile obj={userData} userReview={userReview} userId={id} />
                </div>
            </div>
        )
    }
    else if (isLoading) {
        return <Loading />
    }
}

export default UserProfilePage