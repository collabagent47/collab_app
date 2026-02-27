---
description: 'Skill especializada en generación de release notes y CHANGELOG. Analiza los commits desde el último tag, clasifica cambios por tipo y genera la documentación de release siguiendo Keep a Changelog.'
---

# Skill: release-notes-generator [AUTOMATION]

## Responsabilidad
Generar release notes y actualizar CHANGELOG.md basándose en los
commits desde el último tag, siguiendo el estándar Keep a Changelog
y Semantic Versioning.

---

## Proceso de Generación

```
PASO 1 → Determinar el último tag de versión en git
PASO 2 → Obtener todos los commits desde ese tag
PASO 3 → Clasificar commits por tipo (feat, fix, docs, BREAKING CHANGE...)
PASO 4 → Determinar el tipo de bump de versión (MAJOR/MINOR/PATCH)
PASO 5 → Generar la nueva entrada en CHANGELOG.md
PASO 6 → Generar el cuerpo de las release notes de GitHub
```

---

## Reglas de Clasificación de Commits

Basado en Conventional Commits:

```
feat:           → [Added]     — nueva funcionalidad para el usuario
fix:            → [Fixed]     — corrección de bug para el usuario
docs:           → [Changed]   — cambios en documentación
style:          → [Changed]   — formato, sin cambio de lógica
refactor:       → [Changed]   — refactoring sin nueva feature ni fix
perf:           → [Changed]   — mejora de performance
test:           → [Changed]   — agregar o refactorizar tests
build:          → [Changed]   — cambios en build system o dependencias externas
ci:             → [Changed]   — cambios en archivos CI/CD
BREAKING CHANGE → [Removed o Changed con ⚠️ BREAKING]
```

---

## Reglas de Semantic Versioning

```
MAJOR (X.0.0) → Cualquier BREAKING CHANGE
                 Incompatibilidad con versión anterior
                 Cambio de contrato de API

MINOR (0.X.0) → feat: nueva funcionalidad backward-compatible
                 feat: nueva funcionalidad opcional

PATCH (0.0.X) → fix: corrección de bug backward-compatible
                 docs: solo cambios en documentación
                 perf: mejoras de performance sin cambio de contrato
```

---

## Template de CHANGELOG.md (Keep a Changelog)

Genera o actualiza con este formato exacto:

```markdown
# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [X.Y.Z] - YYYY-MM-DD

### ⚠️ BREAKING CHANGES
- [descripción del breaking change con instrucciones de migración]

### Added
- [descripción de nueva funcionalidad — en lenguaje de negocio, no técnico]
- [otra nueva funcionalidad]

### Changed
- [descripción de cambio en funcionalidad existente]
- [mejora de performance en el endpoint X]

### Deprecated
- [funcionalidad que será removida en próxima versión mayor]

### Fixed
- [descripción del bug corregido — qué pasaba y qué hace ahora]
- [otro bug corregido]

### Security
- [parche de seguridad aplicado — sin detallar el vector de ataque]

### Removed
- [funcionalidad eliminada con instrucciones de migración si aplica]

---

## [X.Y.Z-1] - YYYY-MM-DD
[versión anterior...]
```

---

## Template de GitHub Release Notes

Para el cuerpo de la release en GitHub:

```markdown
## 🚀 [Nombre del Proyecto] v[X.Y.Z]

### ✨ Novedades
> [resumen ejecutivo de las features más importantes en 2-3 líneas]

### 🆕 Nuevas Funcionalidades
- **[Nombre de la feature]**: [descripción en lenguaje de negocio]
- **[Otra feature]**: [descripción]

### 🐛 Bugs Corregidos
- [Descripción del bug corregido]
- [Otro bug corregido]

### ⚡ Mejoras
- [Mejora de performance / UX / developer experience]

### ⚠️ Cambios que Requieren Atención
- [Si hay breaking changes con instrucciones de migración]
- Si no hay: *No hay cambios que requieran migración*

### 📦 Dependencias Actualizadas
- [Solo si hay actualizaciones relevantes de seguridad]

---
**Full Changelog**: [link al diff en GitHub]
**Issues resueltos**: [links a issues cerrados si aplica]
```

---

## Comandos de Git para Obtener los Commits

```bash
# Obtener el último tag
git describe --tags --abbrev=0

# Obtener commits desde el último tag
git log [ultimo-tag]..HEAD --pretty=format:"%H|%s|%an|%ad" --date=short

# Filtrar por tipo
git log [ultimo-tag]..HEAD --pretty=format:"%s" | grep "^feat:"
git log [ultimo-tag]..HEAD --pretty=format:"%s" | grep "^fix:"
git log [ultimo-tag]..HEAD --pretty=format:"%s" | grep "BREAKING CHANGE"
```

## Reporte

```
📝 RELEASE-NOTES-GENERATOR [AUTOMATION] — REPORTE
════════════════════════════════════════════════════
Commits analizados:              X
Versión anterior:                [X.Y.Z]
Versión nueva:                   [X.Y.Z]  (tipo: MAJOR/MINOR/PATCH)

Cambios clasificados:
  ✨ Features (Added):           X
  🐛 Fixes (Fixed):              X
  🔄 Changes (Changed):         X
  ⚠️  Breaking Changes:          X
  🗑️  Removed:                   X
  🔒 Security:                   X

Archivos actualizados:
  CHANGELOG.md   ✅
  GitHub Release Notes (cuerpo) ✅
════════════════════════════════════════════════════
```
