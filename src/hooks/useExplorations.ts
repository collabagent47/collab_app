import { useEffect } from 'react'
import { useExplorationStore } from '../stores/explorationStore'

export function useExplorations() {
  const { explorations, loading, loadExplorations, createExploration, deleteExploration } =
    useExplorationStore()

  useEffect(() => {
    loadExplorations()
  }, [loadExplorations])

  return { explorations, loading, createExploration, deleteExploration }
}
