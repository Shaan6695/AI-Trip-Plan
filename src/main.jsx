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
import PlaceSearch from './place-search/index.jsx'
import Layout from './components/custom/Layout.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout><App /></Layout>
  },
  {
    path:'/create-trip',
    element: <Layout><CreateTrip /></Layout>
  },
  {
    path: '/view-trip/:tripId',
    element: <Layout><Viewtrip /></Layout>
  },
  {
    path: '/view-trip',
    element: <Layout><Viewtrip /></Layout>
  },
  {
    path: '/my-trips',
    element: <Layout><MyTrips /></Layout>
  },
  {
    path: '/place-search',
    element: <Layout><PlaceSearch /></Layout>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Toaster/>
      <RouterProvider router={router}/>
  </React.StrictMode>,
)
