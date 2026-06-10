import type { ReactNode } from 'react'
import { usePermissions } from '../../../hooks/usePermissions'
import type { Permission } from '../../../domain/auth/auth-types'

interface Props {
  permission: Permission
  children: ReactNode
  fallback?: ReactNode
}

export function AccessGate({ permission, children, fallback = null }: Props) {
  const { hasPermission } = usePermissions()
  return hasPermission(permission) ? <>{children}</> : <>{fallback}</>
}
