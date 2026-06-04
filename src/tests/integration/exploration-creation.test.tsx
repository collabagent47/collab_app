/**
 * Test de integración — flujo de creación de exploración desde plantilla Agroinsumos
 *
 * Valida que al crear una exploración usando la plantilla Agroinsumos:
 *   - la exploración tiene frictionIds no vacíos
 *   - la exploración tiene recommendedModules no vacíos
 *   - la exploración tiene insumos precargados
 *   - el status es 'draft'
 *
 * localStorage se mockea con vi.stubGlobal para aislar el storage.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { explorationService } from '../../services/explorationService'
import {
  AGROINSUMOS_TEMPLATE,
  AGROINSUMOS_FRICTIONS,
  AGROINSUMOS_MODULES,
  AGROINSUMOS_INSUMOS_BASE,
  AGROINSUMOS_BASE_OPERATION,
} from '../../data/templates/agroinsumos.template'
import type { Exploration } from '../../domain/roi/roi-types'

// ---------------------------------------------------------------------------
// Mock de localStorage
// ---------------------------------------------------------------------------

function buildLocalStorageMock() {
  const store: Record<string, string> = {}
  return {
    getItem: vi.fn((key: string) => store[key] ?? null),
    setItem: vi.fn((key: string, value: string) => { store[key] = value }),
    removeItem: vi.fn((key: string) => { delete store[key] }),
    clear: vi.fn(() => { Object.keys(store).forEach((k) => delete store[k]) }),
    key: vi.fn((index: number) => Object.keys(store)[index] ?? null),
    get length() { return Object.keys(store).length },
  }
}

// ---------------------------------------------------------------------------
// Helper para construir una exploración desde la plantilla Agroinsumos
// ---------------------------------------------------------------------------

function createExplorationFromTemplate(): Omit<Exploration, 'id' | 'createdAt' | 'updatedAt'> {
  return {
    clientName: 'Fertilizantes Mix',
    sector: AGROINSUMOS_TEMPLATE.sector,
    status: 'draft',
    sessionPreparations: [],
    operation: { ...AGROINSUMOS_BASE_OPERATION },
    insumos: [...AGROINSUMOS_INSUMOS_BASE],
    frictionIds: AGROINSUMOS_FRICTIONS.map((f) => f.id),
    recommendedModules: AGROINSUMOS_MODULES.map((m) => ({ ...m })),
    roiInputs: {},
  }
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('flujo de creación de exploración desde plantilla Agroinsumos', () => {
  let localStorageMock: ReturnType<typeof buildLocalStorageMock>

  beforeEach(() => {
    localStorageMock = buildLocalStorageMock()
    vi.stubGlobal('localStorage', localStorageMock)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.clearAllMocks()
  })

  it('la exploración creada tiene status "draft"', () => {
    // GIVEN: store de exploraciones vacío (localStorage limpio)
    const partial = createExplorationFromTemplate()

    // WHEN: se crea la exploración desde la plantilla
    const created = explorationService.create(partial)

    // THEN: el status es 'draft'
    expect(created.status).toBe('draft')
  })

  it('la exploración tiene frictionIds no vacíos', () => {
    // GIVEN: plantilla Agroinsumos con 10 fricciones
    const partial = createExplorationFromTemplate()

    // WHEN: se crea la exploración
    const created = explorationService.create(partial)

    // THEN: frictionIds no está vacío
    expect(created.frictionIds).toBeDefined()
    expect(created.frictionIds.length).toBeGreaterThan(0)
  })

  it('la exploración tiene los frictionIds de la plantilla Agroinsumos', () => {
    // GIVEN: plantilla Agroinsumos
    const partial = createExplorationFromTemplate()
    const expectedFrictionIds = AGROINSUMOS_FRICTIONS.map((f) => f.id)

    // WHEN: se crea la exploración
    const created = explorationService.create(partial)

    // THEN: contiene exactamente los frictionIds de la plantilla
    expect(created.frictionIds).toEqual(expectedFrictionIds)
  })

  it('la exploración tiene recommendedModules no vacíos', () => {
    // GIVEN: plantilla Agroinsumos con 8 módulos
    const partial = createExplorationFromTemplate()

    // WHEN: se crea la exploración
    const created = explorationService.create(partial)

    // THEN: recommendedModules no está vacío
    expect(created.recommendedModules).toBeDefined()
    expect(created.recommendedModules.length).toBeGreaterThan(0)
  })

  it('la exploración tiene insumos precargados de la plantilla', () => {
    // GIVEN: plantilla Agroinsumos con 6 insumos base
    const partial = createExplorationFromTemplate()

    // WHEN: se crea la exploración
    const created = explorationService.create(partial)

    // THEN: los insumos están precargados
    expect(created.insumos).toBeDefined()
    expect(created.insumos.length).toBeGreaterThan(0)
    expect(created.insumos.length).toBe(AGROINSUMOS_INSUMOS_BASE.length)
  })

  it('los insumos de la exploración tienen los campos requeridos', () => {
    // GIVEN: plantilla Agroinsumos
    const partial = createExplorationFromTemplate()

    // WHEN: se crea la exploración
    const created = explorationService.create(partial)

    // THEN: cada insumo tiene id, name y confidence
    created.insumos.forEach((insumo) => {
      expect(insumo.id).toBeTruthy()
      expect(insumo.name).toBeTruthy()
      expect(insumo.confidence).toBeTruthy()
    })
  })

  it('la exploración recibe un id generado automáticamente', () => {
    // GIVEN: plantilla Agroinsumos (sin id en el partial)
    const partial = createExplorationFromTemplate()

    // WHEN: se crea la exploración
    const created = explorationService.create(partial)

    // THEN: el id es una cadena no vacía (uuid)
    expect(created.id).toBeTruthy()
    expect(typeof created.id).toBe('string')
    expect(created.id.length).toBeGreaterThan(0)
  })

  it('la exploración persiste en localStorage', () => {
    // GIVEN: localStorage vacío
    const partial = createExplorationFromTemplate()

    // WHEN: se crea la exploración
    explorationService.create(partial)

    // THEN: localStorage.setItem fue llamado
    expect(localStorageMock.setItem).toHaveBeenCalled()
  })

  it('la exploración tiene la operación base de Agroinsumos', () => {
    // GIVEN: plantilla Agroinsumos con datos de operación base
    const partial = createExplorationFromTemplate()

    // WHEN: se crea la exploración
    const created = explorationService.create(partial)

    // THEN: la operación tiene conversaciones mensuales típicas del sector
    expect(created.operation.monthlyConversationsLikely).toBe(270)
    expect(created.operation.minutesPerConversation).toBe(8)
  })

  it('la exploración creada se puede recuperar por id', () => {
    // GIVEN: exploración creada desde la plantilla
    const partial = createExplorationFromTemplate()
    const created = explorationService.create(partial)

    // WHEN: se busca por id
    const found = explorationService.getById(created.id)

    // THEN: la exploración existe y tiene el mismo id
    expect(found).not.toBeNull()
    expect(found?.id).toBe(created.id)
    expect(found?.clientName).toBe('Fertilizantes Mix')
  })

  it('la exploración tiene sector "Agroinsumos"', () => {
    // GIVEN: plantilla Agroinsumos
    const partial = createExplorationFromTemplate()

    // WHEN: se crea
    const created = explorationService.create(partial)

    // THEN: el sector corresponde
    expect(created.sector).toBe('Agroinsumos')
  })
})
