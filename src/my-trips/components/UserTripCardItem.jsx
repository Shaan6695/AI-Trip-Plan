import React from 'react'
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaCalendarAlt, FaMoneyBillWave, FaInfoCircle } from 'react-icons/fa'

function UserTripCardItem({ trip }) {
  // Get color theme based on destination
  const getDestinationTheme = (destination) => {
    if (!destination) return 'from-blue-100 to-indigo-100';
    
    const dest = destination.toLowerCase();
    if (dest.includes('beach') || dest.includes('island') || dest.includes('coast')) 
      return 'from-blue-100 to-cyan-100';
    if (dest.includes('mountain') || dest.includes('forest') || dest.includes('park')) 
      return 'from-green-100 to-emerald-100';
    if (dest.includes('city') || dest.includes('town') || dest.includes('york')) 
      return 'from-gray-100 to-slate-100';
    if (dest.includes('desert') || dest.includes('canyon')) 
      return 'from-amber-100 to-yellow-100';
    if (dest.includes('asia') || dest.includes('japan') || dest.includes('china')) 
      return 'from-red-100 to-rose-100';
    if (dest.includes('europe') || dest.includes('paris') || dest.includes('london')) 
      return 'from-indigo-100 to-violet-100';
    
    return 'from-blue-100 to-indigo-100'; // Default
  };

  // Get destination emoji
  const getDestinationEmoji = (destination) => {
    if (!destination) return '🌎';
    
    const dest = destination.toLowerCase();
    if (dest.includes('beach') || dest.includes('island') || dest.includes('hawaii')) return '🏝️';
    if (dest.includes('mountain') || dest.includes('alps') || dest.includes('rocky')) return '⛰️';
    if (dest.includes('york') || dest.includes('angeles') || dest.includes('francisco')) return '🏙️';
    if (dest.includes('paris') || dest.includes('france')) return '🗼';
    if (dest.includes('rome') || dest.includes('italy')) return '🏛️';
    if (dest.includes('tokyo') || dest.includes('japan')) return '🗾';
    if (dest.includes('safari') || dest.includes('africa')) return '🦁';
    if (dest.includes('ski') || dest.includes('snow')) return '🏂';
    
    return '🌎'; // Default world emoji
  };

  const destination = trip?.userSelection?.location?.label || '';
  const colorTheme = getDestinationTheme(destination);
  const emoji = getDestinationEmoji(destination);
  
  // Get summary preview if available
  const hasSummary = trip?.summary && trip.summary.length > 0;
  const summaryPreview = hasSummary 
    ? (trip.summary.length > 70 ? trip.summary.substring(0, 70) + '...' : trip.summary)
    : '';

  return (
    <Link to={`/view-trip/${trip?.id}`}>
      <div className={`hover:scale-105 transition-all cursor-pointer rounded-xl border shadow-sm bg-gradient-to-r ${colorTheme} p-6 h-full`}>
        <div className="flex justify-between items-start">
          <h2 className='font-bold text-xl'>{destination}</h2>
          <span className="text-4xl">{emoji}</span>
        </div>

        {hasSummary && (
          <div className="mt-3 text-sm text-gray-600 italic">
            <div className="flex items-center gap-1 mb-1">
              <FaInfoCircle className="text-blue-500" size={14} />
              <span className="font-medium">Trip Summary:</span>
            </div>
            <p>{summaryPreview}</p>
          </div>
        )}

        <div className="mt-4 space-y-3">
          <div className='flex items-center gap-2 text-sm'>
            <FaCalendarAlt className="text-blue-600" />
            <span>{trip?.userSelection?.noOfDays} day trip</span>
          </div>
          
          <div className='flex items-center gap-2 text-sm'>
            <FaMoneyBillWave className="text-green-600" />
            <span>{trip?.userSelection?.budget} budget</span>
          </div>
          
          <div className='flex items-center gap-2 text-sm'>
            <FaMapMarkerAlt className="text-red-600" />
            <span>View full itinerary</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default UserTripCardItem