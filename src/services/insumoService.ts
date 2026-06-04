import { v4 as uuidv4 } from 'uuid'
import type { Insumo } from '../domain/roi/roi-types'
import { explorationService } from './explorationService'

export const insumoService = {
  getAll(explorationId: string): Insumo[] {
    return explorationService.getById(explorationId)?.insumos ?? []
  },

  create(explorationId: string, partial: Omit<Insumo, 'id'>): Insumo | null {
    const exploration = explorationService.getById(explorationId)
    if (!exploration) return null

    const insumo: Insumo = { ...partial, id: uuidv4() }
    explorationService.update(explorationId, {
      insumos: [...exploration.insumos, insumo],
    })
    return insumo
  },

  update(explorationId: string, insumoId: string, updates: Partial<Insumo>): Insumo | null {
    const exploration = explorationService.getById(explorationId)
    if (!exploration) return null

    const insumos = exploration.insumos.map((ins) =>
      ins.id === insumoId ? { ...ins, ...updates } : ins,
    )
    explorationService.update(explorationId, { insumos })
    return insumos.find((ins) => ins.id === insumoId) ?? null
  },

  delete(explorationId: string, insumoId: string): boolean {
    const exploration = explorationService.getById(explorationId)
    if (!exploration) return false

    const insumos = exploration.insumos.filter((ins) => ins.id !== insumoId)
    explorationService.update(explorationId, { insumos })
    return true
  },

  calculateAvgTicketSuggestion(insumos: Insumo[]): number | null {
    const withPrice = insumos.filter((ins) => ins.avgPrice && ins.avgPrice > 0)
    if (withPrice.length === 0) return null
    const total = withPrice.reduce((sum, ins) => sum + (ins.avgPrice ?? 0), 0)
    return Math.round(total / withPrice.length)
  },
}
