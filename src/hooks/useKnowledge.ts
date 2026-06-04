import { useEffect } from 'react'
import { useKnowledgeStore } from '../stores/knowledgeStore'

export function useKnowledge(sector?: string) {
  const { frictions, modules, suggestions, loadTemplate, loadSuggestions, addSuggestion, deleteSuggestion } =
    useKnowledgeStore()

  useEffect(() => {
    loadSuggestions()
  }, [loadSuggestions])

  useEffect(() => {
    if (sector) {
      loadTemplate(sector)
    }
  }, [sector, loadTemplate])

  return {
    frictions,
    modules,
    suggestions,
    addSuggestion,
    deleteSuggestion,
  }
}
