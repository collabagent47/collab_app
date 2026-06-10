/**
 * Tipos del dominio de autenticación y autorización — Collab ROI Explorer
 *
 * MVP 3: Auth mock/local con persistencia en localStorage.
 * NO hay contraseñas reales, NO hay tokens reales, NO hay Supabase.
 * Ver SUPABASE-MIGRATION.md para la guía de migración futura.
 */

// ---------------------------------------------------------------------------
// Roles
// ---------------------------------------------------------------------------

export type UserRole = 'admin' | 'curator' | 'advisor' | 'learner' | 'viewer'

export type UserStatus = 'active' | 'inactive'

// ---------------------------------------------------------------------------
// Usuario
// ---------------------------------------------------------------------------

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatarUrl?: string
  status: UserStatus
  createdAt: string
  updatedAt: string
}

// ---------------------------------------------------------------------------
// Sesión (solo datos no sensibles — sin tokens reales)
// ---------------------------------------------------------------------------

export interface AuthSession {
  userId: string
  role: UserRole
  loginAt: string
  /** Sin accessToken real en MVP mock. Preparado para Supabase. */
  accessToken?: never
  expiresAt?: never
}

// ---------------------------------------------------------------------------
// Permisos
// ---------------------------------------------------------------------------

export type Permission =
  | 'dashboard:view'
  | 'explorations:view'
  | 'explorations:create'
  | 'explorations:edit:any'
  | 'explorations:edit:own'
  | 'quick-session:create'
  | 'academy:view'
  | 'knowledge:view'
  | 'knowledge:suggest'
  | 'knowledge:approve'
  | 'presentation:view'
  | 'presentation:view:shared'
  | 'users:manage'
  | 'settings:profile'

// ---------------------------------------------------------------------------
// Regla de acceso a rutas
// ---------------------------------------------------------------------------

export interface RouteAccessRule {
  path: string
  allowedRoles: UserRole[]
}
