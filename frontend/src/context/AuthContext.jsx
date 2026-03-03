import { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authService } from '../services/authService'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [session, setSession] = useState(undefined) // undefined = todavía cargando

  useEffect(() => {
    // Carga la sesión inicial
    authService.getSession().then(setSession).catch(() => setSession(null))

    // Escucha cambios (login, logout, expiración)
    const { data: { subscription } } = authService.onAuthStateChange(setSession)

    return () => subscription.unsubscribe()
  }, [])

  const value = {
    session,
    isLoading: session === undefined,
    isAuthenticated: !!session,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider')
  return ctx
}

// PrivateRoute: protege cualquier ruta que requiera estar logueado
export function PrivateRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/admin', { replace: true })
    }
  }, [isLoading, isAuthenticated, navigate])

  if (isLoading) return <div>Cargando...</div>
  if (!isAuthenticated) return null

  return children
}