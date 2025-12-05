import { useState, useEffect } from 'react'
import { useAuth } from './context/AuthContext'
import './App.css'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Dashboard from './components/Dashboard'

function App() {
  const { isAuthenticated } = useAuth()
  const [isLogin, setIsLogin] = useState(true)

  if (!isAuthenticated) {
    return (
      <>
        {isLogin ? (
          <Login onSwitchToRegister={() => setIsLogin(false)} />
        ) : (
          <Register onSwitchToLogin={() => setIsLogin(true)} />
        )}
      </>
    )
  }

  return <Dashboard />
}

export default App

