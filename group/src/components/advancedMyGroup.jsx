import Image from 'next/image'
import Advanced from '../assets/advanced.png'
import { Contact } from '@/assets/icons/contact';
import { Watch } from '@/assets/icons/watch';
import Button from './shared/botton';
import { UserTwo } from '@/assets/icons/userTwo';
import CommentReply from './shared/commentrplay';
import Analytics from './shared/analytics';
import { useDispatch, useSelector } from 'react-redux';
import { numberToUsd } from '@/utils/numberToUsd';
import Link from 'next/link';
import Virtual from "../assets/virtual.svg";
import Hybrid from "../assets/hybrid.svg";
import { pageShowFunc3 } from '@/redux/groupSlice';

const AdvancedMyGroup = () => {
    const { userGroup } = useSelector((state) => state.groupInfo);
    const dispatch = useDispatch()

    const priching = numberToUsd(userGroup?.pricing)

    return (
        <div>
            {/* about part start */}
            <div className="container lg:mt-40 mt-60 lg:flex justify-between">
                <div className="">

                    <div className="">
                        <h3 className='font-bold text-primaryColor text-[20px] '>About</h3>
                        <p className='font-medium text-[#97979C] text-[12px] pt-10 w-full lg:w-[750px]'>{userGroup?.about}</p>

                        <div className="h-[237px] lg:w-[761px] w-full rounded-md mt-5 relative">
                            {
                                userGroup?.promotional_banner &&
                                <Image
                                    src={userGroup?.promotional_banner}
                                    alt='Advanced'
                                    objectFit="cover"
                                    layout='fill'
                                    className='rounded-md'
                                />
                            }

                        </div>
                    </div>
                    {/* review part start */}
                    <CommentReply />
                    {/* review part end */}
                </div>
                {/* about part end */}
                {/* about end */}
                <div className="">


                    {/* meeting formet start */}
                    <div className="lg:w-[384px] w-full border rounded-[8px] p-6 drop-shadow">
                        <h3 className='font-bold text-primaryColor text-[20px] '>Meeting Format</h3>
                        <div className="flex gap-6 my-3">
                            <h5 className='text-xs text-black/50 flex items-center gap-1 capitalize font-medium'>
                                {
                                    userGroup?.meeting_format?.toLowerCase() == "In person"?.toLowerCase() ?
                                        <Contact /> :
                                        userGroup?.meeting_format?.toLowerCase() == "Virtual"?.toLowerCase() ?
                                            <Image src={Hybrid} alt="Hybrid" />
                                            : <Image src={Virtual} alt="Virtual" />
                                }
                                {userGroup?.meeting_format}
                            </h5>
                            <h5 className='text-xs text-black/50 flex items-center gap-1 capitalize font-medium'><Watch /> 1 Hour</h5>
                        </div>

                        <h3 className="text-primaryColor text-[32px] font-extrabold">
                            {priching}
                            <span className='text-black/50 text-[20px] font-normal'>/Hour</span>
                        </h3>
                        <Link href={'/dashboard'}>
                            <Button className='w-full mt-3'>
                                Edit Group Details
                            </Button>
                        </Link>
                        <Link href={`https://coachfinder.app/peer-group/${userGroup?._id}`}>
                            <Button className='w-full !bg-transparent border !border-[#6E6E6E] !text-[#6E6E6E] my-3'>
                                View as a user
                            </Button>
                        </Link>

                        <Link href={'/plan'} onClick={() => dispatch(pageShowFunc3(true))}>
                            <Button className='w-full !bg-transparent border !border-[#6E6E6E] !text-[#6E6E6E]'>
                                Change Plans
                            </Button>
                        </Link>
                    </div>

                    {/* meeting formet end */}
                    {/* Analytics start */}

                    <div className="h-[490px] lg:w-[384px] w-full rounded-[8px] border p-6 shadow mt-6">
                        <h3 className='font-bold text-[20px] text-primaryColor'>Analytics</h3>


                        <h5 className='text-xs text-black/50 flex items-center gap-1 capitalize font-normal pt-2'><UserTwo /> {userGroup?.visitors?.length} people has clicked this link</h5>
                        <h5 className='text-xs text-black/50 flex items-center gap-1 capitalize font-normal my-3'><UserTwo /> User demographics</h5>

                        {/* ========= */}

                        <Analytics />


                    </div>
                    {/* Analytics end */}
                </div>
            </div>

        </div>
    )
}

export default AdvancedMyGroup



