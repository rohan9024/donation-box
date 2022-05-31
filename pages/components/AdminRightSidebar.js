import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import avatar from "../assets/avatar.png"
import campaign from "../assets/campaign.png"
import sponsor from "../assets/sponsor.png"
import volunteer from "../assets/volunteer.png"
import donor from "../assets/donor.png"
import revenueImg from "../assets/revenue.png"
import pickup from "../assets/pickup.png"
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase'

function AdminRightSidebar({ revenue, sponsorCount, donorCount, volunteerCount, pickups_completed, campaignCount }) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const d = new Date();
    const monthName = months[d.getMonth()];


    return (
        <div className=' '>
            {/* Header */}
            {/* <div>
                <div className='w-10 h-10 ml-80 rounded-full cursor-pointer hover:ease-in-out hover:bg-gray-200 flex justify-center items-center hover:scale-125 hover:duration-200'>
                    <Image src={avatar} alt="avatar" width={80} height={80} />
                </div>
            </div> */}
            <div className='mt-20 ml-5 text-gray-300'>
                <h1 className='font-bold text-3xl'>Recent Activities</h1>
                <h1 className='mt-2 text-gray-300'>{`${d.getDate()} ${monthName} ${d.getFullYear()}`}</h1>
                <div className='mt-20 flex items-center space-x-4'>
                    <div className='w-10 h-10 bg-gray-200 p-2 rounded-full cursor-pointer hover:ease-in-out hover:bg-gray-200 flex justify-center items-center hover:scale-125 hover:duration-200'>
                        <Image src={revenueImg} alt="revenue" width={100} height={100} />
                    </div>
                    <h1 className='font-bold w-48'>Revenue</h1>
                    <h1 className='font-bold'>₹{revenue}</h1>
                </div>
                <div className='mt-10 flex items-center space-x-4'>
                    <div className='w-10 h-10 bg-gray-200 p-2 rounded-full cursor-pointer hover:ease-in-out hover:bg-gray-200 flex justify-center items-center hover:scale-125 hover:duration-200'>
                        <Image src={campaign} alt="campaign" width={100} height={100} />
                    </div>
                    <h1 className='font-bold w-48'>Number of Campaigns</h1>
                    <h1 className='font-bold'>{campaignCount}</h1>
                </div>
                <div className='mt-10 flex items-center space-x-4'>
                    <div className='w-10 h-10 bg-gray-200 p-2 rounded-full cursor-pointer hover:ease-in-out hover:bg-gray-200 flex justify-center items-center hover:scale-125 hover:duration-200'>
                        <Image src={sponsor} alt="sponsor" width={100} height={100} />
                    </div>
                    <h1 className='font-bold w-48'>Number of Sponsors</h1>
                    <h1 className='font-bold'>{sponsorCount}</h1>
                </div>
                <div className='mt-10 flex items-center space-x-4'>
                    <div className='w-10 h-10 bg-gray-200 p-2 rounded-full cursor-pointer hover:ease-in-out hover:bg-gray-200 flex justify-center items-center hover:scale-125 hover:duration-200'>
                        <Image src={volunteer} alt="volunteer" width={100} height={100} />
                    </div>
                    <h1 className='font-bold w-48'>Number of Volunteers</h1>
                    <h1 className='font-bold'>{volunteerCount}</h1>
                </div>
                <div className='mt-10 flex items-center space-x-4'>
                    <div className='w-10 h-10 bg-gray-200 p-2 rounded-full cursor-pointer hover:ease-in-out hover:bg-gray-200 flex justify-center items-center hover:scale-125 hover:duration-200'>
                        <Image src={donor} alt="donor" width={100} height={100} />
                    </div>
                    <h1 className='font-bold w-48'>Number of Donors</h1>
                    <h1 className='font-bold'>{donorCount}</h1>
                </div>
                <div className='mt-10 flex items-center space-x-4'>
                    <div className='w-10 h-10 bg-gray-200 p-2 rounded-full cursor-pointer hover:ease-in-out hover:bg-gray-200 flex justify-center items-center hover:scale-125 hover:duration-200'>
                        <Image src={pickup} alt="pickup" width={100} height={100} />
                    </div>
                    <h1 className='font-bold w-48'>Pickups completed</h1>
                    <h1 className='font-bold'>{pickups_completed}</h1>
                </div>
            </div>
            {/* Header */}
        </div>
    )
}

export default AdminRightSidebar