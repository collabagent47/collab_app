---
description: 'Ejecuta auditoría de seguridad OWASP Top 10 completa sobre el proyecto o feature indicado. Corre SAST, auditoría de dependencias, suite de tests de seguridad y revisión de configuración. Produce reporte consolidado con plan de remediación priorizado.'
agent: QA Agent
---

Ejecuta la auditoría de seguridad OWASP completa para el proyecto o feature indicado.

**Feature / Proyecto**: ${input:featureName:nombre del feature o proyecto en kebab-case}

**Instrucciones para @QA Agent:**

1. Lee la spec en `.github/specs/${input:featureName}.spec.md` (si existe)
2. Lee la matriz de riesgos en `docs/output/qa/${input:featureName}-risks.md` (si existe)
3. Detecta el stack del proyecto leyendo `.claude/rules/backend.md` y `.claude/rules/frontend.md`
4. Ejecuta `/owasp-scan` con el siguiente alcance:

   **Herramientas obligatorias:**
   - SAST estático (Bandit para Python / ESLint-security para JS/TS)
   - Auditoría de dependencias (pip-audit / npm audit / osv-scanner)
   - Revisión de archivos de configuración (.env, CORS, cookies, headers)

   **Si existe `tests/seguridad/test_owasp_top10.py`:**
   - Ejecutar la suite completa y reportar resultados test por test

5. Mapear cada hallazgo al control OWASP Top 10 correspondiente (A01–A10)
6. Clasificar por severidad: CRÍTICO / ALTO / MEDIO / BAJO / INFO
7. Si hay findings CRÍTICOS o ALTOS → reportarlos **antes** de continuar

**Output esperado:**
- `docs/output/security/${input:featureName}-owasp-report.md` — reporte consolidado
- Veredicto global: APROBADO / BLOQUEADO + lista de bloqueantes si aplica

**Prerequisito:** Si no existe spec ni código, ejecutar `/generate-spec` primero.
La auditoría se puede correr también sobre el proyecto completo (sin feature específico).

**Cuándo es obligatorio:**
La auditoría bloquea el release cuando la spec contiene auth, PII, pagos o APIs externas,
o cuando `/risk-identifier` detectó riesgos de seguridad de nivel ALTO.
