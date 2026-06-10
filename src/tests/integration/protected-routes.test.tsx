/**
 * Tests de integración — Rutas Protegidas MVP 3
 *
 * Valida que ProtectedRoute redirige al login sin sesión,
 * permite acceso con rol correcto y muestra AccessDenied con rol incorrecto.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { ProtectedRoute } from '../../components/auth/ProtectedRoute'
import type { User } from '../../domain/auth/auth-types'

// Mock del authStore — control total por test
vi.mock('../../stores/authStore', () => ({
  useAuthStore: vi.fn(),
}))

// Sin animaciones en tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) =>
      <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

// SVG icons — jsdom no necesita el SVG real
vi.mock('lucide-react', () => ({
  ShieldX: () => <svg data-testid="icon-shield-x" />,
}))

import { useAuthStore } from '../../stores/authStore'

// ---------------------------------------------------------------------------
// Fixtures de usuarios
// ---------------------------------------------------------------------------

const userAdmin: User = {
  id: 'user-admin', name: 'Admin', email: 'admin@collab.local',
  role: 'admin', status: 'active', createdAt: '', updatedAt: '',
}
const userAdvisor: User = {
  id: 'user-advisor', name: 'Asesor', email: 'advisor@collab.local',
  role: 'advisor', status: 'active', createdAt: '', updatedAt: '',
}
const userLearner: User = {
  id: 'user-learner', name: 'Aprendiz', email: 'learner@collab.local',
  role: 'learner', status: 'active', createdAt: '', updatedAt: '',
}
const userViewer: User = {
  id: 'user-viewer', name: 'Invitado', email: 'viewer@client.local',
  role: 'viewer', status: 'active', createdAt: '', updatedAt: '',
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function mockStore(user: User | null) {
  vi.mocked(useAuthStore).mockReturnValue({
    currentUser: user,
    isAuthenticated: user !== null,
    login: vi.fn(),
    logout: vi.fn(),
    initFromStorage: vi.fn(),
  })
}

function renderProtected(initialPath: string) {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Routes>
        <Route path="/login" element={<div data-testid="login-page">Login</div>} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<div data-testid="dashboard-page">Dashboard</div>} />
          <Route path="/explorations/new" element={<div data-testid="explorations-page">Exploraciones</div>} />
          <Route path="/academy" element={<div data-testid="academy-page">Academia</div>} />
          <Route path="/settings/users" element={<div data-testid="users-page">Usuarios</div>} />
        </Route>
      </Routes>
    </MemoryRouter>,
  )
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('ProtectedRoute — control de acceso por rol', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('TC-PR-01: sin sesión → redirige a /login', () => {
    // GIVEN: usuario no autenticado
    mockStore(null)
    // WHEN: intenta acceder al dashboard
    renderProtected('/')
    // THEN: se renderiza la página de login
    expect(screen.getByTestId('login-page')).toBeDefined()
    expect(screen.queryByTestId('dashboard-page')).toBeNull()
  })

  it('TC-PR-02: advisor con sesión activa puede acceder al dashboard', () => {
    // GIVEN: usuario advisor autenticado
    mockStore(userAdvisor)
    // WHEN: navega al dashboard
    renderProtected('/')
    // THEN: se renderiza el dashboard sin redirección
    expect(screen.getByTestId('dashboard-page')).toBeDefined()
    expect(screen.queryByTestId('login-page')).toBeNull()
  })

  it('TC-PR-03: learner NO puede acceder a /settings/users — muestra Acceso denegado', () => {
    // GIVEN: usuario learner (sin users:manage)
    mockStore(userLearner)
    // WHEN: intenta acceder a gestión de usuarios
    renderProtected('/settings/users')
    // THEN: AccessDeniedPage — solo admin puede
    expect(screen.getByText('Acceso denegado')).toBeDefined()
    expect(screen.queryByTestId('users-page')).toBeNull()
  })

  it('TC-PR-04: viewer NO puede acceder a /explorations/new — muestra Acceso denegado', () => {
    // GIVEN: usuario viewer (solo presentation:view:shared)
    mockStore(userViewer)
    // WHEN: intenta acceder a explorations
    renderProtected('/explorations/new')
    // THEN: AccessDeniedPage — viewer no tiene explorations:view
    expect(screen.getByText('Acceso denegado')).toBeDefined()
    expect(screen.queryByTestId('explorations-page')).toBeNull()
  })

  it('TC-PR-05: admin puede acceder a /settings/users', () => {
    // GIVEN: usuario admin
    mockStore(userAdmin)
    // WHEN: navega a gestión de usuarios
    renderProtected('/settings/users')
    // THEN: se renderiza la página de usuarios sin restricción
    expect(screen.getByTestId('users-page')).toBeDefined()
    expect(screen.queryByText('Acceso denegado')).toBeNull()
  })
})
