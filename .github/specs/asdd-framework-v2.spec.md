---
id: SPEC-004
status: IMPLEMENTED
feature: asdd-framework-v2
created: 2026-06-09
updated: 2026-06-09
author: spec-generator
version: "1.0"
related-specs: []
---

# Spec: ASDD Framework v2 — Skills de ciclo de vida

## Qué se implementó

Tres skills nuevos + mejoras al skill `/feedback` para cerrar el ciclo de vida
del framework ASDD: crear proyectos → deployarlos → auditarlos → mejorarlos.

## Skills entregados

| Skill | Archivo | Propósito |
|-------|---------|-----------|
| `/deploy-setup` | `.claude/skills/deploy-setup/SKILL.md` | Configura CI/CD (GitHub Pages + Vercel + Netlify) en cualquier proyecto Vite |
| `/init-framework` | `.claude/skills/init-framework/SKILL.md` | Copia el framework ASDD completo a un proyecto nuevo |
| `/feedback` v2 | `.claude/skills/feedback/SKILL.md` | Auditoría en 3 fases: Evaluación → Validación → Ejecución |

## Artefactos adicionales

- `CLAUDE.md` — contexto permanente del proyecto para Claude Code
- `.env.example` — template de variables de entorno
- `SPEC-001 conversiones` → DEPRECATED
- `SPEC-003 collab-roi-cicd` → IMPLEMENTED (estaba en APPROVED)

## Ciclo de vida del framework

```
Proyecto nuevo
  → /init-framework   instala skills + rules + meta-prompts
  → /deploy-setup     configura CI/CD
  → /generate-spec    empieza el feature
  → /asdd-orchestrate orquesta Spec → Impl → Tests → QA → Deploy
  → /feedback         audita y mejora el framework
  → (siguiente proyecto)
```

## Criterios de aceptación cumplidos

- ✅ `/deploy-setup` genera 8 archivos y evita 8 anti-patrones documentados
- ✅ `/init-framework` copia 14 skills + 5 rules + 1 meta-prompt en una ejecución
- ✅ `/feedback` v2 tiene FASE 1 (scan), FASE 2 (validación con formato GAP-N), FASE 3 (plan ejecutable)
- ✅ `/feedback --modo=rapido` cubre correcciones urgentes sin overhead
- ✅ Ambos archivos `.claude/` y `.github/` sincronizados para cada skill
