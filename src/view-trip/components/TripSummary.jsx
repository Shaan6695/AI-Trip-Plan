import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { FaInfoCircle } from 'react-icons/fa';
import { generateTripSummary } from '@/service/AIModel';

function TripSummary({ trip }) {
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Only fetch summary if we have trip data and no summary yet
    if (trip && trip.tripData && !trip.summary && !summary) {
      fetchSummary();
    } else if (trip && trip.summary) {
      // If the trip already has a summary (from localStorage), use it
      setSummary(trip.summary);
    }
  }, [trip]);

  const fetchSummary = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const summaryText = await generateTripSummary(trip);
      setSummary(summaryText);
      
      // Store the summary in the trip object for future reference
      // This doesn't affect the original trip object unless explicitly saved
      trip.summary = summaryText;
    } catch (err) {
      console.error('Error fetching trip summary:', err);
      setError('Unable to generate trip summary at this time.');
    } finally {
      setLoading(false);
    }
  };

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  // Render loading state
  if (loading) {
    return (
      <div className="mt-5 p-4 border rounded-lg bg-gray-50">
        <div className="flex items-center gap-2">
          <FaInfoCircle className="text-blue-500" />
          <p className="font-semibold">Trip Summary</p>
        </div>
        <p className="mt-2 text-gray-500">Generating trip summary...</p>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="mt-5 p-4 border rounded-lg bg-gray-50">
        <div className="flex items-center gap-2">
          <FaInfoCircle className="text-red-500" />
          <p className="font-semibold">Trip Summary</p>
        </div>
        <p className="mt-2 text-red-500">{error}</p>
      </div>
    );
  }

  // Don't render anything if no summary
  if (!summary) {
    return null;
  }

  return (
    <div className="mt-5 p-4 border rounded-lg bg-gray-50">
      <div className="flex items-center gap-2">
        <FaInfoCircle className="text-blue-500" />
        <p className="font-semibold">Trip Summary</p>
      </div>
      
      <div className="mt-2">
        {expanded ? (
          <p className="text-gray-700">{summary}</p>
        ) : (
          <p className="text-gray-700">
            {summary.length > 150 ? `${summary.substring(0, 150)}...` : summary}
          </p>
        )}
      </div>
      
      {summary.length > 150 && (
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={toggleExpand} 
          className="mt-2 text-blue-600"
        >
          {expanded ? 'Show less' : 'Show more'}
        </Button>
      )}
    </div>
  );
}

export default TripSummary; 