"use client"
import React, { useEffect, useState } from 'react'
import DetailsPage from './detailsPage';
import axiosInstance from '@/lib/axios.config';
import Loading from '@/Components/shared/loading';

const PeerDetails = ({ id }) => {
    const [obj, setobj] = useState([]);
    const [loading, setloading] = useState(true);
    const [error, seterror] = useState(true);


    useEffect(() => {
        setloading(true)
        const details = async () => {
            try {
                const rsl = await axiosInstance.get(`/groups/${id}`);
                let res = await rsl.data;
                if (rsl?.success) {
                    setobj(res)
                }
            } catch (error) {
                seterror(error)
            }
            finally {
                setloading(false)
            }
        };
        details()
    }, []);

    if (obj?._id == id) {
        return (
            <div>
                <DetailsPage obj={obj} />
            </div>
        )
    }
    else if (loading) {
        return <div className="container text-center">
            <Loading />
        </div>
    }

}

export default PeerDetails