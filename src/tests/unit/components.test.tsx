/**
 * Tests de componentes clave — Collab ROI Explorer MVP
 *
 * Cubre: QualityWarning, DataBadge, LearnerHint, ExplorationCard.
 *
 * NOTA: @testing-library/jest-dom no está en devDependencies del proyecto
 * (package.json no lo incluye, aunque setup.ts lo importa). Los tests usan
 * getByText/queryByText que lanzan/retornan null sin necesitar jest-dom matchers.
 * Si se instala @testing-library/jest-dom se pueden usar .toBeInTheDocument() etc.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// Mockear useAppStore ANTES de importar los componentes que lo usan
vi.mock('../../stores/appStore', () => ({
  useAppStore: vi.fn(),
}))

// Mockear framer-motion para evitar animaciones en tests
vi.mock('framer-motion', async () => {
  const React = await import('react')
  return {
    motion: {
      div: ({ children, ...props }: Record<string, unknown>) =>
        React.createElement('div', props as Record<string, unknown>, children as React.ReactNode),
    },
    AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
  }
})

import { useAppStore } from '../../stores/appStore'
import { QualityWarning } from '../../components/shared/QualityWarning'
import { DataBadge } from '../../components/shared/DataBadge'
import { LearnerHint } from '../../components/shared/LearnerHint'
import { ExplorationCard } from '../../components/exploration/ExplorationCard'
import type { Exploration } from '../../domain/roi/roi-types'

const mockUseAppStore = vi.mocked(useAppStore)

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function buildExploration(overrides: Partial<Exploration> = {}): Exploration {
  return {
    id: 'exp-001',
    clientName: 'Fertilizantes Mix',
    sector: 'Agroinsumos',
    status: 'draft',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-15T00:00:00.000Z',
    sessionPreparations: [],
    operation: {},
    insumos: [],
    frictionIds: [],
    recommendedModules: [],
    roiInputs: {},
    ...overrides,
  }
}

// ---------------------------------------------------------------------------
// QualityWarning
// ---------------------------------------------------------------------------

describe('QualityWarning', () => {
  it('muestra los mensajes de warning cuando se proporcionan', () => {
    // GIVEN: lista de dos warnings
    const warnings = ['Warning 1', 'Warning 2']

    // WHEN: se renderiza QualityWarning
    render(<QualityWarning warnings={warnings} />)

    // THEN: ambos mensajes aparecen en el DOM
    expect(screen.getByText('Warning 1')).toBeTruthy()
    expect(screen.getByText('Warning 2')).toBeTruthy()
  })

  it('no renderiza nada cuando warnings está vacío', () => {
    // GIVEN: lista vacía de warnings
    // WHEN: se renderiza QualityWarning
    const { container } = render(<QualityWarning warnings={[]} />)

    // THEN: el contenedor está vacío
    expect(container.firstChild).toBeNull()
  })

  it('renderiza tantos elementos como warnings haya', () => {
    // GIVEN: tres warnings
    const warnings = ['Alerta A', 'Alerta B', 'Alerta C']

    // WHEN: se renderiza
    render(<QualityWarning warnings={warnings} />)

    // THEN: los tres textos están presentes
    expect(screen.getByText('Alerta A')).toBeTruthy()
    expect(screen.getByText('Alerta B')).toBeTruthy()
    expect(screen.getByText('Alerta C')).toBeTruthy()
  })
})

// ---------------------------------------------------------------------------
// DataBadge
// ---------------------------------------------------------------------------

describe('DataBadge', () => {
  it('renderiza badge con texto "Confirmado" cuando confidence = "confirmed"', () => {
    // GIVEN: confidence = 'confirmed'
    // WHEN: se renderiza DataBadge
    render(<DataBadge confidence="confirmed" />)

    // THEN: muestra el texto "Confirmado"
    expect(screen.getByText('Confirmado')).toBeTruthy()
  })

  it('tiene clase verde (emerald) cuando confidence = "confirmed"', () => {
    // GIVEN: confidence = 'confirmed'
    // WHEN: se renderiza
    render(<DataBadge confidence="confirmed" />)

    // THEN: el elemento contiene la clase de color verde
    const badge = screen.getByText('Confirmado')
    expect(badge.className).toContain('emerald')
  })

  it('renderiza badge con texto "Pendiente" cuando confidence = "pending"', () => {
    // GIVEN: confidence = 'pending'
    // WHEN: se renderiza DataBadge
    render(<DataBadge confidence="pending" />)

    // THEN: muestra el texto "Pendiente"
    expect(screen.getByText('Pendiente')).toBeTruthy()
  })

  it('tiene clase gris (slate) cuando confidence = "pending"', () => {
    // GIVEN: confidence = 'pending'
    // WHEN: se renderiza
    render(<DataBadge confidence="pending" />)

    // THEN: el elemento contiene clase slate
    const badge = screen.getByText('Pendiente')
    expect(badge.className).toContain('slate')
  })

  it('renderiza badge con texto "Supuesto" cuando confidence = "assumption"', () => {
    // GIVEN: confidence = 'assumption'
    // WHEN: se renderiza DataBadge
    render(<DataBadge confidence="assumption" />)

    // THEN: muestra el texto "Supuesto"
    expect(screen.getByText('Supuesto')).toBeTruthy()
  })

  it('tiene clase amber cuando confidence = "assumption"', () => {
    // GIVEN: confidence = 'assumption'
    // WHEN: se renderiza
    render(<DataBadge confidence="assumption" />)

    // THEN: el elemento contiene clase amber
    const badge = screen.getByText('Supuesto')
    expect(badge.className).toContain('amber')
  })
})

// ---------------------------------------------------------------------------
// LearnerHint
// ---------------------------------------------------------------------------

describe('LearnerHint', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renderiza el texto del hint cuando userMode = "learner"', () => {
    // GIVEN: store retorna modo learner
    mockUseAppStore.mockReturnValue({
      userMode: 'learner',
      isPresentationMode: false,
      setUserMode: vi.fn(),
      togglePresentationMode: vi.fn(),
    })

    // WHEN: se renderiza LearnerHint con texto
    render(<LearnerHint hint="Ayuda pedagógica" />)

    // THEN: el texto aparece en el DOM
    expect(screen.getByText('Ayuda pedagógica')).toBeTruthy()
  })

  it('NO renderiza cuando userMode = "expert"', () => {
    // GIVEN: store retorna modo expert
    mockUseAppStore.mockReturnValue({
      userMode: 'expert',
      isPresentationMode: false,
      setUserMode: vi.fn(),
      togglePresentationMode: vi.fn(),
    })

    // WHEN: se renderiza LearnerHint
    const { container } = render(<LearnerHint hint="Ayuda pedagógica" />)

    // THEN: el componente no renderiza nada (retorna null)
    expect(container.firstChild).toBeNull()
    expect(screen.queryByText('Ayuda pedagógica')).toBeNull()
  })

  it('NO renderiza cuando userMode = "expert" con texto diferente', () => {
    // GIVEN: store retorna modo expert
    mockUseAppStore.mockReturnValue({
      userMode: 'expert',
      isPresentationMode: false,
      setUserMode: vi.fn(),
      togglePresentationMode: vi.fn(),
    })

    // WHEN: se renderiza con otro texto
    render(<LearnerHint hint="Consejo de venta consultiva" />)

    // THEN: el texto no aparece en el DOM
    expect(screen.queryByText('Consejo de venta consultiva')).toBeNull()
  })
})

// ---------------------------------------------------------------------------
// ExplorationCard
// ---------------------------------------------------------------------------

describe('ExplorationCard', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // LearnerHint usa useAppStore — asegurar que no falle
    mockUseAppStore.mockReturnValue({
      userMode: 'learner',
      isPresentationMode: false,
      setUserMode: vi.fn(),
      togglePresentationMode: vi.fn(),
    })
  })

  it('muestra el clientName en el DOM', () => {
    // GIVEN: exploración con clientName = 'Fertilizantes Mix', status = 'draft'
    const exploration = buildExploration({ clientName: 'Fertilizantes Mix', status: 'draft' })

    // WHEN: se renderiza ExplorationCard
    render(
      <ExplorationCard
        exploration={exploration}
        onClick={vi.fn()}
        onDelete={vi.fn()}
      />,
    )

    // THEN: aparece 'Fertilizantes Mix' en el DOM
    expect(screen.getByText('Fertilizantes Mix')).toBeTruthy()
  })

  it('muestra el estado "Borrador" para status = "draft"', () => {
    // GIVEN: exploración con status = 'draft'
    const exploration = buildExploration({ status: 'draft' })

    // WHEN: se renderiza
    render(
      <ExplorationCard
        exploration={exploration}
        onClick={vi.fn()}
        onDelete={vi.fn()}
      />,
    )

    // THEN: muestra la etiqueta "Borrador" del STATUS_LABELS
    expect(screen.getByText('Borrador')).toBeTruthy()
  })

  it('llama a onClick cuando se hace click en la tarjeta', async () => {
    // GIVEN: handler de click mockeado
    const handleClick = vi.fn()
    const exploration = buildExploration()

    // WHEN: se renderiza y se hace click
    render(
      <ExplorationCard
        exploration={exploration}
        onClick={handleClick}
        onDelete={vi.fn()}
      />,
    )

    await userEvent.click(screen.getByText('Fertilizantes Mix'))

    // THEN: el handler fue llamado
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('llama a onDelete con el id correcto al hacer click en eliminar', async () => {
    // GIVEN: handler de delete mockeado
    const handleDelete = vi.fn()
    const exploration = buildExploration({ id: 'exp-test-123' })

    // WHEN: se renderiza y se hace click en el botón de eliminar
    render(
      <ExplorationCard
        exploration={exploration}
        onClick={vi.fn()}
        onDelete={handleDelete}
      />,
    )

    const deleteButton = screen.getByRole('button', { name: /eliminar exploración/i })
    await userEvent.click(deleteButton)

    // THEN: onDelete fue llamado con el id correcto
    expect(handleDelete).toHaveBeenCalledWith('exp-test-123')
  })

  it('muestra el sector de la exploración', () => {
    // GIVEN: exploración con sector = 'Agroinsumos'
    const exploration = buildExploration({ sector: 'Agroinsumos' })

    // WHEN: se renderiza
    render(
      <ExplorationCard
        exploration={exploration}
        onClick={vi.fn()}
        onDelete={vi.fn()}
      />,
    )

    // THEN: el sector aparece en el DOM
    expect(screen.getByText('Agroinsumos')).toBeTruthy()
  })

  it('muestra badge de calidad cuando dataQuality está presente', () => {
    // GIVEN: exploración con dataQuality = 'high'
    const exploration = buildExploration({ dataQuality: 'high' })

    // WHEN: se renderiza
    render(
      <ExplorationCard
        exploration={exploration}
        onClick={vi.fn()}
        onDelete={vi.fn()}
      />,
    )

    // THEN: aparece el label de calidad alta
    expect(screen.getByText(/Calidad Alta/i)).toBeTruthy()
  })
})
