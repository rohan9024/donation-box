import React, { useState, useContext, useEffect } from 'react'
import done from "../pages/assets/done.gif"
import Image from 'next/image'
import { db, storage } from "./firebase"
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { addDoc, collection, doc, increment, updateDoc } from 'firebase/firestore';
import { AuthContext } from '../Contexts/AuthContext';
import { useRouter } from 'next/router';

function utensils() {
  const [name, setName] = useState()
  const [contact, setContact] = useState()
  const [utensilType, setUtensilType] = useState('')
  const [quantity, setQuantity] = useState("")
  const [pickupDate, setPickupDate] = useState('')

  const { _donor, _setDonor } = useContext(AuthContext);

  const router = useRouter();

  useEffect(() => {
    _donor ?
      router.push("/utensils")
      : router.push("/components/Login");

  }, [])


  const addDocument = async (name, email, contact, utensilType, quantity, pickupDate) => {
    let timestamp = new Date().getTime();

    const docRef = await addDoc(collection(db, "pickup utensils"), {
      name: name,
      email: email,
      contact: contact,
      timestamp: timestamp,
      utensilType: utensilType,
      quantity: quantity,
      pickupDate: pickupDate
    });
  }
  const updatePoints = async (id, points) => {
    const ref = doc(db, "user", id);

    // Atomically increment the population of the city by 50.
    await updateDoc(ref, {
      points: increment(points)
    });
  }
  const submit = (e) => {
    if (name && quantity && contact && utensilType && pickupDate) {
      e.preventDefault();
      addDocument(name, _donor.email, contact, utensilType, quantity, pickupDate);
      updatePoints(_donor.id, 100)
      alert('Pickup will be confirmed soon.')
      setContact("")
      setName("")
      setPickupDate("")
      setQuantity("")
      setUtensilType("")
    }
    else {
      alert("Fill details properly")
    }
  }
  return (
    <>


      <div className='flex justify-center items-center bg-gray-800 font-poppins font-bold'>

        <div className='flex justify-center items-center h-screen  ml-10 w-2/4'>
          <Image src='https://media.istockphoto.com/photos/volunteers-are-preparing-a-donation-box-with-nonperishable-food-view-picture-id1318879413?b=1&k=20&m=1318879413&s=170667a&w=0&h=r6ET3epJlL4zD88FzmBFFcQgN2bGQp5F0WGsG5efx_I=' alt="backgroundImage" objectFit='contain' width={1000} height={1000} />
        </div>


        <div className='font-DMSans bg-gray-800 flex-1 h-screen w-screen flex flex-col justify-center items-center'>

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
                  placeholder="9137444728"
                  value={contact}

                />
              </div>
            </div>
            <div class="flex justify-center">
              <div class="mb-3 xl:w-96">
                <label class="form-label inline-block mb-2 text-gray-700"
                >Utensil Type</label>
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
                  onChange={(e) => setUtensilType(e.target.value)}
                  placeholder="Plates, spoons, etc"
                  value={utensilType}

                />
              </div>
            </div>
            <div class="flex justify-center">
              <div class="mb-3 xl:w-96">
                <label class="form-label inline-block mb-2 text-gray-700"
                >Quantity</label>
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
                  placeholder="10"
                value={quantity}

                />
              </div>
            </div>
            <div class="flex justify-center">
              <div class="mb-3 xl:w-96">
                <label class="form-label inline-block mb-2 text-gray-700"
                >Select Date</label>
                <input
                  type="date"
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
                  onChange={(e) => setPickupDate(e.target.value)}
                  value={pickupDate}

                />
              </div>
            </div>


            <div className='bg-purple-500 hover:bg-purple-400 px-12 py-3 rounded-lg hover:cursor-pointer' onClick={submit}>
              <h1>Submit</h1>
            </div>

          </div >


        </div >
      </div >

    </>


  )
}

export default utensils