import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Changed from useNavigation
import UserTripCardItem from './components/UserTripCardItem';

function MyTrips() {
    const navigate = useNavigate(); // Changed from useNavigation
    const [userTrips, setUserTrips] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        GetUserTrips();
    }, []);

    const GetUserTrips = () => {
        setLoading(true);
        try {
            const savedTripsRaw = localStorage.getItem('savedTrips');
            if (savedTripsRaw) {
                const trips = JSON.parse(savedTripsRaw);
                // Sort trips by createdAt in descending order (newest first)
                trips.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setUserTrips(trips);
                console.log("Loaded trips from localStorage:", trips);
            } else {
                setUserTrips([]);
                console.log("No trips found in localStorage.");
            }
        } catch (error) {
            console.error("Error loading trips from localStorage:", error);
            setUserTrips([]);
            // Optionally, show a toast message for the error
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='sm:px-10 md:px-32 lg:px-56 px-5 mt-10'>
            <h2 className='font-bold text-3xl'>My Trips</h2>
            {loading ? (
                <div className='grid grid-cols-1 sm:grid-cols-2 mt-10 md:grid-cols-3 gap-5'>
                    {[1,2,3,4,5,6].map((item, index)=>(
                        <div key={index} className='h-[220px] w-full bg-slate-200 animate-pulse rounded-xl'></div>
                    ))}
                </div>
            ) : userTrips?.length > 0 ? (
                <div className='grid grid-cols-1 sm:grid-cols-2 mt-10 md:grid-cols-3 gap-5'>
                    {userTrips.map((trip, index) => (
                        <UserTripCardItem trip={trip} key={trip.id || index} />
                    ))}
                </div>
            ) : (
                <p className="mt-10 text-gray-500">You have no saved trips yet. Go generate one and save it!</p>
            )}
        </div>
    );
}

export default MyTrips;