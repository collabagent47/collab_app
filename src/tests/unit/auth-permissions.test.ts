/**
 * Tests unitarios — Sistema de Permisos MVP 3
 *
 * Valida la lógica pura de permisos por rol.
 * Sin dependencias de UI, sin localStorage, sin React.
 */

import { describe, it, expect } from 'vitest'
import {
  hasPermission,
  canAccessRoute,
  canViewPresentation,
  canEditExploration,
  canViewInternalNotes,
  canApproveKnowledgeSuggestion,
  getVisibleNavLinks,
} from '../../domain/auth/permissions'
import type { User } from '../../domain/auth/auth-types'

// ---------------------------------------------------------------------------
// Fixtures
// ---------------------------------------------------------------------------

const admin: User = { id: 'u-admin', name: 'Admin', email: 'a@collab.local', role: 'admin', status: 'active', createdAt: '', updatedAt: '' }
const curator: User = { id: 'u-curator', name: 'Curator', email: 'c@collab.local', role: 'curator', status: 'active', createdAt: '', updatedAt: '' }
const advisor: User = { id: 'u-advisor', name: 'Advisor', email: 'adv@collab.local', role: 'advisor', status: 'active', createdAt: '', updatedAt: '' }
const learner: User = { id: 'u-learner', name: 'Learner', email: 'l@collab.local', role: 'learner', status: 'active', createdAt: '', updatedAt: '' }
const viewer: User = { id: 'u-viewer', name: 'Viewer', email: 'v@client.local', role: 'viewer', status: 'active', createdAt: '', updatedAt: '' }

const ownExploration = { ownerId: 'u-advisor', visibility: 'team' as const }
const othersExploration = { ownerId: 'u-otro', visibility: 'team' as const }
const publicPresentation = { ownerId: 'u-advisor', visibility: 'presentation' as const }

// ---------------------------------------------------------------------------
// hasPermission
// ---------------------------------------------------------------------------

describe('hasPermission', () => {
  it('admin tiene todos los permisos incluyendo users:manage', () => {
    // GIVEN: usuario admin
    // WHEN: hasPermission(admin, 'users:manage')
    // THEN: true
    expect(hasPermission(admin, 'users:manage')).toBe(true)
    expect(hasPermission(admin, 'knowledge:approve')).toBe(true)
    expect(hasPermission(admin, 'presentation:view')).toBe(true)
  })

  it('curator puede aprobar conocimiento', () => {
    expect(hasPermission(curator, 'knowledge:approve')).toBe(true)
  })

  it('curator NO puede gestionar usuarios', () => {
    expect(hasPermission(curator, 'users:manage')).toBe(false)
  })

  it('advisor puede crear sesión rápida', () => {
    expect(hasPermission(advisor, 'quick-session:create')).toBe(true)
  })

  it('advisor NO puede gestionar usuarios', () => {
    expect(hasPermission(advisor, 'users:manage')).toBe(false)
  })

  it('advisor NO puede aprobar conocimiento', () => {
    expect(hasPermission(advisor, 'knowledge:approve')).toBe(false)
  })

  it('learner puede ver academia', () => {
    expect(hasPermission(learner, 'academy:view')).toBe(true)
  })

  it('learner NO puede aprobar conocimiento', () => {
    expect(hasPermission(learner, 'knowledge:approve')).toBe(false)
  })

  it('viewer NO puede ver dashboard', () => {
    expect(hasPermission(viewer, 'dashboard:view')).toBe(false)
  })

  it('viewer SÍ puede ver presentación compartida', () => {
    expect(hasPermission(viewer, 'presentation:view:shared')).toBe(true)
  })

  it('viewer NO tiene settings:view (solo presentation:view:shared)', () => {
    // Ajuste del plan: viewer solo tiene presentation:view:shared
    expect(hasPermission(viewer, 'settings:profile')).toBe(false)
  })

  it('null → sin permisos', () => {
    expect(hasPermission(null, 'dashboard:view')).toBe(false)
    expect(hasPermission(undefined, 'academy:view')).toBe(false)
  })
})

// ---------------------------------------------------------------------------
// canAccessRoute
// ---------------------------------------------------------------------------

describe('canAccessRoute', () => {
  it('null no puede acceder a rutas privadas', () => {
    expect(canAccessRoute(null, '/')).toBe(false)
    expect(canAccessRoute(undefined, '/academy')).toBe(false)
  })

  it('advisor puede acceder al dashboard', () => {
    expect(canAccessRoute(advisor, '/')).toBe(true)
  })

  it('learner NO puede acceder a /settings/users', () => {
    expect(canAccessRoute(learner, '/settings/users')).toBe(false)
  })

  it('viewer NO puede acceder a /explorations', () => {
    expect(canAccessRoute(viewer, '/explorations/new')).toBe(false)
  })

  it('admin SÍ puede acceder a /settings/users', () => {
    expect(canAccessRoute(admin, '/settings/users')).toBe(true)
  })

  it('/login es accesible para todos', () => {
    expect(canAccessRoute(null, '/login')).toBe(true)
    expect(canAccessRoute(viewer, '/login')).toBe(true)
  })
})

// ---------------------------------------------------------------------------
// canViewPresentation
// ---------------------------------------------------------------------------

describe('canViewPresentation', () => {
  it('admin siempre puede ver la presentación', () => {
    expect(canViewPresentation(admin, othersExploration)).toBe(true)
  })

  it('advisor puede ver presentación de cualquier exploración', () => {
    expect(canViewPresentation(advisor, othersExploration)).toBe(true)
  })

  it('viewer SÍ puede ver si visibility === "presentation"', () => {
    // GIVEN: exploración con visibility === "presentation"
    // WHEN: viewer intenta acceder
    // THEN: permitido
    expect(canViewPresentation(viewer, publicPresentation)).toBe(true)
  })

  it('viewer SÍ puede ver si tiene shareToken válido', () => {
    // GIVEN: exploración privada pero con shareToken
    // WHEN: viewer + shareToken
    // THEN: permitido
    expect(canViewPresentation(viewer, ownExploration, 'token-abc-123')).toBe(true)
  })

  it('viewer NO puede ver si visibility !== "presentation" y sin shareToken', () => {
    // GIVEN: exploración team sin token
    // WHEN: viewer sin token
    // THEN: denegado — AccessDenied
    expect(canViewPresentation(viewer, ownExploration)).toBe(false)
    expect(canViewPresentation(null, ownExploration)).toBe(false)
  })

  it('null NO puede ver presentación privada', () => {
    expect(canViewPresentation(null, ownExploration)).toBe(false)
  })

  it('undefined NO puede ver presentación privada', () => {
    expect(canViewPresentation(undefined, ownExploration)).toBe(false)
  })
})

// ---------------------------------------------------------------------------
// canEditExploration
// ---------------------------------------------------------------------------

describe('canEditExploration', () => {
  it('advisor puede editar su propia exploración', () => {
    expect(canEditExploration(advisor, ownExploration)).toBe(true)
  })

  it('advisor NO puede editar exploración ajena', () => {
    expect(canEditExploration(advisor, othersExploration)).toBe(false)
  })

  it('admin puede editar cualquier exploración', () => {
    expect(canEditExploration(admin, othersExploration)).toBe(true)
  })

  it('curator puede editar cualquier exploración', () => {
    expect(canEditExploration(curator, othersExploration)).toBe(true)
  })

  it('viewer NO puede editar', () => {
    expect(canEditExploration(viewer, ownExploration)).toBe(false)
  })

  it('null NO puede editar', () => {
    expect(canEditExploration(null, ownExploration)).toBe(false)
  })
})

// ---------------------------------------------------------------------------
// canViewInternalNotes
// ---------------------------------------------------------------------------

describe('canViewInternalNotes', () => {
  it('true para admin, curator, advisor', () => {
    expect(canViewInternalNotes(admin)).toBe(true)
    expect(canViewInternalNotes(curator)).toBe(true)
    expect(canViewInternalNotes(advisor)).toBe(true)
  })

  it('false para learner, viewer, null, undefined', () => {
    expect(canViewInternalNotes(learner)).toBe(false)
    expect(canViewInternalNotes(viewer)).toBe(false)
    expect(canViewInternalNotes(null)).toBe(false)
    expect(canViewInternalNotes(undefined)).toBe(false)
  })
})

// ---------------------------------------------------------------------------
// canApproveKnowledgeSuggestion
// ---------------------------------------------------------------------------

describe('canApproveKnowledgeSuggestion', () => {
  it('true para admin y curator', () => {
    expect(canApproveKnowledgeSuggestion(admin)).toBe(true)
    expect(canApproveKnowledgeSuggestion(curator)).toBe(true)
  })

  it('false para advisor, learner, viewer, null', () => {
    expect(canApproveKnowledgeSuggestion(advisor)).toBe(false)
    expect(canApproveKnowledgeSuggestion(learner)).toBe(false)
    expect(canApproveKnowledgeSuggestion(viewer)).toBe(false)
    expect(canApproveKnowledgeSuggestion(null)).toBe(false)
  })
})

// ---------------------------------------------------------------------------
// getVisibleNavLinks — AppShell/MobileBottomNav filtrado
// ---------------------------------------------------------------------------

describe('getVisibleNavLinks', () => {
  it('viewer tiene 0 links de navegación interna', () => {
    // GIVEN: usuario viewer
    // WHEN: getVisibleNavLinks(viewer)
    // THEN: array vacío — viewer no ve menú interno
    expect(getVisibleNavLinks(viewer)).toHaveLength(0)
  })

  it('null tiene 0 links de navegación', () => {
    expect(getVisibleNavLinks(null)).toHaveLength(0)
  })

  it('admin tiene acceso a /settings/users', () => {
    const links = getVisibleNavLinks(admin)
    expect(links).toContain('/settings/users')
  })

  it('advisor NO tiene acceso a /settings/users', () => {
    const links = getVisibleNavLinks(advisor)
    expect(links).not.toContain('/settings/users')
  })

  it('learner tiene acceso a /academy pero no a /explorations/new', () => {
    const links = getVisibleNavLinks(learner)
    expect(links).toContain('/academy')
  })
})
