import React, { useState, useContext, useEffect } from 'react'
import done from "../pages/assets/done.gif"
import Image from 'next/image'
import { db, storage } from "./firebase"
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { addDoc, collection, doc, increment, updateDoc } from 'firebase/firestore';
import { AuthContext } from '../Contexts/AuthContext';
import { useRouter } from 'next/router';

function food() {
  const [name, setName] = useState()
  const [contact, setContact] = useState()
  const [food, setFood] = useState('')
  const [quantity, setQuantity] = useState("")
  const { _donor, _setDonor } = useContext(AuthContext);

  const router = useRouter();


  useEffect(() => {
    _donor ?
      router.push("/food")
      : router.push("/components/Login");

  }, [])



  const addDocument = async (name, email, contact, food, quantity) => {
    let timestamp = new Date().getTime();

    const docRef = await addDoc(collection(db, "pickup food"), {
      name: name,
      email: email,
      contact: contact,
      timestamp: timestamp,
      food: food,
      quantity: quantity
    });
  }

  const updatePoints = async (id, points) => {
    const ref = doc(db, "user", id);
    const ref2 = doc(db, "info", "qi1oMnSLTD30gyxViBmG");

    await updateDoc(ref2, {
      donors: increment(1)
    });

    await updateDoc(ref, {
      points: increment(points)
    });
  }
  const submit = (e) => {
    if (name && quantity && contact && food && quantity) {
      e.preventDefault();
      addDocument(name, _donor.email, contact, food, quantity);
      updatePoints(_donor.id, 100)
      alert('We will contact you soon.')
      setContact("")
      setName("")
      setQuantity("")
      setFood("")
    }
    else {
      alert("Fill details properly")
    }
  }
  return (
    <>

      <div className='flex justify-center items-center bg-gray-800 font-poppins font-bold'>

        <div className='flex justify-center items-center  h-screen  w-1/2'>
          <Image src='https://thumbs.dreamstime.com/b/cardboard-donation-box-full-groceries-help-poor-people-volunteering-charity-concept-185040191.jpg' alt="backgroundImage" objectFit='contain' width={1100} height={1100} />

        </div>

        <div className='min-h-[200px] w-[450px] bg-purple-300 shadow-2xl border border-gray-500 rounded-lg flex flex-col justify-center items-center m-auto space-y-5 py-12 '>
          <h1 className='text-center text-3xl'>Donate Food</h1>
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
                placeholder="9137544728"
                value={contact}

              />
            </div>
          </div>
          <div class="flex justify-center">
            <div class="mb-3 xl:w-96">
              <label class="form-label inline-block mb-2 text-gray-700"
              >Enter the food you are donating</label>
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
                onChange={(e) => setFood(e.target.value)}
                placeholder="Rajma Chawal, Bread, etc"
                value={food}

              />
            </div>
          </div>
          <div class="flex justify-center">
            <div class="mb-3 xl:w-96">
              <label class="form-label inline-block mb-2 text-gray-700"
              >How many people can eat the food you are providing?</label>
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
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="5"
                value={quantity}

              />
            </div>
          </div>
          <h1 className='text-sm'>Note: Please don't give any food which has been expired</h1>


          <div className='bg-purple-500 hover:bg-purple-400 px-12 py-3 rounded-lg hover:cursor-pointer' onClick={submit}>
            <h1>Submit</h1>
          </div>

        </div >


      </div >

    </>


  )
}

export default food