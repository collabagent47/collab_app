---
name: asdd-orchestrate
description: Orquesta el flujo ASDD completo. Fase 1 (Spec) → Fase 2 (Backend ∥ Frontend) → Fase 3 (Tests ∥) → Fase 4 (QA).
argument-hint: "<nombre-feature> | status"
---

# ASDD Orchestrate

## Flujo

```
[FASE 1 — SECUENCIAL]
  spec-generator → .github/specs/<feature>.spec.md  (DRAFT → APPROVED por el usuario)

[FASE 2 — PARALELO ∥]
  backend-developer  ∥  frontend-developer  ∥  database-agent (si hay modelos nuevos)

[FASE 3 — PARALELO ∥]
  test-engineer-backend  ∥  test-engineer-frontend

[FASE 4 — SECUENCIAL]
  qa-agent → /gherkin-case-generator, /risk-identifier

[FASE 5 — CONDICIONAL]
  /owasp-scan → docs/output/security/<feature>-owasp-report.md
  Condición: spec contiene auth / PII / pagos / APIs externas  ─OR─  risk-matrix tiene nivel ALTO de seguridad

[FASE 6 — CONDICIONAL]
  deploy-validator → CI/CD pipeline + primera URL verificada
  Condición: spec incluye "CI/CD requerido desde MVP" O plataforma de deploy definida en sección Entorno
  Acciones:
    - Verificar / crear vercel.json o .github/workflows/deploy-*.yml
    - Confirmar que lint + typecheck + test + build pasan en el pipeline
    - Verificar que la URL de producción carga sin errores de consola
    - Ejecutar checklist RWD mínimo: viewport 390px, 768px, 1280px sin scroll horizontal
```

## Proceso
1. Busca `.github/specs/<feature>.spec.md`
   - No existe → ejecuta `/generate-spec` y espera
   - `DRAFT` → presenta spec al usuario y pide aprobación
   - `APPROVED` → actualiza a `IN_PROGRESS` y continúa
2. Lanza Fase 2 en paralelo (backend + frontend + database si aplica)
3. Cuando Fase 2 completa → lanza Fase 3 en paralelo (tests-be + tests-fe)
4. Cuando Fase 3 completa → lanza Fase 4 (qa-agent)
5. Evalúa condición de seguridad → si se cumple, lanza Fase 5 (`/owasp-scan`)
   - Si hay findings CRÍTICOS o ALTOS → detener flujo y notificar al usuario antes de marcar IMPLEMENTED
6. Si hay plataforma de deploy definida → lanza Fase 6 (deploy-validator)
   - Verificar pipeline CI/CD + URL + checklist RWD
7. Actualiza spec a `IMPLEMENTED` y reporta estado final al usuario

## Comando status
Al recibir `status`: lista specs en `.github/specs/` con su estado actual y próxima acción.

## Reglas
- Sin spec `APPROVED` → no hay código — sin excepciones
- No implementar directamente — solo coordinar y delegar
- Si una fase falla → detener el flujo y notificar al usuario con contexto
- Fase 5 (doc) solo si el usuario la solicita explícitamente
