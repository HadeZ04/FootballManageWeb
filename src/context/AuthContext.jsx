import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { sampleUsers } from '../data/premierLeagueData'

const AuthContext = createContext()

const initialState = {
  user: null,
  isAuthenticated: false,
  users: sampleUsers
}

function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true
      }
    
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false
      }
    
    case 'REGISTER':
      return {
        ...state,
        users: [...state.users, action.payload]
      }
    
    case 'LOAD_DATA':
      return { ...state, ...action.payload }
    
    default:
      return state
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState)

  // Load data from localStorage on mount
  useEffect(() => {
    const savedAuthData = localStorage.getItem('authData')
    if (savedAuthData) {
      dispatch({ type: 'LOAD_DATA', payload: JSON.parse(savedAuthData) })
    }
  }, [])

  // Save data to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('authData', JSON.stringify(state))
  }, [state])

  const login = (email, password) => {
    const user = state.users.find(u => u.email === email && u.password === password)
    if (user) {
      dispatch({ type: 'LOGIN', payload: { ...user, password: undefined } })
      return { success: true }
    }
    return { success: false, error: 'Invalid email or password' }
  }

  const register = (userData) => {
    // Check if user already exists
    const existingUser = state.users.find(u => u.email === userData.email)
    if (existingUser) {
      return { success: false, error: 'User with this email already exists' }
    }

    const newUser = {
      id: Date.now(),
      ...userData,
      createdAt: new Date().toISOString()
    }

    dispatch({ type: 'REGISTER', payload: newUser })
    return { success: true }
  }

  const logout = () => {
    dispatch({ type: 'LOGOUT' })
  }

  const value = {
    ...state,
    login,
    register,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
