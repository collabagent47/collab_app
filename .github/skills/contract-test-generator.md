---
name: 'Contract Test Generator'
description: 'Genera pruebas de contrato entre servicios usando Pact u otras herramientas, aplicando los lineamientos del proyecto'
---

## ⚠️ Prerrequisito

El agente debe haber cargado `.github/guidelines/guidelines.md` antes de ejecutar esta skill.
Aplica los estándares de **Sección 2 - Estándares de Testing** y **Sección 3 - Estándares de API**.

---

## Instrucciones de Ejecución

### Paso 1 - Detectar Arquitectura de Servicios

Lee el proyecto con `codebase` e identifica:
- ¿Cuántos servicios existen?
- ¿Qué servicios consumen APIs de otros? → **Consumers**
- ¿Qué servicios exponen APIs? → **Producers**
- ¿Qué DTOs/modelos se comparten entre servicios?

Genera el mapa de dependencias:
```
Consumer A  ──→  Producer B (endpoint /api/orders)
Consumer A  ──→  Producer C (endpoint /api/users)
Consumer D  ──→  Producer B (endpoint /api/products)
```

### Paso 2 - Seleccionar Herramienta

| Lenguaje | Herramienta recomendada |
|----------|------------------------|
| Java     | Pact JVM (pact-jvm-consumer-junit5) |
| Node.js  | Pact JS (@pact-foundation/pact) |
| Python   | Pact Python (pact-python) |
| .NET     | PactNet |
| Multi-lenguaje | Pact Broker |

### Paso 3 - Generar Tests del Consumer

Para cada Consumer, genera el test que define el contrato esperado:

```javascript
// Ejemplo Node.js - Consumer Test
describe('UserService consumer contract', () => {
  const provider = new Pact({
    consumer: 'OrderService',
    provider: 'UserService',
  });

  // given_validUserId_when_getUser_then_returnUserData
  it('returns user data for valid userId', async () => {
    await provider.addInteraction({
      state: 'user with ID 1 exists',
      uponReceiving: 'a request for user 1',
      withRequest: {
        method: 'GET',
        path: '/api/users/1',
        headers: { Authorization: 'Bearer token' }
      },
      willRespondWith: {
        status: 200,
        body: {
          success: true,
          data: {
            id: 1,
            name: like('John Doe'),
            email: like('john@example.com')
          }
        }
      }
    });

    const user = await userClient.getUser(1);
    expect(user.name).toBeDefined();
  });
});
```

### Paso 4 - Generar Tests del Provider

Para cada Producer, genera el test de verificación del contrato:

```javascript
// Ejemplo Node.js - Provider Verification
describe('UserService provider verification', () => {
  it('validates contracts from all consumers', () => {
    return new Verifier({
      provider: 'UserService',
      providerBaseUrl: 'http://localhost:3000',
      pactUrls: ['./pacts/orderservice-userservice.json'],
      stateHandlers: {
        'user with ID 1 exists': async () => {
          await seedUser({ id: 1, name: 'John Doe', email: 'john@example.com' });
        }
      }
    }).verifyProvider();
  });
});
```

### Paso 5 - Verificar Compatibilidad de Contratos

Para cada par Consumer-Producer verifica:

| Verificación | Descripción |
|-------------|-------------|
| Schema compatibility | Los campos del response coinciden con lo esperado |
| Status codes | Los códigos de respuesta son los acordados |
| Required fields | Todos los campos requeridos están presentes |
| Data types | Los tipos de datos son compatibles |
| Backward compatibility | Cambios en Producer no rompen Consumer existente |

### Paso 6 - Documentar Contratos

Para cada contrato generado, crea documentación:

```markdown
## Contrato: [Consumer] → [Producer]

### Endpoint: [MÉTODO] [path]
- **Consumer:** [nombre del servicio consumidor]
- **Producer:** [nombre del servicio proveedor]
- **Request esperado:** [descripción]
- **Response esperado:** [estructura según lineamiento Sección 3]
- **Estado del contrato:** ✅ Verificado / ⚠️ Pendiente
```

---

## Output Esperado

```
🟡 SKILL contract-test-generator COMPLETADA
─────────────────────────────────────────────
Servicios mapeados:          X
Contratos identificados:     X
Tests consumer generados:    X
Tests provider generados:    X
Contratos verificados:       X
Incompatibilidades encontradas: X
Archivos generados:          [lista]
Lineamientos aplicados:      Sección 2 + Sección 3 ✅
```
