"use client";
import { use, useState } from 'react'
import Button from './shared/botton';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import DeleteAccount from './shared/deleteAccount';
import { Logout } from '@/assets/icons/logout';
import LogoutAlart from './shared/logoutAlart';
import { useSelector } from 'react-redux';
import useMe from '@/hooks/get-me';
import { useEffect } from 'react';
import axiosInstance from '@/lib/axios.config';
import { Drop } from '@/assets/icons/drop';
import { Cross } from '@/assets/icons/cross';
import { ToastContainer, toast } from 'react-toastify';


const FreePlanDetails = () => {

    const groupIndustry = [
        "Finance",
        "Healthcare",
        "Consumer Goods",
        "Manufacturing",
        "Real Estate",
        "Education",
        "Media",
    ];
    const primaryGoals = [
        "Networking",
        "Scaling my business",
        "Personal development",
        "Leadership insights",
        "Accountability",
        "Problem-solving",
        "Exploring new markets",
        "Mentorship",
    ];
    const focusArea = [
        "Integrity",
        "Innovation",
        "Collaboration",
        "Growth mindset",
        "Accountability",
        "Transparency",
        "Inclusivity",
    ];
    const keyTopics = [
        "Scaling the business",
        "Managing teams",
        "Fundraising",
        "Market competition",
        "Personal development",
        "Operations efficiency",
        "Sales and marketing",
        "Innovation and product development",
    ];


    const [name, setname] = useState('')
    const [loading, setloading] = useState(false)

    const notify = (message) => toast.success(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

    const { userGroup } = useSelector((state) => state.groupInfo)

    const { data, error, success } = useMe()


    // review enable
    const [swipe, setswipe] = useState();
    const [formate, setformate] = useState();
    const [pasObject, setpasObject] = useState({});


    const handleInputChange = (event) => {
        const value = event.target.value;
        if (value.trim() !== '') {
            setpasObject({ password: value });
        } else {
            setpasObject({});
        }
    };

    // useEffect(() => {
    //     if (success) {
    //         setname(`${data?.first_name} ${data?.last_name}`)
    //     }
    // }, [success]);


    const handleAccount = async (e) => {
        e.preventDefault()
        const accountDetails = {}
        const formData = new FormData(e.target);
        formData.forEach((val, key) => {
            accountDetails[key] = val
        })
        const marge = Object.assign({}, accountDetails, pasObject)
        const res = await axiosInstance.put('/users/update', marge);
        if (res.success) {
            // notify(res.message)
        }
    }
    const [isReplying, setIsReplying] = useState(null);

    const [comments, setComments] = useState([
        {
            id: 1,
            arrVal: userGroup?.industry,
            stType: "industry",
            uiArray: groupIndustry
        },
        {
            id: 2,
            arrVal: userGroup?.goals,
            stType: "goals",
            uiArray: primaryGoals
        },
        {
            id: 3,
            arrVal: userGroup?.focus_area,
            stType: "focus area",
            uiArray: focusArea
        },
        {
            id: 4,
            arrVal: userGroup?.key_topics,
            stType: "key topics",
            uiArray: keyTopics
        },
    ]);

    useEffect(() => {
        setComments([
            {
                id: 1,
                arrVal: userGroup?.industry,
                stType: "industry",
                uiArray: groupIndustry
            },
            {
                id: 2,
                arrVal: userGroup?.goals,
                stType: "goals",
                uiArray: primaryGoals
            },
            {
                id: 3,
                arrVal: userGroup?.focus_area,
                stType: "focus area",
                uiArray: focusArea
            },
            {
                id: 4,
                arrVal: userGroup?.key_topics,
                stType: "key topics",
                uiArray: keyTopics
            },
        ])
        setswipe(userGroup?.review)
        setformate(userGroup?.meeting_format)
    }, [userGroup])


    const handelCheck = (idx, option, commentId) => {
        setComments((prev) =>
            prev.map((comment) =>
                comment.id === commentId
                    ? {
                        ...comment,
                        arrVal: comment.arrVal.includes(option.toLowerCase()) ? comment.arrVal.filter(item => item !== option.toLowerCase()) : [...comment.arrVal, option.toLowerCase()],
                    }
                    : comment
            )
        );
    }

    function handleCross(event, option, commentId) {
        event.preventDefault()
        event.stopPropagation();
        setComments((prev) =>
            prev.map((comment) =>
                comment.id === commentId
                    ? {
                        ...comment,
                        arrVal: comment.arrVal.includes(option.toLowerCase()) ? comment.arrVal.filter(item => item !== option.toLowerCase()) : comment.arrVal,
                    }
                    : comment
            )
        );

        if (comments?.arrVal?.includes(option.toLowerCase())) {

        }
    }

    const handleGroup = async (e) => {
        e.preventDefault()
        const groupDetails = { review: swipe, meeting_format: formate }
        const formData = new FormData(e.target);
        formData.forEach((val, key) => {
            groupDetails[key] = val
        })
        const obj = { industry: comments[0].arrVal, goals: comments[1].arrVal, focus_area: comments[2].arrVal, key_topics: comments[3].arrVal };
        const marge = Object.assign({}, groupDetails, obj)

        marge.pricing = Number(marge.pricing)
        try {
            setloading(true)
            const res = await axiosInstance.patch(`/groups/${userGroup._id}`, marge);
            if (res.success) {
                notify(res.message)
                // window.location.reload()
            }
        } catch (error) {

        }
        finally {
            setloading(false)
        }


    }

    const handleSelect = (val) => {
        setformate(val)
    }

    const [logOutStatus, setlogOutStatus] = useState(false)
    const logOut = () => {
        setlogOutStatus(true)
    };

    return (
        <section className='bg-BgColor pb-20'>
            {/* <div>
                <ToastContainer />
            </div> */}

            {/* account details start */}
            <div className="">
                <form onSubmit={handleAccount} className="container w-full h-[495px] rounded-[12px] drop-shadow-sm bg-white mt-6 p-6">
                    <h3 className='font-semibold text-primaryColor text-[24px]'>Account Details</h3>
                    <h4 className='font-semibold text-primaryColor text-[20px]'>Basic Info</h4>


                    <div className="relative mt-6">
                        <Label htmlFor="fullname" className="absolute -top-[7px] left-3 bg-white font-normal text-[14px] text-[#919EAB]">Full Name</Label>
                        <Input
                            required
                            id="fullname"
                            defaultValue={data?.first_name}
                            name="first_name"
                            className="h-[50px] focus-visible:ring-0"
                            type="text"
                        />
                    </div>

                    <div className=" relative mt-5">
                        <Label htmlFor="email" className="absolute -top-[7px] left-3 bg-white font-normal text-[14px] text-[#919EAB]">Your email address</Label>
                        <Input
                            required
                            id="email"
                            defaultValue={data?.email}
                            className="h-[50px] focus-visible:ring-0"
                            type="email"
                            name="email"
                            placeholder="account@email.com"

                        />
                    </div>

                    <div className="relative mt-5">
                        <Label htmlFor="number" className="absolute -top-[7px] left-3 bg-white font-normal text-[14px] text-[#919EAB]">Phone Number</Label>
                        <Input
                            required
                            id="number"
                            defaultValue={data?.phone}

                            className="h-[50px] focus-visible:ring-0"
                            type="number"
                            name="phone"
                            placeholder="Inter Your Number"

                        />
                    </div>

                    <div className="relative mt-5">
                        <Label htmlFor="password" className="absolute -top-[7px] left-3 bg-white font-normal text-[14px] text-[#919EAB]">Your password</Label>
                        <Input
                            onChange={handleInputChange}
                            id="password"
                            className="h-[50px] focus-visible:ring-0"
                            type="password"
                            placeholder="*******"

                        />
                    </div>

                    <Button type="submit" className='mt-8 !py-3'>
                        Save Changes
                    </Button>

                </form>
            </div>
            {/* account details end */}


            {/* group details start */}
            <div className="py-10 container rounded-[8px] bg-white drop-shadow-sm mt-4">
                <h3 className='text-[24px] font-semibold text-primaryColor'>Group Details</h3>
                <form onSubmit={handleGroup}>
                    <div className="mb-5 relative mt-6">
                        <label htmlFor="organization" className="block text-[#919EAB] font-normal text-[14px] mb-2 absolute left-2 -top-[10px] bg-white">
                            Location
                        </label>
                        <input
                            type="text"
                            id="organization"
                            name='country'
                            defaultValue={userGroup?.country}

                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-0"
                        />
                    </div>

                    {/* select0 options start  */}
                    <div className="mt-5">
                        <div className="grid md:grid-cols-2 grid-cols-1 w-full gap-6 mt-5">
                            {
                                comments?.map((el) => {

                                    return (
                                        <div key={el.id} className={`relative`} onClick={() => setIsReplying(isReplying == el.id ? null : el.id)}>
                                            <div className="relative border rounded-md p-[12px] w-full min-h-[48px]">

                                                <p className='text-[12px] text-[#919EAB] absolute -top-[10px] bg-white'>
                                                    {el.stType}
                                                </p>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex flex-wrap gap-3 w-full h-full text-primaryColor text-sm">

                                                        {
                                                            el.arrVal?.map((option, idx) => (
                                                                <div key={idx} className='flex gap-1 px-3 items-center py-2 rounded-[50px] bg-[#F4F4F4]'>{option.charAt(0).toUpperCase() + option.slice(1)}
                                                                    <button onClick={(event) => handleCross(event, option, el.id)}>
                                                                        <Cross />
                                                                    </button>
                                                                </div>

                                                            ))

                                                        }
                                                    </div>

                                                    <Drop className="stroke-[#637381]" />

                                                </div>

                                            </div>


                                            {isReplying === el.id &&
                                                <div className={`bg-white rounded-md cursor-pointer shadow-md w-full px-4 py-3 absolute top-[110%] z-20 left-0 flex flex-col gap-4`}>
                                                    {
                                                        el?.uiArray?.map((option, idx) => {

                                                            return (

                                                                <div key={idx} onClick={() => handelCheck(idx, option, el.id)} className="flex items-center   bg-white hover:bg-[#F4F4F4]">

                                                                    <h3 className='text-base text-SecondaryColor'>{option.charAt(0).toUpperCase() + option.slice(1)}</h3>

                                                                </div>

                                                            )

                                                        })

                                                    }

                                                </div>
                                            }
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    {/* select0 options end  */}

                    {/* Industry */}
                    <div className="relative mt-5">
                        <label htmlFor="organization" className="block text-[#919EAB] font-normal text-[14px] mb-2 absolute left-3 top-[3px] bg-white">
                            About Group
                        </label>

                        <textarea
                            required
                            id="about"
                            maxLength="100"
                            defaultValue={userGroup?.about}
                            name="about"
                            placeholder="..."

                            className="border w-full rounded-[8px] outline-none mt-3 font-medium text-[12px] text-[#949494] pl-[23px] pr-8 pt-[20px] !h-[120px]"
                        />
                    </div>
                    {/* Meeting Format */}
                    <div className="mb-4 relative mt-5">
                        <label htmlFor="fullName" className="block text-[#919EAB] font-normal text-[14px] mb-2 absolute left-2 -top-[10px] bg-white">
                            Meeting Format
                        </label>
                        <Select onValueChange={handleSelect} defaultValue={formate} >
                            <SelectTrigger className="lg:w-[1170px] w-full h-[56px]">
                                <SelectValue placeholder="In person" />
                            </SelectTrigger>
                            <SelectContent className="">
                                <SelectItem className=" " value="In person">In person</SelectItem>
                                <SelectItem value="Virtual">Virtual</SelectItem>
                                <SelectItem value="Hybrid">Hybrid</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>



                    {/* Pricing */}
                    <div className="mb-5 relative mt-6">
                        <label htmlFor="Pricing" className="block text-[#919EAB] font-normal text-[14px] mb-2 absolute left-2 -top-[10px] bg-white">
                            Pricing
                        </label>
                        <input
                            defaultValue={userGroup?.pricing}
                            type="text"
                            id="Pricing"
                            name='pricing'
                            placeholder="/hr"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-0 h-[56px]"
                        />
                    </div>

                    {/* Registration */}
                    <div className="mb-6 relative">
                        <label htmlFor="Registration" className="block text-[#919EAB] font-normal text-[14px] mb-2 absolute left-2 -top-[10px] bg-white">
                            Registration Link
                        </label>
                        <input
                            defaultValue={userGroup?.registration_link}
                            name='registration_link'
                            type="text"
                            id="Registration"
                            placeholder=" "
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-0 h-[56px]"
                        />
                    </div>

                    <div className="flex gap-2 mt-6">
                        <div onClick={() => setswipe(!swipe)}
                            className={`h-[20px] w-9  rounded-2xl relative before:h-4 before:w-4 before:rounded-full before:bg-white before:absolute before:top-1/2 before:-translate-y-1/2 ${swipe
                                ? "before:right-[2px] before:duration-300 bg-blue-600"
                                : "before:left-[2px] before:duration-300 bg-gray-400"
                                }`}
                        ></div>
                        <h3 className="font-semibold text-[12px] text-primaryColor">
                            Enable reviews
                        </h3>
                    </div>

                    {/* BTN start */}
                    <Button type="submit" className='!py-3 mt-6'>Save Changes</Button>
                    {/* BTN end */}
                </form>
                {/* group details end */}
            </div>

            {/* Delete Acount start */}

            <div className="">
                <DeleteAccount />
            </div>
            {/* Delete Acount end */}

            <div className="container mt-10">
                <Button onClick={logOut} className='flex gap-2 !py-3'>
                    <Logout />
                    Logout
                </Button>
            </div>

            {
                logOutStatus &&
                <div className="h-screen w-screen bg-black/35 fixed top-0 left-0 flex items-center justify-center">
                    <LogoutAlart onClick={() => setlogOutStatus(false)} />
                </div>
            }
            {/* <div className="">
                <CoverPhotoAlart />
            </div> */}

        </section>
    )
}

export default FreePlanDetails