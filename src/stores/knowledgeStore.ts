import { create } from 'zustand'
import type { Friction, KnowledgeSuggestion, RecommendedModule } from '../domain/knowledge-base/knowledge-types'
import { AGROINSUMOS_FRICTIONS, AGROINSUMOS_MODULES } from '../data/templates/agroinsumos.template'
import { getItem, setItem } from '../lib/storage'
import { STORAGE_KEYS } from '../lib/constants'

interface KnowledgeState {
  frictions: Friction[]
  modules: RecommendedModule[]
  suggestions: KnowledgeSuggestion[]
}

interface KnowledgeActions {
  loadTemplate: (sector: string) => void
  addSuggestion: (suggestion: KnowledgeSuggestion) => void
  updateSuggestion: (id: string, updates: Partial<KnowledgeSuggestion>) => void
  deleteSuggestion: (id: string) => void
  loadSuggestions: () => void
}

type KnowledgeStore = KnowledgeState & KnowledgeActions

function persistSuggestions(suggestions: KnowledgeSuggestion[]): void {
  setItem(STORAGE_KEYS.KNOWLEDGE_SUGGESTIONS, suggestions)
}

export const useKnowledgeStore = create<KnowledgeStore>((set, get) => ({
  frictions: [],
  modules: [],
  suggestions: [],

  loadTemplate: (sector) => {
    if (sector === 'Agroinsumos') {
      set({ frictions: AGROINSUMOS_FRICTIONS, modules: AGROINSUMOS_MODULES })
    }
  },

  loadSuggestions: () => {
    const stored = getItem<KnowledgeSuggestion[]>(STORAGE_KEYS.KNOWLEDGE_SUGGESTIONS) ?? []
    set({ suggestions: stored })
  },

  addSuggestion: (suggestion) => {
    const updated = [...get().suggestions, suggestion]
    set({ suggestions: updated })
    persistSuggestions(updated)
  },

  updateSuggestion: (id, updates) => {
    const updated = get().suggestions.map((s) =>
      s.id === id ? { ...s, ...updates } : s,
    )
    set({ suggestions: updated })
    persistSuggestions(updated)
  },

  deleteSuggestion: (id) => {
    const updated = get().suggestions.filter((s) => s.id !== id)
    set({ suggestions: updated })
    persistSuggestions(updated)
  },
}))
