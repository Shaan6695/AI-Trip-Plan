import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function HotelCardItem({ hotel }) {
    const [photoUrl, setPhotoUrl] = useState();

    useEffect(() => {
        hotel && GetPlacePhoto();
    }, [hotel])

    const GetPlacePhoto = async () => {
        if (!hotel?.name) {
            console.log("Hotel name is missing, cannot fetch photo.");
            return;
        }
        const data = {
            textQuery: hotel?.name // Use hotel.name from props
        }
        try {
            const resp = await GetPlaceDetails(data);
            // Add checks for response structure
            if (resp?.data?.places?.[0]?.photos?.[3]?.name) {
                const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[3].name)
                setPhotoUrl(PhotoUrl);
            } else {
                console.log("Could not find photo for hotel:", hotel?.name);
                setPhotoUrl('/placeholder.jpg'); // Fallback or leave as is
            }
        } catch (error) {
            console.error("Error fetching hotel photo:", error);
            setPhotoUrl('/placeholder.jpg'); // Fallback on error
        }
    }

    return (
        <Link to={'https://www.google.com/maps/search/?api=1&query=' + hotel?.name + "," + hotel?.address} target='_blank'>

            <div className='hover:scale-110 transition-all cursor-pointer mt-5 mb-8'>
                <img src={photoUrl ? photoUrl : '/placeholder.jpg'} className='rounded-xl h-[180px] w-full object-cover' />
                <div className='my-2'>
                    <h2 className='font-medium'>{hotel?.name}</h2>
                    <h2 className='text-xs text-gray-500'>📍{hotel?.address}</h2>
                    <h2 className='text-sm'>💰{hotel?.price}</h2>
                    <h2 className='text-sm'>⭐{hotel?.rating}</h2>

                </div>
            </div></Link>
    )
}

export default HotelCardItem