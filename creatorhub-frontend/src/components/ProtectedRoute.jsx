import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children, requireCreator = false }) {
  const { isAuthenticated, user, loading } = useAuth()
  const location = useLocation()

  if (loading) return null

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (requireCreator && !user.isCreator) {
    return <Navigate to="/dashboard/become-creator" replace />
  }

  return children || <Outlet />
}
