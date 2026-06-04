import { useEffect, useRef, useCallback } from 'react'
import { useExplorationStore } from '../stores/explorationStore'
import { explorationService } from '../services/explorationService'
import type { Exploration } from '../domain/roi/roi-types'

const DEBOUNCE_MS = 500

export function useExploration(id: string | undefined) {
  const { currentExploration, setCurrentExploration, updateExploration } = useExplorationStore()
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!id) {
      setCurrentExploration(null)
      return
    }
    const found = explorationService.getById(id)
    setCurrentExploration(found)
  }, [id, setCurrentExploration])

  const saveImmediately = useCallback(
    (updates: Partial<Exploration>) => {
      if (!id) return
      updateExploration(id, updates)
    },
    [id, updateExploration],
  )

  const saveWithDebounce = useCallback(
    (updates: Partial<Exploration>) => {
      if (!id) return
      if (debounceRef.current) clearTimeout(debounceRef.current)
      debounceRef.current = setTimeout(() => {
        updateExploration(id, updates)
      }, DEBOUNCE_MS)
    },
    [id, updateExploration],
  )

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [])

  return {
    exploration: currentExploration,
    save: saveImmediately,
    saveWithDebounce,
  }
}
