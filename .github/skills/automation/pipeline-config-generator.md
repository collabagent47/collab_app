---
description: 'Skill especializada en generación de pipelines de CI/CD. Genera configuración para GitHub Actions, GitLab CI o Jenkins con stages de validate, test, security, build y deploy por ambiente.'
---

# Skill: pipeline-config-generator [AUTOMATION]

## Responsabilidad
Generar o actualizar la configuración del pipeline de CI/CD del proyecto
asegurando que incluye todos los stages definidos en los estándares de automatización.

---

## Estructura Mínima del Pipeline

```
STAGE 1: validate   → lint, format check, type-check
STAGE 2: test       → unit tests, integration tests, coverage threshold
STAGE 3: security   → dependency vulnerability scan, SAST
STAGE 4: build      → artefacto reproducible y versionado
STAGE 5: publish    → push al registry (Docker Hub, ECR, Artifactory)
STAGE 6: deploy-dev → deploy automático en push a rama principal
STAGE 7: deploy-stg → deploy con aprovación manual
STAGE 8: deploy-prod→ deploy con aprovación manual + pipeline verde obligatorio
```

---

## Templates de Pipeline

### GitHub Actions (`.github/workflows/ci-cd.yml`)
```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

env:
  APP_VERSION: ${{ github.sha }}
  IMAGE_NAME: ${{ github.repository }}

jobs:
  # ─────────────────────────────────
  # STAGE 1: VALIDATE
  # ─────────────────────────────────
  validate:
    name: "Validate Code Quality"
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm run format:check
      - run: npm run type-check

  # ─────────────────────────────────
  # STAGE 2: TEST
  # ─────────────────────────────────
  test:
    name: "Run Tests & Check Coverage"
    needs: validate
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:16
        env:
          POSTGRES_DB: test_db
          POSTGRES_USER: test
          POSTGRES_PASSWORD: test
        ports: ['5432:5432']
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - name: Run unit tests
        run: npm run test:unit -- --coverage
      - name: Run integration tests
        run: npm run test:integration
        env:
          DATABASE_URL: postgresql://test:test@localhost:5432/test_db
      - name: Enforce coverage threshold
        run: |
          COVERAGE=$(cat coverage/coverage-summary.json | jq '.total.lines.pct')
          if (( $(echo "$COVERAGE < 80" | bc -l) )); then
            echo "Coverage ${COVERAGE}% is below threshold 80%"
            exit 1
          fi
      - uses: actions/upload-artifact@v4
        with:
          name: coverage-report
          path: coverage/

  # ─────────────────────────────────
  # STAGE 3: SECURITY
  # ─────────────────────────────────
  security:
    name: "Security Scan"
    needs: validate
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - name: Audit dependencies
        run: npm audit --audit-level=high
      - name: Run SAST scan
        uses: github/super-linter@v6
        env:
          VALIDATE_ALL_CODEBASE: false
          DEFAULT_BRANCH: main
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

  # ─────────────────────────────────
  # STAGE 4: BUILD
  # ─────────────────────────────────
  build:
    name: "Build & Package"
    needs: [test, security]
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: docker/setup-buildx-action@v3
      - uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}
      - uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: |
            ghcr.io/${{ env.IMAGE_NAME }}:${{ github.sha }}
            ghcr.io/${{ env.IMAGE_NAME }}:latest
          cache-from: type=gha
          cache-to: type=gha,mode=max

  # ─────────────────────────────────
  # STAGE 5: DEPLOY DEV (automático)
  # ─────────────────────────────────
  deploy-dev:
    name: "Deploy to Development"
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    environment: development
    steps:
      - uses: actions/checkout@v4
      - name: Deploy to dev environment
        run: |
          # kubectl set image deployment/app app=ghcr.io/$IMAGE_NAME:$APP_VERSION
          echo "Deploying $APP_VERSION to development"

  # ─────────────────────────────────
  # STAGE 6: DEPLOY STG (manual)
  # ─────────────────────────────────
  deploy-staging:
    name: "Deploy to Staging"
    needs: deploy-dev
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    environment:
      name: staging
      url: https://staging.example.com
    steps:
      - uses: actions/checkout@v4
      - name: Deploy to staging
        run: |
          echo "Deploying $APP_VERSION to staging"

  # ─────────────────────────────────
  # STAGE 7: DEPLOY PROD (manual)
  # ─────────────────────────────────
  deploy-production:
    name: "Deploy to Production"
    needs: deploy-staging
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    environment:
      name: production
      url: https://app.example.com
    steps:
      - uses: actions/checkout@v4
      - name: Deploy to production
        run: |
          echo "Deploying $APP_VERSION to production"
```

---

## Proceso de Generación

```
PASO 1 → Detectar plataforma CI/CD actual (GitHub Actions, GitLab, Jenkins)
PASO 2 → Detectar stack tecnológico del proyecto
PASO 3 → Identificar stages faltantes en pipeline existente (si hay)
PASO 4 → Generar o actualizar el archivo de pipeline
PASO 5 → Verificar que los secrets necesarios están documentados
PASO 6 → Actualizar README con instrucciones del pipeline
```

## Reporte

```
⚙️ PIPELINE-CONFIG-GENERATOR [AUTOMATION] — REPORTE
════════════════════════════════════════════════════
Plataforma CI/CD detectada:      [GitHub Actions / GitLab / Jenkins]
Stages generados:                X/8
  validate:    ✅/❌
  test:        ✅/❌
  security:    ✅/❌
  build:       ✅/❌
  deploy-dev:  ✅/❌
  deploy-stg:  ✅/❌
  deploy-prod: ✅/❌

Secrets a configurar:            X
Archivo generado:                [ruta completa] ✅
════════════════════════════════════════════════════
```
