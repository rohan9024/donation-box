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
import HomeHeader from '../../components/NGOPanel/home/HomeHeader';
import HomeMid from '../../components/NGOPanel/home/HomeMid';
import HomeRightSidebar from '../../components/NGOPanel/home/HomeRightSidebar';
import CampaignHeader from '../../components/NGOPanel/campaigns/CampaignHeader';
import CampaignMid from '../../components/NGOPanel/campaigns/CampaignMid';
import CampaignSidebar from '../../components/NGOPanel/campaigns/CampaignSidebar';
import DonationHeader from '../../components/NGOPanel/donations/DonationHeader';
import DonationMid from '../../components/NGOPanel/donations/DonationMid';
import DonationSidebar from '../../components/NGOPanel/donations/DonationSidebar';

function NGOPanel() {
  const [campaignsObj, setCampaignsObj] = useState([])
  const [fetch, setFetch] = useState(false);
  const router = useRouter();
  const { _NGO } = useContext(AuthContext);
  const [HOME, SETHOME] = useState(true)
  const [CAMPAIGNS, SETCAMPAIGNS] = useState(false)
  const [DONATIONS, SETDONATIONS] = useState(false)
  const [revenue, setRevenue] = useState(0);


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
    !_NGO ?
      router.push("/")
      : router.push("/components/NGOPanel");

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
      <div className='w-28 h-screen flex flex-col items-center space-y-12 bg-gray-900 pt-72'>
        <div onClick={() => {
          SETHOME(true)
          SETDONATIONS(false)
          SETCAMPAIGNS(false)
        }

        } className={`${HOME && ''} w-10 h-10  rounded-full cursor-pointer hover:ease-in-out hover:bg-gray-700 flex justify-center items-center hover:scale-125 hover:duration-200`}>
          <Image src={home} alt="home" width={20} height={20} />
        </div>
        <div onClick={() => {
          SETHOME(false)
          SETDONATIONS(true)
          SETCAMPAIGNS(false)

        }} className='w-10 h-10  cursor-pointer  rounded-full hover:ease-in-out hover:bg-gray-700 flex justify-center items-center hover:scale-125 hover:duration-200'>
          <Image src={donations} alt="donations" width={20} height={20} />
        </div>
      </div>
      {/* Main page */}
      {
        HOME && (
          <>
            <div className='w-[1000px]  h-screen '>
              <HomeHeader />
              {/* <div className='w-[1000px] h-[1px] bg-black mt-4'/> */}

              <HomeMid info={data} />
              {/* <MainMid1 /> */}
            </div>
            <div className='w-[390px] h-screen bg-gray-900 ml-10'>
              <HomeRightSidebar revenue={revenue} />
              {/* <MainMid /> */}
            </div>
          </>
        )
      }

      {
        DONATIONS && (
          <>
            <div className='w-[1000px]  h-screen '>
              <DonationHeader />
              {/* <div className='w-[1000px] h-[1px] bg-black mt-4'/> */}

              <DonationMid info={data} />
              {/* <MainMid1 /> */}
            </div>
            <div className='w-[390px] h-screen bg-gray-900 ml-10'>
              <DonationSidebar />
              {/* <MainMid /> */}
            </div>
          </>
        )
      }


    </div >
  )
}

export default NGOPanel