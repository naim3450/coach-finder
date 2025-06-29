"use client";
import useMe from "@/hooks/get-me";
import React, { useEffect, useState } from "react";
import Camera from "../../../assets/camera.png";
import Image from "next/image";
import Map from "../../../assets/map.png";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "@/lib/axios.config";
import { Star } from "@/components/icons";
import { FaStarHalfAlt } from "react-icons/fa";
import uploadImageToCloudinary from "@/utils/upload-images";
import { pageShowFunc4, userGroupDetails } from "@/redux/groupSlice";
import Button from "@/components/shared/botton";
import { useRouter } from "next/navigation";

const Layout = ({ children }) => {
    const { data, error, loading, success } = useMe();
    const { userGroup } = useSelector((state) => state.groupInfo);

    const [picFile, setpicFile] = useState(null);
    const [coverFile, setcoverFile] = useState(null);
    const [pictureUrl, setpictureUrl] = useState(null);
    const [coverPicUrl, setcoverPicUrl] = useState(userGroup);

    const dispatch = useDispatch();

    async function getgroup() {
        const res = await axiosInstance.get(`/groups?user=${data?._id}`);
        const recive = await res.data.data;
        const [obj] = recive;
        dispatch(userGroupDetails(obj));
    }

    useEffect(() => {
        if (success) {
            getgroup();
        }
    }, [success]);

    const picUplod = (e) => {
        setpicFile(e.target.files[0]);
        setpictureUrl(URL.createObjectURL(e.target.files[0]));

        try {
            const res = uploadImageToCloudinary(e.target.files);
        } catch (error) {
            alert("Failed to upload profile picture");
        }
    };

    // const coverUpload = async (e) => {
    //     setcoverFile(e.target.files[0]);
    //     setcoverPicUrl(URL.createObjectURL(e.target.files[0]));
    // };

    useEffect(() => {
        async function updateUser() {
            const uploadImage = await uploadImageToCloudinary(coverFile);
            if (uploadImage.success) {
                const res = await axiosInstance.patch(`/groups/${userGroup?._id}`, {
                    cover_picture: uploadImage.data.urls[0],
                });
            }
        }
        updateUser();
    }, [coverFile]);

    useEffect(() => {
        async function updateUser() {
            const uploadImage = await uploadImageToCloudinary(picFile);
            if (uploadImage.success) {
                const res = await axiosInstance.patch(`/groups/${userGroup?._id}`, {
                    profile_picture: uploadImage.data.urls[0],
                });
            }
        }
        updateUser();
    }, [picFile]);

    const [review, setreview] = useState([]);

    useEffect(() => {
        async function getReview() {
            const res = await axiosInstance.get(`/reviews/?group=${userGroup?._id}`);
            const recive = await res?.data?.data;
            setreview(recive);
        }
        getReview();
    }, [userGroup]);

    const total = review
        ?.map((el) => el.rating)
        ?.reduce((sum, rating) => sum + rating, 0);
    const average = total / review.length;

    const router = useRouter()
    if (review.length == 0) {
        return (
            <div className="py-5 flex flex-col justify-center items-center">
                <h2 className="text-xl font-semibold text-center">Group dosen't exixt</h2>
                <Button className="font-bold text-sm text-BtnColor !w-[140px] mt-2" onClick={() => { dispatch(pageShowFunc4(true)), router.push('/create-group') }}>Create group</Button>
            </div>
        )
    }

    return (
        <div>
            {/* <Toaster position="bottom-right" richColors /> */}
            {data?.account_type !== "basic" ? (
                <div className="lg:w-[1200px] w-full mx-auto bg-white">
                    {/* Header Section */}
                    <div className="relative bg-[#D9D9D9] h-[220px] mx-auto lg:w-[1200px] w-full rounded-[12px]">
                        <div className="">
                            <div className="w-full h-full ! absolute top-0 left-0">
                                {
                                    userGroup?.cover_picture &&
                                    <Image
                                        src={userGroup?.cover_picture}
                                        alt="description"
                                        objectFit="cover"
                                        layout="fill"
                                        className="cursor-pointer"
                                    />
                                }
                            </div>
                        </div>
                    </div>

                    {/* Profile Details */}
                    <div className="p-6 relative">
                        <div className="lg:flex gap-x-5 absolute -top-20">
                            <div className="border-2 bg-BgColor md:w-[144px] w-[100px] h-[100px] md:h-[144px] border-gray-300 rounded-full p-2 overflow-hidden relative cursor-pointer">
                                <div className="w-full h-full rounded-full">
                                    {
                                        userGroup?.profile_picture &&
                                        <Image
                                            src={userGroup?.profile_picture}
                                            alt="description"
                                            objectFit="cover"
                                            layout="fill"
                                            className="rounded-full cursor-pointer"
                                        />
                                    }
                                </div>
                            </div>

                            <div className="lg:mt-24 mt-10">
                                <h3 className="lg:font-extrabold font-medium  text-primaryColor text-[24px] lg:text-[32px]">
                                    {userGroup?.name}
                                </h3>

                                <div className="flex gap-1">
                                    <Image src={Map} alt="Map" className="h-5 w-5 mt-[2px]" />
                                    <p className="text-[#0D0D0E] font-medium text-[16px] opacity-40">
                                        {userGroup?.country} {userGroup?.city}
                                    </p>
                                </div>

                                <div className="flex space-x-2 py-3">
                                    <div className="flex">
                                        {Array.from({ length: 5 }, (e, idx) => {
                                            let number = idx + 0.5;
                                            return (
                                                <div key={idx}>
                                                    {average?.toFixed(1) >= idx + 1 ? (
                                                        <Star />
                                                    ) : average?.toFixed(1) >= number ? (
                                                        <FaStarHalfAlt className="text-[#FDAE53] text-[19px]" />
                                                    ) : (
                                                        <Star className={"fill-none stroke-[#FDAE53]"} />
                                                    )}
                                                </div>
                                            );
                                        })}
                                        <p className="text-gray-500 font-normal text-sm pl-2 ">
                                            {average?.toFixed(1)} {`(${review?.length} reviews)`}
                                        </p>
                                    </div>
                                </div>

                                <div className="hidden sm:block">
                                    <div className="mt-4 flex gap-x-5">
                                        <button className="inline-block bg-[#E0E0E0] text-[#262626] text-xs px-4 py-2 rounded-[43px]">
                                            {userGroup?.industry}
                                        </button>
                                        <button className="inline-block bg-[#E0E0E0] text-[#262626] text-xs px-4 py-2 rounded-[43px]">
                                            {userGroup?.goals}
                                        </button>
                                        <button className="inline-block bg-[#E0E0E0] text-[#262626] text-xs px-4 py-2 rounded-[43px]">
                                            {userGroup?.focus_area}
                                        </button>
                                        <button className="inline-block bg-[#E0E0E0] text-[#262626] text-xs px-4 py-2 rounded-[43px]">
                                            {userGroup?.key_topics}
                                        </button>
                                    </div>
                                </div>

                                {/* RESPONSIVE BUTTON  Start*/}
                                <div className="lg:w-[1200px] w-full block  sm:hidden py-5 rounded-[8px] mt-4">
                                    <Splide
                                        className="w-full"
                                        options={{
                                            perPage: 2,
                                            perMove: 1,
                                            arrows: false,
                                            pagination: false,
                                            gap: -6,
                                        }}
                                        aria-label="My Favorite Images"
                                    >
                                        <SplideSlide>
                                            <button className="inline-block bg-[#E0E0E0] text-[#262626] text-xs px-4 py-2 rounded-[43px]">
                                                {userGroup?.industry}
                                            </button>
                                        </SplideSlide>
                                        <SplideSlide>
                                            <button className="inline-block bg-[#E0E0E0] text-[#262626] text-xs px-4 py-2 rounded-[43px]">
                                                {userGroup?.goals}
                                            </button>
                                        </SplideSlide>
                                        <SplideSlide>
                                            <button className="inline-block bg-[#E0E0E0] text-[#262626] text-xs px-4 py-2 rounded-[43px]">
                                                {userGroup?.focus_area}
                                            </button>
                                        </SplideSlide>
                                        <SplideSlide>
                                            <button className="inline-block bg-[#E0E0E0] text-[#262626] text-xs px-4 py-2 rounded-[43px]">
                                                {userGroup?.key_topics}
                                            </button>
                                        </SplideSlide>
                                    </Splide>
                                </div>
                                {/* RESPONSIVE BUTTON END */}
                            </div>
                        </div>
                        {/* btn Section */}
                    </div>
                </div>
            ) : (
                <div className="lg:w-[1200px] w-full mx-auto bg-white">
                    {/* Header Section */}
                    <div className="relative bg-[#D9D9D9] h-[220px] mx-auto lg:w-[1200px] w-full rounded-[12px]">
                        <div className="">
                            <div className="w-full h-full">
                                {
                                    userGroup?.cover_picture &&
                                    <Image
                                        src={userGroup?.cover_picture}
                                        alt="description"
                                        objectFit="cover"
                                        layout="fill"
                                        className="cursor-pointer"
                                    />
                                }
                            </div>
                        </div>
                    </div>

                    {/* Profile Details */}
                    <div className="p-6 relative">
                        <div className="lg:flex gap-x-5 absolute -top-20">
                            <div className="border-2 bg-BgColor md:w-[144px] w-[100px] h-[100px] md:h-[144px] border-gray-300 rounded-full p-2 overflow-hidden relative cursor-pointer">
                                <div className="w-full h-full rounded-full">
                                    {
                                        userGroup?.profile_picture &&
                                        <Image
                                            src={userGroup?.profile_picture}
                                            alt="description"
                                            objectFit="cover"
                                            layout="fill"
                                            className="rounded-full cursor-pointer"
                                        />
                                    }
                                </div>
                            </div>

                            <div className="lg:mt-24 mt-10">
                                <h3 className="lg:font-extrabold font-medium  text-primaryColor text-[24px] lg:text-[32px]">
                                    {userGroup?.name}
                                </h3>

                                <div className="flex gap-1">
                                    <Image src={Map} alt="Map" className="h-5 w-5 mt-[2px]" />
                                    <p className="text-[#0D0D0E] font-medium text-[16px] opacity-40">
                                        {userGroup?.country} {userGroup?.city}
                                    </p>
                                </div>

                                <div className="flex space-x-2 py-3">
                                    <div className="flex">
                                        {Array.from({ length: 5 }, (e, idx) => {
                                            let number = idx + 0.5;
                                            return (
                                                <div key={idx}>
                                                    {average?.toFixed(1) >= idx + 1 ? (
                                                        <Star />
                                                    ) : average?.toFixed(1) >= number ? (
                                                        <FaStarHalfAlt className="text-[#FDAE53] text-[19px]" />
                                                    ) : (
                                                        <Star className={"fill-none stroke-[#FDAE53]"} />
                                                    )}
                                                </div>
                                            );
                                        })}
                                        <p className="text-gray-500 font-normal text-sm pl-2 ">
                                            {average?.toFixed(1)} {`(${review?.length} reviews)`}
                                        </p>
                                    </div>
                                </div>

                                <div className="hidden sm:block">
                                    <div className="mt-4 flex gap-x-5">
                                        <button className="inline-block bg-[#E0E0E0] text-[#262626] text-xs px-4 py-2 rounded-[43px]">
                                            {userGroup?.industry}
                                        </button>
                                        <button className="inline-block bg-[#E0E0E0] text-[#262626] text-xs px-4 py-2 rounded-[43px]">
                                            {userGroup?.goals}
                                        </button>
                                        <button className="inline-block bg-[#E0E0E0] text-[#262626] text-xs px-4 py-2 rounded-[43px]">
                                            {userGroup?.focus_area}
                                        </button>
                                        <button className="inline-block bg-[#E0E0E0] text-[#262626] text-xs px-4 py-2 rounded-[43px]">
                                            {userGroup?.key_topics}
                                        </button>
                                    </div>
                                </div>

                                {/* RESPONSIVE BUTTON  Start*/}
                                <div className="lg:w-[1200px] w-full block  sm:hidden py-5 rounded-[8px] mt-4">
                                    <Splide
                                        className="w-full"
                                        options={{
                                            perPage: 2,
                                            perMove: 1,
                                            arrows: false,
                                            pagination: false,
                                            gap: -6,
                                        }}
                                        aria-label="My Favorite Images"
                                    >
                                        <SplideSlide>
                                            <button className="inline-block bg-[#E0E0E0] text-[#262626] text-xs px-4 py-2 rounded-[43px]">
                                                {userGroup?.industry}
                                            </button>
                                        </SplideSlide>
                                        <SplideSlide>
                                            <button className="inline-block bg-[#E0E0E0] text-[#262626] text-xs px-4 py-2 rounded-[43px]">
                                                {userGroup?.goals}
                                            </button>
                                        </SplideSlide>
                                        <SplideSlide>
                                            <button className="inline-block bg-[#E0E0E0] text-[#262626] text-xs px-4 py-2 rounded-[43px]">
                                                {userGroup?.focus_area}
                                            </button>
                                        </SplideSlide>
                                        <SplideSlide>
                                            <button className="inline-block bg-[#E0E0E0] text-[#262626] text-xs px-4 py-2 rounded-[43px]">
                                                {userGroup?.key_topics}
                                            </button>
                                        </SplideSlide>
                                    </Splide>
                                </div>
                                {/* RESPONSIVE BUTTON END */}
                            </div>
                        </div>

                        {/* btn Section */}
                    </div>
                </div>
            )}

            <div>{children}</div>
        </div>
    );
};

export default Layout;
