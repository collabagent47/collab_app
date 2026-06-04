import { MOCK_USERS } from '../../domain/auth/mock-users'
import { RoleBadge } from '../../components/auth/RoleBadge'

export function UsersPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-1 text-2xl font-bold text-[#0F172A]">Usuarios</h1>
      <p className="mb-6 text-sm text-[#71717A]">Modo demo — usuarios simulados.</p>
      <div className="flex flex-col gap-3">
        {MOCK_USERS.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between rounded-xl border border-[#E4E4E7] bg-white p-4"
          >
            <div>
              <p className="font-semibold text-[#0F172A]">{user.name}</p>
              <p className="text-xs text-[#71717A]">{user.email}</p>
            </div>
            <RoleBadge role={user.role} />
          </div>
        ))}
      </div>
    </div>
  )
}
