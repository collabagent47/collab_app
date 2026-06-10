# Migración Mock Auth → Supabase

## Estado actual (MVP 3)

La autenticación usa usuarios simulados en `mock-users.ts`. No hay contraseñas ni tokens reales.
El sistema está diseñado como **capa adaptadora**: el contrato de tipos no cambia al migrar.

---

## Archivos a reemplazar

| Archivo actual | Reemplazar con |
|---|---|
| `src/domain/auth/mock-users.ts` | Perfiles desde `supabase.auth.getUser()` |
| `src/domain/auth/auth-service.ts` | Llamadas al SDK de Supabase |
| `src/stores/authStore.ts` | Sesión de Supabase en lugar de localStorage manual |
| `src/pages/LoginPage/index.tsx` | Formulario email/password con `supabase.auth.signInWithPassword()` |

## Archivos que NO cambian

- `src/domain/auth/auth-types.ts` — tipos `User`, `UserRole`, `Permission` son independientes del proveedor
- `src/domain/auth/permissions.ts` — lógica pura, sin dependencia de Supabase
- `src/components/auth/ProtectedRoute/index.tsx` — consume `useAuthStore`, no Supabase directamente
- `src/components/auth/AccessGate/index.tsx` — ídem

---

## Plan de migración (paso a paso)

### Paso 1 — Instalar SDK

```bash
npm install @supabase/supabase-js
```

### Paso 2 — Variables de entorno

```bash
# .env.local
VITE_SUPABASE_URL=https://<project-ref>.supabase.co
VITE_SUPABASE_ANON_KEY=<anon-key>
```

```ts
// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js'
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
)
```

### Paso 3 — Reemplazar auth-service.ts

```ts
// src/domain/auth/auth-service.ts (post-Supabase)
import { supabase } from '../../lib/supabase'
import type { User } from './auth-types'

export async function supabaseLogin(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error || !data.user) return null
  // Mapear data.user + perfil de tabla 'profiles' → User de auth-types.ts
  return mapSupabaseUserToUser(data.user)
}

export async function getSessionUser(): Promise<User | null> {
  const { data } = await supabase.auth.getSession()
  if (!data.session?.user) return null
  return mapSupabaseUserToUser(data.session.user)
}

export async function supabaseLogout() {
  await supabase.auth.signOut()
}
```

### Paso 4 — Reemplazar authStore.ts

```ts
// src/stores/authStore.ts (post-Supabase)
import { create } from 'zustand'
import { supabase } from '../lib/supabase'
import type { User } from '../domain/auth/auth-types'

// El store escucha cambios de sesión de Supabase (onAuthStateChange)
// en lugar de leer localStorage manualmente.
```

### Paso 5 — Tabla `profiles` en Supabase

```sql
-- Supabase SQL Editor
create table profiles (
  id uuid references auth.users primary key,
  name text not null,
  role text not null check (role in ('admin','curator','advisor','learner','viewer')),
  status text not null default 'active',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Row Level Security
alter table profiles enable row level security;
create policy "users can read own profile"
  on profiles for select using (auth.uid() = id);
create policy "admins can read all profiles"
  on profiles for select using (
    exists (select 1 from profiles where id = auth.uid() and role = 'admin')
  );
```

### Paso 6 — Reemplazar LoginPage

- Cambiar selector de usuario demo por formulario `email` + `password`
- Remover el banner de "Modo demo"
- Llamar `supabaseLogin(email, password)` del nuevo auth-service

---

## Variables de entorno en Vercel

En el dashboard de Vercel → Settings → Environment Variables:

```
VITE_SUPABASE_URL        → https://<project>.supabase.co
VITE_SUPABASE_ANON_KEY   → <anon-key> (pública, segura para frontend)
```

`VITE_SUPABASE_SERVICE_ROLE_KEY` NUNCA en el frontend — solo en funciones edge.

---

## Advertencias de seguridad MVP 3

- Los usuarios mock son para demostración de permisos. **No almacenes información real de clientes.**
- El localStorage session key `collab_auth_session` no tiene expiración — al migrar a Supabase, la sesión tendrá JWT con TTL.
- `presentation.ts` → `toPresentationViewModel()` ya está preparado para recibir `User | null`. No requiere cambios al migrar.
