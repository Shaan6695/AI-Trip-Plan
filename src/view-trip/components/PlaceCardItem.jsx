import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { getPlacePhotoUrl } from '@/service/GlobalApi';

function PlaceCardItem({place, tripLocation}) {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
      async function fetchPhoto() {
          if (place?.place) {
              const url = await getPlacePhotoUrl(place.place);
              setPhotoUrl(url);
          }
      }
      fetchPhoto();
  }, [place]);

  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query=' + place?.place + (tripLocation ? ' ' + tripLocation : '')} target='_blank'>
    <div className='shadow-sm border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 hover:shadow-md cursor-pointer transition-all'>
        <img src={photoUrl?photoUrl:'/placeholder.jpg'} alt="" className='w-[130px] h-[130px] rounded-xl object-cover' />
        <div>
            <h2 className='font-bold text-lg'>{place.place}</h2>
            <p className='text-sm text-gray-500'>{place.details}</p>
            <h2 className='text-xs font-medium mt-2 mb-2'>🏷️Ticket: {place.ticket_pricing}</h2>
        </div>
    </div>
    </Link>
  )
}

export default PlaceCardItem