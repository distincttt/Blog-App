import { createContext } from 'react'
import { useSelector } from 'react-redux'

export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  let { authorized } = useSelector((state) => state.profileSlice)
  if (localStorage.getItem('user')) authorized = JSON.parse(localStorage.getItem('user')).authorized
  return <AuthContext.Provider value={authorized}>{children}</AuthContext.Provider>
}
