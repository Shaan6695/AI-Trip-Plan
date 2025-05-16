// filepath: /Users/maliks/Desktop/AI-Trip-Plan-1/src/view-trip/plan/index.jsx
import React, { useEffect, useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import InfoSection from '../components/InfoSection';
import Hotels from '../components/Hotels';
import PlacesToVisit from '../components/PlacesToVisit';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

function Viewtrip() {
    const { tripId } = useParams(); // Get tripId from URL
    const location = useLocation();
    const navigate = useNavigate();
    const [trip, setTrip] = useState(null); // Initialize with null to better handle loading state
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        console.log("Current tripId from URL:", tripId);
        console.log("Current location state:", location.state);

        if (location.state && location.state.tripData && location.state.userSelection) {
            // This is for newly generated trips passed via navigation state
            setTrip({
                tripData: location.state.tripData,
                userSelection: location.state.userSelection,
                // If it's a new trip, it won't have an ID from localStorage yet
                // The ID will be assigned when saving
            });
            console.log("Trip data received from location state:", location.state);
        } else if (tripId) {
            // This is for loading a saved trip from localStorage using tripId from URL
            console.log(`Attempting to load trip with ID: ${tripId} from localStorage.`);
            const savedTripsRaw = localStorage.getItem('savedTrips');
            if (savedTripsRaw) {
                try {
                    const savedTrips = JSON.parse(savedTripsRaw);
                    const foundTrip = savedTrips.find(t => t.id === tripId);
                    if (foundTrip) {
                        setTrip(foundTrip);
                        console.log("Loaded trip from localStorage:", foundTrip);
                    } else {
                        toast.error("Saved trip not found.");
                        console.log(`Trip with ID: ${tripId} not found in localStorage.`);
                        // navigate('/my-trips'); // Or to a 404 page
                    }
                } catch (e) {
                    toast.error("Error parsing saved trips from storage.");
                    console.error("Error parsing savedTrips from localStorage:", e);
                    // navigate('/my-trips');
                }
            } else {
                toast.error("No saved trips found in storage.");
                console.log("No 'savedTrips' key found in localStorage.");
                // navigate('/my-trips');
            }
        } else {
            // No tripId in URL and no state, likely an incorrect navigation
            toast.info("No trip data specified. Please generate or select a trip.");
            console.log("No tripId in URL and no location.state.tripData.");
            // navigate('/create-trip');
        }
    }, [tripId, location.state, navigate]);

    const handleSaveTrip = async () => {
        if (!trip || !trip.userSelection || !trip.tripData) {
            toast.error("No trip data available to save.");
            return;
        }

        setIsSaving(true);

        
        
        try {
            const savedTripsRaw = localStorage.getItem('savedTrips');
            let savedTrips = savedTripsRaw ? JSON.parse(savedTripsRaw) : [];

            // If the current trip already has an ID, it might be an update or re-save.
            // For simplicity, we'll treat each save as potentially adding a new one,
            // or you could implement logic to update if ID exists.
            // For now, let's ensure it always has a unique ID if it's being saved.

            const tripToSave = {
                ...trip,
                id: trip.id || Date.now().toString(), // Use existing ID or generate new
                createdAt: new Date().toISOString() 
            };

            // Avoid duplicates if saving an already saved trip by ID
            const existingTripIndex = savedTrips.findIndex(t => t.id === tripToSave.id);
            if (existingTripIndex > -1) {
                savedTrips[existingTripIndex] = tripToSave; // Update existing
            } else {
                savedTrips.push(tripToSave); // Add as new
            }

            localStorage.setItem('savedTrips', JSON.stringify(savedTrips));
            
            toast.success("Trip saved successfully to your browser!");
        } catch (error) {
            console.error("Error saving trip to localStorage:", error);
            toast.error("Failed to save trip. Please try again.");
        } finally {
            setIsSaving(false);
        }
    };

    if (trip === null) { // Updated loading check
        return (
            <div className='p-10 text-center'>
                <p>Loading trip details...</p>
            </div>
        );
    }

    if (Object.keys(trip).length === 0) { // Handles case where trip is an empty object after attempting to load
         return (
            <div className='p-10 text-center'>
                <p>Could not load trip details.</p>
                <p>Please try generating a new trip or check your saved trips.</p>
                <Button onClick={() => navigate('/create-trip')} className="mt-4">Create New Trip</Button>
            </div>
        );
    }
    

    return (
        <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
            <InfoSection trip={trip} />
            <Tabs defaultValue="hotels" className="w-full mt-8">
                <TabsList>
                    <TabsTrigger value="hotels">Hotels</TabsTrigger>
                    <TabsTrigger value="places">Places to Visit</TabsTrigger>
                </TabsList>
                <TabsContent value="hotels">
                    <Hotels trip={trip} />
                </TabsContent>
                <TabsContent value="places">
                    <PlacesToVisit trip={trip} />
                </TabsContent>
            </Tabs>
            <div className="my-10 flex justify-center">
                <Button onClick={handleSaveTrip} disabled={isSaving}>
                    {isSaving ? (
                        <AiOutlineLoading3Quarters className='h-5 w-5 animate-spin mr-2' />
                    ) : null}
                    {isSaving ? 'Saving Trip...' : 'Save This Trip'}
                </Button>
            </div>
            <Footer />
        </div>
    );
}

export default Viewtrip;