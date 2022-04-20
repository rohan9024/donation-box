import Link from 'next/link'
import React from 'react'

function Third() {
    return (
        <div className='flex justify-center items-center text-gray-200 bg-gray-900 mt-44 mb-44'>
            <img className='w-[2000px] h-[700px] object-contain relative z-10 ' src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="img" />
            <h1 className='text-5xl font-bold z-20 absolute mt-[400px] drop-shadow-xl shadow-2xl'>Explore Campaigns all over India</h1>
            <Link href="/campaigns">
                <div className='flex rounded-lg justify-center items-center text-xl z-20 absolute mt-[580px] shadow-2xl border-blue-700 border-4 w-[200px] h-[60px] hover:bg-blue-700 transition hover:ease-in-out hover:scale-105 hover:border-0 hover:cursor-pointer'>
                    <h1 className='text-center '>Explore Now</h1>
                </div>
            </Link>
        </div>
    )
}

export default Third

