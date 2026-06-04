import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuthStore } from '../../../stores/authStore'
import { canAccessRoute } from '../../../domain/auth/permissions'
import { AccessDeniedPage } from '../../../pages/AccessDeniedPage'

interface Props {
  /** Si se provee, verifica este permiso específico además de la ruta */
  permission?: string
}

export function ProtectedRoute({ permission: _permission }: Props = {}) {
  const { currentUser, isAuthenticated } = useAuthStore()
  const location = useLocation()

  // Sin sesión → login
  if (!isAuthenticated || !currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // Verificar acceso a la ruta actual
  if (!canAccessRoute(currentUser, location.pathname)) {
    return <AccessDeniedPage />
  }

  return <Outlet />
}
