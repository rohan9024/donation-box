import React, { useState, useContext, useEffect } from 'react'
import done from "../pages/assets/done.gif"
import Image from 'next/image'
import { db, storage } from "./firebase"
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { addDoc, collection, doc, increment, setDoc, updateDoc } from 'firebase/firestore';
import down from "../pages/assets/down.png"
import { AuthContext } from '../Contexts/AuthContext';
import { useRouter } from 'next/router';


function clothes() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [name, setName] = useState()
  const [contact, setContact] = useState()
  const [progress, setProgress] = useState(0)
  const [points, setPoints] = useState()
  const [dropdown, setDropdown] = useState(false)
  const [type, setType] = useState('')
  const [pickupDate, setPickupDate] = useState('')
  const { _donor, _setDonor } = useContext(AuthContext);

  const router = useRouter();


  useEffect(() => {
    _donor ?
      router.push("/clothes")
      : router.push("/components/Login");

  }, [])

  const addDocument = async (name, email, contact, type, pickupDate) => {
    let timestamp = new Date().getTime();

    const docRef = await addDoc(collection(db, "pickup clothes"), {
      name: name,
      email: email,
      contact: contact,
      timestamp: timestamp,
      type: type,
      pickupDate: pickupDate
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
    if (name && type && contact && pickupDate) {
      e.preventDefault();
      addDocument(name, _donor.email, contact, type, pickupDate);
      updatePoints(_donor.id, 100)
      alert('Pickup will be confirmed soon.')
      setContact("")
      setName("")
      setPickupDate("")
      setType("")
    }
    else {
      alert("Fill details properly")
    }
  }


  return (
    <>
      <div className='flex justify-center items-center bg-gray-800 font-poppins font-bold'>

        <div className='flex justify-center items-center  h-screen  w-1/2'>
          <Image src='https://media.istockphoto.com/vectors/sharing-clothes-to-people-clothes-donation-concept-woman-hand-holding-vector-id1339396804?b=1&k=20&m=1339396804&s=612x612&w=0&h=S5dE4CWqUuCazzbmgeoAXbsbFEvTwU4N-0BF7gdmcsU=' alt="backgroundImage" objectFit='contain' width={1100} height={1100} />

        </div>
        <div className=' bg-gray-800 h-screen drop-shadow-lg flex justify-center items-center w-1/2'>

          <div className='min-h-[200px] w-[450px] bg-purple-400 shadow-2xl rounded-lg flex flex-col justify-center items-center m-auto space-y-5 py-12 '>
            <h1 className='text-center text-3xl'>Donate Clothes</h1>
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
                  placeholder='917255728'
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


            {/* Dropdown */}

            <div className=''>

              <div className='p-3 rounded-md bg-blue-500 flex justify-center items-center cursor-pointer select-none' onClick={() => {
                dropdown ? setDropdown(false) : setDropdown(true);
              }}>
                <h1 className='mr-3'>Select Cloth Type</h1>
                <Image src={down} alt="down" width={20} height={20} />

              </div>

              {dropdown && (
                <>
                  <div className='flex flex-col justify-center items-center z-50 absolute bg-white w-48'>
                    <h1 onClick={() => {
                      setType('men')
                    }} className={`${type == 'men' && 'bg-blue-300 hover:bg-blue-200'} hover:bg-gray-200 hover:cursor-pointer hover:ease-in-out w-full text-center p-2 `}>Men</h1>
                    <h1 onClick={() => {
                      setType('women')
                    }} className={`${type == 'women' && 'bg-blue-300 hover:bg-blue-200'} hover:bg-gray-200 hover:cursor-pointer hover:ease-in-out w-full text-center p-2 `}>Women</h1>
                    <h1 onClick={() => {
                      setType('kids')
                    }} className={`${type == "kids" && 'bg-blue-300 hover:bg-blue-200'} hover:bg-gray-200 hover:cursor-pointer hover:ease-in-out w-full text-center p-2 `}>Kids</h1>
                    <h1 onClick={() => {
                      setType('infant')
                    }} className={`${type == "infant" && 'bg-blue-300 hover:bg-blue-200'} hover:bg-gray-200 hover:cursor-pointer hover:ease-in-out w-full text-center p-2 `}>Infant</h1>
                  </div>
                </>

              )}
            </div>



            <div className='bg-purple-600 hover:bg-purple-500 px-12 py-3 rounded-lg hover:cursor-pointer' onClick={submit}>
              <h1>Submit</h1>
            </div>

          </div >


        </div >
      </div >
    </>

  )
}

export default clothes