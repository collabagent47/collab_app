---
description: 'Skill que especifica los datos de prueba necesarios para cada escenario. Define fixtures, factorías, datos borderline y establece la prohibición absoluta de usar datos de producción.'
---

# Skill: test-data-specifier [QA]

## Responsabilidad
Definir y generar los datos de prueba necesarios para todos los
escenarios identificados, garantizando cobertura y seguridad en los datos.

---

## ⚠️ REGLA ABSOLUTA — Datos de Producción

```
PROHIBIDO ABSOLUTAMENTE:
  - Copiar datos de producción a ambientes de test
  - Usar emails, nombres o teléfonos reales de usuarios
  - Usar IDs, números de tarjeta o documentos reales
  - Tomar backups de producción para testing

SIEMPRE usar:
  - Datos sintéticos generados automáticamente
  - Datos anonimizados siguiendo el estándar del lineamiento
  - Factories o builders de datos de prueba
  - Datos deterministas para tests reproducibles
```

---

## Tipos de Datos de Prueba a Definir

### 1. Fixtures Estáticos (Datos fijos y deterministas)
Para tests que necesitan datos precargados en la base de datos:

```typescript
// tests/fixtures/users.fixture.ts
export const userFixtures = {
  adminUser: {
    id: 'test-user-admin-001',
    email: 'test.admin@test.local',
    name: 'Test Admin User',
    role: 'ADMIN',
    status: 'ACTIVE',
  },
  regularUser: {
    id: 'test-user-regular-001',
    email: 'test.user@test.local',
    name: 'Test Regular User',
    role: 'USER',
    status: 'ACTIVE',
  },
  inactiveUser: {
    id: 'test-user-inactive-001',
    email: 'test.inactive@test.local',
    name: 'Test Inactive User',
    role: 'USER',
    status: 'INACTIVE',
  },
};
```

### 2. Factories / Builders (Datos dinámicos con faker)
Para tests que necesitan variedad de datos sin hardcodear:

```typescript
// tests/factories/user.factory.ts
import { faker } from '@faker-js/faker';

export const createUser = (overrides: Partial<User> = {}): User => ({
  id: faker.string.uuid(),
  email: faker.internet.email({ provider: 'test.local' }),
  name: faker.person.fullName(),
  phone: faker.phone.number({ style: 'national' }),
  createdAt: faker.date.recent(),
  status: 'ACTIVE',
  ...overrides,  // permite sobrescribir campos específicos
});

// Uso en tests:
const user = createUser({ role: 'ADMIN' });
const invalidUser = createUser({ email: 'not-an-email' });
```

### 3. Datos Borderline (Límites del negocio)
Para validar casos en los extremos de las reglas de negocio:

```
Genera una tabla por cada campo con reglas:

Campo: [nombre_campo]
Regla: [min X caracteres, max Y caracteres, formato específico]

| Categoría          | Valor                     | Resultado esperado      |
|--------------------|---------------------------|-------------------------|
| Límite inferior    | [X-1 caracteres]          | Error: mínimo X chars   |
| Exactamente mínimo | [X caracteres]            | Válido                  |
| Valor válido típico| [valor representativo]    | Válido                  |
| Exactamente máximo | [Y caracteres]            | Válido                  |
| Límite superior    | [Y+1 caracteres]          | Error: máximo Y chars   |
| Vacío              | ""                        | Error: campo requerido  |
| Solo espacios      | "   "                     | Error: campo requerido  |
| Caracteres especiales| "<script>", "'; DROP"  | Error: formato inválido |
```

---

## Entregable: Catálogo de Datos de Prueba

Genera `tests/data/test-data-catalog.md`:

```markdown
# Catálogo de Datos de Prueba — [Nombre del Proyecto]

## 1. Fixtures Estáticos
[Tabla con todos los fixtures definidos y su propósito]

## 2. Factories Disponibles
[Lista de factories con sus parámetros configurables]

## 3. Tablas Borderline por Campo
[Tablas de valores límite por cada campo validado]

## 4. Datos de Prueba por Escenario Gherkin
[Mapa de qué datos usar en cada escenario]

## 5. Setup y Teardown
[Instrucciones de cómo limpiar datos entre tests]
```

---

## Proceso de Especificación

```
PASO 1 → Revisar todos los escenarios Gherkin generados
PASO 2 → Identificar datos necesarios por escenario
PASO 3 → Clasificar: fixture estático vs factory dinámico
PASO 4 → Definir datos borderline por campo con validaciones
PASO 5 → Generar factories con faker para datos dinámicos
PASO 6 → Definir estrategia de setup/teardown por ambiente
PASO 7 → Generar tests/data/test-data-catalog.md
PASO 8 → Verificar que ningún dato real de producción fue usado
```

## Reporte

```
🗃️ TEST-DATA-SPECIFIER [QA] — REPORTE
════════════════════════════════════════════════
Escenarios analizados:           X
Fixtures estáticos definidos:    X
Factories generadas:             X
Tablas borderline definidas:     X
  Campos analizados:             X
  Valores borderline totales:    X

Datos de producción usados:      0  ✅ (debe ser siempre 0)

Documento generado: tests/data/test-data-catalog.md ✅
════════════════════════════════════════════════
```
