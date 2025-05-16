import { Input } from '@/components/ui/input';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelList } from '@/constants/options';
import React, { useEffect, useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { chatSession } from '@/service/AIModel';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from "firebase/firestore";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate, Link } from 'react-router-dom';

function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const onGenerateTrip = async () => {
    if (formData?.noOfDAys > 5 && !formData?.location || !formData?.budget || !formData.traveler) {
      toast('Please fill all the details');
      return;
    }

    setLoading(true);

    const FINAL_PROMPT = AI_PROMPT
      .replace('{location}', formData?.location?.label)
      .replace('{totalDays}', formData?.noOfDays)
      .replace('{traveler}', formData?.traveler)
      .replace('{budget}', formData?.budget);

    console.log("FINAL_PROMPT:", FINAL_PROMPT);

    try {
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      const tripDataString = result?.response?.text();

      if (!tripDataString) {
        toast('Failed to generate trip data from AI. The response was empty.');
        setLoading(false);
        return;
      }

      let jsonTripData;
      try {
        jsonTripData = JSON.parse(tripDataString);
      } catch (parseError) {
        console.error("Error parsing AI response JSON:", parseError);
        console.error("AI Response String was:", tripDataString);
        toast('Error parsing trip data from AI. The format was unexpected.');
        setLoading(false);
        return;
      }
      
      console.log("Original AI Response JSON:", jsonTripData);

      const normalizeData = (data) => {
        const normalized = { ...data };

        if (normalized.hotel_options && Array.isArray(normalized.hotel_options)) {
          normalized.hotel_options = normalized.hotel_options.map(hotel => ({
            name: hotel.name || hotel["Hotel Name"],
            address: hotel.address || hotel["Hotel address"],
            price: hotel.price_details || hotel.Price || hotel.price,
            description: hotel.description,
            rating: hotel.rating,
            geo_coordinates: hotel.geo_coordinates || hotel["Geo Coordinates"]
          }));
        }

        if (normalized.itinerary && normalized.itinerary.daily_plans && Array.isArray(normalized.itinerary.daily_plans)) {
          normalized.itinerary.daily_plans = normalized.itinerary.daily_plans.map(day => ({
            ...day,
            plan: day.plan && Array.isArray(day.plan) ? day.plan.map(p => {
              const placeNameSource = p.place || p.name || p.title || p.activity; // Try common keys
              if (!placeNameSource) {
                console.warn("Place name/title not found in AI response item. Object received from AI:", JSON.stringify(p));
              }
              return {
                name: placeNameSource || "Unnamed Activity", // Fallback name
                details: p.details || p["Place Details"],
                time: p.time,
                ticket_pricing: p.ticket_pricing || p["ticket Pricing"] || p["Ticket Pricing"],
                rating: p.rating,
                geo_coordinates: p.geo_coordinates || p["Geo Coordinates"]
              };
            }) : []
          }));
        }
        return normalized;
      };

      const normalizedTripData = normalizeData(jsonTripData);
      console.log("Normalized AI Response JSON:", normalizedTripData);

      navigate('/view-trip', {
        state: {
          tripData: normalizedTripData,
          userSelection: formData
        }
      });

    } catch (error) {
      console.error("Error generating trip or parsing JSON:", error);
      toast('Error generating trip. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
      <div className="flex justify-between items-center">
        <h2 className='font-bold text-3xl'>Tell us your travel preferences 🏕️🌴</h2>
        <Link to="/my-trips">
          <Button variant="outline">View My Trips</Button>
        </Link>
      </div>
      <p className='mt-3 text-gray-500 text-xl'>Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.</p>

      <div className='mt-20 flex flex-col gap-10'>
        <div>
          <h2 className='text-xl my-3 font-medium'>What is destination of choice?</h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => { setPlace(v); handleInputChange('location', v); }
            }}
          />
        </div>

        <div>
          <h2 className='text-xl my-3 font-medium'>How many days are you planning your trip?</h2>
          <Input placeholder={'Ex.4'} type='number' onChange={(e) => handleInputChange('noOfDays', e.target.value)} />
        </div>

        <div>
          <h2 className='text-xl my-3 font-medium'>What is Your Budget?</h2>
          <div className='grid grid-cols-3 gap-5 mt-5'>
            {SelectBudgetOptions.map((item, index) => (
              <div key={index}
                onClick={() => handleInputChange('budget', item.title)}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${formData?.budget == item.title && 'shadow-lg border-black'}`}>
                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className='text-xl my-3 font-medium'>Who do you plan on traveling with on your next adventure?</h2>
          <div className='grid grid-cols-3 gap-5 mt-5'>
            {SelectTravelList.map((item, index) => (
              <div key={index}
                onClick={() => handleInputChange('traveler', item.people)}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${formData?.traveler == item.people && 'shadow-lg border-black'}`}>
                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className='my-10 justify-end flex'>
        <Button disabled={loading} onClick={onGenerateTrip}>
          {loading ? <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' /> : 'Generate Trip'}
        </Button>
      </div>
    </div>
  );
}

export default CreateTrip;