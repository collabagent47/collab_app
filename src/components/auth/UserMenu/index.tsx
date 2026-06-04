import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogOut, ChevronDown } from 'lucide-react'
import { useAuthStore } from '../../../stores/authStore'
import { RoleBadge } from '../RoleBadge'

export function UserMenu() {
  const { currentUser, logout } = useAuthStore()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  if (!currentUser) return null

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
    setOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-slate-100"
        style={{ color: 'var(--color-text-primary)' }}
      >
        <span className="font-medium">{currentUser.name}</span>
        <RoleBadge role={currentUser.role} />
        <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 w-48 rounded-xl border border-[#E4E4E7] bg-white py-1 shadow-md">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50"
          >
            <LogOut className="h-4 w-4" />
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  )
}
