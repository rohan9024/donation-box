import React, { useState, useContext, useEffect } from 'react'
import done from "../pages/assets/done.gif"
import Image from 'next/image'
import { db, storage } from "./firebase"
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { addDoc, collection, doc, increment, updateDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { AuthContext } from '../Contexts/AuthContext';

function medicines() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [contact, setContact] = useState()
  const [progress, setProgress] = useState(0)
  const [medicineName, setMedicineName] = useState("")
  const [medicineQuantity, setMedicineQuantity] = useState("")
  const [pickupDate, setPickupDate] = useState('')

  const { _donor, _setDonor } = useContext(AuthContext);

  const router = useRouter();

  useEffect(() => {
    _donor ?
      router.push("/medicines")
      : router.push("/components/Login");

  }, [])


  const addDocument = async (name, email, contact, medicineName, medicineQuantity, pickupDate) => {
    let timestamp = new Date().getTime();

    const docRef = await addDoc(collection(db, "pickup medicines"), {
      name: name,
      email: email,
      medicineName: medicineName,
      medicineQuantity: medicineQuantity,
      contact: contact,
      pickupDate: pickupDate,
      timestamp: timestamp
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
    if (name && medicineName && contact && pickupDate) {
      e.preventDefault();
      addDocument(name, _donor.email, contact, medicineName, medicineQuantity, pickupDate);
      updatePoints(_donor.id, 100)
      alert('Pickup will be confirmed soon.')
      setContact("")
      setName("")
      setPickupDate("")
      setMedicineQuantity("")
      setMedicineName("")
    }
    else {
      alert("Fill details properly")
    }
  }
  return (
    <>

      <div className='flex justify-center items-center bg-gray-800 font-poppins font-bold'>

        <div className='flex justify-center items-center  h-screen  w-2/4'>
          <Image src='https://img.freepik.com/vector-gratis/donacion-cajas-medicamentos_24911-59437.jpg' alt="backgroundImage" objectFit='contain' width={1000} height={1000} />

        </div>

        <div className='font-DMSans bg-gray-800 flex-1 h-screen w-screen flex flex-col justify-center items-center'>

          <div className='min-h-[200px] w-[450px] bg-purple-300 shadow-2xl border border-gray-500 rounded-lg flex flex-col justify-center items-center m-auto space-y-5 py-12 '>
            <h1 className='text-center text-3xl'>Donate Medicines</h1>
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
                  placeholder="9137255728"
                value={contact}

                />
              </div>
            </div>
            <div class="flex justify-center">
              <div class="mb-3 w-96">
                <label class="form-label inline-block mb-2 text-gray-700">Enter name of the medicine</label>
                <input class="form-control
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
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" type="text"
                  onChange={(e) => setMedicineName(e.target.value)}
                  placeholder="Saridon, Crocin, etc"
                value={medicineName}

                />
              </div>
            </div>
            <div class="flex justify-center">
              <div class="mb-3 w-96">
                <label class="form-label inline-block mb-2 text-gray-700">Enter quantity</label>
                <input class="form-control
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
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" type="text"
                  onChange={(e) => setMedicineQuantity(e.target.value)}
                  placeholder="10"
                value={medicineQuantity}

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

export default medicines