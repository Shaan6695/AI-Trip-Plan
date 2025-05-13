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

export const GetPlaceDetails = (data) =>
  axios.post(BASE_URL, data, config)

export const PHOTO_REF_URL =
  'https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&maxWidthPx=1900&key='
  + import.meta.env.VITE_GOOGLE_PLACE_API_KEY

/**
 * Fetch or return cached photo-URL for a query.
 */
export async function getPlacePhotoUrl(query) {
  if (photoCache[query]) return photoCache[query]

  try {
    const resp = await GetPlaceDetails({ textQuery: query })
    const photoName = resp.data.places?.[0]?.photos?.[3]?.name
    const url = photoName
      ? PHOTO_REF_URL.replace('{NAME}', photoName)
      : '/placeholder.jpg'
    photoCache[query] = url
    return url
  } catch {
    return '/placeholder.jpg'
  }
}