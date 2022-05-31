import { addDoc, collection, getDocs } from 'firebase/firestore';
import React, { useState, useEffect,useContext } from 'react'
import { db } from './firebase';
import { useRouter } from 'next/router'
import { AuthContext } from '../Contexts/AuthContext';


function kids() {
    const [name, setName] = useState()
    const [amount, setAmount] = useState(0)
    const [contact, setContact] = useState()

    const { _donor, _setDonor } = useContext(AuthContext);

    const router = useRouter();


    useEffect(() => {
        _donor ?
            router.push("/kids")
            : router.push("/components/Login");

    }, [])


    const submit = (e) => {
        e.preventDefault();
        async function add() {
            const docRef = await addDoc(collection(db, "kids"), {
                name: name,
                contact: contact,
                amount: amount
            });
            alert("Submitted successfully")
        }
        add();
    }

    return (
        <div className=' bg-gray-900 text-gray-200 h-screen w-screen flex justify-center items-center'>
            <div className='min-h-[200px] w-[450px] bg-purple-300 shadow-2xl border border-gray-500 rounded-lg flex flex-col justify-center items-center m-auto space-y-5 py-12 '>
                <h1 className='text-center text-3xl'>Donate Form</h1>
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
                <div class="flex justify-center">
                    <div class="mb-3 xl:w-96">
                        <label class="form-label inline-block mb-2 text-gray-700"
                        >Amount</label>
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
                            onChange={(e) => setAmount(e.target.value)}

                        />
                    </div>
                </div>




                <div className='bg-purple-500 hover:bg-purple-400 px-12 py-3 rounded-lg hover:cursor-pointer' onClick={submit}>
                    <h1>Submit</h1>
                </div>

            </div >
        </div>
    )
}

export default kids