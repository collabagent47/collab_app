import { v4 as uuidv4 } from 'uuid'
import type { Exploration, ExplorationStatus } from '../domain/roi/roi-types'
import { getItem, setItem } from '../lib/storage'
import { STORAGE_KEYS } from '../lib/constants'

function loadAll(): Exploration[] {
  return getItem<Exploration[]>(STORAGE_KEYS.EXPLORATIONS) ?? []
}

function saveAll(explorations: Exploration[]): void {
  setItem(STORAGE_KEYS.EXPLORATIONS, explorations)
}

export const explorationService = {
  getAll(): Exploration[] {
    return loadAll()
  },

  getById(id: string): Exploration | null {
    return loadAll().find((e) => e.id === id) ?? null
  },

  create(partial: Omit<Exploration, 'id' | 'createdAt' | 'updatedAt'>): Exploration {
    const now = new Date().toISOString()
    const exploration: Exploration = {
      ...partial,
      id: uuidv4(),
      createdAt: now,
      updatedAt: now,
    }
    const all = loadAll()
    saveAll([...all, exploration])
    return exploration
  },

  update(id: string, updates: Partial<Exploration>): Exploration | null {
    const all = loadAll()
    const index = all.findIndex((e) => e.id === id)
    if (index === -1) return null
    const updated: Exploration = {
      ...all[index],
      ...updates,
      id,
      updatedAt: new Date().toISOString(),
    }
    all[index] = updated
    saveAll(all)
    return updated
  },

  delete(id: string): boolean {
    const all = loadAll()
    const filtered = all.filter((e) => e.id !== id)
    if (filtered.length === all.length) return false
    saveAll(filtered)
    return true
  },

  updateStatus(id: string, status: ExplorationStatus): Exploration | null {
    return explorationService.update(id, { status })
  },
}
