import Image from 'next/image'
import React, { useContext } from 'react'
import avatar from "../../../pages/assets/avatar.png"
import campaign from "../../../pages/assets/campaign.png"
import sponsor from "../../../pages/assets/sponsor.png"
import volunteer from "../../../pages/assets/volunteer.png"
import donor from "../../../pages/assets/donor.png"
import revenueImg from "../../../pages/assets/revenue.png"
import pickup from "../../../pages/assets/pickup.png"
import { AuthContext } from '../../../Contexts/AuthContext'

function HomeRightSidebar({ revenue }) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const d = new Date();
    const monthName = months[d.getMonth()];
    const { _NGO, _setNGO } = useContext(AuthContext);


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
                    <h1 className='font-bold'>₹{_NGO.revenue}</h1>
                </div>
                <div className='mt-10 flex items-center space-x-4'>
                    <div className='w-10 h-10 bg-gray-200 p-2 rounded-full cursor-pointer hover:ease-in-out hover:bg-gray-200 flex justify-center items-center hover:scale-125 hover:duration-200'>
                        <Image src={campaign} alt="campaign" width={100} height={100} />
                    </div>
                    <h1 className='font-bold w-48'>Number of Campaigns</h1>
                    <h1 className='font-bold'>{_NGO.no_of_campaigns}</h1>
                </div>
                <div className='mt-10 flex items-center space-x-4'>
                    <div className='w-10 h-10 bg-gray-200 p-2 rounded-full cursor-pointer hover:ease-in-out hover:bg-gray-200 flex justify-center items-center hover:scale-125 hover:duration-200'>
                        <Image src={sponsor} alt="sponsor" width={100} height={100} />
                    </div>
                    <h1 className='font-bold w-48'>Number of Sponsors</h1>
                    <h1 className='font-bold'>{_NGO.no_of_sponsors}</h1>
                </div>
                <div className='mt-10 flex items-center space-x-4'>
                    <div className='w-10 h-10 bg-gray-200 p-2 rounded-full cursor-pointer hover:ease-in-out hover:bg-gray-200 flex justify-center items-center hover:scale-125 hover:duration-200'>
                        <Image src={volunteer} alt="volunteer" width={100} height={100} />
                    </div>
                    <h1 className='font-bold w-48'>Number of Volunteers</h1>
                    <h1 className='font-bold'>{_NGO.no_of_volunteers}</h1>
                </div>
                <div className='mt-10 flex items-center space-x-4'>
                    <div className='w-10 h-10 bg-gray-200 p-2 rounded-full cursor-pointer hover:ease-in-out hover:bg-gray-200 flex justify-center items-center hover:scale-125 hover:duration-200'>
                        <Image src={donor} alt="donor" width={100} height={100} />
                    </div>
                    <h1 className='font-bold w-48'>Number of Donors</h1>
                    <h1 className='font-bold'>{_NGO.no_of_donors}</h1>
                </div>
                <div className='mt-10 flex items-center space-x-4'>
                    <div className='w-10 h-10 bg-gray-200 p-2 rounded-full cursor-pointer hover:ease-in-out hover:bg-gray-200 flex justify-center items-center hover:scale-125 hover:duration-200'>
                        <Image src={pickup} alt="pickup" width={100} height={100} />
                    </div>
                    <h1 className='font-bold w-48'>Pickups completed</h1>
                    <h1 className='font-bold'>{_NGO.pickups_completed}</h1>
                </div>
            </div>
            {/* Header */}
        </div>
    )
}

export default HomeRightSidebar