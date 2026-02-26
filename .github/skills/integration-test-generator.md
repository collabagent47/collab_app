---
name: 'Integration Test Generator'
description: 'Genera pruebas de integración para Backend aplicando los lineamientos del proyecto'
---

## ⚠️ Prerrequisito

El agente debe haber cargado `.github/guidelines/guidelines.md` antes de ejecutar esta skill.
Aplica los estándares de **Sección 2 - Estándares de Testing** y **Sección 3 - Estándares de API**.

---

## Instrucciones de Ejecución

### Paso 1 - Detectar Framework

Lee el proyecto con `codebase` e identifica el framework para elegir las herramientas correctas:

| Framework detectado | Herramientas a usar |
|--------------------|---------------------|
| Spring Boot (Java) | MockMvc + JUnit 5 + AssertJ |
| Node.js / Express  | Supertest + Jest |
| NestJS             | @nestjs/testing + Jest + Supertest |
| FastAPI (Python)   | TestClient + Pytest |
| Django             | Django Test Client + Pytest |
| Laravel (PHP)      | PHPUnit + Laravel HTTP Test |

### Paso 2 - Inventario de Endpoints

Mapea todos los endpoints disponibles en el proyecto:

```
GET    /api/[recurso]          → [descripción]
GET    /api/[recurso]/:id      → [descripción]
POST   /api/[recurso]          → [descripción]
PUT    /api/[recurso]/:id      → [descripción]
PATCH  /api/[recurso]/:id      → [descripción]
DELETE /api/[recurso]/:id      → [descripción]
```

### Paso 3 - Generar Tests por Endpoint

Para CADA endpoint genera tests siguiendo la nomenclatura del lineamiento:
`given_[contexto]_when_[acción]_then_[resultado]`

#### Tests Obligatorios por Endpoint

**Happy Path**
- `given_validData_when_[método][Recurso]_then_return[StatusCode]`
- Verificar status code correcto según lineamientos (200, 201, 204)
- Verificar estructura del response según formato del lineamiento Sección 3

**Casos de Error**
- `given_invalidData_when_[método][Recurso]_then_return400`
- `given_nonExistentId_when_get[Recurso]_then_return404`
- `given_unauthenticatedUser_when_[método][Recurso]_then_return401`
- `given_unauthorizedUser_when_[método][Recurso]_then_return403`

**Validaciones**
- `given_missingRequiredField_when_post[Recurso]_then_return400`
- `given_invalidFieldType_when_post[Recurso]_then_return400`
- `given_fieldExceedsMaxLength_when_post[Recurso]_then_return400`

### Paso 4 - Estructura AAA (según lineamiento Sección 2)

Cada test debe seguir el patrón Arrange-Act-Assert:

```java
// Ejemplo Java Spring Boot
@Test
void given_validUser_when_createUser_then_return201() {
    // Arrange
    UserRequest request = UserRequest.builder()
        .name("John Doe")
        .email("john@example.com")
        .build();

    // Act
    ResultActions result = mockMvc.perform(
        post("/api/users")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request))
    );

    // Assert
    result.andExpect(status().isCreated())
          .andExpect(jsonPath("$.success").value(true))
          .andExpect(jsonPath("$.data.email").value("john@example.com"));
}
```

### Paso 5 - Validar Formato de Respuesta

Todos los assertions deben verificar el formato del lineamiento Sección 3:

```json
// Respuesta exitosa esperada
{
  "success": true,
  "data": {},
  "message": "string",
  "timestamp": "ISO-8601"
}

// Respuesta de error esperada
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "string",
    "details": []
  }
}
```

### Paso 6 - Configuración de Base de Datos de Test

Si el proyecto usa base de datos, genera la configuración de test:
- Base de datos en memoria (H2 para Java, SQLite para Python/Node)
- Scripts de seed con datos de prueba
- Limpieza entre tests (BeforeEach / AfterEach)

---

## Output Esperado

```
🟢 SKILL integration-test-generator COMPLETADA
────────────────────────────────────────────────
Framework detectado:    [valor]
Endpoints mapeados:     X
Tests generados:        X
  - Happy path:         X
  - Casos de error:     X
  - Validaciones:       X
Archivos creados:       [lista de archivos]
Cobertura estimada:     X%
Lineamientos aplicados: Sección 2 + Sección 3 ✅
```
