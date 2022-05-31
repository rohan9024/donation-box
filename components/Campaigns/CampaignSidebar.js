import React from 'react'

function CampaignSidebar() {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const d = new Date();
    const monthName = months[d.getMonth()];

    return (
        <div className=' '>
            {/* Header */}
            {/* <div>
                    <div className='w-10 h-10 ml-80 rounded-full cursor-pointer hover:ease-in-out hover:bg-gray-200 flex justify-center items-center hover:scale-125 hover:duration-200'>
                        <Image src={avatar} alt="avatar" width={80} height={80} />
                    </div>
                </div> */}
            <div className='mt-20 ml-5 text-gray-300'>
                <h1 className='font-bold text-3xl'>Ongoing Campaigns</h1>
                <h1 className='mt-2 text-gray-300'>{`${d.getDate()} ${monthName} ${d.getFullYear()}`}</h1>
                <h1>User Started a campaign called swacchh bharat</h1>
                <h1>User2 Started a campaign called e-poshan</h1>
            </div>
            {/* Header */}
        </div>
    )
}

export default CampaignSidebar