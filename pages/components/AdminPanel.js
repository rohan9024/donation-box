import { collection, doc, getDocs, onSnapshot } from 'firebase/firestore';
import { useRouter } from 'next/router';
import React, { useState, useEffect, useContext } from 'react'
import { db } from '../firebase';
import donations from "../assets/donations.png"
import home from "../assets/home.png"
import volunteers from "../assets/volunteers.png"
import sponsors from "../assets/sponsors.png"
import campaigns from "../assets/campaigns.png"
import Image from 'next/image';
import { AuthContext } from '../../Contexts/AuthContext';
import MainHeader from './MainHeader';
import AdminRightSidebar from './AdminRightSidebar';
import MainMid1 from './MainMid1';
import MainMid2 from './MainMid2';
import DonationSidebar from '../../components/Donation/DonationSidebar';
import SponsorSidebar from '../../components/Sponsor/SponsorSidebar';
import VolunteerSidebar from '../../components/Volunteers/VolunteerSidebar';
import CampaignSidebar from '../../components/Campaigns/CampaignSidebar';

function AdminPanel() {
    const [campaignsObj, setCampaignsObj] = useState([])
    const [fetch, setFetch] = useState(false);
    const router = useRouter();
    const { _admin } = useContext(AuthContext);
    const [HOME, SETHOME] = useState(true)
    const [DONATIONS, SETDONATIONS] = useState(false)
    const [SPONSORS, SETSPONSORS] = useState(false)
    const [VOLUNTEERS, SETVOLUNTEERS] = useState(false)
    const [CAMPAIGNS, SETCAMPAIGNS] = useState(false)
    const [revenue, setRevenue] = useState(0);
    const [campaignCount, setCampaignCount] = useState(0);
    const [volunteerCount, setVolunteerCount] = useState(0);
    const [donorCount, setDonorCount] = useState(0);
    const [sponsorCount, setSponsorCount] = useState(0);
    const [pickups_completed, set_pickups_completed] = useState(0);


    const data = {

        chartData: {
            labels: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
            ],
            data: [
                0,
                0,
                0,
                0,
                0,
                0,
                10000, 2000,
                30000, 10000
            ],
        },
    };



    useEffect(() => {
        !_admin ?
            router.push("/")
            : router.push("/components/AdminPanel");

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


        const unsub = onSnapshot(doc(db, "info", "qi1oMnSLTD30gyxViBmG"), (doc) => {
            setRevenue(doc.data().revenue)
        });

        const unsub2 = onSnapshot(doc(db, "info", "qi1oMnSLTD30gyxViBmG"), (doc) => {
            setCampaignCount(doc.data().campaigns)
        });
        const unsub3 = onSnapshot(doc(db, "info", "qi1oMnSLTD30gyxViBmG"), (doc) => {
            setDonorCount(doc.data().donors)
        });
        const unsub4 = onSnapshot(doc(db, "info", "qi1oMnSLTD30gyxViBmG"), (doc) => {
            setSponsorCount(doc.data().sponsors)
        });
        const unsub5 = onSnapshot(doc(db, "info", "qi1oMnSLTD30gyxViBmG"), (doc) => {
            setVolunteerCount(doc.data().volunteers)
        });
        const unsub6 = onSnapshot(doc(db, "info", "qi1oMnSLTD30gyxViBmG"), (doc) => {
            set_pickups_completed(doc.data().pickups_completed)
        });


    }, [])

    campaignsObj.splice(3, 5)
    console.log(campaignsObj)
    //     <div className='flex justify-center items-center'>
    //     <div className='grid grid-cols-3 gap-10 ml-20 mr-20 mt-44 pb-20'>

    //         {campaignsObj.map((campaign) => (
    //             <div key={campaign.id} className='flex flex-col justify-center items-center hover:cursor-pointer border-gray-600 border-2'>
    //                 <img className='rounded-t-lg' src={campaign.url} alt={campaign.name} />
    //                 <h1 className='text-3xl font-semibold w-[395px] bg-gray-200 text-gray-800 text-center pt-10 pb-5'>{campaign.name}</h1>
    //                 <h1 className='text-lg font-normal w-[395px] bg-gray-200 text-gray-800 text-center pt-10 pb-5'>{campaign.desc}</h1>
    //             </div>
    //         ))}

    //     </div>
    // </div>

    return (
        <div className='bg-black text-white h-full w-screen flex justify-center items-center font-poppins '>
            {/* Sidebar */}
            <div className='w-28 h-screen flex flex-col items-center space-y-12 bg-gray-900 pt-56'>
                <div onClick={() => {
                    SETHOME(true)
                    SETDONATIONS(false)
                    SETSPONSORS(false)
                    SETVOLUNTEERS(false)
                    SETCAMPAIGNS(false)
                }

                } className={`${HOME && ''} w-10 h-10  rounded-full cursor-pointer hover:ease-in-out hover:bg-gray-700 flex justify-center items-center hover:scale-125 hover:duration-200`}>
                    <Image src={home} alt="home" width={20} height={20} />
                </div>
                <div onClick={() => {
                    SETHOME(false)
                    SETDONATIONS(true)
                    SETSPONSORS(false)
                    SETVOLUNTEERS(false)
                    SETCAMPAIGNS(false)

                }} className='w-10 h-10  cursor-pointer  rounded-full hover:ease-in-out hover:bg-gray-700 flex justify-center items-center hover:scale-125 hover:duration-200'>
                    <Image src={donations} alt="donations" width={20} height={20} />
                </div>
                <div onClick={() => {
                    SETHOME(false)
                    SETDONATIONS(false)
                    SETSPONSORS(true)
                    SETVOLUNTEERS(false)
                    SETCAMPAIGNS(false)

                }} className='w-10 h-10  cursor-pointer  rounded-full hover:ease-in-out hover:bg-gray-700 flex justify-center items-center hover:scale-125 hover:duration-200'>
                    <Image src={sponsors} alt="sponsors" width={20} height={20} />
                </div>
                <div onClick={() => {
                    SETHOME(false)
                    SETDONATIONS(false)
                    SETSPONSORS(false)
                    SETVOLUNTEERS(true)
                    SETCAMPAIGNS(false)

                }} className='w-10 h-10  cursor-pointer  rounded-full hover:ease-in-out hover:bg-gray-700 flex justify-center items-center hover:scale-125 hover:duration-200'>
                    <Image src={volunteers} alt="volunteers" width={20} height={20} />
                </div>
                <div onClick={() => {
                    SETHOME(false)
                    SETDONATIONS(false)
                    SETSPONSORS(false)
                    SETVOLUNTEERS(false)
                    SETCAMPAIGNS(true)

                }} className='w-10 h-10  cursor-pointer rounded-full hover:ease-in-out hover:bg-gray-700 flex justify-center items-center hover:scale-125 hover:duration-200'>
                    <Image src={campaigns} alt="campaigns" width={20} height={20} />
                </div>
            </div>
            {/* Main page */}
            {
                HOME && (
                    <>
                        <div className='w-[1000px]  h-screen '>
                            <MainHeader />
                            {/* <div className='w-[1000px] h-[1px] bg-black mt-4'/> */}

                            <MainMid2 info={data} />
                            {/* <MainMid1 /> */}
                        </div>
                        <div className='w-[390px] h-screen bg-gray-900 ml-10'>
                            <AdminRightSidebar revenue={revenue} sponsorCount={sponsorCount} donorCount={donorCount} volunteerCount={volunteerCount} campaignCount={campaignCount} pickups_completed={pickups_completed} />
                            {/* <MainMid /> */}
                        </div>
                    </>
                )
            }
            {
                DONATIONS && (
                    <>
                        <div className='w-[1000px]  h-screen '>
                            <MainHeader />
                            {/* <div className='w-[1000px] h-[1px] bg-black mt-4'/> */}

                            <MainMid2 info={data} />
                            {/* <MainMid1 /> */}
                        </div>
                        <div className='w-[390px] h-screen bg-gray-900 ml-10'>
                            <DonationSidebar />
                            {/* <MainMid /> */}
                        </div>
                    </>
                )
            }
            {
                SPONSORS && (
                    <>
                        <div className='w-[1000px]  h-screen '>
                            <MainHeader />
                            {/* <div className='w-[1000px] h-[1px] bg-black mt-4'/> */}

                            <MainMid2 info={data} />
                            {/* <MainMid1 /> */}
                        </div>
                        <div className='w-[390px] h-screen bg-gray-900 ml-10'>
                            <SponsorSidebar />
                            {/* <MainMid /> */}
                        </div>
                    </>
                )
            }
            {
                VOLUNTEERS && (
                    <>
                        <div className='w-[1000px]  h-screen '>
                            <MainHeader />
                            {/* <div className='w-[1000px] h-[1px] bg-black mt-4'/> */}

                            <MainMid2 info={data} />
                            {/* <MainMid1 /> */}
                        </div>
                        <div className='w-[390px] h-screen bg-gray-900 ml-10'>
                            <VolunteerSidebar />
                            {/* <MainMid /> */}
                        </div>
                    </>
                )
            }

            {
                CAMPAIGNS && (
                    <>
                        <div className='w-[1000px]  h-screen '>
                            <MainHeader />
                            {/* <div className='w-[1000px] h-[1px] bg-black mt-4'/> */}

                            <MainMid2 info={data} />
                            {/* <MainMid1 /> */}
                        </div>
                        <div className='w-[390px] h-screen bg-gray-900 ml-10'>
                            <CampaignSidebar />
                            {/* <MainMid /> */}
                        </div>
                    </>
                )
            }

        </div >
    )
}

export default AdminPanel