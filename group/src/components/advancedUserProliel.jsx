import Advancedplandetails from '@/components/advancedplandetails'
import { User } from '@/assets/icons/user';
import { Lock } from '@/assets/icons/lock';
import { Crown } from '@/assets/icons/crown';
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import ChangePassword from '@/components/shared/changePassword';
import AdvancedSubscription from '@/components/shared/advancedSubscription';
import { useState } from 'react';

const AdvancedUserProliel = () => {
    const [activePage, setactivePage] = useState(0);
    return (
        <div>
            {/* btn  start*/}
            <div className="py-5 container rounded-[8px] bg-white drop-shadow-sm mt-4 sm:block hidden lg:block">
                <div className="flex gap-x-9">

                    <div className="group">
                        <button onClick={() => setactivePage(0)} className={`font-semibold px-3 py-2 rounded-[8px] text-[14px] flex justify-center items-center gap-x-2 ${activePage == 0 ? "text-white bg-BtnColor" : "bg-[#E0E0E0] text-[#262626]"}`}>
                            <User className={`${activePage == 0 ? "stroke-white" : "stroke-[#262626]"}`} />
                            My Profile
                        </button>
                    </div>

                    <div className="group">
                        <button onClick={() => setactivePage(1)} className={`font-semibold px-3 py-2 rounded-[8px] text-[14px] flex justify-center items-center gap-x-2 ${activePage == 1 ? "text-white bg-BtnColor" : "bg-[#E0E0E0] text-[#262626]"}`}>
                            <Crown className={`${activePage == 1 ? "stroke-white" : "stroke-[#262626]"}`} />
                            Subscription Plan
                        </button>
                    </div>

                    <div className="group">
                        <button onClick={() => setactivePage(2)} className={`font-semibold px-3 py-2 rounded-[8px] text-[14px] flex justify-center items-center gap-x-2 ${activePage == 2 ? "text-white bg-BtnColor" : "bg-[#E0E0E0] text-[#262626]"}`}>
                            <Lock className={`${activePage == 2 ? "stroke-white" : "stroke-[#262626]"}`} />
                            Change password
                        </button>
                    </div>

                </div>
            </div>
            {/* btn end*/}

            {/* responsive button */}
            <div className="lg:w-[1200px] block sm:hidden py-5 rounded-[8px] bg-white drop-shadow-sm mt-4">
                <Splide
                    className=""
                    options={{
                        perPage: 2,
                        perMove: 2,
                        arrows: false,
                        pagination: false,
                        gap: 2,
                    }}
                    aria-label="My Favorite Images"
                >
                    <SplideSlide >
                        <div className="group">
                            <button onClick={() => setactivePage(0)} className="bg-[#E0E0E0] text-[#262626] font-semibold px-3 py-2 rounded-[8px] text-[14px] flex justify-center items-center gap-x-1 group-hover:text-white group-hover:bg-BtnColor">
                                <User className="stroke-[#262626] group-hover:stroke-white" />
                                My Profile
                            </button>
                        </div>
                    </SplideSlide>
                    <SplideSlide >
                        <div className="group">
                            <button onClick={() => setactivePage(1)} className="bg-[#E0E0E0] text-[#262626] font-semibold px-3 py-2 rounded-[8px] text-[14px] flex justify-center items-center gap-x-1 group-hover:text-white group-hover:bg-BtnColor">
                                <Crown className="stroke-[#262626] group-hover:stroke-white" />
                                Subscription Plan
                            </button>
                        </div>
                    </SplideSlide>
                    <SplideSlide >
                        <div className="group">
                            <button onClick={() => setactivePage(2)} className="bg-[#E0E0E0] text-[#262626] font-semibold px-3 py-2 rounded-[8px] text-[14px] flex justify-center items-center gap-x-1 group-hover:text-white group-hover:bg-BtnColor">
                                <Lock className="stroke-[#262626] group-hover:stroke-white" />
                                Change password
                            </button>
                        </div>
                    </SplideSlide>
                </Splide>
            </div>
            {/* responsive button end */}

            {activePage == 0 && <Advancedplandetails />}
            {activePage == 1 && <AdvancedSubscription />}
            {activePage == 2 && <ChangePassword />}
        </div>
    )
}

export default AdvancedUserProliel