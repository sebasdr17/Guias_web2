import { Navigate } from 'react-router-dom'
import { getCurrentUser } from '../services/authService'
import { useEffect, useState } from 'react'

const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await getCurrentUser()
      setUser(currentUser)
      setLoading(false)
    }
    fetchUser()
  }, [])

  if (loading) return <p>Cargando...</p>

  if (!user) return <Navigate to="/login" />

  return children
}

export default ProtectedRoute
