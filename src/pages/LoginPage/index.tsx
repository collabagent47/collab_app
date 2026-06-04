import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Zap } from 'lucide-react'
import { useAuthStore } from '../../stores/authStore'
import { getAvailableUsers } from '../../domain/auth/auth-service'
import type { User } from '../../domain/auth/auth-types'

const ROLE_LABELS: Record<string, string> = {
  admin: 'Admin',
  curator: 'Curador',
  advisor: 'Asesor',
  learner: 'Aprendiz',
  viewer: 'Invitado',
}

const ROLE_COLORS: Record<string, string> = {
  admin: 'bg-red-100 text-red-700',
  curator: 'bg-violet-100 text-violet-700',
  advisor: 'bg-blue-100 text-blue-700',
  learner: 'bg-emerald-100 text-emerald-700',
  viewer: 'bg-slate-100 text-slate-600',
}

export function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const login = useAuthStore((s) => s.login)
  const [loading, setLoading] = useState<string | null>(null)

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname ?? '/'
  const users = getAvailableUsers()

  const handleSelect = (user: User) => {
    setLoading(user.id)
    const ok = login(user.id)
    if (ok) {
      navigate(user.role === 'viewer' ? '/explorations/guest' : from, { replace: true })
    }
    setLoading(null)
  }

  return (
    <div
      className="flex min-h-dvh flex-col items-center justify-center px-4 py-12"
      style={{ background: 'var(--color-bg)' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="mb-8 flex items-center justify-center gap-2">
          <Zap className="h-6 w-6" style={{ color: 'var(--color-green)' }} />
          <span className="text-xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
            Collab ROI Explorer
          </span>
        </div>

        <div className="rounded-2xl border border-[#E4E4E7] bg-white p-8 shadow-sm">
          <h1 className="mb-1 text-lg font-bold text-[#0F172A]">
            Selecciona un usuario para continuar
          </h1>
          <p className="mb-6 text-sm text-[#71717A]">
            Elige el rol con el que quieres explorar la app.
          </p>

          <div className="flex flex-col gap-3">
            {users.map((user) => (
              <button
                key={user.id}
                onClick={() => handleSelect(user)}
                disabled={loading === user.id}
                className="flex items-center justify-between rounded-xl border border-[#E4E4E7] px-4 py-3.5 text-left transition-all duration-150 hover:border-[#10B981] hover:bg-emerald-50 disabled:opacity-60"
              >
                <div>
                  <p className="font-semibold text-[#0F172A]">{user.name}</p>
                  <p className="text-xs text-[#71717A]">{user.email}</p>
                </div>
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold ${ROLE_COLORS[user.role]}`}
                >
                  {ROLE_LABELS[user.role]}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Banner de modo demo */}
        <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
          <p className="text-xs text-amber-700">
            <strong>Modo demo:</strong> estos usuarios son simulados para validar permisos. En
            producción se conectará autenticación real (Supabase). No almacenes información sensible
            real de clientes en esta versión.
          </p>
        </div>
      </motion.div>
    </div>
  )
}
