import React, { useState, useContext, useEffect } from 'react'
import done from "../pages/assets/done.gif"
import Image from 'next/image'
import { db, storage } from "./firebase"
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { addDoc, collection, doc, increment, setDoc, updateDoc } from 'firebase/firestore';
import { AuthContext } from '../Contexts/AuthContext';
import { useRouter } from 'next/router';
import down from "../pages/assets/down.png"
import work from "../pages/assets/work.png"

function involved() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [name, setName] = useState()
    const [username, setUsername] = useState()
    const [contact, setContact] = useState()
    const [occupation, setOccupation] = useState()
    const [dropdown, setDropdown] = useState(false)
    const [dropdownWork, setDropdownWork] = useState(false)
    const [type, setType] = useState('')
    const [typeWork, setTypeWork] = useState('')


    const { _donor, _setDonor } = useContext(AuthContext);

    const router = useRouter();


    useEffect(() => {
        _donor ?
            router.push("/involved")
            : router.push("/components/Login");

    }, [])


    const addDocument = async (name, email, occupation, contact, type, typeWork) => {

        await addDoc(collection(db,
            "volunteeers"), {
            name: name,
            contact: contact,
            occupation: occupation,
            email: email,
            type: type,
            typeWork: typeWork
        });
    }
    const updateVolunteers = async () => {
        const ref = doc(db, "info", "qi1oMnSLTD30gyxViBmG");

        await updateDoc(ref, {
            volunteers: increment(1)
        });

    }
    function submit(e) {
        if (name && type && typeWork && contact && occupation) {
            e.preventDefault();
            alert("We will contact you soon")
            setContact('')
            setName('')
            setOccupation('')
            setType('')
            setTypeWork('')
            setOccupation('')
            addDocument(name, _donor.email, occupation, contact, type, typeWork)
            updateVolunteers();
        }
        else {
            alert("Fill details properly")
        }

    }




    return (
        <div className='font-poppins bg-gray-800 flex-1 h-screen w-screen flex justify-center items-center'>

            <div className='flex justify-center items-center  h-screen  w-1/2'>
                <Image src={work} alt="backgroundImage" objectFit='contain' width={1100} height={1100} />

            </div>
            <div className='min-h-[200px] w-[450px] bg-purple-300 shadow-2xl border border-gray-500 rounded-lg flex flex-col justify-center items-center m-auto space-y-5 py-12 '>
                <h1 className='text-center text-3xl'>Get Involved</h1>
                <div class="flex justify-center">
                    <div class="mb-3 xl:w-96">
                        <label class="form-label inline-block mb-2 text-gray-700"
                        >Full Name</label>
                        <input
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
                            placeholder="Bob Shawn Grepper"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                        />
                    </div>
                </div>
                <div class="flex justify-center">
                    <div class="mb-3 xl:w-96">
                        <label class="form-label inline-block mb-2 text-gray-700"
                        >Occupation</label>
                        <input
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
                            placeholder="Lawyer/Doctor"
                            onChange={(e) => setOccupation(e.target.value)}
                            value={occupation}
                        />
                    </div>
                </div>
                <div class="flex justify-center">
                    <div class="mb-3 xl:w-96">
                        <label class="form-label inline-block mb-2 text-gray-700"
                        >Contact No</label>
                        <input
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
                            onChange={(e) => setContact(e.target.value)}
                            value={contact}
                            placeholder="9137444728"
                        />
                    </div>
                </div>

                <label class=" mr-5 form-label inline-block mb-2 text-gray-700"
                >How long are you planning to work with us?</label>
                <div className=''>

                    <div className='p-3 rounded-md bg-blue-500 flex justify-center items-center cursor-pointer select-none' onClick={() => {
                        dropdownWork ? setDropdownWork(false) : setDropdownWork(true);
                    }}>
                        <h1 className='mr-3'>Select Period</h1>
                        <Image src={down} alt="down" width={20} height={20} />

                    </div>

                    {dropdownWork && (
                        <>
                            <div className='flex flex-col justify-center items-center z-50 absolute bg-white w-[155px]'>
                                <h1 onClick={() => {
                                    setTypeWork('Not yet decided')
                                }} className={`${typeWork == 'Not yet decided' && 'bg-blue-300 hover:bg-blue-200'} hover:bg-gray-200 hover:cursor-pointer hover:ease-in-out w-full text-center p-2 `}>Not yet decided</h1>
                                <h1 onClick={() => {
                                    setTypeWork('1 month')
                                }} className={`${typeWork == '1 month' && 'bg-blue-300 hover:bg-blue-200'} hover:bg-gray-200 hover:cursor-pointer hover:ease-in-out w-full text-center p-2 `}>1 month</h1>
                                <h1 onClick={() => {
                                    setTypeWork('6 months')
                                }} className={`${typeWork == '6 months' && 'bg-blue-300 hover:bg-blue-200'} hover:bg-gray-200 hover:cursor-pointer hover:ease-in-out w-full text-center p-2 `}>6 months</h1>
                                <h1 onClick={() => {
                                    setTypeWork('More than a year')
                                }} className={`${typeWork == 'More than a year' && 'bg-blue-300 hover:bg-blue-200'} hover:bg-gray-200 hover:cursor-pointer hover:ease-in-out w-full text-center p-2 `}>More than a year</h1>
                            </div>
                        </>

                    )}
                </div>

                {/* Dropdown */}

                <label class="mr-44  form-label inline-block mb-2 text-gray-700"
                >Select your preference</label>
                <div className=''>

                    <div className='p-3 rounded-md bg-blue-500 flex justify-center items-center cursor-pointer select-none' onClick={() => {
                        dropdown ? setDropdown(false) : setDropdown(true);
                    }}>
                        <h1 className='mr-3'>Select Type</h1>
                        <Image src={down} alt="down" width={20} height={20} />

                    </div>

                    {dropdown && (
                        <>
                            <div className='flex flex-col justify-center items-center z-50 absolute bg-white w-[135px]'>
                                <h1 onClick={() => {
                                    setType('part time')
                                }} className={`${type == 'part time' && 'bg-blue-300 hover:bg-blue-200'} hover:bg-gray-200 hover:cursor-pointer hover:ease-in-out w-full text-center p-2 `}>Part Time</h1>
                                <h1 onClick={() => {
                                    setType('full time')
                                }} className={`${type == 'full time' && 'bg-blue-300 hover:bg-blue-200'} hover:bg-gray-200 hover:cursor-pointer hover:ease-in-out w-full text-center p-2 `}>Full Time</h1>
                            </div>
                        </>

                    )}
                </div>


                <div className='bg-purple-500 hover:bg-purple-400 px-12 py-3 rounded-lg hover:cursor-pointer' onClick={submit}>
                    <h1>Submit</h1>
                </div>

            </div >


        </div >

    )
}

export default involved