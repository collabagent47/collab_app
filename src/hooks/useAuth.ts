import { useEffect } from 'react'
import { useAuthStore } from '../stores/authStore'

export function useAuth() {
  const { currentUser, isAuthenticated, login, logout, initFromStorage } = useAuthStore()

  useEffect(() => {
    initFromStorage()
  }, [])

  return { currentUser, isAuthenticated, login, logout }
}
