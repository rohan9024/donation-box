import React, { useState, useContext, useEffect } from 'react'
import done from "../pages/assets/done.gif"
import Image from 'next/image'
import { db, storage } from "./firebase"
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { addDoc, collection, doc, increment, updateDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { AuthContext } from '../Contexts/AuthContext';

function books() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [name, setName] = useState()
  const [contact, setContact] = useState()
  const [submitted, setSubmitted] = useState(false);
  const [bookGenre, setBookGenre] = useState("");
  const [bookName, setBookName] = useState("");
  const [progress, setProgress] = useState(0)
  const [pickupDate, setPickupDate] = useState("")


  const { _donor, _setDonor } = useContext(AuthContext);

  const router = useRouter();


  useEffect(() => {
    _donor ?
      router.push("/books")
      : router.push("/components/Login");

  }, [])

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
  const addDocument = async (name, email, contact, bookName, bookGenre, pickupDate) => {
    let timestamp = new Date().getTime();

    const docRef = await addDoc(collection(db, "pickup books"), {
      name: name,
      email: email,
      bookName: bookName,
      bookGenre: bookGenre,
      contact: contact,
      timestamp: timestamp,
      pickupDate: pickupDate
    });
  }
  const submit = (e) => {

    if (name && contact && bookName && bookGenre && pickupDate) {
      e.preventDefault();
      addDocument(name, _donor.email, contact, bookName, bookGenre, pickupDate);
      updatePoints(_donor.id, 100)
      alert('Pickup will be confirmed soon.')
      setContact("")
      setName("")
      setPickupDate("")
      setBookName("")
      setBookGenre("")
    }
    else {
      alert("Fill details properly")
    }
  }
  return (
    <>
      <div className='flex justify-center items-center bg-gray-800 font-poppins font-bold'>

        <div className='flex justify-center items-center  h-screen  w-2/4'>
          <Image src='https://media.istockphoto.com/vectors/cardboard-box-with-books-for-donations-charity-colorful-vector-vector-id1178491737?k=20&m=1178491737&s=612x612&w=0&h=xgqe5jHZbz6KNovyDJf30G9HDQfSuEAb0KtAbcLxk28=' alt="backgroundImage" objectFit='contain' width={1000} height={1000} />

        </div>


        <div className='font-poppins bg-gray-800 flex-1 h-screen w-screen flex flex-col justify-center items-center'>

          <div className='min-h-[200px] w-[450px] bg-purple-300 shadow-2xl border border-gray-500 rounded-lg flex flex-col justify-center items-center m-auto space-y-5 py-12 '>
            <h1 className='text-center text-3xl'>Donate Books</h1>
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



            {/* next */}

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
                  placeholder="9136744728"
                  value={contact}


                />
              </div>
            </div>
            <div class="flex justify-center">
              <div class="mb-3 w-96">
                <label class="form-label inline-block mb-2 text-gray-700">Enter Book Name</label>
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

                  onChange={(e) => setBookName(e.target.value)}
                  placeholder="Rich Dad Poor Dad"
                  value={bookName}

                />
              </div>
            </div>
            <div class="flex justify-center">
              <div class="mb-3 w-96">
                <label class="form-label inline-block mb-2 text-gray-700">Enter Book Genre</label>
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

                  onChange={(e) => setBookGenre(e.target.value)}
                  placeholder="Educational, Business, etc"
                  value={bookGenre}

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

export default books