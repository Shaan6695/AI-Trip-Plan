# AI Trip Planner

A modern travel planning application that uses AI to generate personalized travel itineraries, discover places to visit, and provides detailed information about destinations through Google Places integration.

## 🚀 Features

- **AI-Generated Travel Plans**: Create customized travel itineraries based on destination, duration, traveler type, and budget
- **Place Search**: Search for restaurants, attractions, and points of interest using Google Places API
- **Review Summarization**: AI-powered summarization of reviews to quickly understand general sentiment
- **Place Details**: View comprehensive information about places including opening hours, pricing, and contact information
- **Copy-to-Search**: Easily copy place names from itineraries to search for more details
- **My Trips**: Save and manage your trip plans for future reference
- **Interactive UI**: Modern, responsive interface with intuitive navigation

## 🛠️ Technologies Used

- React.js 
- Vite
- Tailwind CSS
- shadcn/ui
- React Router
- Google Gemini AI (for trip generation and review summarization)
- Google Places API
- Axios
- Vercel (deployment)

## 🔧 Project Setup

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Google API keys (Places API and Gemini AI)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/AI-Trip-Plan-1.git
   cd AI-Trip-Plan-1
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```
   VITE_GOOGLE_PLACE_API_KEY=your_google_places_api_key
   VITE_GOOGLE_GEMINI_AI_API_KEY=your_gemini_ai_api_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## 📑 Environment Variables

- `VITE_GOOGLE_PLACE_API_KEY`: Google Maps/Places API key with Places API enabled
- `VITE_GOOGLE_GEMINI_AI_API_KEY`: Google Gemini AI API key for trip generation and review summarization

## 🔍 Usage

### Creating a Trip Plan

1. Navigate to the "Create Trip" page
2. Enter your destination, number of days, traveler type, and budget
3. Click "Generate Plan" to create a personalized itinerary
4. View and save your generated trip plan

### Searching for Places

1. Navigate to the "Place Search" page
2. Enter a search query (e.g., "restaurants in New York")
3. Browse the search results
4. Click on a place to view detailed information
5. Use the "Summarize" button to generate an AI review summary

### Managing Trips

1. Navigate to the "My Trips" page
2. View all your saved trips
3. Click on a trip to see its details

## 📁 Project Structure

```
src/
├── assets/           # Static assets
├── components/       # Reusable UI components
│   ├── custom/       # Custom project-specific components
│   └── ui/           # General UI components from shadcn/ui
├── constants/        # App constants and options
├── create-trip/      # Trip creation page
├── my-trips/         # Saved trips page
├── place-search/     # Google Places search feature
├── service/          # API service functions
│   ├── AIModel.jsx   # Gemini AI integration
│   └── GlobalApi.jsx # Google Places API integration
├── view-trip/        # Trip viewing pages and components
├── App.jsx           # Main app component
└── main.jsx          # Entry point
```

## 📷 Images

<img width="1469" alt="Screenshot 2025-05-16 at 6 11 19 PM" src="https://github.com/user-attachments/assets/bc284704-529c-4518-a493-a45e0368a748" />

<img width="1470" alt="Screenshot 2025-05-16 at 6 11 47 PM" src="https://github.com/user-attachments/assets/c3388975-6f19-4385-9998-b7550a818123" />

<img width="1470" alt="Screenshot 2025-05-16 at 6 12 22 PM" src="https://github.com/user-attachments/assets/ee6d79b1-4b24-453e-b714-092c0412636a" />

<img width="1470" alt="Screenshot 2025-05-16 at 6 12 36 PM" src="https://github.com/user-attachments/assets/33b0786f-da9c-407c-99b1-58dc5ef86286" />

<img width="1470" alt="Screenshot 2025-05-16 at 6 12 55 PM" src="https://github.com/user-attachments/assets/03515128-ac14-43c3-ba44-4f440c874d0d" />

<img width="1464" alt="Screenshot 2025-05-16 at 6 51 59 PM" src="https://github.com/user-attachments/assets/a8250dc2-7b87-441a-98a5-f3912d4a11a2" />



## Acknowledgements

- [Google Places API](https://developers.google.com/maps/documentation/places/web-service/overview)
- [Google Gemini AI](https://ai.google.dev/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)



