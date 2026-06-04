/**
 * Tests de seguridad para Modo Presentación — Bloqueo R-004
 *
 * Valida que las notas internas NO aparezcan en el DOM cuando el modo
 * presentación está activo. No basta con CSS — el texto no debe renderizarse.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render } from '@testing-library/react'
import { toPresentationViewModel } from '../../lib/presentation'
import type { Exploration } from '../../domain/roi/roi-types'

// ---------------------------------------------------------------------------
// Tests del mapper toPresentationViewModel
// ---------------------------------------------------------------------------

const INTERNAL_NOTE_TEXT = 'DATO_SECRETO_INTERNO'

const explorationWithNotes: Exploration = {
  id: 'test-001',
  clientName: 'Fertilizantes Mix',
  sector: 'Agroinsumos',
  status: 'roi_calculated',
  createdAt: '2026-06-03T00:00:00.000Z',
  updatedAt: '2026-06-03T00:00:00.000Z',
  sessionPreparations: [],
  operation: {},
  insumos: [],
  frictionIds: [],
  recommendedModules: [],
  roiInputs: {},
  notes: [
    { id: 'note-001', content: INTERNAL_NOTE_TEXT, createdAt: '2026-06-03T00:00:00.000Z' },
  ],
}

describe('toPresentationViewModel — R-004 (Prioridad 3)', () => {
  it('excluye notas internas del ViewModel de presentación', () => {
    // GIVEN: exploración con notas internas confidenciales
    // WHEN: se transforma al ViewModel de presentación
    const vm = toPresentationViewModel(explorationWithNotes)
    // THEN: el ViewModel no tiene campo 'notes'
    expect('notes' in vm).toBe(false)
  })

  it('excluye sessionPreparations del ViewModel de presentación', () => {
    // GIVEN: exploración con preparaciones de sesión internas
    const vm = toPresentationViewModel(explorationWithNotes)
    // THEN: el ViewModel no tiene campo 'sessionPreparations'
    expect('sessionPreparations' in vm).toBe(false)
  })

  it('excluye roiInputs (datos técnicos) del ViewModel de presentación', () => {
    // GIVEN: exploración con inputs técnicos del motor ROI
    const vm = toPresentationViewModel(explorationWithNotes)
    // THEN: el ViewModel no expone los inputs técnicos
    expect('roiInputs' in vm).toBe(false)
  })

  it('excluye operation (datos operativos crudos) del ViewModel de presentación', () => {
    // GIVEN: exploración con datos operativos internos
    const vm = toPresentationViewModel(explorationWithNotes)
    // THEN: el ViewModel no expone los datos operativos crudos
    expect('operation' in vm).toBe(false)
  })

  it('excluye insumos del ViewModel de presentación', () => {
    // GIVEN: exploración con catálogo interno de insumos
    const vm = toPresentationViewModel(explorationWithNotes)
    // THEN: el ViewModel no expone el catálogo de insumos
    expect('insumos' in vm).toBe(false)
  })

  it('excluye dataQuality del ViewModel de presentación', () => {
    // GIVEN: exploración con métrica interna de calidad de datos
    const vm = toPresentationViewModel(explorationWithNotes)
    // THEN: el ViewModel no expone la métrica interna
    expect('dataQuality' in vm).toBe(false)
  })

  it('preserva los campos públicos necesarios para la presentación', () => {
    // GIVEN: exploración con datos públicos y privados
    // WHEN: se transforma al ViewModel
    const vm = toPresentationViewModel(explorationWithNotes)
    // THEN: los campos públicos están presentes
    expect(vm.clientName).toBe('Fertilizantes Mix')
    expect(vm.sector).toBe('Agroinsumos')
    expect(vm.frictionIds).toEqual([])
    expect(vm.recommendedModules).toEqual([])
  })

  it('el texto DATO_SECRETO_INTERNO no está en ningún campo del ViewModel', () => {
    // GIVEN: notas internas con texto confidencial
    // WHEN: se transforma al ViewModel
    const vm = toPresentationViewModel(explorationWithNotes)
    // THEN: serializar el ViewModel no contiene el texto secreto
    const serialized = JSON.stringify(vm)
    expect(serialized).not.toContain(INTERNAL_NOTE_TEXT)
  })
})

// ---------------------------------------------------------------------------
// Test de componente — notas no en DOM
// ---------------------------------------------------------------------------

// Mock de hooks y dependencias del componente
vi.mock('react-router-dom', () => ({
  useParams: () => ({ id: 'test-001' }),
  useNavigate: () => vi.fn(),
}))

vi.mock('../../hooks/useExploration', () => ({
  useExploration: () => ({ exploration: explorationWithNotes }),
}))

vi.mock('../../hooks/useKnowledge', () => ({
  useKnowledge: () => ({ frictions: [] }),
}))

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) =>
      <div {...props}>{children}</div>,
    section: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) =>
      <section {...props}>{children}</section>,
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

describe('PresentationModePage — texto de notas no en DOM (R-004)', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('DATO_SECRETO_INTERNO no aparece en el DOM del modo presentación', async () => {
    // GIVEN: exploración con notas internas "DATO_SECRETO_INTERNO"
    // WHEN: se renderiza PresentationModePage
    const { PresentationModePage } = await import('../../pages/PresentationModePage')
    const { container } = render(<PresentationModePage />)
    // THEN: el texto secreto NO aparece en ningún lugar del DOM
    expect(container.innerHTML).not.toContain(INTERNAL_NOTE_TEXT)
    expect(container.querySelector(`[data-testid="internal-notes"]`)).toBeNull()
  })
})
