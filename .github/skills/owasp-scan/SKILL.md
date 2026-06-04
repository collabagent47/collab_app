---
name: owasp-scan
description: Auditoría de seguridad OWASP Top 10 completa. Corre SAST estático (Bandit / ESLint-security), suite de 15 controles test_owasp_top10.py, auditoría de dependencias (pip-audit / npm audit / OSV) y revisión de configuración. Produce reporte consolidado con findings priorizados y plan de remediación. Compatible con proyectos Python, Node.js y mixtos.
argument-hint: "[nombre-feature | nombre-proyecto] [--nivel=basico|completo]"
---

# Skill: owasp-scan [SECURITY]

Auditoría de seguridad OWASP Top 10 ejecutable como Fase 5 del flujo ASDD o de forma
autónoma antes de cualquier deploy o liberación.

---

## Cuándo ejecutar

| Condición | Obligatorio |
|-----------|-------------|
| Auth / sesiones / JWT | ✅ Sí — bloquea release |
| Datos personales (PII / GDPR) | ✅ Sí — bloquea release |
| Pagos o transacciones financieras | ✅ Sí — bloquea release |
| APIs externas o endpoints públicos | ✅ Sí — bloquea release |
| Credenciales, tokens, secretos | ✅ Sí — bloquea release |
| `/risk-identifier` detectó riesgo ALTO | ✅ Sí — bloquea release |
| Deploy / liberación de cualquier feature | ✅ Sí — rutina CI |
| Dependencias actualizadas | ✅ Sí — verificación inmediata |
| Features internas sin datos sensibles | ⬜ Recomendado |

---

## Proceso paso a paso

```
1. Leer spec (.github/specs/<feature>.spec.md) y risk-matrix (docs/output/qa/)
2. Detectar stack → ejecutar herramientas SAST correspondientes
3. Ejecutar auditoría de dependencias
4. Ejecutar suite de tests OWASP si existe en el proyecto
5. Revisar archivos de configuración (variables de entorno, CORS, cookies)
6. Mapear cada hallazgo al control OWASP Top 10 correspondiente
7. Clasificar por severidad: CRÍTICO / ALTO / MEDIO / BAJO / INFO
8. Si hay CRÍTICO o ALTO → notificar al usuario antes de continuar
9. Generar reporte consolidado en docs/output/security/
10. Generar plan de remediación priorizado
```

---

## Herramientas por stack

### Stack Python (FastAPI / Django / Flask)

```powershell
# SAST estático — patrones inseguros en código fuente
$py = "python"   # ajustar al intérprete del proyecto
& $py -m bandit -r src/ -ll -f json -o docs/output/security/bandit-report.json

# Dependencias con CVEs conocidos
& $py -m pip_audit --format json -o docs/output/security/pip-audit.json

# Suite OWASP Top 10 si existe en el proyecto
& $py -m pytest tests/seguridad/test_owasp_top10.py -v --tb=short
```

**Patrones Bandit que activan findings:**

| Bandit ID | OWASP | Descripción |
|-----------|-------|-------------|
| B102 | A03 | `exec()` con input de usuario |
| B105/B106 | A07 | Passwords hardcodeados |
| B301/B302 | A08 | `pickle.loads()` inseguro |
| B303/B324 | A02 | Weak crypto (md5/sha1 en passwords) |
| B310 | A10 | SSRF potencial en URL fetch |
| B411 | A03 | XML XXE en xmlrpc |
| B608 | A03 | SQL concatenado con string |
| B604 | A03 | Shell injection |

### Stack Node.js / TypeScript (React / Next.js / Express)

```bash
# SAST con ESLint security plugin
npx eslint src/ --plugin security --rule 'security/detect-non-literal-fs-filename: error' \
  --format json > docs/output/security/eslint-security.json

# Dependencias
npm audit --json > docs/output/security/npm-audit.json

# OSV (Open Source Vulnerabilities — base de datos Google)
npx osv-scanner --format json . > docs/output/security/osv-report.json
```

### Proyecto mixto (Python backend + JS/TS frontend)

Ejecutar ambos bloques. El reporte final consolida todos los hallazgos en un solo archivo.

---

## Controles OWASP Top 10 (2021) — cobertura completa

| # | Control | Herramienta | Tests de referencia |
|---|---------|-------------|---------------------|
| A01 | Broken Access Control | Pytest suite | `test_a01_endpoints_protegidos_requieren_login` `test_a01_viewer_no_puede_crear` `test_a01_rutas_web_redirigen_a_login` |
| A02 | Cryptographic Failures | Bandit B303/B324 | Verificar hashing de passwords (bcrypt/argon2) |
| A03 | Injection (SQL, XSS, Cmd) | Bandit B102/B608 + ESLint | `test_a03_path_traversal_rechazado` `test_a03_csv_injection_mitigada` |
| A04 | Insecure Design | Revisión spec + config | `test_a04_upload_tipo_archivo_valido` `test_a04_archivo_grande_rechazado` |
| A05 | Security Misconfiguration | Config review + pytest | `test_a05_cookie_httponly` `test_a05_session_cookie_samesite` `test_open_redirect_proteccion_en_login` |
| A06 | Vulnerable Components | pip-audit / npm audit / OSV | 0 CVEs activos en deps directas |
| A07 | Auth & Session Failures | Pytest suite | `test_a07_password_hasheado` `test_a07_login_no_revela_user` `test_a07_login_fallido_loggeado` |
| A08 | Software Integrity | Revisión API response | `test_a08_password_hash_no_expuesto_en_api` |
| A09 | Logging & Monitoring | Pytest suite | `test_a09_login_exitoso_loggeado` |
| A10 | SSRF | Bandit B310 + revisión | Verificar URLs en fetch/request |

---

## Archivos de configuración a revisar

```
.env / .env.production         → sin secretos en texto plano
CORS config                    → origins específicos, no wildcard (*)
Cookie settings                → HttpOnly, SameSite, Secure en producción
CSP headers                    → Content-Security-Policy definido
Rate limiting                  → endpoints de auth tienen límite
Upload limits                  → tamaño y tipo de archivo validados
Error responses                → no exponen stack traces en producción
```

---

## Clasificación de severidad

| Nivel | Criterio | Acción en pipeline |
|-------|----------|--------------------|
| **CRÍTICO** | RCE, inyección activa, credenciales expuestas en código, bypass de auth completo | Bloquea merge y deploy — corregir ahora |
| **ALTO** | XSS persistente, IDOR, datos sensibles sin cifrar, CSRF sin mitigación | Bloquea release — corregir en este sprint |
| **MEDIO** | Config insegura, logging insuficiente, dep con CVE de score < 7 | Resolver en siguiente sprint |
| **BAJO** | Dep desactualizada sin CVE activo, info leak menor, mejora de hardening | Backlog de seguridad |
| **INFO** | Buenas prácticas recomendadas, ASVS Level 2+ | Opcional |

---

## Entregable: `docs/output/security/<feature>-owasp-report.md`

```markdown
# Reporte de Seguridad OWASP — [Proyecto/Feature]
**Fecha:** YYYY-MM-DD
**Herramientas:** Bandit X.X / pip-audit X.X / pytest X.X / [npm audit / osv-scanner]
**Perfil:** [intranet corporativa | API pública | SPA frontend]
**Bloqueante para release:** [Sí — N findings CRÍTICO/ALTO | No]

---

## Resumen ejecutivo
| Severidad | Cantidad | Estado |
|-----------|----------|--------|
| CRÍTICO   | 0        | ✅ |
| ALTO      | 0        | ✅ |
| MEDIO     | 1        | ⚠️ |
| BAJO      | 2        | ℹ️ |
| INFO      | 3        | ℹ️ |

---

## Findings detallados

### CRÍTICO — Bloquea release
_(ninguno)_

### ALTO — Bloquea release
_(ninguno)_

### MEDIO — Resolver próximo sprint
| ID | OWASP | Archivo:Línea | Descripción | Remediación |
|----|-------|---------------|-------------|-------------|
| SEC-M-001 | A05 | config/settings.py:12 | CORS wildcard en producción | Definir origins explícitos |

---

## Estado OWASP Top 10
| Control | Estado | Evidencia |
|---------|--------|-----------|
| A01 Broken Access Control | ✅ PASS | 3/3 tests |
| A02 Cryptographic Failures | ✅ PASS | Bandit: 0 issues |
| A03 Injection | ✅ PASS | Bandit: 0 issues, 2/2 tests |
| A04 Insecure Design | ✅ PASS | 2/2 tests |
| A05 Security Misconfiguration | ⚠️ MEDIO | SEC-M-001 |
| A06 Vulnerable Components | ✅ PASS | pip-audit: 0 CVEs activos |
| A07 Auth Failures | ✅ PASS | 3/3 tests |
| A08 Software Integrity | ✅ PASS | 1/1 tests |
| A09 Logging Failures | ✅ PASS | 1/1 tests |
| A10 SSRF | ✅ N/A | Sin outbound requests (intranet) |

---

## Bandit (SAST)
- LoC escaneadas: N
- Issues High: 0 | Medium: 0 | Low: 1
- Veredicto: PASS ✅

## Suite tests/seguridad
- Tests ejecutados: 15 | PASS: 15 | FAIL: 0
- Veredicto: PASS ✅

## Auditoría de dependencias
- Deps auditadas: N | CVEs activos: 0
- Veredicto: PASS ✅

---

## Plan de remediación
| ID | Descripción | Responsable | Sprint |
|----|-------------|-------------|--------|
| SEC-M-001 | CORS wildcard → origins explícitos | [dev] | Sprint N+1 |

---

## Veredicto global
**[APROBADO / BLOQUEADO] PARA [INTRANET / PRODUCCIÓN]**
Riesgos residuales documentados: [lista o "ninguno"]
```

---

## Restricciones

- Solo leer código y ejecutar herramientas — nunca modificar código sin instrucción explícita del usuario
- Si hay findings CRÍTICOS o ALTOS → detener y notificar al usuario antes de continuar el flujo ASDD
- No ejecutar herramientas contra entornos de producción — solo código fuente local
- Si no existe suite `tests/seguridad/` → documentar como finding INFO y continuar con las demás herramientas
- Los riesgos residuales deben quedar siempre documentados, nunca silenciados

---

## Referencias

- OWASP Top 10 (2021): https://owasp.org/Top10/
- Bandit SAST: https://bandit.readthedocs.io/
- pip-audit: https://pypi.org/project/pip-audit/
- OSV Scanner: https://google.github.io/osv-scanner/
- OWASP ASVS Level 1: https://owasp.org/www-project-application-security-verification-standard/
