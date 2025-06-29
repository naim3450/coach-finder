"use client";
import React, { useEffect, useState } from "react";
import Camera from '../../../assets/camera.png'
import Image from "next/image";
import useMe from "@/hooks/get-me";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "@/lib/axios.config";
import { userGroupDetails } from "@/redux/groupSlice";
import uploadImageToCloudinary from "@/utils/upload-images";
import { ToastContainer, toast } from 'react-toastify';
import { message } from "antd";
import { useRouter } from "next/navigation";

const Layout = ({ children }) => {
  const [coverFile, setcoverFile] = useState(null);
  const [picFile, setpicFile] = useState(null);
  const [pictureUrl, setpictureUrl] = useState(null);
  const [coverUrl, setcoverUrl] = useState(null);


  const { data, error, loading, success } = useMe();

  const dispatch = useDispatch()

  async function getgroup() {
    if (success) {
      const res = await axiosInstance.get(`/groups?user=${data?._id}`);
      const recive = await res.data.data
      const [obj] = recive;
      dispatch(userGroupDetails(obj))
    }
  }

  useEffect(() => {
    if (!loading) {
      getgroup()
    }
  }, [success])


  const { userGroup } = useSelector((state) => state.groupInfo);

  useEffect(() => {
    setpictureUrl(userGroup?.profile_picture);
    setcoverUrl(userGroup?.cover_picture);
  }, [userGroup])

  const notify = (message) => toast.success(message, {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });


  const picUplod = (e) => {
    setpicFile(e.target.files[0])
    setpictureUrl(URL.createObjectURL(e.target.files[0]));
  };

  const handleCover = async (e) => {
    setcoverFile(e.target.files[0])
    setcoverUrl(URL.createObjectURL(e.target.files[0]));
  };


  const patchImage = async () => {
    const uploadImage = await uploadImageToCloudinary(picFile);
    if (uploadImage.success) {
      const res = await axiosInstance.patch(`/groups/${userGroup._id}`, { profile_picture: uploadImage.data.urls[0] })
      if (res.success) {
        notify(res.message)
      }
    }
  }

  const patchCover = async () => {
    const uploadCover = await uploadImageToCloudinary(coverFile);
    if (uploadCover.success) {
      const res = await axiosInstance.patch(`/groups/${userGroup._id}`, { cover_picture: uploadCover.data.urls[0] })
      if (res.success) {
        notify(res.message)
      }
    }
  }

  useEffect(() => {
    if (picFile) {
      patchImage()
    }
  }, [picFile])

  useEffect(() => {
    if (coverFile) {
      patchCover()
    }
  }, [coverFile])


  return (
    <div className="bg-BgColor lg:py-5 py-7">
      <div>
        <ToastContainer />
      </div>
      {
        data?.account_type == "basic" ?
          <div className="lg:w-[1200px] w-full  mx-auto h-[420px] bg-white rounded-lg drop-shadow-sm">
            {/* Header Section */}
            <div className="relative bg-[#D9D9D9] h-[220px] mx-auto lg:w-[1200px] w-full   rounded-[10px]">
              <button className="absolute bottom-2 right-8  h-10 w-10 border border-white  p-2 rounded-sm  ">
                <Image src={Camera} alt="Camera" />
              </button>

            </div>

            {/* Profile Details */}
            <div className="p-6">
              <div className="flex items-center">

                <div className="relative -mt-16 lg:w-24 lg:h-24 h-20 w-20 border-4 border-white rounded-full overflow-hidden">
                  <div className="flex gap-x-5">
                    <div className="border-2 bg-BgColor h-20 w-20 lg:w-[166px] lg:h-[166px] border-BgColor rounded-full overflow-hidden">
                      <label htmlFor="profileImg">
                        <div className="w-full h-full rounded-full cursor-pointer">
                          {pictureUrl ? (
                            <Image
                              src={pictureUrl}
                              alt="description"
                              objectFit="cover"
                              layout="fill"
                              className="rounded-full"
                            />
                          ) : (
                            <div className="flex w-full h-full rounded-full flex-col items-center">
                              {/* <Camera className="!h-7 !w-7 mt-[30px]" /> */}
                              <h3 className="text-[#919EAB] text-center mt-5 text-base">
                                Upload
                              </h3>
                            </div>
                          )}
                        </div>
                        <input
                          type="file"
                          id="profileImg"
                          className="absolute hidden"
                          accept=".jpg,.jpeg,.png,.svg,.gif"
                          onChange={picUplod}
                        />
                      </label>
                    </div>
                  </div>
                </div>

                <div className="ml-4">
                  <h3 className="font-semibold lg:text-[32px] text-[14px] text-primaryColor0">
                    {data?.first_name} {data?.last_name}
                  </h3>
                  <p className="font-normal text-[12px] md:text-base text-[#9397AD]">
                    {data?.email}
                  </p>
                </div>
              </div>

              {/* Plan Section */}
              <div className="mt-4 ml-28">
                <span className="inline-block bg-[#E0E0E0] text-[#262626] text-xs px-4 py-2 rounded-[8px]">
                  Free Plan
                </span>
              </div>
            </div>
          </div>
          :

          <div className="lg:w-[1200px] w-full  mx-auto h-[420px] bg-white rounded-lg drop-shadow-sm">
            {/* Header Section */}
            <div className="relative bg-[#D9D9D9] h-[220px] mx-auto lg:w-[1200px] w-full rounded-[10px]">
              {/* <div className="bg-red-300 h-full w-full"></div> */}
              {coverUrl && <Image src={coverUrl} alt="coverUrl" objectFit="cover" layout="fill" />}

              <label htmlFor="coverImage" className="absolute bottom-2 right-8  h-10 w-10 border  z-50  p-2 rounded-sm">
                <Image src={Camera} alt="Camera" />
              </label>
              <input onChange={handleCover} type="file" id="coverImage" className="hidden" />
            </div>

            {/* Profile Details */}
            <div className="p-6">

              <div className="flex items-center">
                <div className="relative -mt-16 lg:w-24 lg:h-24 h-20 w-20 border-4 border-white rounded-full overflow-hidden">
                  <div className="flex gap-x-5">

                    <div className="border-2 bg-BgColor h-20 w-20 lg:w-[166px] lg:h-[166px] border-BgColor rounded-full overflow-hidden">
                      <label htmlFor="profileImg">
                        <div className="w-full h-full rounded-full cursor-pointer">
                          {pictureUrl ? (
                            <Image
                              src={pictureUrl}
                              alt="description"
                              objectFit="cover"
                              layout="fill"
                              className="rounded-full"
                            />
                          ) : (
                            <div className="flex w-full h-full rounded-full flex-col items-center">
                              {/* <Camera className="!h-7 !w-7 mt-[30px]" /> */}
                              <h3 className="text-[#919EAB] text-center mt-5 text-base">
                                Upload
                              </h3>
                            </div>
                          )}
                        </div>
                        <input
                          type="file"
                          id="profileImg"
                          className="absolute hidden"
                          accept=".jpg,.jpeg,.png,.svg,.gif"
                          onChange={picUplod}
                        />
                      </label>
                    </div>

                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold lg:text-[32px] text-[14px] text-primaryColor0">
                    {data?.first_name} {data?.last_name}
                  </h3>
                  <p className="font-normal text-[12px] md:text-base text-[#9397AD]">
                    {data?.email}
                  </p>
                </div>
              </div>

              {/* Plan Section */}
              <div className="mt-4 ml-28">
                <span className="inline-block bg-[#E0E0E0] text-[#262626] text-xs px-4 py-2 rounded-[8px]">
                  {data?.account_type == "essential" ? "Essential Plan"
                    : data?.account_type == "premium" ? "Premium Plan"
                      : "Advanced Plan"}
                </span>
              </div>
            </div>
          </div>
      }

      <div>
        {children}
      </div>

    </div>
  );
};

export default Layout;
