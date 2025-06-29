"use client"
import AdvancedPage from '@/components/advancedPage';
import EssentialPage from '@/components/essentialPage';
import FreePlanPage from '@/components/freePlanPage'
import Loading from '@/components/Loading';
import PremiumPage from '@/components/premiumPage';
import useMe from '@/hooks/get-me';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useSelector } from 'react-redux';

const page = () => {
    const { createGroupPage } = useSelector((state) => state.groupInfo);

    const router = useRouter();
    if (!createGroupPage) {
        router.push('/signup')
        return;
    }

    const { data, loading, success } = useMe();


    if (data == null && loading && !success) {
        return <Loading />;
    }

    return (
        <div>
            {data?.account_type == "basic" ? <PremiumPage />
                : data?.account_type == "essential" ? <EssentialPage />
                    : data?.account_type == "premium" ? < FreePlanPage />
                        : <AdvancedPage />
            }
        </div>
    )
}

export default page