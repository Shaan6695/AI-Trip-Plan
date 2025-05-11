import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CreateTrip from './create-trip/index.jsx'
import { Toaster } from './components/ui/sonner.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';
import Viewtrip from './view-trip/plan/index.jsx'
import MyTrips from './my-trips/index.jsx'

const router = createBrowserRouter([{
  path: '/',
  element: <App />
},
{
  path:'/create-trip',
  element: <CreateTrip />
},
{
  path: '/view-trip',
  element: <Viewtrip />
},
{
  path: '/my-trips',
  element: <MyTrips />
}

])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Toaster/>
      <RouterProvider router={router}/>
  </React.StrictMode>,
)
