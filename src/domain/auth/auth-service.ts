/**
 * Servicio de autenticación — MVP 3 Mock.
 *
 * Adapter layer: es el único punto de acoplamiento con el proveedor de auth.
 * Para migrar a Supabase, solo se reemplaza el body de estas funciones.
 * Consumers (authStore, hooks) no cambian.
 *
 * NO almacena contraseñas. NO genera tokens reales.
 * Ver SUPABASE-MIGRATION.md para el plan de migración.
 */

import { MOCK_USERS, getMockUserById } from './mock-users'
import type { User, AuthSession } from './auth-types'

/** Simula login seleccionando un usuario mock por ID. Sin contraseña. */
export function mockLogin(userId: string): { user: User; session: AuthSession } | null {
  const user = getMockUserById(userId)
  if (!user || user.status !== 'active') return null

  const session: AuthSession = {
    userId: user.id,
    role: user.role,
    loginAt: new Date().toISOString(),
  }

  return { user, session }
}

/** Recupera el usuario actual desde una sesión guardada. */
export function getUserFromSession(session: AuthSession | null): User | null {
  if (!session) return null
  return getMockUserById(session.userId) ?? null
}

/** Lista de usuarios disponibles para el selector de login mock. */
export function getAvailableUsers(): User[] {
  return MOCK_USERS.filter((u) => u.status === 'active')
}
