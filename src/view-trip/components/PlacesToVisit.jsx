import React, { useState } from 'react';
import PlaceCardItem from './PlaceCardItem';

function PlacesToVisit({ trip }) {
  const [activeDay, setActiveDay] = useState(0);
  const days = trip?.tripData?.itinerary?.daily_plans || [];
  
  return (
    <div>
      <h2 className='font-bold text-xl'>Places to Visit</h2>
      
      {/* Day navigation */}
      <div className="flex space-x-2 mt-4 overflow-x-auto pb-2">
        {days.map((day, idx) => (
          <button 
            key={idx}
            onClick={() => setActiveDay(idx)}
            className={`px-3 py-1 rounded-full ${activeDay === idx 
              ? 'bg-black text-white' 
              : 'bg-gray-200'}`}
          >
            Day {idx + 1}
          </button>
        ))}
      </div>
      
      {/* Show only the active day */}
      {days[activeDay] && (
        <div className='mt-5'>
          <h2 className='font-bold text-lg'>{days[activeDay].day}</h2>
          <div className='grid md:grid-cols-2 gap-5'>
            {days[activeDay].plan?.map((place, placeIdx) => (
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
      )}
    </div>
  )
}

export default PlacesToVisit;