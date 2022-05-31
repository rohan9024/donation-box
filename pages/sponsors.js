import React, { useState, useContext, useEffect } from 'react'
import done from "../pages/assets/done.gif"
import Image from 'next/image'
import { db, storage } from "./firebase"
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { addDoc, arrayUnion, collection, doc, increment, setDoc, updateDoc } from 'firebase/firestore';
import { AuthContext } from '../Contexts/AuthContext';
import { useRouter } from 'next/router';
import moneyImg from "../pages/assets/money.png"

function sponsors() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [name, setName] = useState()
  const [username, setUsername] = useState()
  const [contact, setContact] = useState()
  const [submitted, setSubmitted] = useState(false);
  const [progress, setProgress] = useState(0)
  const [occupation, setOccupation] = useState()
  const [money, setMoney] = useState(0)

  const { _donor, _setDonor } = useContext(AuthContext);

  const router = useRouter();

  useEffect(() => {
    _donor ?
      router.push("/sponsors")
      : router.push("/components/Login");

  }, [])

  const addDocument = async (name, email, occupation, contact, money) => {

    await addDoc(collection(db,
      "sponsors"), {
      name: name,
      contact: contact,
      occupation: occupation,
      email: email,
      money: money
    });
  }
  const updatePoints = async (id, points) => {
    const ref = doc(db, "user", id);

    // Atomically increment the population of the city by 50.
    await updateDoc(ref, {
      points: increment(points)
    });

  }
  const updateRevenue = async (money) => {
    const ref = doc(db, "info", "qi1oMnSLTD30gyxViBmG");

    // Atomically increment the population of the city by 50.
    await updateDoc(ref, {
      revenue: increment(money)
    });
    await updateDoc(ref, {
      sponsors: increment(1)
    });

    await updateDoc(ref, {
      pre_revenue: arrayUnion(money)
    });

  }

  function submit(e) {

    if (name && money && contact && occupation) {
      e.preventDefault();
      alert("Thank you for the donation")
      setContact('')
      setName('')
      setOccupation('')
      setMoney(0)
      addDocument(name, _donor.email, occupation, contact, money)
      updatePoints(_donor.id, 100)
      updateRevenue(money)
    }
    else {
      alert("Fill details properly")
    }
  }

  const decrement = () => {
    if (money != 0) {
      setMoney(money - 1000)
    }
  }
  return (
    <div className='font-poppins bg-gray-800 flex-1 h-screen w-screen flex justify-center items-center'>
      <div className='flex justify-center items-center  h-screen  w-1/2'>
        <Image src={moneyImg} alt="backgroundImage" objectFit='contain' width={1100} height={1100} />

      </div>
      <div className='min-h-[200px] w-[450px] bg-purple-300 shadow-2xl border border-gray-500 rounded-lg flex flex-col justify-center items-center m-auto space-y-5 py-12 '>
        <h1 className='text-center text-3xl'>For sponsors</h1>
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
              placeholder="9137344728"
              value={contact}

            />
          </div>
        </div>
        <div class="flex justify-center">
          <div class="flex justify-center items-center space-x-5">
            {/* <label class="form-label inline-block mb-2 text-gray-700"
                >Money</label> */}
            <div className='flex justify-center px-6 h-10 bg-gray-200 text-2xl rounded-lg font-bold select-none' onClick={decrement}>
              <button>-</button>
            </div>
            {/* <h1>{money}</h1> */}
            <input
              type="text"
              value={money}
              class="
                  block
                  w-16
                  px-2
                  py-1.5
                  text-base
                  font-normal
                  text-gray-700
                  bg-white bg-clip-padding
                  border border-solid border-gray-300
                  rounded
                  transition
                  ease-in-out
                  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                  "
              onChange={(e) => setMoney(e.target.value)}

            />
            {/* <div className='flex justify-center px-6 h-10 bg-gray-200 text-2xl rounded-lg font-bold' onClick={() => setMoney((prevCount) => prevCount + 1000)}> */}
            <div className='flex justify-center px-6 h-10 bg-gray-200 text-2xl rounded-lg font-bold select-none' onClick={() => setMoney(money + 1000)}>
              <button>+</button>
            </div>

          </div>
        </div>


        <div className='bg-purple-500 hover:bg-purple-400 px-12 py-3 rounded-lg hover:cursor-pointer' onClick={submit}>
          <h1>Submit</h1>
        </div>

      </div >


    </div >

  )
}

export default sponsors