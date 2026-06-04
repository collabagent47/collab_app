import type { UserRole } from '../../../domain/auth/auth-types'

const LABELS: Record<UserRole, string> = {
  admin: 'Admin',
  curator: 'Curador',
  advisor: 'Asesor',
  learner: 'Aprendiz',
  viewer: 'Invitado',
}

const COLORS: Record<UserRole, string> = {
  admin: 'bg-red-100 text-red-700',
  curator: 'bg-violet-100 text-violet-700',
  advisor: 'bg-blue-100 text-blue-700',
  learner: 'bg-emerald-100 text-emerald-700',
  viewer: 'bg-slate-100 text-slate-600',
}

export function RoleBadge({ role }: { role: UserRole }) {
  return (
    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${COLORS[role]}`}>
      {LABELS[role]}
    </span>
  )
}
