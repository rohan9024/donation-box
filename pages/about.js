import React from 'react'

function about() {
    return (
        <div className='bg-gray-800'>
            <div className='flex justify-center items-center'>
            </div>
            <div className='bg-gray-800 flex-1 w-screen h-screen flex items-center justify-center'>

                <div className='flex flex-col justify-center items-center w-[1000px] h-[1000px]'>
                    <h1 className='text-6xl font-bold text-white mb-20'>About Us</h1>
                    <h1 className='text-center text-2xl text-white'>Donation Box was born to bridge the gap between the people who want to make a difference through giving back and those who are doing phenomenal work but need more support. Our focus has been to build trust for the social sector by strong due diligence of all our nonprofit partners, and transparency on how donations impacted lives on the ground.
                        We are proud to have played a small role in enabling giving across all segments of our society - everyday givers, (U)HNI givers, corporates and foundations.</h1>
                </div>

            </div>
            <div className='flex flex-col justify-center items-center'>
                <div className='mb-20'>
                    <h1 className='text-6xl font-bold text-white'>Our Values</h1>
                </div>
                <div>
                    <h1 className='text-center text-2xl text-white'>Donation Box's vision is to alleviate poverty by enabling the world to give.</h1>
                </div>
                <div className='flex justify-center items-center ml-20 mr-20 space-x-10 tracking-tight font-normal space-y-12 p-10'>
                    <div className='flex flex-col justify-center items-center w-1/4 space-y-6 text-center mt-14'>
                        <img className='h-10 w-10' src="https://cdn.givind.org/static/images/aboutus/aboutus/integrity.png" alt="img1" />
                        <div className='flex flex-col justify-center items-center space-y-6 '>
                            <h1 className=' text-2xl text-white'>Integrity in everything we do</h1>
                            <h3 className='text-normal text-white'> We practice integrity in all our actions and try to do the right thing by every stakeholder.</h3>
                        </div>
                    </div>
                    <div className='flex flex-col  justify-center items-center w-1/4 space-y-6 text-center'>
                        <img className='h-10 w-10' src="https://cdn.givind.org/static/images/aboutus/aboutus/serve+with+passions.png" alt="img2" />
                        <div className='flex flex-col justify-center items-center space-y-6 '>
                            <h1 className=' text-2xl text-white '>Serve with passion</h1>
                            <h3 className='text-normal text-white'>We are fiercely committed to our purpose of poverty alleviation, and work with a burning desire to make a difference.</h3>
                        </div>
                    </div>
                    <div className='flex flex-col justify-center items-center w-1/4 space-y-6 text-center'>
                        <img className='h-10 w-10' src="https://cdn.givind.org/static/images/aboutus/aboutus/scale.png" alt="img3" />
                        <div className='flex flex-col justify-center items-center space-y-6'>
                            <h1 className=' text-2xl text-white '>Focused on scale</h1>
                            <h3 className='text-normal text-white'>We stay laser-focused on large-scale impact. If we can’t scale it, we park it.</h3>
                        </div>
                    </div>
                    <div className='flex flex-col justify-center items-center w-1/4 space-y-6 text-center'>
                        <img className='h-10 w-10' src="https://cdn.givind.org/static/images/aboutus/aboutus/empathy.png" alt="img4" />
                        <div className='flex flex-col justify-center items-center space-y-6'>
                            <h1 className=' text-2xl text-white '>Empathy for all</h1>
                            <h3 className='text-normal text-white'>We are committed to working together with unconditional respect, freedom, trust and support for each other.</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default about

