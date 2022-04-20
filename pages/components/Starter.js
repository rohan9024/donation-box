import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore'
import React, { useContext } from 'react'
import { AuthContext } from '../../Contexts/AuthContext'
import { db } from '../firebase'
import First from './First'
import Header from './Header'
import Second from './Second'
import Third from './Third'

function Starter() {


    async function fetchData() {

        const q = query(collection(db, "admin"), where("name", "==", "Rakesh"));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data().password);
        });

    }
    fetchData();

    return (
        <div className=' bg-gray-900'>

            <img className='w-screen h-screen object-cover absolute z-0' src="https://images.unsplash.com/photo-1638526970908-b18e32b0bc42?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="img" />
            <Header />
            <First />

            <Second />
            <div className='bg-gray-700 w-screen h-[1px]' />

            <Third />
            <div className='bg-gray-700 w-screen h-[1px]' />

        </div>
    )
}

export default Starter