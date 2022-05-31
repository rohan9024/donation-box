import React, { useState, useEffect, useContext } from 'react'
import google from "../assets/google.png"
import Image from 'next/Image'
import eye from "../assets/eye.png"
import down from "../assets/down.png"
import hidden from "../assets/hidden.png"
import { auth, db } from "../firebase"
import { getProviders, signIn as SignIntoProvider, useSession } from "next-auth/react"
import signin from "../auth/signin.js"
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore'
import { useRouter } from 'next/router'
import { AuthContext } from '../../Contexts/AuthContext'
import { Menu } from '@headlessui/react'
import { displayConfig } from 'chart/lib'

export default function Login() {
    const [visible, setVisible] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("")
    const [message, setMessage] = useState(false)
    const [NGO, setNGO] = useState(false);
    const [admin, setAdmin] = useState(false);
    const [selectRole, setSelectRole] = useState(false);
    const [name, setName] = useState(false);
    const [donor, setDonor] = useState(false);
    const [fetch, setFetch] = useState(false);
    const [loading, setLoading] = useState(false);
    const [checkusername, setcheckusername] = useState();
    const [checkpass, setcheckpass] = useState();

    const router = useRouter()
    const { _donor, _setDonor, _NGO, _setNGO, _admin, _setAdmin } = useContext(AuthContext);


    function adminSignup(e) {
        e.preventDefault();
        setUsername('')
        setPassword('')
        alert("Admin signup not allowed")
    }
    function NGOSignup(e) {
        e.preventDefault();
        if (username && password) {
            const addNGO = async () => {
                const docRef = await addDoc(collection(db, "NGO"), {
                    username: username,
                    password: password
                });
                alert("Created user successfully");
                setUsername('')
                setName('')
                setPassword('')
            }
            addNGO()
        }
        else if (!username && password) {
            alert("Please enter username")
        }
        else if (username && !password) {
            alert("Please enter password")
        }
        else {
            alert("Missing details")
        }

    }
    function donorSignup(e) {
        e.preventDefault();
        if (username && password) {
            const addDonor = async () => {
                const docRef = await addDoc(collection(db, "user"), {
                    name: '',
                    username: username,
                    password: password,
                    points: 0,

                });
                alert("Created user successfully");
                setUsername('')
                setName('')
                setPassword('')
            }
            addDonor()
        }
        else if (!username && password) {
            alert("Please enter username")
        }
        else if (username && !password) {
            alert("Please enter password")
        }
        else {
            alert("Missing details")
        }
    }

    function adminLogin(e) {
        e.preventDefault();
        if (username && password) {
            const verifyAdmin = async () => {
                const q = query(collection(db, "admin"), where("username", "==", username), where("password", "==", password));
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    _setAdmin({
                        id: doc.id,
                        name: doc.data().name,
                        email: doc.data().email,
                        username: doc.data().username,
                        password: doc.data().password,
                    })
                    router.push("/components/AdminPanel")
                });
            }
            verifyAdmin()
        }
        else if (!username && password) {
            alert("Please enter username")
        }
        else if (username && !password) {
            alert("Please enter password")
        }
        else {
            alert("Missing details")
        }
    }
    function NGOLogin(e) {
        e.preventDefault();
        if (username && password) {
            const verifyNGO = async () => {
                const q = query(collection(db, "NGO"), where("username", "==", username), where("password", "==", password));
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    _setNGO({
                        id: doc.id,
                        name: doc.data().name,
                        email: doc.data().email,
                        username: doc.data().username,
                        password: doc.data().password,
                        no_of_sponsors: doc.data().no_of_sponsors,
                        no_of_donors: doc.data().no_of_donors,
                        pickups_completed: doc.data().pickups_completed,
                        no_of_volunteers: doc.data().no_of_volunteers,
                        revenue: doc.data().revenue,
                        no_of_campaigns: doc.data().no_of_campaigns,
                    })
                    router.push("/components/NGOPanel")
                });
            }
            verifyNGO()
        }
        else if (!username && password) {
            alert("Please enter username")
        }
        else if (username && !password) {
            alert("Please enter password")
        }
        else {
            alert("Missing details")
        }

    }
    function donorLogin(e) {
        e.preventDefault();
        if (username && password) {
            const verifyDonor = async () => {
                const q = query(collection(db, "user"), where("username", "==", username), where("password", "==", password));
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    _setDonor({
                        id: doc.id,
                        name: doc.data().name,
                        email: doc.data().email,
                        username: doc.data().username,
                        password: doc.data().password,
                        points: doc.data().points,
                    })
                    router.push("/components/Starter")
                });
            }
            verifyDonor()
        }
        else if (!username && password) {
            alert("Please enter username")
        }
        else if (username && !password) {
            alert("Please enter password")
        }
        else {
            alert("Missing details")
        }
    }



    return (
        <div className='font-poppins bg-gray-900 h-[870px] flex items-center text-gray-200'>
            <div className='flex justify-center items-center h-[870px]'>
                <img
                    src='https://images.unsplash.com/photo-1595654378985-92061e59a24d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80'
                    alt='img'
                    className='object-contain h-[930px] '
                />
            </div>
            <div className='w-[940px] bg-gray-900 h-[900px] flex flex-col justify-center items-center '>
                <div className='flex flex-col justify-center items-center h-[600px] pt-20'>

                    <div className={error || message ? 'mb-10' : 'mb-10'}>
                        <h1 className='font-bold text-5xl text-center '>Login to Your Account</h1>
                    </div>
                    {error ?
                        (
                            // let result = text.slice(0, 5);
                            <div className={`${error} && bg-red-300 p-5 text-gray-800 font-bold mt-8`}>

                                <h1>{error ? error : ""}</h1>
                            </div>
                        )
                        : ''
                    }
                    {message ?
                        (
                            // let result = text.slice(0, 5);
                            <div className={`${message} && bg-green-300 p-5 text-gray-800 font-bold text-2xl mt-8`}>
                                <h1>{message ? message : ""}</h1>
                            </div>
                        )
                        : ''
                    }

                    <div className='bg-white px-10 py-3 flex justify-center items-center rounded-lg cursor-pointer'>
                        <h1 className='text-xl font-semibold text-black'>Select Role</h1>
                    </div>
                    <div className='flex justify-center items-center space-x-12 mt-10'>
                        <div onClick={() => {
                            setAdmin(true);
                            setNGO(false);
                            setDonor(false);

                        }} className={`${admin && `bg-blue-700`} bg-white w-32 h-12 flex justify-center items-center rounded-lg cursor-pointer hover:bg-blue-700 transition hover:ease-in-out hover:scale-105 hover:border-0 hover:cursor-pointer`}>
                            <h1 className='text-xl font-semibold text-black'>Admin</h1>
                        </div>
                        <div onClick={() => {
                            setAdmin(false);
                            setNGO(true);
                            setDonor(false);

                        }} className={`${NGO && `bg-blue-700`} bg-white w-32 h-12 flex justify-center items-center rounded-lg cursor-pointer hover:bg-blue-700 transition hover:ease-in-out hover:scale-105 hover:border-0 hover:cursor-pointer`}>
                            <h1 className='text-xl font-semibold text-black'>NGO</h1>
                        </div>
                        <div onClick={() => {
                            setAdmin(false);
                            setNGO(false);
                            setDonor(true);

                        }} className={`${donor && `bg-blue-700`} bg-white w-32 h-12 flex justify-center items-center rounded-lg cursor-pointer hover:bg-blue-700 transition hover:ease-in-out hover:scale-105 hover:border-0 hover:cursor-pointer`}>
                            <h1 className='text-xl font-semibold text-black'>Donor</h1>
                        </div>
                    </div>

                    <div className='flex justify-center items-center  w-[650px] h-[500px]'>
                        <form className='space-y-12'>
                            <input placeholder='Username' onChange={(e) => setUsername(e.target.value)} className='text-black font-normal mt-2 block w-[400px] h-12 px-4 py-2 bg-gray-200 border border-slate-300 rounded-md text-md shadow-sm placeholder-slate-700 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500' type="text" />
                            <div className='flex justify-center items-center'>
                                <input placeholder='Password' onChange={(e) => setPassword(e.target.value)} className='z-0 fixed text-black font-normal mt-2 block w-[400px] h-12 px-4 py-2 mb-5 bg-gray-200 border border-slate-300 rounded-md text-md shadow-sm placeholder-slate-700 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500' type={visible ? "text" : "password"} />
                                {visible ? (
                                    <div className='ml-80 cursor-pointer z-10 ' onClick={() => { visible ? setVisible(false) : setVisible(true) }}>
                                        <Image src={eye} alt="visible" width={20} height={20} className="text-white z-10 absolute" />
                                    </div>
                                )
                                    :
                                    (
                                        // <div onClick={() => { visible ? setVisible(true) : setVisible(false) }}>
                                        <div className='ml-80 cursor-pointer z-10 ' onClick={() => { visible ? setVisible(false) : setVisible(true) }}>
                                            <Image src={hidden} alt="hidden" width={20} height={20} className="text-white z-10 absolute" />
                                        </div>
                                    )
                                }
                            </div>

                            <div className='flex justify-betweemn items-center space-x-12 ml-12'>
                                <div onClick={admin && adminLogin || NGO && NGOLogin || donor && donorLogin} className='flex hover:bg-gray-800 hover:ease-in-out transition hover:cursor-pointer space-x-2 justify-center items-center border-gray-700 border-2 rounded-lg w-32 h-12 shadow-md '>
                                    <button className='text-gray-200 text-lg'>Login</button>
                                </div>

                                <div onClick={admin && adminSignup || NGO && NGOSignup || donor && donorSignup} className='flex hover:bg-gray-800 hover:ease-in-out transition hover:cursor-pointer space-x-2 justify-center items-center border-gray-700 border-2 rounded-lg w-32 h-12 shadow-md '>
                                    <button className='text-gray-200 text-lg'>Sign Up</button>
                                </div>
                            </div>

                        </form>
                    </div>

                </div>
            </div>
        </div>

    )
}




