import React from 'react'
import { Link } from 'react-router-dom'

function HotelCardItem({ hotel }) {
    return (
        <Link to={'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(hotel?.name)} target='_blank'>
            <div className='hover:scale-105 transition-all cursor-pointer mt-5 mb-8 border rounded-xl p-4'>
                <div className='my-2'>
                    <h2 className='font-medium text-lg underline text-blue-700'>{hotel?.name}</h2>
                    <h2 className='text-xs text-gray-500'>📍{hotel?.address}</h2>
                    <h2 className='text-sm'>💰{hotel?.price}</h2>
                    <h2 className='text-sm'>⭐{hotel?.rating}</h2>
                </div>
            </div>
        </Link>
    )
}

export default HotelCardItem