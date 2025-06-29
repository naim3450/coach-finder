import { useEffect, useState } from "react";
import { Export } from "../icons"
import axiosInstance from "../../../lib/axios.config";

function UserProfile({ obj, userReview, userId }) {

    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    let date = new Date(obj.createdAt);
    const year = date.getFullYear();
    const month = months[date.getMonth()];
    const day = date.getDate();
    const [saveData, setsaveData] = useState([])

    const [arrTypeVal, setarrTypeVal] = useState({
        quiz_one: [],
        quiz_two: [],
        quiz_three: [],
        quiz_four: [],
        quiz_five: [],
    })

    function quizFunc() {
        obj?.quiz?.filter((elm) => {
            // 1
            if (
                elm?.question.toLowerCase() == "What industry are you in?".toLowerCase() ||
                elm?.question.toLowerCase() == "What is your current role?".toLowerCase() ||
                elm?.question.toLowerCase() == "How long have you been in a leadership position?".toLowerCase() ||
                elm?.question.toLowerCase() == "What is the size of your organization?".toLowerCase() ||
                elm?.question.toLowerCase() == "What are your primary goals in joining a peer group?".toLowerCase()
            ) {
                setarrTypeVal((prevState) => ({
                    ...prevState,
                    quiz_one: [...prevState.quiz_one, elm], // Add new value to quiz_one
                }));
            }
            // 2
            else if (
                elm?.question.toLowerCase() == "Are you more focused on growing your business or maintaining stability?".toLowerCase() ||
                elm?.question.toLowerCase() == "Do you prefer working with leaders in similar industries or diverse industries?".toLowerCase() ||
                elm?.question.toLowerCase() == "How would you describe your decision-making process?".toLowerCase()
            ) {
                setarrTypeVal((prevState) => ({
                    ...prevState,
                    quiz_two: [...prevState.quiz_two, elm], // Add new value to quiz_one
                }));
            }
            // 3
            else if (
                elm?.question.toLowerCase() == "How important is confidentiality in your peer group?".toLowerCase() ||
                elm?.question.toLowerCase() == "Do you prefer in-person meetings, virtual meetings, or a mix of both?".toLowerCase() ||
                elm?.question.toLowerCase() == "What frequency of peer group meetings would you prefer?".toLowerCase() ||
                elm?.question.toLowerCase() == "What are the top challenges you currently face as a leader?".toLowerCase() ||
                elm?.question.toLowerCase() == "In which areas are you looking for support or advice?".toLowerCase()
            ) {
                setarrTypeVal((prevState) => ({
                    ...prevState,
                    quiz_three: [...prevState.quiz_three, elm], // Add new value to quiz_one
                }));
            }
            // 4
            else if (
                elm?.question.toLowerCase() == "Do you prefer smaller, more intimate groups, or larger groups with more networking opportunities?".toLowerCase() ||
                elm?.question.toLowerCase() == "How comfortable are you with sharing your challenges openly with peers?".toLowerCase() ||
                elm?.question.toLowerCase() == "What values are most important to you in a peer group?".toLowerCase() ||
                elm?.question.toLowerCase() == "Are you open to joining a peer group that operates in a different time zone?".toLowerCase() ||
                elm?.question.toLowerCase() == "Do you prefer peer groups in your local region or are you open to global groups?".toLowerCase()
            ) {
                setarrTypeVal((prevState) => ({
                    ...prevState,
                    quiz_four: [...prevState.quiz_four, elm], // Add new value to quiz_one
                }));
            }
            else {
                setarrTypeVal((prevState) => ({
                    ...prevState,
                    quiz_five: [...prevState.quiz_five, elm], // Add new value to quiz_one
                }));
            }

        })
    }

    async function getGroup() {
        try {
            const res = await axiosInstance.get(`/groups/save/${userId}`);
            const recive = await res?.data?.data;
            if (res.success) {
                setsaveData(recive);
            }
        } catch (error) {
        } finally {
            // setsaveLoading(false);
        }
    }

    useEffect(() => {
        quizFunc()
        getGroup()

    }, [])

    return (
        <div className="lg:w-[80%] w-full px-1 mx-auto">
            <div className="w-full mt-[75px] md:flex md:items-center md:justify-between">
                <h3 className="lg:text-center lg:content-center text-3xl">
                    Profile details
                </h3>

                <div className="flex items-center mt-5 gap-4">
                    <button className="flex gap-2 items-center text-sm text-[#787878] hover:bg-BtnColor hover:text-white group !px-6 !py-3 rounded-[8px] border">
                        <Export className={"group-hover:!stroke-white !stroke-[#787878]"} /> Export
                    </button>

                    <div className="relative">
                        <button
                            onClick={() => setfilter(!filter)}
                            className={`flex gap-2 items-center text-sm font-semibold bg-BtnColor  text-white px-6 py-3 rounded-[8px]`}
                        >
                            Deactive User
                        </button>

                    </div>

                </div>

            </div>

            <div className="lg:flex justify-between mt-5">
                <div className="left">
                    <div className="h-[80px] w-[80px] rounded-full border mb-3">
                        {
                            obj.profile_picture ?
                                <img src={obj.profile_picture} alt="" className="w-full h-full rounded-full object-cover" />
                                :
                                <div className="w-full h-full rounded-full text-center content-center border-2 font-semibold text-4xl text-BtnColor">
                                    {obj.first_name.charAt(0)}
                                </div>
                        }
                    </div>

                    <div className="border flex rounded-[8px]">
                        <div className="px-[28px] py-[14px] bg-[#E0E0E0] border-r-2 w-[200px] text-center">Name</div>
                        <div className="px-[28px] py-[14px] w-[420px]">{obj.first_name} {obj.last_name}</div>
                    </div>
                    <div className="border flex rounded-[8px]">
                        <div className="px-[28px] py-[14px] bg-[#E0E0E0] border-r-2 w-[200px] text-center">Email</div>
                        <div className="px-[28px] py-[14px] w-[420px]">{obj.email}</div>
                    </div>
                </div>

                <div className="right">
                    <div className="border flex rounded-[8px]">
                        <div className="px-[28px] py-[14px] bg-[#E0E0E0] border-r-2 w-[200px] text-center">Mobile No.</div>
                        <div className="px-[28px] py-[14px] w-[420px]"></div>
                    </div>
                    <div className="border flex rounded-[8px]">
                        <div className="px-[28px] py-[14px] bg-[#E0E0E0] border-r-2 w-[200px] text-center">Joined</div>
                        <div className="px-[28px] py-[14px] w-[420px]">{day} {month} {year}</div>
                    </div>
                    <div className="border flex rounded-[8px]">
                        <div className="px-[28px] py-[14px] bg-[#E0E0E0] border-r-2 w-[200px] text-center">Reviews</div>
                        <div className="px-[28px] py-[14px] w-[420px]">{userReview.length}</div>
                    </div>
                    <div className="border flex rounded-[8px]">
                        <div className="px-[28px] py-[14px] bg-[#E0E0E0] border-r-2 w-[200px] text-center flex items-center justify-center">Saved Groups</div>
                        <div className="px-[28px] py-[14px] w-[420px] flex flex-wrap gap-2">{saveData?.map((el) => <div className="bg-[#F4F4F4] px-2 rounded-md">{el?.group?.name}</div>)}</div>
                    </div>
                </div>

            </div>

            <div className="mt-[52px]">
                <h3 className="text-[18px]">
                    Profile onboarding data
                </h3>
                <h3 className="text-[14px] mt-8">
                    Professional Background & Business Goals
                </h3>

                <div className="mt-3">
                    <div className="border flex rounded-[8px]">
                        <div className="px-[28px] py-[14px] bg-[#E0E0E0] border-r-2 w-[172px]">Industry</div>
                        <div className="px-[28px] py-[14px]">{arrTypeVal?.quiz_one[0]?.answer}</div>
                    </div>
                    <div className="border flex rounded-[8px]">
                        <div className="px-[28px] py-[14px] bg-[#E0E0E0] border-r-2 w-[172px]">Current Role</div>
                        <div className="px-[28px] py-[14px]">{arrTypeVal?.quiz_one[1]?.answer}</div>
                    </div>

                    <div className="border flex rounded-[8px]">
                        <div className="px-[28px] py-[14px] bg-[#E0E0E0] border-r-2 w-[172px]">Experience</div>
                        <div className="py-[14px] flex">
                            {arrTypeVal?.quiz_one[2]?.answer.map((el, idx) => {
                                return (
                                    <div key={idx} className="px-[28px]">
                                        {el}
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    <div className="border flex rounded-[8px]">
                        <div className="px-[28px] py-[14px] bg-[#E0E0E0] border-r-2 w-[172px]">Size of the organization</div>
                        <div className="py-[14px] flex">
                            {arrTypeVal?.quiz_one[3]?.answer.map((el, idx) => {
                                return (
                                    <div key={idx} className="px-[28px]">
                                        {el}
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    <div className="border flex rounded-[8px]">
                        <div className="px-[28px] py-[14px] bg-[#E0E0E0] border-r-2 w-[172px]">Primary goals</div>
                        <div className="py-[14px] flex">
                            {arrTypeVal?.quiz_one[4]?.answer.map((el, idx) => {
                                return (
                                    <div key={idx} className="px-[28px]">
                                        {el}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-[43px]">
                <h3 className="text-[14px] mt-8">
                    Business Goals , Leadership and Personality
                </h3>

                <div className="mt-3">
                    <div className="border flex rounded-[8px]">
                        <div className="px-[28px] py-[14px] bg-[#E0E0E0] border-r-2 w-[172px]">Focused Area</div>
                        <div className="px-[28px] py-[14px]">{arrTypeVal?.quiz_two[0]?.answer}</div>
                    </div>
                    <div className="border flex rounded-[8px]">
                        <div className="px-[28px] py-[14px] bg-[#E0E0E0] border-r-2 w-[172px]">Industry preference</div>
                        <div className="px-[28px] py-[14px]">{arrTypeVal?.quiz_two[1]?.answer}</div>
                    </div>

                    <div className="border flex rounded-[8px]">
                        <div className="px-[28px] py-[14px] bg-[#E0E0E0] border-r-2 w-[172px]">Decision making process</div>
                        <div className="py-[14px] flex">
                            {arrTypeVal?.quiz_two[2]?.answer.map((el, idx) => {
                                return (
                                    <div key={idx} className="px-[28px]">
                                        {el}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-[43px]">
                <h3 className="text-[14px] mt-8">
                    Peer Group Preferences & Challenges and Areas for Support
                </h3>

                <div className="mt-3">
                    <div className="border flex rounded-[8px]">
                        <div className="px-[28px] py-[14px] bg-[#E0E0E0] border-r-2 w-[172px]">Confidentiality</div>
                        <div className="px-[28px] py-[14px]">{arrTypeVal?.quiz_three[0]?.answer}</div>
                    </div>
                    <div className="border flex rounded-[8px]">
                        <div className="px-[28px] py-[14px] bg-[#E0E0E0] border-r-2 w-[172px]">Meeting preference</div>
                        <div className="px-[28px] py-[14px]">{arrTypeVal?.quiz_three[1]?.answer}</div>
                    </div>
                    <div className="border flex rounded-[8px]">
                        <div className="px-[28px] py-[14px] bg-[#E0E0E0] border-r-2 w-[172px]">Frequency of meeting</div>
                        <div className="px-[28px] py-[14px]">{arrTypeVal?.quiz_three[2]?.answer}</div>
                    </div>

                    <div className="border flex rounded-[8px]">
                        <div className="px-[28px] py-[14px] bg-[#E0E0E0] border-r-2 w-[172px]">Challenges you face</div>
                        <div className="py-[14px] flex">
                            {arrTypeVal?.quiz_three[3]?.answer.map((el, idx) => {
                                return (
                                    <div key={idx} className="px-[28px]">
                                        {el}
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    <div className="border flex rounded-[8px]">
                        <div className="px-[28px] py-[14px] bg-[#E0E0E0] border-r-2 w-[172px]">Area of support</div>
                        <div className="py-[14px] flex">
                            {arrTypeVal?.quiz_three[4]?.answer.map((el, idx) => {
                                return (
                                    <div key={idx} className="px-[28px]">
                                        {el}
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                </div>
            </div>

            <div className="mt-[43px]">
                <h3 className="text-[14px] mt-8">
                    Personal and Networking Preferences, Values and Vision, eographic and Time Preferences
                </h3>

                <div className="mt-3">
                    <div className="border flex rounded-[8px]">
                        <div className="px-[28px] py-[14px] bg-[#E0E0E0] border-r-2 w-[172px]">Group Size</div>
                        <div className="px-[28px] py-[14px]">{arrTypeVal?.quiz_four[0]?.answer}</div>
                    </div>
                    <div className="border flex rounded-[8px]">
                        <div className="px-[28px] py-[14px] bg-[#E0E0E0] border-r-2 w-[172px]">Comfort</div>
                        <div className="px-[28px] py-[14px]">{arrTypeVal?.quiz_four[1]?.answer}</div>
                    </div>

                    <div className="border flex rounded-[8px]">
                        <div className="px-[28px] py-[14px] bg-[#E0E0E0] border-r-2 w-[172px]">Comfort</div>
                        <div className="px-[28px] py-[14px]">{arrTypeVal?.quiz_four[2]?.answer}</div>
                    </div>

                    {/* <div className="border flex rounded-[8px]">
                        <div className="px-[28px] py-[14px] bg-[#E0E0E0] border-r-2 w-[172px]">Decision making</div>
                        <div className="py-[14px] flex">
                            {arrTypeVal?.quiz_four[2]?.answer.map((el, idx) => {
                                return (
                                    <div key={idx} className="px-[28px]">
                                        {el}
                                    </div>
                                )
                            })}
                        </div>
                    </div> */}

                    <div className="border flex rounded-[8px]">
                        <div className="px-[28px] py-[14px] bg-[#E0E0E0] border-r-2 w-[172px]">Timezone difference</div>
                        <div className="px-[28px] py-[14px]">{arrTypeVal?.quiz_four[3]?.answer}</div>
                    </div>

                    <div className="border flex rounded-[8px]">
                        <div className="px-[28px] py-[14px] bg-[#E0E0E0] border-r-2 w-[172px]">Regional preference</div>
                        <div className="px-[28px] py-[14px]">{arrTypeVal?.quiz_four[4]?.answer}</div>
                    </div>
                </div>
            </div>

            <div className="mt-[43px]">
                <h3 className="text-[14px] mt-8">
                    Feedback and Learning Style, Commitment and Investment
                </h3>

                <div className="mt-3">
                    <div className="border flex rounded-[8px]">
                        <div className="px-[28px] py-[14px] bg-[#E0E0E0] border-r-2 w-[172px]">Feedback</div>
                        <div className="px-[28px] py-[14px]">{arrTypeVal?.quiz_five[0]?.answer}</div>
                    </div>
                    <div className="border flex rounded-[8px]">
                        <div className="px-[28px] py-[14px] bg-[#E0E0E0] border-r-2 w-[172px]">Engagement preference</div>
                        <div className="px-[28px] py-[14px]">{arrTypeVal?.quiz_five[1]?.answer}</div>
                    </div>

                    <div className="border flex rounded-[8px]">
                        <div className="px-[28px] py-[14px] bg-[#E0E0E0] border-r-2 w-[172px]">Values</div>
                        <div className="px-[28px] py-[14px]">{arrTypeVal?.quiz_five[2]?.answer}</div>
                    </div>

                    <div className="border flex rounded-[8px]">
                        <div className="px-[28px] py-[14px] bg-[#E0E0E0] border-r-2 w-[172px]">High value peer groups</div>
                        <div className="px-[28px] py-[14px]">{arrTypeVal?.quiz_five[3]?.answer}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfile