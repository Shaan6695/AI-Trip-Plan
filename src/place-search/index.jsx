import React, { useState, useEffect } from 'react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Loader } from '@googlemaps/js-api-loader';

function PlaceSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mapApi, setMapApi] = useState(null);
  const [placesService, setPlacesService] = useState(null);
  
  // Load Google Maps API
  useEffect(() => {
    const loader = new Loader({
      apiKey: import.meta.env.VITE_GOOGLE_PLACE_API_KEY,
      version: "weekly",
      libraries: ["places"]
    });
    
    loader.load().then(() => {
      setMapApi(window.google.maps);
      // Create a dummy div for PlacesService (required but not visible)
      const mapDiv = document.createElement('div');
      const map = new window.google.maps.Map(mapDiv, {
        center: { lat: 0, lng: 0 },
        zoom: 2
      });
      setPlacesService(new window.google.maps.places.PlacesService(map));
    }).catch(err => {
      console.error("Error loading Google Maps API:", err);
      setError("Failed to load Google Maps API. Please try again later.");
    });
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim() || !placesService) return;

    setLoading(true);
    setError('');
    setSelectedPlace(null);

    const request = {
      query: searchQuery,
      fields: ['name', 'geometry', 'formatted_address', 'place_id', 'rating']
    };

    placesService.textSearch(request, (results, status) => {
      setLoading(false);
      if (status === mapApi.places.PlacesServiceStatus.OK && results) {
        setSearchResults(results);
      } else {
        setSearchResults([]);
        setError('No places found. Try a different search term.');
      }
    });
  };

  const handlePlaceSelect = (placeId) => {
    if (!placesService) return;

    setLoading(true);
    setError('');

    placesService.getDetails({
      placeId: placeId,
      fields: [
        'name', 'rating', 'formatted_address', 
        'opening_hours', 'reviews', 'price_level', 'website',
        'formatted_phone_number', 'user_ratings_total', 'place_id'
      ]
    }, (place, status) => {
      setLoading(false);
      if (status === mapApi.places.PlacesServiceStatus.OK) {
        setSelectedPlace(place);
      } else {
        setError('Failed to get place details.');
      }
    });
  };

  const renderPlaceDetails = () => {
    if (!selectedPlace) return null;

    return (
      <div className="bg-white rounded-lg shadow-md p-4 mt-6">
        <h2 className="text-xl font-bold mb-2">{selectedPlace.name}</h2>
        
        {selectedPlace.rating && (
          <div className="flex items-center mb-2">
            <span className="mr-1">⭐</span>
            <span>{selectedPlace.rating} / 5</span>
            {selectedPlace.user_ratings_total && (
              <span className="text-sm text-gray-500 ml-2">({selectedPlace.user_ratings_total} reviews)</span>
            )}
          </div>
        )}
        
        {selectedPlace.formatted_address && (
          <p className="text-gray-600 mb-2">{selectedPlace.formatted_address}</p>
        )}
        
        {selectedPlace.formatted_phone_number && (
          <p className="text-gray-600 mb-2">
            <strong>Phone:</strong> {selectedPlace.formatted_phone_number}
          </p>
        )}
        
        {selectedPlace.opening_hours && (
          <div className="mt-4">
            <h3 className="font-semibold mb-1">Opening Hours</h3>
            <div className="text-sm">
              {selectedPlace.opening_hours.weekday_text ? (
                <ul>
                  {selectedPlace.opening_hours.weekday_text.map((day, index) => (
                    <li key={index}>{day}</li>
                  ))}
                </ul>
              ) : (
                selectedPlace.opening_hours.isOpen !== undefined && (
                  <p>{selectedPlace.opening_hours.isOpen() ? 'Open now' : 'Closed now'}</p>
                )
              )}
            </div>
          </div>
        )}
        
        {selectedPlace.price_level !== undefined && (
          <div className="mt-2">
            <h3 className="font-semibold mb-1">Price Level</h3>
            <p>{"$".repeat(selectedPlace.price_level)}</p>
          </div>
        )}
        
        <div className="mt-4 flex flex-col gap-2">
          {selectedPlace.website && (
            <a 
              href={selectedPlace.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Visit Website
            </a>
          )}
          <a 
            href={`https://www.google.com/maps/place/?q=place_id:${selectedPlace.place_id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            View on Google Maps
          </a>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Google Places Search</h1>
      
      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Search for restaurants, attractions, etc. (e.g., restaurants in New York)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" disabled={loading || !placesService}>
            {loading ? 'Searching...' : 'Search'}
          </Button>
        </div>
      </form>

      {error && <div className="text-red-500 mb-4">{error}</div>}
      
      {!placesService && !error && (
        <div className="text-blue-500 mb-4">Loading Google Maps API...</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          {searchResults.length > 0 && (
            <>
              <h2 className="text-xl font-semibold mb-3">Search Results</h2>
              <div className="space-y-3">
                {searchResults.map((place) => (
                  <div 
                    key={place.place_id}
                    className="bg-white p-3 rounded-md shadow-sm cursor-pointer hover:bg-gray-50"
                    onClick={() => handlePlaceSelect(place.place_id)}
                  >
                    <h3 className="font-medium">{place.name}</h3>
                    {place.formatted_address && (
                      <p className="text-sm text-gray-600">{place.formatted_address}</p>
                    )}
                    {place.rating && (
                      <div className="flex items-center mt-1">
                        <span className="text-sm">{place.rating} ⭐</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
        
        <div>
          {selectedPlace && renderPlaceDetails()}
        </div>
      </div>
    </div>
  );
}

export default PlaceSearch; 