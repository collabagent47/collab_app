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
import type { User } from '../../domain/auth/auth-types'

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
// Tests con usuario autenticado — viewer y null (MVP 3)
// ---------------------------------------------------------------------------

const viewerUser: User = {
  id: 'user-viewer', name: 'Invitado', email: 'viewer@client.local',
  role: 'viewer', status: 'active', createdAt: '', updatedAt: '',
}

const explorationWithGuidedAnswers: Exploration = {
  ...explorationWithNotes,
  id: 'test-002',
  guidedAnswers: [
    {
      id: 'ga-001',
      eviarStep: 'understand',
      question: 'Pregunta interna',
      answer: 'RESPUESTA_GUIA_INTERNA',
      status: 'confirmed',
      createdAt: '2026-06-04T00:00:00.000Z',
      updatedAt: '2026-06-04T00:00:00.000Z',
    },
  ],
}

describe('toPresentationViewModel — con usuario autenticado (MVP 3)', () => {
  it('viewer: el ViewModel no contiene notes', () => {
    // GIVEN: viewer autenticado + exploración con notas internas
    // WHEN: se transforma pasando el usuario viewer
    const vm = toPresentationViewModel(explorationWithNotes, viewerUser)
    // THEN: notes excluido del ViewModel
    expect('notes' in vm).toBe(false)
    expect(JSON.stringify(vm)).not.toContain(INTERNAL_NOTE_TEXT)
  })

  it('viewer: el ViewModel es subconjunto reducido (sin city, mainChannel, etc.)', () => {
    // GIVEN: viewer — solo recibe campos públicos mínimos
    const exploration: Exploration = {
      ...explorationWithNotes,
      city: 'CIUDAD_SECRETA',
      mainChannel: 'CANAL_SECRETO',
    }
    const vm = toPresentationViewModel(exploration, viewerUser)
    // THEN: campos restringidos excluidos
    expect('city' in vm).toBe(false)
    expect('mainChannel' in vm).toBe(false)
    expect(JSON.stringify(vm)).not.toContain('CIUDAD_SECRETA')
    expect(JSON.stringify(vm)).not.toContain('CANAL_SECRETO')
  })

  it('null user: el ViewModel no contiene guidedAnswers', () => {
    // GIVEN: usuario null (sin sesión) → efectivo como viewer
    // WHEN: se transforma con user=null
    const vm = toPresentationViewModel(explorationWithGuidedAnswers, null)
    // THEN: guidedAnswers excluido (nunca pasan el mapper)
    expect('guidedAnswers' in vm).toBe(false)
    expect(JSON.stringify(vm)).not.toContain('RESPUESTA_GUIA_INTERNA')
  })

  it('advisor: recibe ViewModel completo (city y mainChannel incluidos)', () => {
    // GIVEN: advisor autenticado + exploración con campos completos
    const advisorUser: User = {
      id: 'user-advisor', name: 'Asesor', email: 'advisor@collab.local',
      role: 'advisor', status: 'active', createdAt: '', updatedAt: '',
    }
    const exploration: Exploration = {
      ...explorationWithNotes,
      city: 'Bogotá',
      mainChannel: 'WhatsApp',
    }
    const vm = toPresentationViewModel(exploration, advisorUser)
    // THEN: campos extendidos presentes para roles internos
    expect(vm.city).toBe('Bogotá')
    expect(vm.mainChannel).toBe('WhatsApp')
    // THEN: pero las notas internas siguen excluidas
    expect('notes' in vm).toBe(false)
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
