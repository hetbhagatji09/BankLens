import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  // Login function
  const login = (userData) => {
    // In a real app, you would validate credentials with an API
    // This is a simplified version for demo purposes
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
    return true
  }

  // Signup function
  const signup = (userData) => {
    // In a real app, you would send user data to an API
    // This is a simplified version for demo purposes
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
    return true
  }

  // Logout function
  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  const value = {
    user,
    loading,
    login,
    signup,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}