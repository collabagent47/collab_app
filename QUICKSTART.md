# QUICKSTART — Arrancar un proyecto a partir de un prompt

Esta guía describe el flujo **"todo nace de un prompt"**: refinas la HU en un LLM
externo (p. ej. ChatGPT), generas un **Prompt de Desarrollo** alineado a la
orquestación ASDD, y dejas que el framework lo lleve al 100%.

> ¿Buscas la guía detallada de agentes/skills/rules? Ver [`.claude/README.md`](.claude/README.md).
> Esta es solo la ruta de arranque rápido.

---

## La cadena de dos cerebros

```
HU + insumos
   │
   ▼  GPT  +  .claude/meta-prompts/gpt-dev-prompt-factory.md
Prompt de Desarrollo  (alineado 1:1 a las fases ASDD)
   │
   ▼  se guarda en  .github/requirements/<feature>.md
Claude Code + ASDD   /generate-spec → aprobar → /asdd-orchestrate
   │
   ▼
Feature al 100% (BE ∥ FE ∥ DB → Tests → QA)
```

**Cerebro 1 (GPT):** refina y estructura el requerimiento.
**Cerebro 2 (Claude Code + ASDD):** ejecuta con agentes especializados y gates de calidad.

---

## Requisitos previos (una sola vez por proyecto)

1. Copia el framework a tu proyecto:
   ```bash
   cp -r .claude/ /tu-proyecto/.claude/
   ```
2. Abre el proyecto con Claude Code CLI autenticado.
3. (Recomendado) Crea un `CLAUDE.md` en la raíz con: stack, comandos
   (`install` / `dev` / `test` / `build`) y diccionario de dominio.

> Las `rules/` del framework son agnósticas de stack. Los detalles de TU stack van
> en `CLAUDE.md` y/o en las rules del proyecto, no en el framework.

---

## Los 4 pasos

### Paso 1 — Refinar la HU en GPT
Abre [`.claude/meta-prompts/gpt-dev-prompt-factory.md`](.claude/meta-prompts/gpt-dev-prompt-factory.md),
cópialo completo en GPT y reemplaza el bloque:

```
=== INICIO HU + INSUMOS ===
{{PEGA AQUÍ TU HU REFINADA Y TODOS LOS INSUMOS}}
=== FIN HU + INSUMOS ===
```

GPT devuelve un **Prompt de Desarrollo** con: objetivo + Definition of Done medible,
preguntas abiertas/asunciones, reglas de negocio literales, diseño técnico
(reuse-first), plan por fases, requisitos no funcionales, estrategia de pruebas,
riesgos/fallback y gaps.

### Paso 2 — Aterrizar el prompt en el proyecto
Guarda la salida de GPT como requerimiento de entrada:

```
.github/requirements/<nombre-feature-en-kebab-case>.md
```

> Revisa primero la sección **GAPS / PENDIENTES**: si hay preguntas bloqueantes,
> resuélvelas antes de continuar. El sistema no inventa lo que falta.

### Paso 3 — Generar y aprobar la spec
```
/generate-spec <nombre-feature>
```
Esto produce `.github/specs/<feature>.spec.md` en estado `DRAFT`. Revísala y, si está
correcta, cambia el frontmatter a `status: APPROVED`.

> **Regla de oro:** ningún agente escribe código si la spec no está `APPROVED`.

### Paso 4 — Orquestar la implementación
```
/asdd-orchestrate <nombre-feature>
```
El orquestador ejecuta: **Backend ∥ Frontend ∥ DB → Tests BE ∥ Tests FE → QA**, y
reporta el estado al terminar.

---

## Verificación de "100%"

El Prompt de Desarrollo trae un **Definition of Done medible**. Úsalo como checklist
de cierre: cada criterio de aceptación debe tener su evidencia (prueba, query,
captura o log). Si algo no se puede evidenciar, no está hecho.

---

## Resumen en un vistazo

| Paso | Dónde | Comando / acción |
|------|-------|------------------|
| 1. Refinar | GPT | pegar `gpt-dev-prompt-factory.md` + HU |
| 2. Aterrizar | proyecto | guardar en `.github/requirements/<feature>.md` |
| 3. Spec | Claude Code | `/generate-spec <feature>` → aprobar (`APPROVED`) |
| 4. Orquestar | Claude Code | `/asdd-orchestrate <feature>` |
