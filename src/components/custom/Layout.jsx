import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'

function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {children || <Outlet />}
      </main>
    </div>
  )
}

export default Layout 