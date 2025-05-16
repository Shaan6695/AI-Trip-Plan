export const SelectTravelList = [
    {
        id:1,
        title: 'Just Me',
        desc: 'A sole traveles in exploration',
        icon: '✈️',
        people:'1 person'
    },
    {
        id:2,
        title: 'A Couple',
        desc: 'Two traveles in tandem',
        icon: '🥂',
        people:'2 people'
    },
    {
        id:3,
        title: 'Family',
        desc: 'A group of fun loving adv',
        icon: '🏡',
        people:'3 to 5 People'
    },
    {
        id:4,
        title: 'Friends',
        desc: 'A bunch of thrill-seekes',
        icon: '⛵',
        people:'5 to 10 people'
    }
]

export const SelectBudgetOptions = [
    {
        id:1,
        title: 'Cheap',
        desc: 'Stay conscious of costs',
        icon: '💵',
    },
    {
        id:2,
        title: 'Moderate',
        desc: 'Keep cost on the average side',
        icon: '💰',
    },
    {
        id:3,
        title: 'Luxury',
        desc: 'Dont worry about cost',
        icon: '💸',
    }
]

export const AI_PROMPT = `
You are an expert travel-planner API.

Respond ONLY with valid JSON (no markdown code fences, no comments) that matches EXACTLY the following schema:

{
  "hotel_options": [
    {
      "name": "string",            // Hotel name
      "address": "string",         // Complete address
      "price": "string",           // Price range or description (e.g. "From $120/night")
      "image_url": "string",       // Direct image URL (https://...)
      "geo_coordinates": "string", // "<lat>,<lng>"
      "rating": "string",          // e.g. "4.3 stars"
      "description": "string"      // Short description (1-2 sentences)
    }
  ],
  "itinerary": [
    {
      "day": "string",             // e.g. "Day 1"
      "plan": [
        {
          "time": "string",            // e.g. "Morning (9:00 AM - 12:00 PM)"
          "place": "string",           // Place name
          "details": "string",         // Brief description of the activity/place
          "image_url": "string",       // Direct image URL (https://...)
          "geo_coordinates": "string", // "<lat>,<lng>"
          "ticket_pricing": "string",  // e.g. "$25 per person" or "Free"
          "rating": "string"           // e.g. "4.5 stars"
        }
      ]
    }
  ]
}

Important rules you MUST follow:
1. Output ONLY the JSON object – no markdown, no commentary.
2. Use the exact key names and structure shown above.
3. Provide at least 3 objects in "hotel_options" and exactly {totalDays} objects in "itinerary" (one per day).
4. In each "plan" array include 3 activities: Morning, Afternoon, Evening.

Now generate a travel plan for Location: {location} , duration: {totalDays} days, travellers: {traveler} , budget preference: {budget}.`