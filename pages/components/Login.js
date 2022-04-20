import React, { useState, useEffect, useContext } from 'react'
import google from "../assets/google.png"
import Image from 'next/Image'
import eye from "../assets/eye.png"
import hidden from "../assets/hidden.png"
import { auth, db } from "../firebase"
import { getProviders, signIn as SignIntoProvider, useSession } from "next-auth/react"
import signin from "../auth/signin.js"
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore'
import { useRouter } from 'next/router'
import { AuthContext } from '../../Contexts/AuthContext'

export default function Login({ providers }) {
    const [visible, setVisible] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("")
    const [message, setMessage] = useState(false)
    const [NGO, setNGO] = useState(false);
    const [admin, setAdmin] = useState(false);
    const [name, setName] = useState(false);
    const [donor, setDonor] = useState(false);
    const [fetch, setFetch] = useState(false);
    const [loading, setLoading] = useState(false);
    const [checkusername, setcheckusername] = useState();
    const [checkpass, setcheckpass] = useState();

    const router = useRouter()
    const { _user, _setUser, _NGO, _setNGO, _admin, _setAdmin } = useContext(AuthContext);


    function adminSignup(e) {
        e.preventDefault();
        setUsername('')
        setPassword('')
        alert("Admin signup not allowed")
    }
    function NGOSignup(e) {
        e.preventDefault();
        const addNGO = async () => {
            const docRef = await addDoc(collection(db, "NGO"), {
                username: username,
                password: password
            });
            alert("Created user successfully");
            setUsername('')
            setName('')
            setPassword('')
            router.push("/components/NGOPanel")
        }
        addNGO()
    }
    function donorSignup(e) {
        e.preventDefault();
        alert("donor")
    }
    function adminLogin(e) {
        e.preventDefault();
        const verifyAdmin = async () => {
            const q = query(collection(db, "admin"), where("username", "==", username));
            const querySnapshot = await getDocs(q);
            if (querySnapshot) {
                setcheckusername(true);
                const pq = query(collection(db, "admin"), where("password", "==", password));
                const querySnapshotP = await getDocs(pq);
                if (querySnapshotP) {
                    setcheckpass(true);
                    console.log(checkusername)
                    console.log(checkpass)
                    alert(`Logged successfully`)
                    setUsername('')
                    setPassword('')
                    const q = query(collection(db, "admin"), where("username", "==", username));
                    const querySnapshot = await getDocs(q);
                    querySnapshot.forEach((doc) => {
                        setName(doc.data().name)
                    });
                    _setAdmin({
                        name: name,
                        username: username,
                        password: password,
                    })
                    router.push("/components/AdminPanel")

                }
                else {
                    setcheckpass(false)
                    alert('Wrong Password. Try again')
                }
            }
            else {
                alert('Wrong Username')
            }

        }
        verifyAdmin()
    }
    function NGOLogin(e) {
        e.preventDefault();
        const verifyNGO = async () => {
            const q = query(collection(db, "NGO"), where("username", "==", username));
            const querySnapshot = await getDocs(q);
            if (querySnapshot) {
                setcheckusername(true);
                const pq = query(collection(db, "NGO"), where("password", "==", password));
                const querySnapshotP = await getDocs(pq);
                if (querySnapshotP) {
                    setcheckpass(true);
                    console.log(checkusername)
                    console.log(checkpass)
                    alert(`Logged successfully`)
                    setUsername('')
                    setPassword('')
                    const q = query(collection(db, "NGO"), where("username", "==", username));
                    const querySnapshot = await getDocs(q);
                    querySnapshot.forEach((doc) => {
                        setName(doc.data().name)
                    });
                    _setNGO({
                        name: name,
                        username: username,
                        password: password,
                    })
                    router.push("/components/NGOPanel")

                }
                else {
                    setcheckpass(false)
                    alert('Wrong Password. Try again')
                }
            }
            else {
                alert('Wrong Username')
            }

        }
        verifyNGO()

    }
    function donorLogin(e) {
        e.preventDefault();
        const verifyDoner = async () => {
            const q = query(collection(db, "user"), where("username", "==", username));
            const querySnapshot = await getDocs(q);
            if (querySnapshot) {
                setcheckusername(true);
                const pq = query(collection(db, "user"), where("password", "==", password));
                const querySnapshotP = await getDocs(pq);
                if (querySnapshotP) {
                    setcheckpass(true);
                    console.log(checkusername)
                    console.log(checkpass)
                    alert(`Logged successfully`)
                    setUsername('')
                    setPassword('')
                    const q = query(collection(db, "user"), where("username", "==", username));
                    const querySnapshot = await getDocs(q);
                    querySnapshot.forEach((doc) => {
                        setName(doc.data().name)
                    });
                    _setUser({
                        name: name,
                        username: username,
                        password: password,
                    })
                    router.push("/components/Starter")

                }
                else {
                    setcheckpass(false)
                    alert('Wrong Password. Try again')
                }
            }
            else {
                alert('Wrong Username')
            }

        }
        verifyDoner()
    }

    return (
        <div className='bg-gray-900 h-[870px] flex items-center text-gray-200'>
            <div className='flex justify-center items-center h-[870px]'>
                <img
                    src='https://images.unsplash.com/photo-1595654378985-92061e59a24d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80'
                    alt='img'
                    className='object-contain h-[930px] '
                />
            </div>
            <div className='w-[940px] bg-gray-900 h-[900px] flex flex-col justify-center items-center '>
                <div className='flex flex-col justify-center items-center h-[600px] pt-20'>

                    <div className={error || message ? '' : ''}>
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
                    <div className='flex justify-around items-center w-[500px] pt-14'>
                        <h1 className='text-2xl w-1/3 text-center mr-10'>Select Role:</h1>
                        <div className='flex justify-around items-center w-2/3 space-x-4'>
                            <button onClick={() => {
                                setNGO(true);
                                setAdmin(false);
                                setDonor(false);
                            }} className={`text-xl px-7 py-2 bg-gray-200 text-black rounded-lg hover:scale-105 hover:cursor-pointer hover:ease-in-out hover:duration-200 font-semibold ${NGO && 'bg-blue-600'}`}>NGO</button>
                            <button onClick={() => {
                                setAdmin(true);
                                setNGO(false);
                                setDonor(false);
                            }} className={`text-xl px-7 py-2 bg-gray-200 text-black rounded-lg hover:scale-105 hover:cursor-pointer hover:ease-in-out hover:duration-200  font-semibold ${admin && 'bg-blue-600'}`}>Admin</button>
                            <button onClick={() => {
                                setDonor(true);
                                setNGO(false);
                                setAdmin(false);
                            }} className={`text-xl px-7 py-2 bg-gray-200 text-black rounded-lg hover:scale-105 hover:cursor-pointer hover:ease-in-out hover:duration-200  font-semibold ${donor && 'bg-blue-600'}`}>Donor</button>
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




