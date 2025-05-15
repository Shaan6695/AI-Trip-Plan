import { getPlacePhotoUrl } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function HotelCardItem({ hotel }) {
    const [photoUrl, setPhotoUrl] = useState();

    useEffect(() => {
        async function fetchPhoto() {
            if (hotel?.name) {
                const url = await getPlacePhotoUrl(hotel.name);
                setPhotoUrl(url);
            }
        }
        fetchPhoto();
    }, [hotel]);

    return (
        <Link to={'https://www.google.com/maps/search/?api=1&query=' + hotel?.name } target='_blank'>
            <div className='hover:scale-110 transition-all cursor-pointer mt-5 mb-8'>
                <img src={photoUrl ? photoUrl : '/placeholder.jpg'} className='rounded-xl h-[180px] w-full object-cover' />
                <div className='my-2'>
                    <h2 className='font-medium'>{hotel?.name}</h2>
                    <h2 className='text-xs text-gray-500'>📍{hotel?.address}</h2>
                    <h2 className='text-sm'>💰{hotel?.price}</h2>
                    <h2 className='text-sm'>⭐{hotel?.rating}</h2>
                </div>
            </div>
        </Link>
    )
}

export default HotelCardItem