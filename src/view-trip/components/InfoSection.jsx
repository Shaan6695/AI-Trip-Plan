import React from 'react'
import { Button } from '@/components/ui/button'
import { FaMapMarkerAlt, FaCalendarAlt, FaMoneyBillWave, FaUsers } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function InfoSection({ trip }) {
    return (
        <div className="space-y-4">
            {/* Destination card */}
            <div className="rounded-xl p-6 border shadow-sm bg-gradient-to-r from-blue-50 to-indigo-50">
                <div className='flex flex-col gap-4'>
                    <div className="flex items-center gap-3">
                        <FaMapMarkerAlt className="text-3xl text-blue-600" />
                        <h2 className='font-bold text-3xl'>{trip?.userSelection?.location?.label}</h2>
                    </div>
                    
                    <Link 
                        to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(trip?.userSelection?.location?.label)}`} 
                        target="_blank"
                        className="w-full sm:w-auto"
                    >
                        <Button className="w-full bg-blue-600 hover:bg-blue-700">
                            View Destination on Google Maps
                        </Button>
                    </Link>
                    
                    <div className='flex flex-wrap gap-3 mt-2'>
                        <div className='flex items-center gap-2 p-2 px-4 bg-gray-100 rounded-full text-gray-700'>
                            <FaCalendarAlt />
                            <span>{trip.userSelection?.noOfDays} Day{trip.userSelection?.noOfDays > 1 ? 's' : ''}</span>
                        </div>
                        
                        <div className='flex items-center gap-2 p-2 px-4 bg-gray-100 rounded-full text-gray-700'>
                            <FaMoneyBillWave />
                            <span>{trip.userSelection?.budget} Budget</span>
                        </div>
                        
                        <div className='flex items-center gap-2 p-2 px-4 bg-gray-100 rounded-full text-gray-700'>
                            <FaUsers />
                            <span>{trip.userSelection?.traveler}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InfoSection