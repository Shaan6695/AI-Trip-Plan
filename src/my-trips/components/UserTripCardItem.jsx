import { getPlacePhotoUrl } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function UserTripCardItem({ trip }) {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    async function fetchPhoto() {
      if (trip?.userSelection?.location?.label) {
        const url = await getPlacePhotoUrl(trip.userSelection.location.label);
        setPhotoUrl(url);
      }
    }
    trip && fetchPhoto();
  }, [trip])

  return (
    <Link to={`/view-trip/${trip?.id}`}>
      <div className='hover:scale-105 transition-all'>
        <img src={photoUrl ? photoUrl : '/placeholder.jpg'} alt="" className='object-cover rounded-xl h-[220px]' />
        <div>
          <h2 className='font-bold text-lg'>{trip?.userSelection?.location?.label}</h2>
          <h2 className='text-sm text-gray-500'>{trip?.userSelection?.noOfDays} Days trip with {trip?.userSelection?.budget} budget. </h2>
        </div>
      </div>
    </Link>
  )
}

export default UserTripCardItem