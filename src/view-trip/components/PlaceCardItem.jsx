import React from 'react'
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaTicketAlt, FaStar, FaInfoCircle, FaClock } from 'react-icons/fa'

function PlaceCardItem({place, tripLocation}) {
    // Get an icon based on the place name/type
    const getPlaceIcon = (placeName) => {
        if (!placeName || typeof placeName !== 'string') return '📍'; // Handle undefined or non-string placeName
        const nameLower = placeName.toLowerCase();
        if (nameLower.includes('museum') || nameLower.includes('gallery')) return '🏛️';
        if (nameLower.includes('park') || nameLower.includes('garden')) return '🌳';
        if (nameLower.includes('beach') || nameLower.includes('ocean')) return '🏖️';
        if (nameLower.includes('mountain') || nameLower.includes('hill')) return '⛰️';
        if (nameLower.includes('temple') || nameLower.includes('church')) return '🕌';
        if (nameLower.includes('castle') || nameLower.includes('palace')) return '🏰';
        if (nameLower.includes('restaurant') || nameLower.includes('café')) return '🍽️';
        if (nameLower.includes('market') || nameLower.includes('shop')) return '🛍️';
        return '📍'; // Default
    };

    return (
        <Link to={'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(place?.name + (tripLocation ? ' ' + tripLocation : ''))} target='_blank'>
            <div className='hover:shadow-md hover:scale-102 transition-all border rounded-xl p-5 my-3 bg-gradient-to-r from-gray-50 to-white'>
                <div className="flex items-start gap-4">
                    <div className="text-4xl self-center">
                        {getPlaceIcon(place?.name)}
                    </div>
                    
                    <div className="space-y-2 flex-1">
                        <h2 className='font-bold text-lg'>{place?.name}</h2>
                        
                        {/* Time indicator */}
                        {place?.time && (
                            <div className='flex items-center gap-2 text-sm text-gray-600'>
                                <FaClock className="text-blue-500" />
                                <span>{place.time}</span>
                            </div>
                        )}
                        
                        {/* Description (Place Details) */}
                        {place?.details && (
                            <p className='text-sm text-gray-700 mt-1 line-clamp-3'>{place.details}</p>
                        )}
                        
                        <div className="flex flex-wrap gap-3 mt-2">
                            {/* Ticket pricing */}
                            {place?.ticket_pricing !== undefined && (
                                <div className='flex items-center gap-1 text-xs bg-gray-100 px-2 py-1 rounded-full'>
                                    <FaTicketAlt className="text-green-600" />
                                    <span>{place.ticket_pricing}</span>
                                </div>
                            )}
                            
                            {/* Rating if available */}
                            {place?.rating && (
                                <div className='flex items-center gap-1 text-xs bg-gray-100 px-2 py-1 rounded-full'>
                                    <FaStar className="text-amber-500" />
                                    <span>{place.rating}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default PlaceCardItem