import React from 'react'
import { Outlet } from 'react-router-dom'
import PublicNavbar from './ui/navbar-1'
import Footer from './ui/motion-footer'

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicNavbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
