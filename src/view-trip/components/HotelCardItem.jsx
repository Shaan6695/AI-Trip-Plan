import React from 'react'
import { Link } from 'react-router-dom'
import { FaMapMarkerAlt, FaDollarSign, FaStar, FaHotel } from 'react-icons/fa'

function HotelCardItem({ hotel }) {
    const getBudgetColor = (price) => {
        if (typeof price !== 'string') {
            return 'bg-gray-50 border-gray-200'; // Default color for undefined/invalid price
        }
        // Use toLowerCase to make comparisons case-insensitive for keywords
        const lowerPrice = price.toLowerCase(); 
        if (lowerPrice.includes('luxury') || lowerPrice.includes('$250') || lowerPrice.includes('$300') || lowerPrice.includes("$$$"))
            return 'bg-amber-50 border-amber-200';
        if (lowerPrice.includes('moderate') || lowerPrice.includes('$150') || lowerPrice.includes('$200') || lowerPrice.includes("$$"))
            return 'bg-blue-50 border-blue-200';
        // Also check for single '$' or "Cheap" / "Budget"
        if (lowerPrice.includes('$') || lowerPrice.includes('cheap') || lowerPrice.includes('budget'))
            return 'bg-green-50 border-green-200';
        return 'bg-gray-50 border-gray-200'; // Default if no match
    };

    // Now using the consistently normalized keys
    const hotelName = hotel?.name;
    const hotelAddress = hotel?.address;
    const hotelPrice = hotel?.price;
    const hotelRating = hotel?.rating;
    const hotelDescription = hotel?.description;

    return (
        <Link to={'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(hotelName || '')} target='_blank'>
            <div className={`hover:scale-105 transition-all cursor-pointer my-4 p-5 rounded-xl border-2 ${getBudgetColor(hotelPrice)}`}>
                <div className="flex items-start gap-3">
                    <div className="p-3 bg-white rounded-full shadow-sm">
                        <FaHotel className="text-xl text-blue-600" />
                    </div>
                    <div className='space-y-2'>
                        <h2 className='font-bold text-lg'>{hotelName}</h2>
                        
                        <div className='flex items-center gap-2 text-sm text-gray-600'>
                            <FaMapMarkerAlt className="text-gray-500" />
                            <span>{hotelAddress}</span>
                        </div>
                        
                        <div className='flex items-center gap-2 text-sm font-medium'>
                            <FaDollarSign className="text-green-600" />
                            <span>{hotelPrice}</span>
                        </div>
                        
                        <div className='flex items-center gap-1 text-sm'>
                            <FaStar className="text-amber-400" />
                            <span>{hotelRating}</span>
                        </div>
                        
                        {hotelDescription && (
                            <p className="text-sm text-gray-600 line-clamp-2 mt-1">{hotelDescription}</p>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default HotelCardItem