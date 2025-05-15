import React from 'react'
import { Link } from 'react-router-dom'
import { FaMapMarkerAlt, FaDollarSign, FaStar, FaHotel } from 'react-icons/fa'

function HotelCardItem({ hotel }) {
    const getBudgetColor = (price) => {
        if (price.includes('Luxury') || price.includes('$250') || price.includes('$300')) 
            return 'bg-amber-50 border-amber-200';
        if (price.includes('Moderate') || price.includes('$150') || price.includes('$200')) 
            return 'bg-blue-50 border-blue-200';
        return 'bg-green-50 border-green-200'; // Cheap/Budget
    };

    return (
        <Link to={'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(hotel?.name)} target='_blank'>
            <div className={`hover:scale-105 transition-all cursor-pointer my-4 p-5 rounded-xl border-2 ${getBudgetColor(hotel?.price)}`}>
                <div className="flex items-start gap-3">
                    <div className="p-3 bg-white rounded-full shadow-sm">
                        <FaHotel className="text-xl text-blue-600" />
                    </div>
                    <div className='space-y-2'>
                        <h2 className='font-bold text-lg'>{hotel?.name}</h2>
                        
                        <div className='flex items-center gap-2 text-sm text-gray-600'>
                            <FaMapMarkerAlt className="text-gray-500" />
                            <span>{hotel?.address}</span>
                        </div>
                        
                        <div className='flex items-center gap-2 text-sm font-medium'>
                            <FaDollarSign className="text-green-600" />
                            <span>{hotel?.price}</span>
                        </div>
                        
                        <div className='flex items-center gap-1 text-sm'>
                            <FaStar className="text-amber-400" />
                            <span>{hotel?.rating}</span>
                        </div>
                        
                        {hotel?.description && (
                            <p className="text-sm text-gray-600 line-clamp-2 mt-1">{hotel?.description}</p>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default HotelCardItem