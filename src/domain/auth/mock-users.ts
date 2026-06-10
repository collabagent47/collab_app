/**
 * Usuarios mock para MVP 3 — Auth simulado.
 * Estos usuarios son de demostración. En producción se reemplazarán
 * por perfiles reales de Supabase.
 */

import type { User } from './auth-types'

const NOW = '2026-06-04T00:00:00.000Z'

export const MOCK_USERS: User[] = [
  {
    id: 'user-admin',
    name: 'Admin Collab',
    email: 'admin@collab.local',
    role: 'admin',
    status: 'active',
    createdAt: NOW,
    updatedAt: NOW,
  },
  {
    id: 'user-curator',
    name: 'Curador Collab',
    email: 'curator@collab.local',
    role: 'curator',
    status: 'active',
    createdAt: NOW,
    updatedAt: NOW,
  },
  {
    id: 'user-advisor',
    name: 'Asesor Collab',
    email: 'advisor@collab.local',
    role: 'advisor',
    status: 'active',
    createdAt: NOW,
    updatedAt: NOW,
  },
  {
    id: 'user-learner',
    name: 'Aprendiz Collab',
    email: 'learner@collab.local',
    role: 'learner',
    status: 'active',
    createdAt: NOW,
    updatedAt: NOW,
  },
  {
    id: 'user-viewer',
    name: 'Cliente Invitado',
    email: 'viewer@client.local',
    role: 'viewer',
    status: 'active',
    createdAt: NOW,
    updatedAt: NOW,
  },
]

export function getMockUserById(id: string): User | undefined {
  return MOCK_USERS.find((u) => u.id === id)
}
