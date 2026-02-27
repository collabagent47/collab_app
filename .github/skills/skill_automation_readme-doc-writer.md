---
description: 'Skill especializada en generación y actualización de documentación README. Crea documentación técnica completa con setup, ejecutar tests, variables de entorno, endpoints y despliegue.'
---

# Skill: readme-doc-writer [AUTOMATION]

## Responsabilidad
Generar o actualizar el archivo README.md del proyecto con documentación
técnica completa, actualizada y útil para desarrolladores.

---

## Estructura del README (Template Completo)

```markdown
# [Nombre del Proyecto]

> [Descripción breve en una línea — qué hace y para qué]

[![CI/CD](link-al-badge-de-pipeline)](link-al-pipeline)
[![Coverage](link-badge-coverage)](link-cobertura)
[![Version](badge-version)](link-releases)

## Tabla de Contenidos
- [Descripción](#descripción)
- [Requisitos Previos](#requisitos-previos)
- [Instalación y Setup](#instalación-y-setup)
- [Variables de Entorno](#variables-de-entorno)
- [Ejecutar el Proyecto](#ejecutar-el-proyecto)
- [Ejecutar Tests](#ejecutar-tests)
- [API Reference](#api-reference)
- [Arquitectura](#arquitectura)
- [Despliegue](#despliegue)
- [Contribuir](#contribuir)

---

## Descripción
[Descripción detallada del proyecto: qué hace, qué problema resuelve,
quiénes son los usuarios y cuáles son las capacidades principales]

**Stack Tecnológico:**
- Backend: [tecnologías]
- Frontend: [tecnologías si aplica]
- Base de datos: [motor]
- Infraestructura: [cloud/on-premise]

---

## Requisitos Previos

```bash
Node.js >= 20.0.0
npm >= 10.0.0
Docker >= 24.0 (para base de datos local)
```

---

## Instalación y Setup

```bash
# 1. Clonar el repositorio
git clone [url-del-repo]
cd [nombre-proyecto]

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Editar .env con los valores correspondientes

# 4. Levantar servicios de desarrollo (base de datos, etc.)
docker-compose up -d

# 5. Ejecutar migraciones
npm run db:migrate

# 6. Cargar datos seed (opcional)
npm run db:seed
```

---

## Variables de Entorno

Copia `.env.example` a `.env` y completa los valores:

| Variable              | Descripción                          | Requerida | Ejemplo                         |
|-----------------------|--------------------------------------|-----------|--------------------------------|
| `NODE_ENV`            | Ambiente de ejecución                | Sí        | `development`                  |
| `PORT`                | Puerto del servidor                  | Sí        | `3000`                         |
| `DATABASE_URL`        | URL de conexión a la base de datos   | Sí        | `postgresql://user:pass@host/db`|
| `JWT_SECRET`          | Secreto para firmar tokens JWT       | Sí        | `[string aleatorio >= 32 chars]`|
| `[VARIABLE_EXTERNA]`  | [descripción]                        | [Sí/No]   | `[ejemplo]`                    |

> ⚠️ **NUNCA commitear el archivo `.env` con valores reales**

---

## Ejecutar el Proyecto

```bash
# Modo desarrollo (hot-reload)
npm run dev

# Modo producción (build + start)
npm run build
npm start

# Solo el build
npm run build
```

Acceder en: `http://localhost:[PORT]`

---

## Ejecutar Tests

```bash
# Tests unitarios
npm run test:unit

# Tests de integración
npm run test:integration

# Todos los tests con coverage
npm run test:coverage

# Tests E2E (requiere servidor corriendo)
npm run test:e2e

# Tests en modo watch (desarrollo)
npm run test:watch
```

**Cobertura mínima requerida:** 80%

---

## API Reference

### Autenticación
[Descripción del método de autenticación]

```http
Authorization: Bearer <token>
```

### Endpoints

#### [Recurso 1]

```http
POST /api/v1/[recurso]
Content-Type: application/json
Authorization: Bearer <token>

{
  "campo": "valor"
}
```

**Respuesta exitosa (201):**
```json
{
  "success": true,
  "data": { ... },
  "message": "...",
  "timestamp": "ISO8601"
}
```

[Documentar todos los endpoints del SPEC]

---

## Arquitectura

[Descripción de la arquitectura del proyecto basada en el SPEC]

```
[Diagrama ASCII o mención de docs/specs/specification.md]
```

Para documentación detallada ver: [docs/specs/specification.md](docs/specs/specification.md)

---

## Despliegue

### Variables de Entorno en Producción
[Instrucciones específicas para cada ambiente]

### Pipeline de CI/CD
El proyecto usa [plataforma CI/CD]. Ver [.github/workflows/ci-cd.yml](.github/workflows/ci-cd.yml)

```
Push a main → validate → test → security → build → deploy-dev
                                                  → deploy-staging (manual)
                                                  → deploy-production (manual)
```

---

## Contribuir

1. Fork del repositorio
2. Crear rama: `git checkout -b feat/nombre-de-la-feature`
3. Commit: seguir [Conventional Commits](https://conventionalcommits.org)
4. Push y abrir Pull Request
5. Asegurarse de que el pipeline pase y la cobertura se mantiene >= 80%

Para guías de contribución detalladas: ver `.github/docs/lineamientos/dev-guidelines.md`
```

---

## Proceso de Generación

```
PASO 1 → Escanear codebase para detectar stack, scripts y estructura actual
PASO 2 → Revisar el SPEC en docs/specs/specification.md para endpoints y arquitectura
PASO 3 → Identificar variables de entorno del proyecto
PASO 4 → Generar README.md completo con template adaptado al proyecto
PASO 5 → Generar/actualizar .env.example con todas las variables documentadas
PASO 6 → Verificar que los comandos en el README funcionan
```

## Reporte

```
📄 README-DOC-WRITER [AUTOMATION] — REPORTE
════════════════════════════════════════════════
Secciones generadas:             X/9
Variables de entorno doc.:       X
Endpoints documentados:          X
Comandos verificados:            X

Archivos generados/actualizados:
  README.md      ✅
  .env.example   ✅
════════════════════════════════════════════════
```
