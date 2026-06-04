import { useAuthStore } from '../stores/authStore'
import {
  hasPermission,
  canAccessRoute,
  canViewPresentation,
  canEditExploration,
  canViewInternalNotes,
  canApproveKnowledgeSuggestion,
} from '../domain/auth/permissions'
import type { Permission } from '../domain/auth/auth-types'
import type { Exploration } from '../domain/roi/roi-types'

export function usePermissions() {
  const currentUser = useAuthStore((s) => s.currentUser)

  return {
    hasPermission: (p: Permission) => hasPermission(currentUser, p),
    canAccessRoute: (path: string) => canAccessRoute(currentUser, path),
    canViewPresentation: (exp: Pick<Exploration, 'visibility' | 'ownerId'>, token?: string) =>
      canViewPresentation(currentUser, exp, token),
    canEditExploration: (exp: Pick<Exploration, 'ownerId'>) =>
      canEditExploration(currentUser, exp),
    canViewInternalNotes: () => canViewInternalNotes(currentUser),
    canApproveKnowledgeSuggestion: () => canApproveKnowledgeSuggestion(currentUser),
  }
}
