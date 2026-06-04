import { v4 as uuidv4 } from 'uuid'
import type { KnowledgeSuggestion, KnowledgeSuggestionType } from '../domain/knowledge-base/knowledge-types'
import { getItem, setItem } from '../lib/storage'
import { STORAGE_KEYS } from '../lib/constants'

function loadAll(): KnowledgeSuggestion[] {
  return getItem<KnowledgeSuggestion[]>(STORAGE_KEYS.KNOWLEDGE_SUGGESTIONS) ?? []
}

function saveAll(suggestions: KnowledgeSuggestion[]): void {
  setItem(STORAGE_KEYS.KNOWLEDGE_SUGGESTIONS, suggestions)
}

export const knowledgeService = {
  getAll(): KnowledgeSuggestion[] {
    return loadAll()
  },

  getByType(type: KnowledgeSuggestionType): KnowledgeSuggestion[] {
    return loadAll().filter((s) => s.type === type)
  },

  create(partial: {
    type: KnowledgeSuggestionType
    content: string
    sourceExplorationId?: string
    createdBy: string
  }): KnowledgeSuggestion {
    const suggestion: KnowledgeSuggestion = {
      id: uuidv4(),
      type: partial.type,
      content: partial.content,
      sourceExplorationId: partial.sourceExplorationId,
      status: 'pending_review',
      createdBy: partial.createdBy,
      createdAt: new Date().toISOString(),
    }
    const all = loadAll()
    saveAll([...all, suggestion])
    return suggestion
  },

  delete(id: string): boolean {
    const all = loadAll()
    const filtered = all.filter((s) => s.id !== id)
    if (filtered.length === all.length) return false
    saveAll(filtered)
    return true
  },
}
