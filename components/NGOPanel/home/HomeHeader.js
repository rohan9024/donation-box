import Image from 'next/image'
import React, { useState } from 'react'
import close from "../../../pages/assets/close.png"
import { motion } from "framer-motion"
import { addDoc, collection, doc, increment, updateDoc } from 'firebase/firestore'
import { db } from '../../../pages/firebase'

function HomeHeader() {
    const [modal, setModal] = useState(false)
    const [campaignName, setCampaignName] = useState('')
    const [campaignDesc, setCampaignDesc] = useState('')
    const [donationType, setDonationType] = useState('')
    const [campaignTarget, setCampaignTarget] = useState('')
    const [campaignURL, setCampaignURL] = useState('')

    const submit = async (e) => {
        await addDoc(collection(db, "campaigns"), {
            name: campaignName,
            desc: campaignDesc,
            target: campaignTarget,
            type: donationType,
            url: campaignURL
        });
        setCampaignName('')
        setCampaignDesc('')
        setDonationType('')
        setCampaignTarget('')
        setCampaignURL('')

        // Incrementing the value inside info (campaigns)
        const ref2 = doc(db, "info", "qi1oMnSLTD30gyxViBmG");

        await updateDoc(ref2, {
          campaigns: increment(1)
        });
    
        alert("Added campaign successfully")
    }

    

    return (
        <>
        {
            modal &&
            (
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1 },
                    }}
                    className='ml-80 mt-20 z-10 absolute rounded-lg bg-gray-200 text-black h-[600px] w-[500px] shadow-md'>
                    <div className='flex justify-end items-center p-4'>
                        <Image className='cursor-pointer ' onClick={() => setModal(false)} src={close} alt="close" width={20} height={20} />
                    </div>
                    <div className='flex flex-col justify-center items-center '>
                        <div class="flex justify-center">
                            <div class="mb-3 xl:w-96">
                                <label class="form-label inline-block mb-2 text-gray-700"
                                >Enter campaign name</label>
                                <input
                                    value={campaignName}
                                    type="text"
                                    class="
                                        form-control
                                        block
                                        w-full
                                        px-3
                                        py-1.5
                                        text-base
                                        font-normal
                                        text-gray-700
                                        bg-white bg-clip-padding
                                        border border-solid border-gray-300
                                        rounded
                                        transition
                                        ease-in-out
                                        m-0
                                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                    "
                                    placeholder="Swachh Bharat Abhiyan"
                                    onChange={(e) => setCampaignName(e.target.value)}
                                />
                            </div>
                        </div>
                        <div class="flex justify-center">
                            <div class="mb-3 xl:w-96">
                                <label class="form-label inline-block mb-2 text-gray-700"
                                >Enter campaign description</label>

                                <textarea
                                    value={campaignDesc}

                                    class="
                                        form-control
                                        block
                                        w-full
                                        px-3
                                        py-1.5
                                        text-base
                                        font-normal
                                        text-gray-700
                                        bg-white bg-clip-padding
                                        border border-solid border-gray-300
                                        rounded
                                        transition
                                        ease-in-out
                                        m-0
                                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                  max-h-[130px]
                                  min-h-[70px]
                                  
                                        "
                                    placeholder="Describe your campaign. Make it more convincing for the people."
                                    onChange={(e) => setCampaignDesc(e.target.value)}
                                />
                            </div>
                        </div>
                        <div class="flex justify-center">
                            <div class="mb-3 xl:w-96">
                                <label class="form-label inline-block mb-2 text-gray-700"
                                >Enter Type of donation</label>
                                <input
                                value={donationType}

                                    type="text"
                                    class="
                                        form-control
                                        block
                                        w-full
                                        px-3
                                        py-1.5
                                        text-base
                                        font-normal
                                        text-gray-700
                                        bg-white bg-clip-padding
                                        border border-solid border-gray-300
                                        rounded
                                        transition
                                        ease-in-out
                                        m-0
                                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                    "
                                    placeholder="Clothes/medicines/books"
                                    onChange={(e) => setDonationType(e.target.value)}
                                />
                            </div>
                        </div>
                        <div class="flex justify-center">
                            <div class="mb-3 xl:w-96">
                                <label class="form-label inline-block mb-2 text-gray-700"
                                >Set target</label>
                                <input
                                value={campaignTarget}

                                    type="text"
                                    class="
                                        form-control
                                        block
                                        w-full
                                        px-3
                                        py-1.5
                                        text-base
                                        font-normal
                                        text-gray-700
                                        bg-white bg-clip-padding
                                        border border-solid border-gray-300
                                        rounded
                                        transition
                                        ease-in-out
                                        m-0
                                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                    "
                                    placeholder="Ex. 4000 clothes, 50000 utensils"
                                    onChange={(e) => setCampaignTarget(e.target.value)}
                                />
                            </div>
                        </div>
                        <div class="flex justify-center">
                            <div class="mb-3 xl:w-96">
                                <label class="form-label inline-block mb-2 text-gray-700"
                                >Enter url of the poster</label>
                                <input
                                value={campaignURL}

                                    type="text"
                                    class="
                                        form-control
                                        block
                                        w-full
                                        px-3
                                        py-1.5
                                        text-base
                                        font-normal
                                        text-gray-700
                                        bg-white bg-clip-padding
                                        border border-solid border-gray-300
                                        rounded
                                        transition
                                        ease-in-out
                                        m-0
                                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                    "
                                    onChange={(e) => setCampaignURL(e.target.value)}
                                />
                            </div>
                        </div>
                        <div onClick={submit} className='p-3 w-44 bg-green-400  hover:ease-in-out hover:scale-105 hover:duration-300 hover:bg-green-500 cursor-pointer rounded-lg'>
                            <h1 className='text-center font-bold'>Submit</h1>
                        </div>
                    </div>
                </motion.div>

            )
        }

        <div className='ml-10 mt-20'>
            <h1 className='text-4xl font-bold'>NGO Dashboard</h1>
            <h1 className='text-normal font-thin text-gray-300 tracking-normal ml-1 mt-2'>Realtime updates</h1>
            <div onClick={() => setModal(true)} className='p-3 bg-gray-800 w-44 mt-5 hover:ease-in-out hover:duration-300 hover:scale-105 cursor-pointer hover:bg-gray-700 rounded-lg'>
                <h1>Create Campaign</h1>
            </div>
        </div>
        </>
    )
}

export default HomeHeader