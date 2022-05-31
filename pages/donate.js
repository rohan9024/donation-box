import React, { useState, useEffect, useContext } from 'react'
import { getFirestore, collection, getDocs, QuerySnapshot } from 'firebase/firestore';
import { db } from "./firebase.js"
import { useRouter } from 'next/router'
import { AuthContext } from '../Contexts/AuthContext.js';
import Image from 'next/image';
import donatebg from "../pages/assets/donate-background.jpg"

// const [newName, setNewName] = useState("")
// const [newAge, setNewAge] = useState(0)

// const [users, setUsers] = useState([])
// const usersCollectionRef = collection(db, "users")

// const createUser = async () => {
//   await addDoc(usersCollectionRef, { name: newName, age: Number(newAge) })
// }

// const updateUser = async (id, age) => {
//   const userDoc = doc(db, "users", id)
//   const newFields = { age: age + 1 }
//   await updateDoc(userDoc, newFields)
// }

// const deleteUser = async (id) => {
//   const userDoc = doc(db, "users", id)
//   await deleteDoc(userDoc)
// }



// return (
//   <div className="App">

//     <input type="text" placeholder="Name:"
//       onChange={(event) => {
//         setNewName(event.target.value)
//       }} />

//     <input type="number" placeholder="Age:"
//       onChange={(event) => {
//         setNewAge(event.target.value)
//       }} />

//     <button onClick={createUser}>Create User</button>

//     {users.map((user) => {
//       return (
//         <div>
//           {" "}
//           <h1>Name: {user.name}</h1>
//           <h1>Age: {user.age}</h1>
//           <button onClick={() => { updateUser(user.id, user.age) }}>Increase Age</button>
//           <button onClick={() => { deleteUser(user.id) }}>Delete User</button>
//         </div>
//       )
//     })}
//   </div>


function donate() {
  const colRef = collection(db, 'donation type')
  const [donationTypes, setDonationTypes] = useState([])
  const [fetch, setFetch] = useState(false)
  const router = useRouter()
  const { _donor, _setDonor, _NGO, _setNGO } = useContext(AuthContext)

  useEffect(() => {
    if (!fetch) {
      const fetchDonationTypes = async () => {
        const querySnapshot = await getDocs(collection(db, "donation type"));
        querySnapshot.forEach((doc) => {
          setDonationTypes((donationTypes) => [...donationTypes, { id: doc.id, name: doc.data().name, url: doc.data().url }])
        }
        )
      }
      fetchDonationTypes();
      console.log(donationTypes)
      setFetch(true)
    }
  }, [])
  // let map = {};
  // donationTypes.map(type => {
  //   if (type.id ==) {
  //     map[type.id] = type;
  //   }
  // })



  donationTypes.splice(6, 11)

  return (
    <div className=' bg-gray-900 text-gray-200 pb-20'>
      <div className="h-[600px] w-screen bg-purple-600 flex justify-center items-center">
        <Image src={donatebg} alt="backgroundImage" objectFit='contain' width={1000} height={1000} />

      </div>
      <h1 class="text-5xl font-normal mt-10 ml-20">Select your type of donation</h1>
      <div className='grid grid-cols-3 gap-4 ml-20 mr-20 mt-20 '>
        {donationTypes.map((type) => (
          <div key={type.id} className='flex flex-col justify-center items-center hover:border-4 hover:border-blue-600 hover:ease-in-out hover:rounded-lg hover:cursor-pointer hover:duration-200'>
            <img className='rounded-t-lg' src={type.url} alt="img" onClick={() => router.push(`/${type.name}`)} />
            <h1 className='text-3xl font-semibold w-[450px] bg-gray-200 text-gray-800 text-center rounded-b-lg pt-4 pb-4'>Donate {type.name}</h1>
          </div>
        ))}
      </div>
    </div>
  )
}

export default donate

