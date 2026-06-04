/**
 * Sistema de permisos — Collab ROI Explorer MVP 3
 *
 * Mapa declarativo de permisos por rol.
 * Toda la lógica de acceso pasa por este módulo — sin lógica dispersa en componentes.
 */

import type { User, UserRole, Permission, RouteAccessRule } from './auth-types'
import type { Exploration } from '../roi/roi-types'

// ---------------------------------------------------------------------------
// Mapa declarativo: rol → permisos
// ---------------------------------------------------------------------------

const ALL_PERMISSIONS: Permission[] = [
  'dashboard:view',
  'explorations:view',
  'explorations:create',
  'explorations:edit:any',
  'explorations:edit:own',
  'quick-session:create',
  'academy:view',
  'knowledge:view',
  'knowledge:suggest',
  'knowledge:approve',
  'presentation:view',
  'presentation:view:shared',
  'users:manage',
  'settings:profile',
]

const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  admin: ALL_PERMISSIONS,

  curator: [
    'dashboard:view',
    'explorations:view',
    'explorations:edit:any',
    'quick-session:create',
    'academy:view',
    'knowledge:view',
    'knowledge:suggest',
    'knowledge:approve',
    'presentation:view',
    'settings:profile',
  ],

  advisor: [
    'dashboard:view',
    'explorations:view',
    'explorations:create',
    'explorations:edit:own',
    'quick-session:create',
    'academy:view',
    'knowledge:view',
    'knowledge:suggest',
    'presentation:view',
    'settings:profile',
  ],

  learner: [
    'academy:view',
    'quick-session:create',
    'knowledge:view',
    'knowledge:suggest',
    'settings:profile',
  ],

  // viewer: solo presentación compartida. Sin settings (ajuste del plan aprobado).
  viewer: [
    'presentation:view:shared',
  ],
}

// ---------------------------------------------------------------------------
// Mapa de rutas → permiso requerido
// ---------------------------------------------------------------------------

const ROUTE_ACCESS: RouteAccessRule[] = [
  { path: '/', allowedRoles: ['admin', 'curator', 'advisor', 'learner'] },
  { path: '/explorations/new', allowedRoles: ['admin', 'curator', 'advisor', 'learner'] },
  { path: '/session/quick', allowedRoles: ['admin', 'curator', 'advisor', 'learner'] },
  { path: '/academy', allowedRoles: ['admin', 'curator', 'advisor', 'learner'] },
  { path: '/knowledge-base', allowedRoles: ['admin', 'curator', 'advisor', 'learner'] },
  { path: '/knowledge-base/review', allowedRoles: ['admin', 'curator'] },
  { path: '/settings/users', allowedRoles: ['admin'] },
  { path: '/settings/profile', allowedRoles: ['admin', 'curator', 'advisor', 'learner', 'viewer'] },
  // /explorations/:id/present — tiene lógica propia (visibility + shareToken), ver canViewPresentation()
]

// ---------------------------------------------------------------------------
// Funciones públicas
// ---------------------------------------------------------------------------

/** Verifica si el usuario tiene un permiso específico. */
export function hasPermission(user: User | null | undefined, permission: Permission): boolean {
  if (!user) return false
  return ROLE_PERMISSIONS[user.role]?.includes(permission) ?? false
}

/**
 * Verifica si el usuario puede acceder a una ruta.
 * Usa el rol efectivo — null/undefined = viewer restringido.
 */
export function canAccessRoute(user: User | null | undefined, pathname: string): boolean {
  // Rutas públicas accesibles SIEMPRE — antes del check de usuario
  if (pathname === '/login') return true

  if (!user) return false

  // Presentación: tiene su propia lógica en canViewPresentation()
  if (pathname.includes('/present')) return false // evaluado separadamente

  const rule = ROUTE_ACCESS.find((r) => pathname === r.path || pathname.startsWith(r.path + '/'))
  if (!rule) return false
  return rule.allowedRoles.includes(user.role)
}

/**
 * Verifica si el usuario puede ver el modo presentación de una exploración.
 * Viewer solo puede si visibility === "presentation" O hay shareToken válido.
 */
export function canViewPresentation(
  user: User | null | undefined,
  exploration: Pick<Exploration, 'visibility' | 'ownerId'>,
  shareToken?: string,
): boolean {
  // Admin/curator/advisor siempre pueden
  if (user && ['admin', 'curator', 'advisor'].includes(user.role)) return true

  // Viewer o sin usuario: requiere visibility === "presentation" o shareToken válido
  const isPublicPresentation = exploration.visibility === 'presentation'
  const hasValidToken = typeof shareToken === 'string' && shareToken.length > 0
  return isPublicPresentation || hasValidToken
}

/**
 * Verifica si el usuario puede editar una exploración.
 * Admin/curator pueden editar cualquiera; advisor solo las propias.
 */
export function canEditExploration(
  user: User | null | undefined,
  exploration: Pick<Exploration, 'ownerId'>,
): boolean {
  if (!user) return false
  if (user.role === 'admin' || user.role === 'curator') return true
  if (user.role === 'advisor') return exploration.ownerId === user.id
  return false
}

/**
 * Verifica si el usuario puede ver notas internas.
 * Solo admin, curator y advisor.
 */
export function canViewInternalNotes(user: User | null | undefined): boolean {
  if (!user) return false
  return ['admin', 'curator', 'advisor'].includes(user.role)
}

/**
 * Verifica si el usuario puede aprobar sugerencias de base de conocimiento.
 * Solo admin y curator.
 */
export function canApproveKnowledgeSuggestion(user: User | null | undefined): boolean {
  if (!user) return false
  return ['admin', 'curator'].includes(user.role)
}

/** Retorna los permisos del rol del usuario. */
export function getPermissions(user: User | null | undefined): Permission[] {
  if (!user) return []
  return ROLE_PERMISSIONS[user.role] ?? []
}

/** Links de navegación visibles según rol. */
export function getVisibleNavLinks(user: User | null | undefined): string[] {
  if (!user || user.role === 'viewer') return []
  return ROUTE_ACCESS
    .filter((r) => r.allowedRoles.includes(user.role))
    .map((r) => r.path)
}
