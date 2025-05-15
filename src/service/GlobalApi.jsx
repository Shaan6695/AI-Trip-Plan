import axios from "axios"

const BASE_URL = 'https://places.googleapis.com/v1/places:searchText'

const config = {
    headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': import.meta.env.VITE_GOOGLE_PLACE_API_KEY,
        'X-Goog-FieldMask': [
            'places.photos',
            'places.displayName',
            'places.id'
        ]
    }
}

// in‐memory cache
const photoCache = {}

// Add this to space out API requests
const requestQueue = [];
let processing = false;

const processQueue = async () => {
    if (processing || requestQueue.length === 0) return;
    
    processing = true;
    const { query, resolve, reject } = requestQueue.shift();
    
    try {
        const resp = await GetPlaceDetails({ textQuery: query });
        
        // Extract the direct image URL from photos array
        const photo = resp.data.places?.[0]?.photos?.[0];
        
        if (photo) {
            // Create the direct image URL using formats in the response
            // This avoids making a second API call
            const directImageUrl = `https://lh3.googleusercontent.com/places/${photo.name.split('/')[2]}=s1600-w1600-h1000`;
            photoCache[query] = directImageUrl;
            resolve(directImageUrl);
        } else {
            photoCache[query] = '/placeholder.jpg';
            resolve('/placeholder.jpg');
        }
    } catch (error) {
        console.error(`Error fetching photo for ${query}:`, error);
        reject('/placeholder.jpg');
    } finally {
        processing = false;
        // Wait 1000ms between requests to avoid rate limiting
        setTimeout(() => processQueue(), 1000); // Increased timeout
    }
};

export const GetPlaceDetails = (data) =>
  axios.post(BASE_URL, data, config)

/**
 * Fetch or return cached photo-URL for a query.
 */
export async function getPlacePhotoUrl(query) {
    if (photoCache[query]) return photoCache[query];
    
    return new Promise((resolve, reject) => {
        requestQueue.push({ query, resolve, reject });
        if (!processing) processQueue();
    });
}