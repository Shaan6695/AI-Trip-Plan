import React, { useEffect, useState } from 'react'
import { useLocation, useParams, useNavigate } from 'react-router-dom'; // Added useLocation and useNavigate
import { toast } from 'sonner';
import InfoSection from '../components/InfoSection';
import Hotels from '../components/Hotels';
import PlacesToVisit from '../components/PlacesToVisit';
import Footer from '../components/Footer';

function Viewtrip() {
    //const { tripId } = useParams();
    const location = useLocation();
    const navigate = useNavigate(); // For redirecting if no data
    const [trip, setTrip] = useState([])

    useEffect(() => {
        if (location.state && location.state.tripData && location.state.userSelection) {
            // Combine userSelection and tripData as the components expect
            setTrip({
                tripData: location.state.tripData,
                userSelection: location.state.userSelection
            });
            console.log("Trip data received from location state:", location.state);
        } else {
            console.log("No trip data found in location state.");
            toast("No trip data found. Please generate a trip first.");
            // Optionally navigate back to create page if no data
            // navigate('/create-trip'); 
        }
    }, [location.state, navigate]); // Add navigate to dependency array if used inside

    if (!trip) {
        // Show a loading message or an error if trip data is not available
        return (
            <div className='p-10 text-center'>
                <p>Loading trip details...</p>
                <p>If you see this for a long time, please try generating a new trip.</p>
            </div>
        );
    }
    

    return (
        <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
            {/* Information Section */}
            <InfoSection trip={trip} />

            {/* Recommended Hotels */}
            <Hotels trip={trip} />

            {/* Daily Plan */}
            <PlacesToVisit trip={trip} />

            {/* Footer */}
            <Footer />

        </div>
    );
}

export default Viewtrip;