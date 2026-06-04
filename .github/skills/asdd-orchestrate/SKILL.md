---
name: asdd-orchestrate
description: Orquesta el flujo ASDD completo. Fase 1 (Spec) → Fase 2 (Backend ∥ Frontend) → Fase 3 (Tests ∥) → Fase 4 (QA).
argument-hint: "<nombre-feature> | status"
---

# ASDD Orchestrate

## Flujo

```
[FASE 1 — SECUENCIAL]
  spec-generator → .github/specs/<feature>.spec.md  (DRAFT → APPROVED)

[FASE 2 — PARALELO ∥]
  backend-developer  ∥  frontend-developer  ∥  database-agent (si hay modelos nuevos)

[FASE 3 — PARALELO ∥]
  test-engineer-backend  ∥  test-engineer-frontend

[FASE 4 — SECUENCIAL]
  qa-agent → /gherkin-case-generator, /risk-identifier

[FASE 5 — CONDICIONAL]
  /owasp-scan → docs/output/security/<feature>-owasp-report.md
  Condición: spec contiene auth, PII, pagos, APIs externas o risk-matrix tiene riesgo ALTO de seguridad
```

## Proceso
1. Busca `.github/specs/<feature>.spec.md`
   - No existe → ejecuta `/generate-spec` y espera
   - `DRAFT` → pide aprobación al usuario
   - `APPROVED` → actualiza a `IN_PROGRESS` y continúa
2. Lanza Fase 2 en paralelo (Task backend + Task frontend + Task database si aplica)
3. Cuando Fase 2 completa → lanza Fase 3 en paralelo (Task tests-be + Task tests-fe)
4. Cuando Fase 3 completa → lanza Fase 4 (qa-agent)
5. Si la condición de seguridad se cumple → lanza Fase 5 (`/owasp-scan`)
   - Si hay findings CRÍTICOS o ALTOS → detener y notificar al usuario antes de marcar IMPLEMENTED
6. Actualiza spec a `IMPLEMENTED` y reporta estado final

## Comando status
Al recibir `status`: lista specs en `.github/specs/` con su estado y próxima acción pendiente.

## Reglas
- Sin spec `APPROVED` → no hay código — sin excepciones
- No implementar directamente — solo coordinar y delegar
- Si una fase falla → detener el flujo y notificar al usuario con contexto
- Fase 5 (doc) solo si el usuario la solicita explícitamente
