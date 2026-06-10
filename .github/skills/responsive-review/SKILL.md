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
SEÑAL: <span> dentro de <div className="flex ..."> sin shrink-0
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
SEÑAL: <aside> con "flex" pero sin "hidden lg:flex"
RIESGO: sidebar visible en mobile consumiendo espacio
SEVERIDAD: Alta
```

#### AP-5: `position: absolute` para badges en cards
```
SEÑAL: absolute top-... right-... en child de card
RIESGO: superposición en pantallas pequeñas
SEVERIDAD: Media
```

#### AP-6: Alturas fijas en cards con contenido dinámico
```
SEÑAL: h-48, h-64 en div con texto variable
RIESGO: texto cortado
SEVERIDAD: Media
FIX: min-h-{N} o auto height
```

#### AP-7: `break-words` (Tailwind v3 obsoleta)
```
SEÑAL: className contiene "break-words"
FIX: reemplazar con wrap-break-word
SEVERIDAD: Baja
```

---

### Paso 3 — Aplicar fixes

**AP-1:** Agregar `shrink-0 self-start whitespace-nowrap` al badge.

**AP-2:** Agregar `min-w-0` al div con texto; agregar `wrap-break-word leading-tight` al h3.

**AP-3:** Cambiar `h-[calc(100dvh-Npx)]` → `h-full min-h-0 overflow-hidden`.

**AP-4:** Agregar `hidden` antes de `lg:flex` en el aside.

**AP-5:** Reestructurar a flex normal sin absolute.

**AP-6:** Cambiar `h-{N}` → `min-h-{N}`.

**AP-7:** Reemplazar `break-words` → `wrap-break-word`.

---

### Paso 4 — Generar reporte

Generar en `docs/output/responsive-review/<fecha>-<scope>-rwd-report.md`.

---

## Checklist de validación manual (QA visual)

```
[ ] 390px — No texto superpuesto
[ ] 390px — No scroll horizontal
[ ] 390px — Cards en 1 columna
[ ] 390px — Nav de pasos accesible
[ ] 768px — Layout tablet correcto
[ ] 1280px — Layout 3 columnas visible
[ ] Todos los badges no invaden títulos
[ ] No hay alturas fijas que corten contenido
```
