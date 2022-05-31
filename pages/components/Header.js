import React, { useEffect, useContext } from 'react'
import donate from "../assets/donate.png"
import { auth } from "../firebase"
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { AuthContext } from '../../Contexts/AuthContext';
import { useRouter } from 'next/router';


function Header() {

    const { _donor, _setDonor, _NGO, _setNGO } = useContext(AuthContext);
    const router = useRouter()

    const userVerifySponsors = () => {
        if (_donor) {
            router.push('/sponsors')
        }
        else if (_NGO) {
            alert("Please login with your personal account")
            router.push('/components/Login')
        }
        else {
            alert("Please login to proceed")
            router.push('/components/Login')
        }
    }
    const userVerifyDonate = () => {
        if (_donor) {
            router.push('/donate')
        }
        else if (_NGO) {
            alert("Please login with your personal account")
            router.push('/components/Login')
        }
        else {
            alert("Please login to proceed")
            router.push('/components/Login')
        }
    }
    const userVerifyInvolved = () => {
        if (_donor) {
            router.push('/involved')
        }
        else if (_NGO) {
            alert("Please login with your personal account")
            router.push('/components/Login')
        }
        else {
            alert("Please login to proceed")
            router.push('/components/Login')
        }
    }



    return (
        <div className='flex justify-evenly items-center space-x-44 z-10 relative text-gray-200 p-5'>
            <div className='flex justify-center items-center '>
                <h1 className='text-3xl font-normal'>Donation Box</h1>
            </div>
            <div className='flex justify-center items-center space-x-12'>
                <h1 className='text-lg hover:cursor-pointer hover:-translate-y-1 transition hover:ease-in-out ' onClick={userVerifyDonate}>Ways to Donate</h1>
                <h1 className='text-lg hover:cursor-pointer hover:-translate-y-1 transition hover:ease-in-out ' onClick={userVerifyInvolved}>Get Involved</h1>
                <Link href="/about">
                    <h1 className='text-lg hover:cursor-pointer hover:-translate-y-1 transition hover:ease-in-out '>About Us</h1>
                </Link>

                <h1 className='text-lg hover:cursor-pointer hover:-translate-y-1 transition hover:ease-in-out ' onClick={userVerifySponsors}>For sponsors</h1>
            </div>
            {
                _donor ? (
                    <div className='flex justify-center items-center bg-gray-900 hover:ease-in-out hover:bg-gray-800 hover:scale-105 transition hover:border-0 rounded-lg w-28 h-12 hover:cursor-pointer' onClick={() => _setDonor(null)}>
                        <h1 className='text-lg font-semibold'>Logout</h1>
                    </div >
                )
                    : (
                        <Link href="/components/Login">
                            <div className='flex justify-center items-center bg-gray-900 hover:ease-in-out hover:bg-gray-800 hover:scale-105 transition hover:border-0 rounded-lg w-28 h-12 hover:cursor-pointer'>
                                <h1 className='text-normal font-semibold'>Login</h1>
                            </div >
                        </Link >
                    )


            }
            {/* {session ? (
                <div className='flex justify-center items-center hover:cursor-pointer hover:scale-105 rounded-full' onClick={signOut}>
                    <Image src={session?.user?.image} alt="pfp" width={50} height={50} className="rounded-full " />
                </div>

            ) : (
                <Link href="/auth/signin">
                    <div className='flex justify-center items-center bg-gray-900 hover:ease-in-out hover:bg-gray-800 hover:scale-105 transition hover:border-0 rounded-lg w-44 h-12 hover:cursor-pointer'>
                        <h1 className='text-normal font-semibold'>Sign in with Google</h1>
                    </div >
                </Link >
            )
            } */}

        </div >
    )
}

export default Header