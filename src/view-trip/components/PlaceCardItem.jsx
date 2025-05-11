import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';

function PlaceCardItem({place}) {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
      place && GetPlacePhoto();
  }, [place])

  const GetPlacePhoto = async () => {
      if (!place?.place) {
          console.log("Place name is missing, cannot fetch photo.");
          return;
      }
      const data = {
          textQuery: place?.place // Use place.place from props
      }
      try {
          const resp = await GetPlaceDetails(data);
          // Add checks for response structure
          if (resp?.data?.places?.[0]?.photos?.[3]?.name) {
              const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[3].name);
              setPhotoUrl(PhotoUrl);
          } else {
              console.log("Could not find photo for place:", place?.place);
              setPhotoUrl('/placeholder.jpg'); // Fallback or leave as is
          }
      } catch (error) {
          console.error("Error fetching place photo:", error);
          setPhotoUrl('/placeholder.jpg'); // Fallback on error
      }
  }

  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query=' +place?.place} target='_blank'>
    <div className='shadow-sm border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 hover:shadow-md cursor-pointer transition-all'>
        <img src={photoUrl?photoUrl:'/placeholder.jpg'} alt="" className='w-[130px] h-[130px] rounded-xl object-cover' />
        <div>
            <h2 className='font-bold text-lg'>{place.place}</h2>
            <p className='text-sm text-gray-500'>{place.details}</p>
            {/* <h2>place.timetoTravel</h2> */}
            <h2 className='text-xs font-medium mt-2 mb-2'>🏷️Ticket: {place.ticket_pricing}</h2>
            {/* <Button size="sm"><FaMapLocationDot /></Button> */}
        </div>
    </div>
    </Link>
  )
}

export default PlaceCardItem