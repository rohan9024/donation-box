import React, { useState } from 'react'
import done from "../pages/assets/done.gif"
import Image from 'next/image'
import { db, storage } from "./firebase"
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { addDoc, collection, setDoc } from 'firebase/firestore';

function clothes() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [name, setName] = useState()
    const [username, setUsername] = useState()
    const [contact, setContact] = useState()
    const [submitted, setSubmitted] = useState(false);
    const [progress, setProgress] = useState(0)
    const [occupation, setOccupation] = useState()
    const addDocument = async (name, occupation, contact) => {

        await addDoc(collection(db,
            "volunteeers"), {
            name: name,
            contact: contact,
            occupation: occupation
        });
    }
    function submit(e) {
        e.preventDefault();
        alert("Form submitted")
        setContact('')
        setName('')
        setOccupation('')
        setSubmitted(true)
        addDocument(name, occupation, contact)
    }

    return (
        <div className='font-DMSans bg-gray-800 flex-1 h-screen w-screen flex flex-col justify-center items-center'>
            {submitted ? (
                <div className='text-gray-200 flex flex-col justify-center items-center'>

                    <h1 className='text-4xl mt-10'>We will get back to you soon!</h1>
                </div>
            )
                : (
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

                                />
                            </div>
                        </div>


                        <div className='bg-purple-500 hover:bg-purple-400 px-12 py-3 rounded-lg hover:cursor-pointer' onClick={submit}>
                            <h1>Submit</h1>
                        </div>

                    </div >
                )
            }

        </div >

    )
}

export default clothes