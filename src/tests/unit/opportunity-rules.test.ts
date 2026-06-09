/**
 * Tests de reglas de oportunidad — Collab ROI Explorer MVP
 *
 * Algoritmo (src/domain/roi/opportunity-type.ts):
 *   - Si hay alguna fricción 'mixed' O hay comercial Y operacional → 'mixed'
 *   - Si más comerciales que operacionales → 'commercial'
 *   - Si más operacionales que comerciales → 'operational'
 *   - En empate o sin fricciones → 'mixed'
 */

import { describe, it, expect } from 'vitest'
import { inferOpportunityType } from '../../domain/roi/opportunity-type'

// ---------------------------------------------------------------------------
// Fricciones de ejemplo
// ---------------------------------------------------------------------------

const FRICTIONS: SimpleFriction[] = [
  { id: 'fric-001', impactType: 'commercial' },
  { id: 'fric-002', impactType: 'commercial' },
  { id: 'fric-003', impactType: 'operational' },
  { id: 'fric-004', impactType: 'operational' },
  { id: 'fric-005', impactType: 'mixed' },
  { id: 'fric-006', impactType: 'mixed' },
  // Fricciones de seguimiento/cotización/trazabilidad/conversión (nombradas como mixed)
  { id: 'fric-seguimiento', impactType: 'mixed' },
  { id: 'fric-cotizacion', impactType: 'mixed' },
  { id: 'fric-trazabilidad', impactType: 'mixed' },
  { id: 'fric-conversion', impactType: 'mixed' },
]

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('inferOpportunityType', () => {
  it('retorna "commercial" cuando solo hay fricciones comerciales seleccionadas', () => {
    // GIVEN: dos fricciones de tipo commercial seleccionadas
    // WHEN: se infiere el tipo de oportunidad
    const result = inferOpportunityType(['fric-001', 'fric-002'], FRICTIONS)

    // THEN: tipo comercial
    expect(result).toBe('commercial')
  })

  it('retorna "operational" cuando solo hay fricciones operacionales seleccionadas', () => {
    // GIVEN: dos fricciones de tipo operational seleccionadas
    // WHEN: se infiere el tipo
    const result = inferOpportunityType(['fric-003', 'fric-004'], FRICTIONS)

    // THEN: tipo operacional
    expect(result).toBe('operational')
  })

  it('retorna "mixed" cuando hay al menos una fricción de tipo mixed', () => {
    // GIVEN: una fricción mixed seleccionada
    // WHEN: se infiere el tipo
    const result = inferOpportunityType(['fric-005'], FRICTIONS)

    // THEN: tipo mixto
    expect(result).toBe('mixed')
  })

  it('retorna "mixed" cuando hay fricciones comerciales Y operacionales', () => {
    // GIVEN: una fricción commercial y una operational
    // WHEN: se infiere el tipo
    const result = inferOpportunityType(['fric-001', 'fric-003'], FRICTIONS)

    // THEN: tipo mixto (ambos impactos presentes)
    expect(result).toBe('mixed')
  })

  it('retorna "mixed" cuando hay fricciones de seguimiento/cotización/trazabilidad/conversión', () => {
    // GIVEN: fricciones de seguimiento, cotización, trazabilidad y conversión (tipo mixed)
    const frictionIds = ['fric-seguimiento', 'fric-cotizacion', 'fric-trazabilidad', 'fric-conversion']

    // WHEN: se infiere el tipo
    const result = inferOpportunityType(frictionIds, FRICTIONS)

    // THEN: tipo mixto
    expect(result).toBe('mixed')
  })

  it('retorna "mixed" cuando no hay fricciones seleccionadas (empate en 0)', () => {
    // GIVEN: lista vacía de fricciones seleccionadas
    // WHEN: se infiere el tipo
    const result = inferOpportunityType([], FRICTIONS)

    // THEN: tipo mixto (fallback por empate)
    expect(result).toBe('mixed')
  })

  it('retorna "mixed" cuando hay fricciones commercial Y operational aunque commercial sea mayoría', () => {
    // GIVEN: 2 commercial, 1 operational
    // WHEN: se infiere el tipo
    const result = inferOpportunityType(['fric-001', 'fric-002', 'fric-003'], FRICTIONS)

    // THEN: mixto — el algoritmo retorna 'mixed' si AMBOS tipos coexisten,
    // independientemente de la mayoría. Para obtener 'commercial', todas las
    // fricciones seleccionadas deben ser de tipo 'commercial' exclusivamente.
    expect(result).toBe('mixed')
  })

  it('retorna "mixed" cuando hay fricciones commercial Y operational aunque operacional sea mayoría', () => {
    // GIVEN: 1 commercial, 2 operational
    // WHEN: se infiere el tipo
    const result = inferOpportunityType(['fric-001', 'fric-003', 'fric-004'], FRICTIONS)

    // THEN: mixto — el algoritmo retorna 'mixed' si AMBOS tipos están presentes,
    // independientemente de cuál sea mayoría. Esta es la regla de negocio definida:
    // "mixed si hay fricciones de seguimiento, cotización, trazabilidad o conversión"
    // Y también si commercial + operational coexisten.
    expect(result).toBe('mixed')
  })

  it('retorna "mixed" cuando hay igual cantidad de commercial y operational', () => {
    // GIVEN: 1 commercial, 1 operational (empate)
    // WHEN: se infiere el tipo
    const result = inferOpportunityType(['fric-001', 'fric-003'], FRICTIONS)

    // THEN: mixto por la presencia simultánea de ambos tipos
    expect(result).toBe('mixed')
  })
})
