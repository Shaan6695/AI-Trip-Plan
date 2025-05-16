import React from 'react'
import { Link } from 'react-router-dom';

function PlaceCardItem({place, tripLocation}) {
  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(place?.place + (tripLocation ? ' ' + tripLocation : ''))} target='_blank'>
      <div className='shadow-sm border rounded-xl p-3 mt-2 hover:scale-105 hover:shadow-md cursor-pointer transition-all'>
        <div>
          <h2 className='font-bold text-lg underline text-blue-700'>{place.place}</h2>
          <p className='text-sm text-gray-500'>{place.details}</p>
          <h2 className='text-xs font-medium mt-2 mb-2'>🏷️Ticket: {place.ticket_pricing}</h2>
        </div>
      </div>
    </Link>
  )
}

export default PlaceCardItem