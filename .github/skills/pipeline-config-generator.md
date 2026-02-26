---
name: 'Pipeline Config Generator'
description: 'Genera configuración de pipeline CI/CD de estabilización aplicando los lineamientos del proyecto'
---

## ⚠️ Prerrequisito

El agente debe haber cargado `.github/guidelines/guidelines.md` antes de ejecutar esta skill.
Aplica EXCLUSIVAMENTE los estándares de **Sección 6 - Estándares de Pipeline**.

---

## Instrucciones de Ejecución

### Paso 1 - Detectar Plataforma CI/CD

Lee el proyecto con `codebase` e identifica:

| Condición detectada | Archivo a generar |
|--------------------|--------------------|
| Repositorio en GitHub (`.git/config` apunta a github.com) | `.github/workflows/stabilization.yml` |
| Existe `.gitlab-ci.yml` o repositorio en GitLab | `.gitlab-ci.yml` |
| Existe `azure-pipelines.yml` o proyecto Azure | `azure-pipelines.yml` |
| Sin CI/CD detectado | Preguntar al usuario |

### Paso 2 - Detectar Stack para Comandos

Detecta el stack para configurar los comandos correctos de cada stage:

| Stack | Lint | Build | Test | Coverage |
|-------|------|-------|------|----------|
| Node.js/npm | `npm run lint` | `npm run build` | `npm test` | `npm run test:coverage` |
| Node.js/yarn | `yarn lint` | `yarn build` | `yarn test` | `yarn test:coverage` |
| Java/Maven | `mvn checkstyle:check` | `mvn package -DskipTests` | `mvn test` | `mvn jacoco:report` |
| Java/Gradle | `./gradlew checkstyleMain` | `./gradlew build -x test` | `./gradlew test` | `./gradlew jacocoTestReport` |
| Python | `flake8 .` | N/A | `pytest` | `pytest --cov` |
| .NET | `dotnet format --verify-no-changes` | `dotnet build` | `dotnet test` | `dotnet test /p:CollectCoverage=true` |

### Paso 3 - Generar Pipeline con Stages Obligatorios

Genera el pipeline con los 8 stages del lineamiento Sección 6, en orden:

```yaml
# GitHub Actions - .github/workflows/stabilization.yml
name: Stabilization Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

env:
  COVERAGE_THRESHOLD: 80

jobs:

  # STAGE 1: Lint
  lint:
    name: 🔍 Code Quality Lint
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run lint
        run: [comando según stack detectado]

  # STAGE 2: Build
  build:
    name: 🔨 Build
    needs: lint
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Build project
        run: [comando según stack detectado]

  # STAGE 3: Unit Tests + Coverage (Quality Gate: 80%)
  unit-test:
    name: 🧪 Unit Tests
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run unit tests with coverage
        run: [comando de test con coverage]
      - name: Check coverage threshold
        run: |
          COVERAGE=$(cat coverage/coverage-summary.json | jq '.total.lines.pct')
          if (( $(echo "$COVERAGE < $COVERAGE_THRESHOLD" | bc -l) )); then
            echo "❌ Coverage $COVERAGE% is below minimum $COVERAGE_THRESHOLD%"
            exit 1
          fi
          echo "✅ Coverage: $COVERAGE%"

  # STAGE 4: Integration Tests
  integration-test:
    name: 🔗 Integration Tests
    needs: unit-test
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_DB: test_db
          POSTGRES_USER: test_user
          POSTGRES_PASSWORD: test_pass
    steps:
      - uses: actions/checkout@v4
      - name: Run integration tests
        run: [comando de integration tests]

  # STAGE 5: Contract Tests
  contract-test:
    name: 📜 Contract Tests
    needs: integration-test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run contract tests
        run: [comando de contract tests]

  # STAGE 6: E2E Tests
  e2e-test:
    name: 🎭 E2E Tests
    needs: contract-test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Install Playwright browsers
        run: npx playwright install --with-deps
      - name: Run E2E tests
        run: [comando de E2E tests]
      - uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: playwright-report
          path: playwright-report/

  # STAGE 7: Security Scan (Quality Gate: 0 vulnerabilidades críticas)
  security-scan:
    name: 🔒 Security Scan
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run OWASP dependency check
        run: [comando de security scan según stack]
      - name: Fail on critical vulnerabilities
        run: echo "Verificando vulnerabilidades críticas..."

  # STAGE 8: Deploy Staging
  deploy-staging:
    name: 🚀 Deploy to Staging
    needs: [e2e-test, security-scan]
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    environment: staging
    steps:
      - uses: actions/checkout@v4
      - name: Deploy to staging
        run: echo "Deploy a staging environment"
```

### Paso 4 - Quality Gates del Lineamiento Sección 6

Verifica que el pipeline incluya estos gates obligatorios:

| Quality Gate | Stage | Efecto si falla |
|-------------|-------|-----------------|
| Build exitoso | build | ❌ Bloquea todos los stages siguientes |
| Cobertura >= 80% | unit-test | ❌ Bloquea integration-test en adelante |
| 0 tests fallidos | cualquier test stage | ❌ Bloquea el stage siguiente |
| 0 vulnerabilidades críticas | security-scan | ❌ Bloquea deploy-staging |
| Lint sin errores | lint | ❌ Bloquea build |

### Paso 5 - Reglas de Ambientes (Lineamiento Sección 6)

Configura los triggers según las reglas del lineamiento:

```yaml
# develop branch → deploy automático a DEV
on:
  push:
    branches: [develop]
# Trigger: deploy-dev job

# main branch → deploy automático a STAGING
on:
  push:
    branches: [main]
# Trigger: deploy-staging job con environment: staging

# release branch → deploy a PROD con aprobación manual
on:
  push:
    branches: [release/**]
# Trigger: deploy-prod job con environment: production (requires approval)
```

---

## Output Esperado

```
⚙️  SKILL pipeline-config-generator COMPLETADA
────────────────────────────────────────────────
Plataforma CI/CD:       [GitHub Actions / GitLab CI / Azure DevOps]
Stack detectado:        [valor]
Stages generados:       8/8
Quality gates activos:  5/5
  - Build exitoso:      ✅
  - Cobertura >= 80%:   ✅
  - 0 tests fallidos:   ✅
  - 0 vulns críticas:   ✅
  - Lint sin errores:   ✅
Ambientes configurados: DEV / STAGING / PROD
Archivo generado:       [ruta del archivo]
Lineamientos aplicados: Sección 6 - Estándares de Pipeline ✅
```
