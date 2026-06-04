import { create } from 'zustand'
import { mockLogin, getUserFromSession } from '../domain/auth/auth-service'
import { getItem, setItem, removeItem } from '../lib/storage'
import type { User, AuthSession } from '../domain/auth/auth-types'

const STORAGE_KEY = 'collab_auth_session'

interface AuthState {
  currentUser: User | null
  isAuthenticated: boolean
}

interface AuthActions {
  login: (userId: string) => boolean
  logout: () => void
  initFromStorage: () => void
}

type AuthStore = AuthState & AuthActions

export const useAuthStore = create<AuthStore>((set) => ({
  currentUser: null,
  isAuthenticated: false,

  initFromStorage: () => {
    const session = getItem<AuthSession>(STORAGE_KEY)
    if (!session) return
    const user = getUserFromSession(session)
    if (user) set({ currentUser: user, isAuthenticated: true })
  },

  login: (userId) => {
    const result = mockLogin(userId)
    if (!result) return false
    const session: AuthSession = result.session
    setItem(STORAGE_KEY, session)
    set({ currentUser: result.user, isAuthenticated: true })
    return true
  },

  logout: () => {
    removeItem(STORAGE_KEY)
    set({ currentUser: null, isAuthenticated: false })
  },
}))
