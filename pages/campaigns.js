import { collection, getDocs } from 'firebase/firestore';
import React, { useState, useEffect } from 'react'
import { db } from './firebase';
import { useRouter } from 'next/router'


function campaigns() {
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
    <div className=' bg-gray-900 text-gray-200'>
      <div class="h-[300px] w-screen bg-purple-600 flex justify-center items-center">
        <h1 className='text-center text-7xl font-bold'>Select a Campaign</h1>
      </div>
      <div className='grid grid-cols-3 gap-4 ml-20 mr-20 mt-44 pb-10'>
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
            <h1 className='text-lg font-normal w-[450px] bg-gray-200 text-gray-800 text-center pt-10 pb-5'>{campaign.desc}</h1>
            <div className='flex justify-evenly items-center w-[450px] bg-gray-200 text-gray-800 rounded-b-lg pb-10 pt-5'>
              <button className='text-2xl bg-purple-300 px-4 py-2 rounded-lg hover:bg-purple-400 hover:ease-in-out hover:cursor-pointer' onClick={() => router.push(`/${campaign.route}`)}>Donate Now</button>
            </div>
          </div>
        ))}

      </div>
    </div>
  )
}

export default campaigns