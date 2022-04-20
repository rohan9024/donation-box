import React from 'react'

function Second() {
    return (
        <div className=' flex flex-col items-center w-screen h-[2400px] mt-[150px] text-gray-200 space-y-6'>
            <h1 className='text-5xl'>Donate your belongings within a few clicks</h1>
            <div className='flex flex-col justify-center items-center'>
                <div className=''>
                    <img className='object-contain w-[500px] h-[500px] ' src="https://www.donatekart.com/_next/static/images/daan-utsav-1-f954f5fc286eb4491ef53232451896b9.svg" alt="" />
                <h1 className='text-5xl text-center'>1. Select Cause</h1>
                </div>
                <div>
                    <img className='object-contain w-[500px] h-[500px]' src="https://www.donatekart.com/_next/static/images/daan-utsav-2-76efa0ca3ecd1c6ab0996a61162c8c31.svg" alt="" />
                    <h1 className='text-5xl text-center'>2. Select Product</h1>
                </div>
                <div>
                    <img className='object-contain w-[500px] h-[500px]' src="https://www.donatekart.com/_next/static/images/daan-utsav-3-8a299c9b3dcdac9d81562e4a148b12d1.svg" alt="" />
                    <h1 className='text-5xl text-center'>3. Order Processing</h1>
                </div>
                <div>
                    <img className='object-contain w-[500px] h-[500px]' src="https://www.donatekart.com/_next/static/images/daan-utsav-4-8698eb254cb353362f7b5ebac7a6d8bf.svg" alt="" />
                    <h1 className='text-5xl text-center'>4. Delivery Report</h1>
                </div>
            </div>
        </div>
    )
}

export default Second