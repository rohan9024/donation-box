import React, { useState, useEffect } from 'react'
import google from "../assets/google.png"
import Image from 'next/Image'
import eye from "../assets/eye.png"
import hidden from "../assets/hidden.png"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"
import { getProviders, signIn as SignIntoProvider, useSession } from "next-auth/react"
import Login from '../components/Login'


function signIn({ providers }) {
    const [visible, setVisible] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("")
    const [message, setMessage] = useState(false)


    const { data: session } = useSession();
    console.log(session)


    return (
        <>
            <div className=' flex justify-center items-center w-screen h-screen bg-gray-800'>
                {
                    Object.values(providers).map((provider) => (
                        <div key={provider.name} className=''>
                            <button onClick={() => SignIntoProvider(provider.id, { callbackUrl: '/' })} className="rounded-lg px-4 py-2 bg-blue-600 text-xl text-gray-200 border-blue-700  hover:bg-blue-700 transition hover:ease-in-out hover:scale-105 hover:border-0 hover:cursor-pointer">
                                Continue with {provider.name} SignIn
                            </button>
                        </div>
                    ))
                }
            </div>

        </>
    )
}


export async function getServerSideProps() {
    const providers = await getProviders();

    return {
        props: {
            providers
        }
    }
}

export default signIn
