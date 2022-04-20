import React, { useEffect, useContext } from 'react'
import donate from "../assets/donate.png"
import { auth } from "../firebase"
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { AuthContext } from '../../Contexts/AuthContext';


function Header() {

    const { _user, _setUser } = useContext(AuthContext);


    return (
        <div className='flex justify-evenly items-center space-x-44 z-10 relative text-gray-200 p-5'>
            <div className='flex justify-center items-center '>
                <h1 className='text-3xl font-normal'>Donation Box</h1>
            </div>
            <div className='flex justify-center items-center space-x-12'>
                <Link href="/donate">
                    <h1 className='text-lg hover:cursor-pointer hover:-translate-y-1 transition hover:ease-in-out '>Ways to Donate</h1>
                </Link>
                <Link href="/involved">
                    <h1 className='text-lg hover:cursor-pointer hover:-translate-y-1 transition hover:ease-in-out '>Get Involved</h1>
                </Link>
                <Link href="/about">
                    <h1 className='text-lg hover:cursor-pointer hover:-translate-y-1 transition hover:ease-in-out '>About Us</h1>
                </Link>
                <Link href="/sponsors">
                <h1 className='text-lg hover:cursor-pointer hover:-translate-y-1 transition hover:ease-in-out '>For sponsors</h1>
                </Link>

            </div>
            {
                _user ? (
                    <div className='flex justify-center items-center bg-gray-900 hover:ease-in-out hover:bg-gray-800 hover:scale-105 transition hover:border-0 rounded-lg w-28 h-12 hover:cursor-pointer' onClick={() => _setUser(null)}>
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