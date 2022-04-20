import { collection, getDocs } from 'firebase/firestore';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react'
import { db } from '../firebase';
import donations from "../assets/donations.png"
import home from "../assets/home.png"
import volunteers from "../assets/volunteers.png"
import sponsors from "../assets/sponsors.png"
import campaigns from "../assets/campaigns.png"
import Image from 'next/image';

function AdminPanel() {
    const [campaignsObj, setCampaignsObj] = useState([])
    const [fetch, setFetch] = useState(false);
    const router = useRouter()

    useEffect(() => {
        if (!fetch) {
            const fetchCampaignsObj = async () => {
                const querySnapshot = await getDocs(collection(db, "campaigns"));
                querySnapshot.forEach((doc) => {
                    setCampaignsObj((campaignsObj) => [...campaignsObj, { id: doc.id, name: doc.data().name, url: doc.data().url, route: doc.data().route, desc: doc.data().desc }])
                }
                )
            }
            fetchCampaignsObj();
            setFetch(true)
        }
    }, [])

    campaignsObj.splice(3, 5)
    console.log(campaignsObj)
    return (
        <div className='bg-gray-200 h-screen w-screen flex justify-center items-center'>
            {/* Sidebar */}
            <div className='w-24 h-screen flex flex-col items-center space-y-12 bg-red-600 pt-12'>
                <div className='w-10 h-10 rounded-full cursor-pointer hover:ease-in-out hover:bg-gray-200 flex justify-center items-center hover:scale-125 hover:duration-200'>
                    <Image src={home} alt="home" width={20} height={20} />
                </div>
                <div className='w-10 h-10 rounded-full cursor-pointer hover:ease-in-out hover:bg-gray-200 flex justify-center items-center hover:scale-125 hover:duration-200'>
                    <Image src={donations} alt="donations" width={20} height={20} />
                </div>
                <div className='w-10 h-10 rounded-full cursor-pointer hover:ease-in-out hover:bg-gray-200 flex justify-center items-center hover:scale-125 hover:duration-200'>
                    <Image src={sponsors} alt="sponsors" width={20} height={20} />
                </div>
                <div className='w-10 h-10 rounded-full cursor-pointer hover:ease-in-out hover:bg-gray-200 flex justify-center items-center hover:scale-125 hover:duration-200'>
                    <Image src={volunteers} alt="volunteers" width={20} height={20} />
                </div>
                <div className='w-10 h-10 rounded-full cursor-pointer hover:ease-in-out hover:bg-gray-200 flex justify-center items-center hover:scale-125 hover:duration-200'>
                    <Image src={campaigns} alt="campaigns" width={20} height={20} />
                </div>
            </div>
            {/* Main page */}
            <div className='w-full h-screen '>
                <div className='flex justify-center items-center'>
                    <div className='grid grid-cols-3 gap-10 ml-20 mr-20 mt-44 pb-20'>
                       
                        {campaignsObj.map((campaign) => (
                            <div key={campaign.id} className='flex flex-col justify-center items-center hover:cursor-pointer border-gray-600 border-2'>
                                <img className='rounded-t-lg' src={campaign.url} alt={campaign.name} />
                                <h1 className='text-3xl font-semibold w-[395px] bg-gray-200 text-gray-800 text-center pt-10 pb-5'>{campaign.name}</h1>
                                <h1 className='text-lg font-normal w-[395px] bg-gray-200 text-gray-800 text-center pt-10 pb-5'>{campaign.desc}</h1>
                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminPanel