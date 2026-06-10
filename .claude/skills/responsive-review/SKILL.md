---
name: responsive-review
description: Auditoría de Responsive Web Design para proyectos React + Tailwind CSS. Detecta y corrige textos superpuestos, badges que invaden títulos, alturas fijas que cortan contenido, sidebars sin breakpoints y scroll horizontal. Genera reporte de hallazgos con fixes aplicados.
argument-hint: "[componente | página | --scope=all]"
---

# Skill: responsive-review [RWD AUDIT]

Auditoría sistemática de Responsive Web Design para componentes React/Tailwind.
Detecta los 7 anti-patrones más frecuentes y aplica los fixes directamente.

---

## Cuándo ejecutar

- Antes de un deploy a producción cuando hay nuevos componentes con cards, badges o layouts de 3 columnas
- Después de recibir reportes de "texto superpuesto" o "layout roto en mobile"
- Como parte de la Fase 6 del orquestador ASDD (checklist RWD post-deploy)
- Al agregar nuevas pantallas que usen flex/grid con contenido dinámico

---

## Proceso

```
1. Escanear componentes en scope
2. Detectar anti-patrones RWD
3. Priorizar por severidad
4. Aplicar fixes
5. Generar reporte
```

---

### Paso 1 — Determinar scope

Si se pasa un componente/página específica: auditar solo ese archivo.
Si `--scope=all`: auditar `src/components/**/*.tsx`, `src/pages/**/*.tsx`.

### Paso 2 — Detectar anti-patrones

Para cada archivo en scope, buscar:

#### AP-1: Badge/span sin `shrink-0` dentro de flex
```
SEÑAL: <span className="..."> dentro de <div className="flex ...">
SIN: shrink-0 en el span
RIESGO: badge se comprime o cae encima del título
SEVERIDAD: Alta
```

#### AP-2: Contenedor flex/grid con texto largo sin `min-w-0`
```
SEÑAL: hijo de flex/grid con h3/p/span pero sin min-w-0
RIESGO: texto fuerza el ancho del contenedor rompiendo el layout
SEVERIDAD: Alta
```

#### AP-3: `h-[calc(100dvh-Npx)]` que no descuenta padding del padre
```
SEÑAL: h-[calc(100dvh-64px)] o similar en componente dentro de AppShell con padding
RIESGO: layout más alto que el espacio disponible; scroll inesperado
SEVERIDAD: Alta
FIX: cambiar a h-full min-h-0 overflow-hidden
```

#### AP-4: Sidebar o nav lateral sin `hidden lg:flex`
```
SEÑAL: <aside> o nav lateral con className que incluye "flex" pero no "hidden lg:flex"
RIESGO: sidebar visible en mobile consumiendo espacio
SEVERIDAD: Alta
```

#### AP-5: `position: absolute` para badges o etiquetas en cards
```
SEÑAL: absolute top-... right-... en child de card
RIESGO: badge fuera del flujo normal puede superponerse con otros elementos en pantallas pequeñas
SEVERIDAD: Media
```

#### AP-6: Alturas fijas en cards con contenido dinámico
```
SEÑAL: h-48, h-64, h-72 en div que contiene texto variable
RIESGO: texto cortado en pantallas pequeñas o con fuentes grandes
SEVERIDAD: Media
FIX: min-h-{N} o auto height con padding consistente
```

#### AP-7: `break-words` (Tailwind v3 obsoleta) en lugar de `wrap-break-word`
```
SEÑAL: className contiene "break-words"
RIESGO: IDE warning; clase puede no aplicarse en Tailwind v4
SEVERIDAD: Baja
FIX: reemplazar con wrap-break-word
```

---

### Paso 3 — Priorizar

| Severidad | Criterio | Acción |
|-----------|---------|--------|
| Alta | Causa texto superpuesto o layout roto visible | Aplicar fix inmediato |
| Media | Puede causar problema en tamaños extremos | Aplicar si hay tiempo |
| Baja | Warning de IDE / mejora preventiva | Aplicar con el resto |

---

### Paso 4 — Aplicar fixes

Para cada hallazgo Alta/Media:

**AP-1 fix:**
```tsx
// Antes
<span className="text-xs font-medium text-amber-600">Baja confianza</span>

// Después
<span className="inline-flex shrink-0 items-center self-start whitespace-nowrap rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-600">
  Baja confianza
</span>
```

**AP-2 fix:**
```tsx
// Antes
<div className="flex items-start justify-between">
  <div>
    <h3>Título</h3>
  </div>
  ...
</div>

// Después
<div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
  <div className="min-w-0">
    <h3 className="wrap-break-word leading-tight">Título</h3>
  </div>
  ...
</div>
```

**AP-3 fix:**
```tsx
// Antes
<div className="flex h-[calc(100dvh-64px)] overflow-hidden">

// Después
<div className="flex h-full min-h-0 overflow-hidden">
```

**AP-4 fix:**
```tsx
// Antes
<aside className="flex flex-col w-56 ...">

// Después
<aside className="hidden lg:flex flex-col w-56 ...">
// + agregar nav móvil alternativa (pills, bottom-nav o tabs)
```

---

### Paso 5 — Generar reporte

Generar reporte en `docs/output/responsive-review/<fecha>-<scope>-rwd-report.md`:

```markdown
# Reporte RWD — [scope] · [fecha]

## Hallazgos

| ID | Archivo | Línea | Anti-patrón | Severidad | Estado |
|----|---------|-------|-------------|-----------|--------|
| F-01 | ROIScenarioCard/index.tsx | 62 | AP-1: badge sin shrink-0 | Alta | ✅ Corregido |
| F-02 | ExplorationWorkspacePage/index.tsx | 102 | AP-3: h-calc incorrecto | Alta | ✅ Corregido |

## Checklist de validación post-fix

- [ ] No hay texto superpuesto en viewport 390px
- [ ] No hay scroll horizontal en viewport 390px, 768px, 1280px
- [ ] Ningún badge invade el título de su card
- [ ] Sidebars ocultas en mobile
- [ ] Cards ROI apilan en 1 columna en mobile
```

---

## Checklist de validación manual (QA visual)

```
[ ] 390px — No texto superpuesto
[ ] 390px — No scroll horizontal
[ ] 390px — Cards en 1 columna
[ ] 390px — Nav de pasos accesible (pills o bottom nav)
[ ] 768px — Cards en 1-2 columnas
[ ] 1280px — Layout 3 columnas visible
[ ] 1440px — Panel derecho visible, sin apretujamiento
[ ] Todos los badges tienen padding y no invaden títulos
[ ] No hay alturas fijas que corten contenido dinámico
```

---

## Reglas del skill

- Solo modificar archivos de componentes y páginas — no tocar dominio ni tests
- Aplicar únicamente fixes con evidencia de anti-patrón detectado — no refactorizar preventivamente
- Cuando se agrega nav móvil alternativa, verificar que los pasos/acciones sean accesibles
- El reporte es acumulativo por proyecto: crear nuevo archivo por fecha, no sobreescribir
