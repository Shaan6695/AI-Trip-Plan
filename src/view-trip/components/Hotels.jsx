import React from 'react'
import HotelCardItem from './HotelCardItem'

function Hotels({ trip }) {
    return (
        <div>
            <h2 className='font-bold text-xl mt-5'>Hotel Recommendations</h2>
            <p className='text-gray-600 text-sm mb-4'>Click on any hotel to view its location on Google Maps</p>
            
            <div className='grid md:grid-cols-2 gap-4'>
                {trip?.tripData?.hotel_options?.map((hotel, index) => (
                    <HotelCardItem hotel={hotel} key={index} />
                ))}
            </div>
        </div>
    )
}

export default Hotels