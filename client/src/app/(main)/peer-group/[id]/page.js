import PeerDetails from '@/app/naim/Component/peer-details';
import React from 'react'

const page = async ({ params }) => {
    const { id } = await params;

    return (
        <div>
            <PeerDetails id={id} />
        </div>
    )
}

export default page