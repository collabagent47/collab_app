---
description: Reglas de frontend para este proyecto (React 19 + Vite + CSS Modules). Se aplica automáticamente a archivos frontend.
paths:
  - "frontend/**"
  - "client/**"
  - "web/**"
---

# Reglas de Frontend — React 19 + Vite + CSS Modules

## Stack aprobado

- **React 19** con **Vite**
- **CSS Modules** (estilos locales por componente — un `.module.css` por archivo)
- **React Router v6** (rutas de la SPA)
- **Firebase SDK** — autenticación cliente (`onAuthStateChanged`, `signInWithEmailAndPassword`)
- **Axios** — llamadas HTTP al backend

**Prohibido:** Tailwind CSS, Bootstrap, styled-components, CSS-in-JS, Redux, MobX, fetch directo en componentes.

## Arquitectura por Capas

```
services → hooks → components → pages → App.jsx (registrar ruta)
```

| Capa | Responsabilidad | Prohibido |
|------|----------------|-----------|
| `pages/` | Layout, composición de componentes, uso de hooks | Llamadas directas a API, lógica de negocio |
| `components/` | Render UI, recibir props, emitir eventos | Estado global, llamadas a API |
| `hooks/` | Estado local + llamadas a services | Render JSX, acceso directo a MongoDB/Firebase |
| `services/` | Llamadas HTTP (Axios) al backend | Estado, render, lógica de negocio |

## Convenciones Obligatorias

- **CSS**: SIEMPRE CSS Modules — NUNCA clases CSS globales
- **Auth state**: SIEMPRE consumir de `useAuth()` — nunca estado de auth paralelo
- **Variables de entorno**: SIEMPRE prefijo `VITE_` (ej. `VITE_API_URL`)
- **API calls**: van en `services/` via Axios, token siempre desde `useAuth()`
- **Rutas**: registrar en `src/App.jsx` con `<Route>` de React Router v6

## Llamadas a la API (patrón obligatorio)

```js
// services/featureService.js
import axios from 'axios';
const API_BASE = import.meta.env.VITE_API_URL;

export async function getFeatures(token) {
  const res = await axios.get(`${API_BASE}/api/v1/features`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
}
```

```js
// hooks — obtener token siempre de useAuth()
const { token } = useAuth();
```

## Nomenclatura de Archivos

| Artefacto | Convención | Ejemplo |
|-----------|-----------|---------|
| Page | `<Feature>Page.jsx` + `<Feature>Page.module.css` | `FaqPage.jsx` |
| Component | `<Component>.jsx` + `<Component>.module.css` | `FaqFormModal.jsx` |
| Hook | `use<Feature>.js` | `useFaq.js` |
| Service | `<feature>Service.js` | `faqService.js` |

- PascalCase para páginas y componentes (`.jsx`)
- camelCase con prefijo `use` para hooks
- camelCase para services
- Máximo 4 archivos nuevos por feature (page + component + hook + service)

## Estructura de Archivos de Referencia

```
frontend/src/
├── App.jsx
├── config/firebase.js        ← init Firebase (solo aquí)
├── hooks/useAuth.js          ← fuente única de verdad para auth
├── services/authService.js   ← Firebase signIn + POST backend
├── components/               ← componentes reutilizables
└── pages/                    ← FeaturePage.jsx + FeaturePage.module.css
```

## Anti-patrones Prohibidos

- Llamadas Axios directas en componentes o páginas (van en services via hooks)
- Estado de auth duplicado fuera de `useAuth()`
- Estilos globales / clases CSS fuera de CSS Modules
- Lógica de negocio en componentes (va en hooks)
- Hardcodear URLs de API (usar `VITE_API_URL`)

## Lineamientos completos

`.claude/docs/lineamientos/dev-guidelines.md` — Clean Code, SOLID, API REST, Seguridad, Observabilidad.

---

## Override de Stack — Tailwind CSS v4

> Aplica cuando la spec incluye la nota `✅ STACK APROBADO: Tailwind CSS` con override explícito del Tech Lead.
> En ese caso, las reglas de CSS Modules y Firebase de arriba NO aplican para ese proyecto.

### Clases canónicas Tailwind v4 (renombradas respecto a v3)

| v3 (obsoleta) | v4 (canónica) | Contexto |
|---------------|--------------|---------|
| `break-words` | `wrap-break-word` | texto largo en contenedores flex/grid |
| `bg-gradient-to-br` | `bg-linear-to-br` | gradientes direccionales |
| `shrink` | `shrink` | igual (no cambió) |
| `overflow-ellipsis` | `text-ellipsis` | truncado de texto |

El IDE puede mostrar warnings `suggestCanonicalClasses` — siempre usar la versión canónica.

### Reglas de Responsive Web Design (obligatorias con Tailwind v4)

#### 1. `min-w-0` en hijos flex/grid con texto

Todo contenedor flex o grid cuyo hijo contenga texto largo DEBE tener `min-w-0`:

```tsx
// Correcto
<div className="flex gap-3">
  <div className="min-w-0 flex-1">
    <p className="truncate">texto largo...</p>
  </div>
  <span className="shrink-0">badge</span>
</div>

// Incorrecto — el texto fuerza el ancho y rompe el layout
<div className="flex gap-3">
  <div className="flex-1">
    <p>texto largo...</p>
  </div>
</div>
```

#### 2. `shrink-0` en badges e iconos

Badges, iconos y etiquetas que no deben comprimirse llevan `shrink-0`:

```tsx
<span className="inline-flex shrink-0 items-center whitespace-nowrap rounded-full px-2.5 py-1 text-xs">
  Baja confianza
</span>
```

#### 3. Header de card — badge nunca sobre título

El patrón correcto para header de card con badge lateral:

```tsx
<div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
  <div className="min-w-0">
    <h3 className="wrap-break-word text-lg font-bold leading-tight">Título</h3>
    <p className="mt-0.5 text-xs">Subtítulo</p>
  </div>
  <span className="inline-flex shrink-0 self-start whitespace-nowrap rounded-full ...">
    Badge
  </span>
</div>
```

En mobile se apilan verticalmente; en sm+ quedan en fila con badge a la derecha.

#### 4. Alturas de workspace full-screen

En layouts de tres columnas dentro de un AppShell con padding:

```tsx
// Incorrecto — no descuenta el padding del AppShell
<div className="flex h-[calc(100dvh-64px)] overflow-hidden">

// Correcto — se adapta al contenedor padre disponible
<div className="flex h-full min-h-0 overflow-hidden">
```

Si el AppShell tiene `padding: 32` y topbar de 56px, la altura disponible es `dvh - 56px - 64px`. Usar `h-full` dentro del `<Outlet>` es más mantenible que hardcodear la resta.

#### 5. Sidebar responsive

La sidebar de navegación lateral DEBE ocultarse en mobile:

```tsx
// Siempre
<aside className="hidden lg:flex flex-col ...">
```

Y proveer navegación alternativa en mobile (tabs, pills, bottom-nav).

#### 6. Breakpoints estándar del proyecto

| Breakpoint | Ancho | Comportamiento esperado |
|------------|-------|------------------------|
| mobile | < 640px | 1 columna, botones full-width, nav en pills |
| sm | 640px | cards en 2 col si hay espacio |
| lg | 1024px | sidebar izquierda visible |
| xl | 1280px | panel derecho visible |

Grid de cards ROI:
```tsx
<div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
```

#### 7. Anti-patrones RWD prohibidos

- `position: absolute` para badges o etiquetas dentro de cards (causa superposición)
- Alturas fijas `h-48`, `h-64` en cards con contenido dinámico (corta el texto)
- `h-[calc(100dvh-Xpx)]` sin descontar el padding del AppShell padre
- Sidebar sin `hidden lg:flex` (ocupa espacio en mobile)
