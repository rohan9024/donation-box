import { collection, getDocs } from 'firebase/firestore';
import React, { useState, useEffect, useContext } from 'react'
import { db } from './firebase';
import { useRouter } from 'next/router'
import { AuthContext } from '../Contexts/AuthContext';
import Link from 'next/link';


function campaigns() {
  const [campaignsObj, setCampaignsObj] = useState([])
  var count = 1;
  const router = useRouter()
  const { _donor, _setDonor, _NGO, _setNGO } = useContext(AuthContext);

  useEffect(() => {
    if (count--) {
      console.log("hello")
      const fetchCampaignsObj = async () => {
        const querySnapshot = await getDocs(collection(db, "campaigns"));
        querySnapshot.forEach((doc) => {
          setCampaignsObj((campaignsObj) => [...campaignsObj, { id: doc.id, name: doc.data().name, url: doc.data().url, route: doc.data().route, desc: doc.data().desc }])
        }
        )
      }
      fetchCampaignsObj();
    }
  }, [])

  console.log(campaignsObj)

  const userVerifyDonate = (campaign) => {
    if (_donor) {
      router.push("/campaignInfo")

    }
    else if (_NGO) {
      alert("Please login with your personal account")
      router.push('/components/Login')
    }
    else {
      alert("Please login to proceed")
      router.push('/components/Login')
    }
  }
  return (
    <div className=' bg-gray-900 text-gray-200'>
      <div class="h-[300px] w-screen bg-purple-600 flex justify-center items-center">
        <h1 className='text-center text-7xl font-bold'>Select a Campaign</h1>
      </div>
      <div className='grid grid-cols-3  gap-4 ml-20 mr-20 mt-44 pb-10'>
        {/* {campaignsObj.map((campaign) => (
          <div key={campaign.id} className='flex justify-center items-center'>
            <img src={campaign.url} alt={campaign.name} />
            <h1></h1>
          </div>
        ))} */}
        {campaignsObj.map((campaign) => (
          <div key={campaign.id} className='flex flex-col justify-center items-center hover:cursor-pointer'>
            <img className='rounded-t-lg' src={campaign.url} alt={campaign.name} />
            <h1 className='text-3xl font-semibold w-[450px] bg-gray-200 text-gray-800 text-center pt-10 pb-5'>{campaign.name}</h1>
            <h1 className='text-lg font-normal w-[450px] bg-gray-200 text-gray-800 text-center pt-10 pb-5 pl-10 pr-10'>{campaign.desc}</h1>
            <Link
              href={{
                pathname: "/campaignInfo",
                query: {
                  id: campaign.id,
                  name: campaign.name,
                  desc: campaign.desc,
                  url: campaign.url,
                }, 
              }}
            >
              <div className='flex justify-evenly items-center w-[450px] bg-gray-200 text-gray-800 rounded-b-lg pb-10 pt-5'>
                <button className='text-2xl bg-purple-300 px-4 py-2 rounded-lg hover:bg-purple-400 hover:ease-in-out hover:cursor-pointer'>Donate Now</button>
              </div>
            </Link>
          </div>
        ))}

      </div>
    </div>
  )
}

export default campaigns