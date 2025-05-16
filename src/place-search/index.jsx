import React, { useState, useEffect } from 'react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Loader } from '@googlemaps/js-api-loader';
import { FaChevronDown, FaChevronUp, FaMagic, FaSpinner } from 'react-icons/fa';
import { summarizeReviews } from '../service/AIModel';
import { toast } from 'sonner';

function PlaceSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mapApi, setMapApi] = useState(null);
  const [placesService, setPlacesService] = useState(null);
  const [expandedReviews, setExpandedReviews] = useState(false);
  const [expandedReviewIndex, setExpandedReviewIndex] = useState(null);
  const [reviewSummary, setReviewSummary] = useState('');
  const [summaryLoading, setSummaryLoading] = useState(false);
  
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
    setReviewSummary('');

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
    setExpandedReviews(false);
    setExpandedReviewIndex(null);
    setReviewSummary('');

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
        console.log("Place details:", place); // For debugging
      } else {
        setError('Failed to get place details.');
      }
    });
  };

  // Generate an AI summary of the reviews
  const handleSummarizeReviews = async () => {
    if (!selectedPlace || !selectedPlace.reviews || selectedPlace.reviews.length === 0) {
      toast.error("No reviews available to summarize");
      return;
    }

    setSummaryLoading(true);
    setReviewSummary('');

    try {
      const summary = await summarizeReviews(
        selectedPlace.name, 
        selectedPlace.reviews
      );
      setReviewSummary(summary);
    } catch (error) {
      console.error("Error summarizing reviews:", error);
      toast.error("Failed to summarize reviews. Please try again.");
    } finally {
      setSummaryLoading(false);
    }
  };

  // Format the timestamp from Google reviews
  const formatReviewTime = (timestamp) => {
    if (!timestamp) return '';
    
    const reviewDate = new Date(timestamp.seconds * 1000);
    const now = new Date();
    const diffTime = Math.abs(now - reviewDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 1) return 'Today';
    if (diffDays <= 7) return `${diffDays} days ago`;
    if (diffDays <= 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays <= 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  // Render star rating
  const renderStars = (rating) => {
    if (!rating) return null;
    
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={i < rating ? "text-yellow-400" : "text-gray-300"}>★</span>
        ))}
      </div>
    );
  };

  // Toggle expanding all reviews
  const toggleReviews = () => {
    setExpandedReviews(!expandedReviews);
    setExpandedReviewIndex(null); // Reset individual expanded reviews
  };

  // Toggle individual review expansion
  const toggleReview = (index) => {
    if (expandedReviewIndex === index) {
      setExpandedReviewIndex(null);
    } else {
      setExpandedReviewIndex(index);
    }
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
        
        {/* Reviews Section */}
        {selectedPlace.reviews && selectedPlace.reviews.length > 0 && (
          <div className="mt-6 border-t pt-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center cursor-pointer" onClick={toggleReviews}>
                <h3 className="font-semibold text-lg">
                  Reviews ({selectedPlace.reviews.length})
                </h3>
                <Button variant="ghost" size="sm" className="p-1 h-auto">
                  {expandedReviews ? <FaChevronUp /> : <FaChevronDown />}
                </Button>
              </div>
              
              <Button 
                variant="outline" 
                size="sm"
                className="text-sm flex items-center gap-1"
                onClick={handleSummarizeReviews}
                disabled={summaryLoading || selectedPlace.reviews.length === 0}
              >
                {summaryLoading ? <FaSpinner className="animate-spin" /> : <FaMagic />}
                <span>Summarize</span>
              </Button>
            </div>
            
            {/* AI Summary */}
            {reviewSummary && (
              <div className="mt-3 p-3 bg-blue-50 rounded-md text-sm border border-blue-100">
                <h4 className="font-semibold text-blue-800 mb-1">AI Summary</h4>
                <p className="text-gray-700">{reviewSummary}</p>
              </div>
            )}

            {expandedReviews && (
              <div className="space-y-4 mt-3">
                {selectedPlace.reviews.map((review, index) => (
                  <div key={index} className="border-b pb-4 last:border-b-0">
                    <div className="flex flex-col">
                      <div className="flex justify-between items-center mb-1">
                        <p className="font-medium">{review.author_name}</p>
                        <span className="text-xs text-gray-500">
                          {review.relative_time_description}
                        </span>
                      </div>
                      
                      <div className="mb-2">
                        {renderStars(review.rating)}
                      </div>
                      
                      <div>
                        {review.text && review.text.length > 150 ? (
                          <>
                            <p className="text-sm text-gray-700">
                              {expandedReviewIndex === index 
                                ? review.text 
                                : `${review.text.substring(0, 150)}...`}
                            </p>
                            <Button 
                              variant="link" 
                              className="p-0 h-auto text-sm text-blue-600"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleReview(index);
                              }}
                            >
                              {expandedReviewIndex === index ? 'Show less' : 'Read more'}
                            </Button>
                          </>
                        ) : (
                          <p className="text-sm text-gray-700">{review.text}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
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