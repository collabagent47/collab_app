import { NavLink } from 'react-router-dom'
import { Home, Compass, GraduationCap, Database } from 'lucide-react'
import { useAuthStore } from '../../../stores/authStore'
import { hasPermission } from '../../../domain/auth/permissions'
import type { Permission } from '../../../domain/auth/auth-types'

const NAV_ITEMS = [
  { to: '/', label: 'Inicio', icon: Home, end: true, permission: 'dashboard:view' as Permission },
  { to: '/explorations/new', label: 'Explorar', icon: Compass, end: false, permission: 'explorations:view' as Permission },
  { to: '/academy', label: 'Academia', icon: GraduationCap, end: false, permission: 'academy:view' as Permission },
  { to: '/knowledge-base', label: 'Base', icon: Database, end: false, permission: 'knowledge:view' as Permission },
]

export function MobileBottomNav() {
  const currentUser = useAuthStore((s) => s.currentUser)

  const visibleItems = NAV_ITEMS.filter((item) => hasPermission(currentUser, item.permission))

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#E4E4E7] bg-white pb-[env(safe-area-inset-bottom)] lg:hidden">
      <div className="flex items-center justify-around px-2 py-1">
        {visibleItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className="flex flex-col items-center gap-0.5 px-3 py-2"
          >
            {({ isActive }) => (
              <>
                <Icon
                  className="h-5 w-5"
                  style={{ color: isActive ? '#10B981' : '#71717A' }}
                />
                <span
                  className="text-[10px] font-medium"
                  style={{ color: isActive ? '#10B981' : '#71717A' }}
                >
                  {label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
