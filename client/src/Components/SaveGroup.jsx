"use client"
import UserTabTitle from '@/app/naim/Component/userTabTitle'
import React, { useEffect, useState } from 'react'
import SaveCard from './SaveCard'
import useMe from '@/hooks/get-me'
import axiosInstance from '@/lib/axios.config'

const SaveGroup = () => {

    const { data, error, success, loading } = useMe()
    const [saveGroup, setsaveGroup] = useState([])

    useEffect(() => {
        async function getGroup() {
            const res = await axiosInstance.get(`/groups/save/${data?._id}`);
            const recive = await res?.data?.data
            setsaveGroup(recive)
        }
        if (success) {
            getGroup()
        }
    }, [success])


    return (
        <div>
            <UserTabTitle text={"Saved Group"} />

            <div className="mt-4 w-[770px] flex flex-wrap">
                {
                    saveGroup?.map((el, idx) => <SaveCard key={idx} item={el} />)
                }

            </div>
        </div>
    )
}

export default SaveGroup