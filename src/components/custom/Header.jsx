import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button } from '../ui/button'

function Header() {
  const location = useLocation();
  
  return (
    <header className="w-full border-b">
      <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
        <Link to="/" className="mr-6 flex items-center">
          <span className="text-xl font-bold">AI Trip Planner</span>
        </Link>
        <nav className="ml-auto flex items-center space-x-4">
          <Link to="/">
            <Button 
              variant={location.pathname === "/" ? "default" : "ghost"}
              className="text-sm font-medium transition-colors"
            >
              Home
            </Button>
          </Link>
          <Link to="/create-trip">
            <Button 
              variant={location.pathname === "/create-trip" ? "default" : "ghost"}
              className="text-sm font-medium transition-colors"
            >
              Create Trip
            </Button>
          </Link>
          <Link to="/my-trips">
            <Button 
              variant={location.pathname === "/my-trips" ? "default" : "ghost"}
              className="text-sm font-medium transition-colors"
            >
              My Trips
            </Button>
          </Link>
          <Link to="/place-search">
            <Button 
              variant={location.pathname === "/place-search" ? "default" : "ghost"}
              className="text-sm font-medium transition-colors"
            >
              Place Search
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header 