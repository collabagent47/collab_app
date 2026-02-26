---
description: 'Quick: Genera o actualiza el pipeline de CI/CD del proyecto rápidamente.'
mode: 'agent'
---

Genera o actualiza el pipeline de CI/CD para este proyecto.

**Instrucciones para @automation-agent (modo rápido):**

1. Detectar la plataforma CI/CD del proyecto (GitHub Actions, GitLab CI, Jenkins)
2. Detectar el stack tecnológico
3. Activar `pipeline-config-generator` inmediatamente
4. Generar el pipeline con todos los stages obligatorios:
   - validate (lint, format, type-check)
   - test (unit + integration + coverage threshold)
   - security (dependency scan)
   - build (artefacto versionado)
   - deploy-dev (automático en main)
   - deploy-staging (manual)
   - deploy-production (manual)
5. Documentar los secrets necesarios a configurar

**Si ya existe un pipeline:** Analizar qué stages faltan y agregarlos.
**Scope:** Solo el archivo de pipeline, no toda la automatización del proyecto.
