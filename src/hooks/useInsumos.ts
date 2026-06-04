import { useCallback } from 'react'
import type { Insumo } from '../domain/roi/roi-types'
import { insumoService } from '../services/insumoService'
import { useExplorationStore } from '../stores/explorationStore'

export function useInsumos(explorationId: string | undefined) {
  const { currentExploration, updateExploration } = useExplorationStore()
  const insumos = currentExploration?.insumos ?? []

  const addInsumo = useCallback(
    (partial: Omit<Insumo, 'id'>) => {
      if (!explorationId) return
      insumoService.create(explorationId, partial)
      const updated = insumoService.getAll(explorationId)
      updateExploration(explorationId, { insumos: updated })
    },
    [explorationId, updateExploration],
  )

  const removeInsumo = useCallback(
    (insumoId: string) => {
      if (!explorationId) return
      insumoService.delete(explorationId, insumoId)
      const updated = insumoService.getAll(explorationId)
      updateExploration(explorationId, { insumos: updated })
    },
    [explorationId, updateExploration],
  )

  const updateInsumo = useCallback(
    (insumoId: string, updates: Partial<Insumo>) => {
      if (!explorationId) return
      insumoService.update(explorationId, insumoId, updates)
      const updated = insumoService.getAll(explorationId)
      updateExploration(explorationId, { insumos: updated })
    },
    [explorationId, updateExploration],
  )

  const avgTicketSuggestion = insumoService.calculateAvgTicketSuggestion(insumos)

  return { insumos, addInsumo, removeInsumo, updateInsumo, avgTicketSuggestion }
}
