# 📋 Lineamientos de Desarrollo — Dev Guidelines
# Versión: 1.0.0
# Última actualización: 2026-02-26
# Aplica a: Backend Agent, Frontend Agent

## 1. Estándares de Código

### Nomenclatura
- Clases: PascalCase → `UserService`, `OrderRepository`
- Métodos/Variables: camelCase → `getUserById`, `totalAmount`
- Constantes: UPPER_SNAKE_CASE → `MAX_RETRY_COUNT`
- Archivos: kebab-case → `user-service.ts`, `order-repository.java`
- Componentes Frontend: PascalCase → `UserCard.tsx`, `LoginForm.vue`

### Estructura de Carpetas Backend
```
src/
├── controllers/    ← Solo reciben y responden requests
├── services/       ← Lógica de negocio
├── repositories/   ← Acceso a datos
├── models/         ← Entidades y DTOs
├── events/         ← Productores y consumidores de eventos
├── errors/         ← Taxonomía de errores del dominio
├── observability/  ← Logs, métricas, trazas
└── tests/          ← Todos los tests
```

### Estructura de Carpetas Frontend
```
src/
├── components/     ← Componentes reutilizables del design system
├── pages/          ← Páginas o vistas principales
├── hooks/          ← Custom hooks con lógica reutilizable
├── services/       ← Llamadas a APIs externas
├── store/          ← Gestión de estado global
├── utils/          ← Funciones utilitarias puras
├── routes/         ← Definición de navegación
└── tests/          ← Tests unitarios y E2E
```

### Reglas de Código
- Máximo 20 líneas por función
- Máximo 200 líneas por clase o componente
- Sin números mágicos (usar constantes nombradas)
- Sin comentarios que expliquen QUÉ hace el código (el código debe explicarse solo)
- Manejo explícito de errores en cada función
- Principios SOLID obligatorios

### Patrones de Diseño Recomendados
- Repository Pattern → acceso a datos en servicios
- Factory Pattern → instanciaciones condicionales
- Strategy Pattern → variaciones de comportamiento
- Observer Pattern → eventos y notificaciones
- Container/Presenter → separación UI/lógica en Frontend

## 2. Estándares de Testing

### Cobertura Mínima Requerida
- Unitarios: 80% mínimo
- Integración: todos los endpoints cubiertos
- E2E: todos los flujos críticos cubiertos

### Nomenclatura de Tests
```
given_[contexto]_when_[acción]_then_[resultado esperado]
Ejemplo: given_validUser_when_login_then_returnToken
```

### Estructura AAA Obligatoria
- **Arrange**: preparar datos y contexto de prueba
- **Act**: ejecutar la acción bajo prueba
- **Assert**: verificar el resultado esperado

### Frameworks por Stack
| Stack | Unitarios | Integración | E2E |
|-------|-----------|-------------|-----|
| Spring Boot | JUnit 5 + AssertJ | MockMvc | Selenium/Playwright |
| Node/Express | Jest | Supertest + Jest | Playwright |
| NestJS | Jest | @nestjs/testing + Supertest | Playwright |
| FastAPI | Pytest | TestClient + Pytest | Playwright |
| React/Vue | Jest + Testing Library | - | Playwright |

## 3. Estándares de API REST

### Convenciones de Endpoints
- GET    /api/v1/recursos         → listar todos
- GET    /api/v1/recursos/:id     → obtener uno
- POST   /api/v1/recursos         → crear
- PUT    /api/v1/recursos/:id     → actualizar completo
- PATCH  /api/v1/recursos/:id     → actualizar parcial
- DELETE /api/v1/recursos/:id     → eliminar

### Formato de Respuesta Exitosa
```json
{
  "success": true,
  "data": {},
  "message": "Operación exitosa",
  "timestamp": "2026-02-26T00:00:00Z"
}
```

### Formato de Respuesta de Error
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Descripción del error para el usuario",
    "details": []
  },
  "timestamp": "2026-02-26T00:00:00Z"
}
```

### Códigos HTTP Estándar
| Código | Uso |
|--------|-----|
| 200 | Operación exitosa |
| 201 | Recurso creado |
| 204 | Sin contenido (DELETE exitoso) |
| 400 | Datos de entrada inválidos |
| 401 | No autenticado |
| 403 | Sin permisos |
| 404 | Recurso no encontrado |
| 409 | Conflicto (ej: duplicado) |
| 500 | Error interno del servidor |

## 4. Estándares de Seguridad

- Sin credenciales hardcodeadas (usar variables de entorno)
- Validar TODOS los inputs del usuario antes de procesar
- Sanitizar datos antes de persistir en base de datos
- Logs sin información sensible (passwords, tokens, datos personales)
- Sin secretos en código cliente (frontend)
- Autenticación requerida en todos los endpoints privados
- Inputs validados contra inyección SQL y XSS

## 5. Estándares de Observabilidad

- Logs estructurados en JSON con correlation-id
- Trazas distribuidas con propagación de contexto
- Métricas de latencia, error rate y throughput
- Health check endpoint obligatorio: GET /health
- Logs de errores con stack trace completo
- Sin logs de datos sensibles

### Niveles de Log
- ERROR: errores que requieren atención inmediata
- WARN: situaciones anómalas no críticas
- INFO: eventos de negocio relevantes
- DEBUG: información de diagnóstico (solo desarrollo)

## 6. Estándares de Eventos

- Nombres de eventos en PascalCase: `UserCreated`, `OrderCompleted`
- Payload con esquema versionado
- Idempotencia garantizada en consumidores
- Dead Letter Queue configurada
- Correlación de eventos con correlation-id

## 7. Estándares de Git

### Ramas
- `main`                          → producción (protegida)
- `develop`                       → integración
- `feature/[ticket]-descripcion`  → nuevas funcionalidades
- `bugfix/[ticket]-descripcion`   → corrección de bugs
- `hotfix/[ticket]-descripcion`   → corrección urgente en producción

### Commits (Conventional Commits)
```
feat: agrega autenticación con JWT
fix: corrige validación de email en registro
test: agrega tests de integración para UserController
docs: actualiza README con instrucciones de instalación
refactor: extrae lógica de validación a UserValidator
chore: actualiza dependencias de seguridad
perf: optimiza query de búsqueda de usuarios
```

### Checklist PR Obligatorio
- [ ] Tests escritos y pasando
- [ ] Cobertura >= 80%
- [ ] Sin credenciales hardcodeadas
- [ ] Commits limpios con Conventional Commits
- [ ] Documentación actualizada si aplica
- [ ] Sin console.log o print de debug
- [ ] Revisión de seguridad básica completada
