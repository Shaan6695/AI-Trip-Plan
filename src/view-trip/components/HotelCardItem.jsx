import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaMapMarkerAlt, FaDollarSign, FaStar, FaHotel, FaCopy, FaCheck } from 'react-icons/fa'
import { Button } from '../../components/ui/button';
import { toast } from 'sonner';

function HotelCardItem({ hotel }) {
    const [copied, setCopied] = useState(false);
    
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
    
    const handleCopy = (e) => {
        e.preventDefault(); // Prevent the link from opening
        e.stopPropagation(); // Stop the event from bubbling up
        
        if (hotelName) {
            navigator.clipboard.writeText(hotelName)
                .then(() => {
                    setCopied(true);
                    toast.success("Hotel name copied to clipboard");
                    setTimeout(() => setCopied(false), 2000);
                })
                .catch(err => {
                    console.error('Failed to copy: ', err);
                    toast.error("Failed to copy");
                });
        }
    };

    return (
        <div className={`relative hover:scale-105 transition-all cursor-pointer my-4 p-5 rounded-xl border-2 ${getBudgetColor(hotelPrice)}`}>
            <div className="flex justify-between mb-2">
                <Link to={'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(hotelName || '')} target='_blank' className="block w-11/12">
                    <h2 className='font-bold text-lg'>{hotelName}</h2>
                </Link>
                
                {/* Copy button - now in the flex layout */}
                <Button 
                    variant="outline" 
                    size="sm" 
                    className="rounded-full w-8 h-8 p-0 shrink-0 ml-2"
                    onClick={handleCopy}
                    title="Copy hotel name"
                >
                    {copied ? <FaCheck className="h-3 w-3 text-green-500" /> : <FaCopy className="h-3 w-3" />}
                </Button>
            </div>
            
            <Link to={'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(hotelName || '')} target='_blank' className="block">
                <div className="flex items-start gap-3">
                    <div className="p-3 bg-white rounded-full shadow-sm">
                        <FaHotel className="text-xl text-blue-600" />
                    </div>
                    <div className='space-y-2'>
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
            </Link>
        </div>
    )
}

export default HotelCardItem