import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { AuthUser, LoginCredentials, RegisterData } from '../types/auth'

interface AuthContextType {
  user: AuthUser | null
  login: (credentials: LoginCredentials) => Promise<boolean>
  register: (data: RegisterData) => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)

  useEffect(() => {
    // Charger l'utilisateur depuis localStorage
    const savedUser = localStorage.getItem('studenthub-user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    // Simuler une vérification (en production, utiliser une API)
    const users = JSON.parse(localStorage.getItem('studenthub-users') || '[]')
    const foundUser = users.find(
      (u: any) => u.email === credentials.email && u.password === credentials.password
    )

    if (foundUser) {
      const authUser: AuthUser = {
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name,
      }
      setUser(authUser)
      localStorage.setItem('studenthub-user', JSON.stringify(authUser))
      return true
    }
    return false
  }

  const register = async (data: RegisterData): Promise<boolean> => {
    // Vérifier si l'email existe déjà
    const users = JSON.parse(localStorage.getItem('studenthub-users') || '[]')
    if (users.some((u: any) => u.email === data.email)) {
      return false
    }

    // Créer le nouvel utilisateur
    const newUser = {
      id: Date.now().toString(),
      name: data.name,
      email: data.email,
      password: data.password,
      createdAt: new Date().toISOString(),
    }

    users.push(newUser)
    localStorage.setItem('studenthub-users', JSON.stringify(users))

    // Connecter automatiquement
    const authUser: AuthUser = {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
    }
    setUser(authUser)
    localStorage.setItem('studenthub-user', JSON.stringify(authUser))
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('studenthub-user')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

