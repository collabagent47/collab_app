import { create } from 'zustand'
import type { UserMode } from '../domain/roi/roi-types'
import { getItem, setItem } from '../lib/storage'
import { STORAGE_KEYS } from '../lib/constants'

interface AppState {
  userMode: UserMode
  isPresentationMode: boolean
}

interface AppActions {
  setUserMode: (mode: UserMode) => void
  togglePresentationMode: () => void
}

type AppStore = AppState & AppActions

function loadPersistedMode(): UserMode {
  const stored = getItem<{ userMode: UserMode }>(STORAGE_KEYS.APP_MODE)
  return stored?.userMode ?? 'learner'
}

export const useAppStore = create<AppStore>((set, get) => ({
  userMode: loadPersistedMode(),
  isPresentationMode: false,

  setUserMode: (mode) => {
    set({ userMode: mode })
    setItem(STORAGE_KEYS.APP_MODE, { userMode: mode })
  },

  togglePresentationMode: () => {
    set({ isPresentationMode: !get().isPresentationMode })
  },
}))
