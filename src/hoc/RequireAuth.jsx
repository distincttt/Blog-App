import { useLocation, Navigate } from 'react-router-dom'

import useAuth from './useAuth'

export default function RequireAuth({ children }) {
  const location = useLocation()
  const authorized = useAuth()

  if (!authorized) {
    return <Navigate to="/sign-up" state={{ from: location }} />
  }

  return children
}
