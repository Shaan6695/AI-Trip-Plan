import React from 'react'
import PlaceCardItem from './PlaceCardItem'

function PlacesToVisit({ trip }) {
  return (
    <div>
      <h2 className='font-bold text-xl'>Places to Visit</h2>
      {trip?.tripData?.itinerary?.map((dayItem, dayIdx) => (
        <div className='mt-5' key={dayItem.day || dayIdx}>
          <h2 className='font-bold text-lg'>{dayItem.day}</h2>
          <div className='flex flex-col gap-3'>
            {dayItem.plan?.map((place, placeIdx) => (
              <div className='my-2' key={placeIdx}>
                <h2 className='font-medium text-sm text-orange-600'>{place.time}</h2>
                <PlaceCardItem
                  place={place}
                  tripLocation={trip.userSelection?.location?.label}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default PlacesToVisit