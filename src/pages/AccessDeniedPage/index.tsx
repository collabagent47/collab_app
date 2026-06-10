import { useNavigate } from 'react-router-dom'
import { ShieldX } from 'lucide-react'

export function AccessDeniedPage() {
  const navigate = useNavigate()
  return (
    <div className="flex h-dvh flex-col items-center justify-center text-center p-6">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50">
        <ShieldX className="h-8 w-8 text-red-500" />
      </div>
      <h1 className="mb-2 text-xl font-bold text-[#0F172A]">Acceso denegado</h1>
      <p className="mb-6 max-w-sm text-sm text-[#71717A]">
        No tienes permisos para acceder a esta sección.
      </p>
      <button
        onClick={() => navigate(-1)}
        className="rounded-xl border border-[#E4E4E7] px-5 py-2.5 text-sm font-medium text-[#0F172A] hover:bg-slate-50"
      >
        Volver
      </button>
    </div>
  )
}
