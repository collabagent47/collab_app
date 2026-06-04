import { create } from 'zustand'
import type { Exploration } from '../domain/roi/roi-types'
import { getItem, setItem } from '../lib/storage'
import { STORAGE_KEYS } from '../lib/constants'

interface ExplorationState {
  explorations: Exploration[]
  currentExploration: Exploration | null
  loading: boolean
}

interface ExplorationActions {
  loadExplorations: () => void
  createExploration: (exploration: Exploration) => void
  updateExploration: (id: string, updates: Partial<Exploration>) => void
  deleteExploration: (id: string) => void
  setCurrentExploration: (exploration: Exploration | null) => void
}

type ExplorationStore = ExplorationState & ExplorationActions

function persistExplorations(explorations: Exploration[]): void {
  setItem(STORAGE_KEYS.EXPLORATIONS, explorations)
}

export const useExplorationStore = create<ExplorationStore>((set, get) => ({
  explorations: [],
  currentExploration: null,
  loading: false,

  loadExplorations: () => {
    set({ loading: true })
    const stored = getItem<Exploration[]>(STORAGE_KEYS.EXPLORATIONS) ?? []
    set({ explorations: stored, loading: false })
  },

  createExploration: (exploration) => {
    const updated = [...get().explorations, exploration]
    set({ explorations: updated })
    persistExplorations(updated)
  },

  updateExploration: (id, updates) => {
    const updated = get().explorations.map((e) =>
      e.id === id ? { ...e, ...updates, updatedAt: new Date().toISOString() } : e,
    )
    set({ explorations: updated })
    persistExplorations(updated)

    const current = get().currentExploration
    if (current?.id === id) {
      set({ currentExploration: { ...current, ...updates, updatedAt: new Date().toISOString() } })
    }
  },

  deleteExploration: (id) => {
    const updated = get().explorations.filter((e) => e.id !== id)
    set({ explorations: updated })
    persistExplorations(updated)

    if (get().currentExploration?.id === id) {
      set({ currentExploration: null })
    }
  },

  setCurrentExploration: (exploration) => {
    set({ currentExploration: exploration })
  },
}))
