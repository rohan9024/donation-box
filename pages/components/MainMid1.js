import Image from 'next/image'
import React, { useState } from 'react'
import food from "../assets/food.png"
import clothes from "../assets/clothes.png"
import books from "../assets/books.png"
import organs from "../assets/organs.png"
import medicines from "../assets/medicines.png"
import next from "../assets/next.png"

function MainMid1() {
    const [more, setMore] = useState(false);

    return (
        <div className='mt-44'>

            <div className='space-y-5'>

                <div className='flex justify-center items-center space-x-7 ml-10'>
                    <div className='w-56 h-56 flex flex-col justify-center items-center bg-indigo-300 rounded-lg text-black select-none space-y-4 drop-shadow-2xl'>
                        <Image src={food} alt="food" width={100} height={100} />
                        <h1 className='font-bold text-lg'>Total Food donated</h1>
                        <h1 className='text-4xl font-bold'>120</h1>
                    </div>
                    <div className='w-56 h-56  flex flex-col justify-center items-center bg-indigo-300 rounded-lg text-black  select-none space-y-4 drop-shadow-2xl'>
                        <Image src={clothes} alt="clothes" width={100} height={100} />
                        <h1 className='font-bold text-lg'>Total Clothes Donated</h1>
                        <h1 className='text-4xl font-bold'>120</h1>
                    </div>
                    <div className='w-56 h-56  flex flex-col justify-center items-center bg-indigo-300 rounded-lg text-black  select-none space-y-4 drop-shadow-2xl'>
                        <Image src={books} alt="books" width={100} height={100} />
                        <h1 className='font-bold text-lg'>Total Books donated</h1>
                        <h1 className='text-4xl font-bold'>120</h1>
                    </div>
                    <div className='w-56 h-56  flex flex-col justify-center items-center bg-indigo-300 rounded-lg text-black  select-none space-y-4 drop-shadow-2xl'>
                        <Image src={organs} alt="organs" width={100} height={100} />
                        <h1 className='font-bold text-lg'>Total Organs donated</h1>
                        <h1 className='text-4xl font-bold'>120</h1>
                    </div>

                </div>
                {
                    more && (
                        <div className='flex justify-center items-center space-x-7 ml-10 '>
                            <div className='w-60 h-60 flex flex-col justify-center items-center bg-indigo-300 rounded-lg text-black select-none space-y-4 drop-shadow-2xl'>
                                <Image src={medicines} alt="medicines" width={100} height={100} />
                                <h1 className='font-bold text-lg'>Total Medicines donated</h1>
                                <h1 className='text-4xl font-bold'>120</h1>
                            </div>
                            <div className='w-60 h-60 flex flex-col justify-center items-center bg-indigo-300 rounded-lg text-black  select-none space-y-4 drop-shadow-2xl'>
                                <Image src={clothes} alt="clothes" width={100} height={100} />
                                <h1 className='font-bold text-lg'>Total Clothes Donated</h1>
                                <h1 className='text-4xl font-bold'>120</h1>
                            </div>
                            <div className='w-60 h-60 flex flex-col justify-center items-center bg-indigo-300 rounded-lg text-black  select-none space-y-4 drop-shadow-2xl'>
                                <Image src={books} alt="books" width={100} height={100} />
                                <h1 className='font-bold text-lg'>Total Books donated</h1>
                                <h1 className='text-4xl font-bold'>120</h1>
                            </div>
                            <div className='w-60 h-60 flex flex-col justify-center items-center bg-indigo-300 rounded-lg text-black  select-none space-y-4 drop-shadow-2xl'>
                                <Image src={organs} alt="organs" width={100} height={100} />
                                <h1 className='font-bold text-lg'>Total Organs donated</h1>
                                <h1 className='text-4xl font-bold'>120</h1>
                            </div>

                        </div>

                    )
                }

            </div>
            <div className='ml-[920px] underline mt-1 select-none cursor-pointer text-center p-2' onClick={() => {
                    if (!more) {
                        setMore(true)
                    }
                    else {
                        setMore(false)
                    }

                }}>
                <h1>{more ? "Less" : "More"}</h1>
            </div>

        </div>

    )

    
}

export default MainMid1