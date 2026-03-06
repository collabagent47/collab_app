---
applyTo: "frontend/src/**/*.{js,jsx}"
---

> **Scope**: Se aplica a proyectos con capa frontend. Si el proyecto es backend-only, este archivo no tiene efecto. Si el frontend usa otro framework (Vue, Angular, Svelte, etc.), adaptar las convenciones de componentes, rutas y estado al stack real.

# Instrucciones para Archivos de Frontend (React/Vite)

## Convenciones Obligatorias

- **CSS**: SIEMPRE usar CSS Modules (`*.module.css`) — NUNCA clases CSS globales ni frameworks como Tailwind/Bootstrap.
- **Nombres**: PascalCase para componentes y páginas (`.jsx`), camelCase para hooks (`.js`) y servicios (`.js`).
- **Auth state**: SIEMPRE consumir de `useAuth` — nunca crear estado de autenticación paralelo.
- **Env vars**: SIEMPRE con prefijo `VITE_` para que Vite las exponga.

## Estructura de Archivos

```
src/
  config/firebase.js      ← init Firebase (solo aquí)
  hooks/useAuth.js        ← fuente única de verdad para auth
  services/authService.js ← Firebase signIn + POST backend
  components/ProtectedRoute.jsx
  pages/                  ← PageName.jsx + PageName.module.css
```

## Llamadas a la API Backend

```js
// Siempre usar VITE_API_URL del .env
const res = await fetch(`${import.meta.env.VITE_API_URL}/endpoint`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data),
});
```

Para endpoints protegidos, incluir el token de Firebase:
```js
const idToken = await user.getIdToken();
headers['Authorization'] = `Bearer ${idToken}`;
```

## Rutas (React Router v6)

Las rutas se registran en `src/App.jsx`:
```jsx
<Route path="/nueva-ruta" element={<ProtectedRoute><NuevaPagina /></ProtectedRoute>} />
```

## Componentes

- Un componente por archivo.
- Props tipadas con JSDoc si son complejas.
- No lógica de negocio en los componentes — delegar a hooks o servicios.
