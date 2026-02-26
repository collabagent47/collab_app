# 📋 Lineamientos de Calidad — QA Guidelines
# Versión: 1.0.0
# Última actualización: 2026-02-26
# Aplica a: QA Agent

## 1. Principios de Calidad

### Filosofía
- La calidad es responsabilidad de TODO el equipo, no solo de QA
- Shift-left: encontrar defectos lo antes posible en el ciclo
- Automatizar lo que tiene ROI positivo demostrable
- No asumir cobertura 100% E2E sin análisis previo
- El riesgo guía la cobertura, no la completitud arbitraria
- Sin datos de producción en ambientes de prueba

### Priorización de Testing
1. Flujos críticos de negocio (mayor impacto financiero/reputacional)
2. Funcionalidades de alto riesgo técnico
3. Integraciones entre sistemas y servicios
4. Casos de borde y manejo de errores

## 2. Pirámide de Testing

```
         /  E2E  \          ← Pocos, solo flujos críticos
        /──────────\
       / Integración \      ← Contratos y servicios
      /──────────────\
     /   Unitarios    \     ← Base amplia y rápida
    /──────────────────\
```

### Cobertura Mínima por Nivel
- Unitarios: 80% mínimo
- Integración: 100% de endpoints documentados en SPEC
- E2E: 100% de flujos críticos identificados
- Performance: según clasificación de riesgo (no siempre requerido)

## 3. Estrategia de Pruebas

### Entregables Obligatorios de la Estrategia
1. Nivel de Pruebas Requerido (Unit, Integration, E2E, Performance, Security)
2. Matriz de cobertura vs requerimientos (HU trazables)
3. Criterios de entrada y salida definidos
4. Definición de ambientes necesarios
5. Estrategia de datos de prueba

### Restricciones de Estrategia
- NO asumir automatización total sin análisis de ROI
- NO proponer cobertura 100% E2E (es costoso e inestable)
- NO avanzar sin criterios de entrada verificados

## 4. Estándares Gherkin

### Reglas de Escritura
- Lenguaje formal y en español
- Un escenario = una sola regla de negocio
- Given/When/Then coherente, atómico y verificable
- Sin detalles técnicos de implementación en los escenarios
- Trazable a una HU específica

### Estructura Obligatoria
```gherkin
# language: es
Feature: [nombre del módulo/funcionalidad]
  Como [rol del usuario]
  Quiero [funcionalidad]
  Para [valor de negocio]

  # Trazabilidad: HU-[número]
  @criticidad-alta @regresion @automatizable
  Scenario: [nombre descriptivo del escenario]
    Given [estado inicial del sistema]
    When  [acción que ejecuta el actor]
    Then  [resultado esperado y verificable]
    And   [condición adicional si aplica]
```

### Paths Obligatorios por HU
- **Happy Path**: flujo exitoso principal
- **Alternative Path**: variación válida del flujo
- **Exception Path**: condición de excepción controlada
- **Error Path**: error del sistema o datos completamente inválidos

### Tags Obligatorios
| Tag | Uso |
|-----|-----|
| @criticidad-alta | Escenario de alto impacto |
| @criticidad-media | Escenario de impacto medio |
| @criticidad-baja | Escenario de bajo impacto |
| @regresion | Incluir en suite de regresión |
| @automatizable | Candidato a automatización |
| @smoke | Incluir en smoke test |

### Reglas de Calidad por Escenario
Cada escenario DEBE:
- Ser atómico (una sola regla de negocio)
- Tener Given/When/Then coherente
- Ser trazable a un requerimiento (HU-X)
- No mezclar múltiples reglas de negocio
- Usar lenguaje de negocio, no técnico

## 5. Gestión de Riesgos

### Categorías de Riesgo Obligatorias
1. Riesgos Funcionales → lógica de negocio incorrecta
2. Riesgos Técnicos → deuda técnica, complejidad
3. Riesgos de Integración → comunicación entre servicios
4. Riesgos de Seguridad → vulnerabilidades, exposición de datos
5. Riesgos de Performance → degradación bajo carga
6. Riesgos Regulatorios → compliance (si aplica)

### Regla ASD (obligatoria e improrrogable)
```
Si clasificación del riesgo = ALTO
→ DEBE existir prueba asociada obligatoria definida
→ Sin prueba asociada = riesgo no mitigado = BLOQUEO de entrega
```

### Matriz de Clasificación
```
              │  Impacto Bajo  │  Impacto Medio  │  Impacto Alto
──────────────┼────────────────┼─────────────────┼──────────────
Prob. Alta    │     MEDIO      │      ALTO       │    ALTO
Prob. Media   │     BAJO       │      MEDIO      │    ALTO
Prob. Baja    │     BAJO       │      BAJO       │    MEDIO
```

## 6. Datos de Prueba

### Categorías Obligatorias
- **Datos válidos**: entrada correcta dentro del dominio esperado
- **Datos inválidos**: entrada incorrecta o fuera del dominio
- **Datos límite**: valores en los bordes del dominio (min, max, en límite, fuera)
- **Datos inconsistentes**: combinaciones válidas individualmente pero inconsistentes juntas
- **Datos maliciosos**: SQL Injection, XSS, Path Traversal básico

### Restricciones Absolutas
- ❌ NUNCA usar datos reales de producción
- ❌ NUNCA hardcodear credenciales en los tests
- ✅ Definir estrategia de anonimización si aplica
- ✅ Datos de prueba versionados junto al código fuente

## 7. Flujos Críticos

### Clasificación por Impacto
| Tipo de Impacto | Criterio |
|----------------|----------|
| Financiero | Involucra dinero, pagos, facturación |
| Reputacional | Datos de usuarios, experiencia visible |
| Operativo | Funcionalidad core del negocio |

### Regla de Priorización E2E
```
Impacto CRÍTICO (≥2 tipos altos) → E2E obligatorio
Impacto ALTO (1 tipo alto)       → E2E recomendado
Impacto MEDIO                    → E2E opcional con justificación
Impacto BAJO                     → No requiere E2E
```

## 8. Automatización

### Criterios para Automatizar (obligatorios)
✅ Automatizar SI:
- Flujo crítico de negocio
- Alta frecuencia de ejecución (> 3 veces/sprint)
- Alto impacto si falla
- Flujo estable (no cambia frecuentemente)
- ROI positivo demostrable

❌ NO automatizar SI:
- UI cambia frecuentemente
- Prueba exploratoria o de experiencia de usuario
- Validación visual subjetiva
- Configuración más costosa que el beneficio
- ROI negativo o neutro

### Clasificación por Tipo
| Tipo | Herramienta preferida |
|------|----------------------|
| Unit | Jest / JUnit 5 / Pytest |
| Integration | Supertest / MockMvc / TestClient |
| Contract | Pact |
| E2E | Playwright (preferido) |
| Performance | k6 |

## 9. Performance

### Variables de Evaluación Obligatorias
1. Volumen esperado (usuarios simultáneos, TPS)
2. Concurrencia sobre recursos compartidos
3. SLA y umbrales de tiempo de respuesta definidos
4. Dependencias externas y su latencia esperada
5. Existencia de procesos batch o jobs críticos

### Clasificación de Necesidad
| Tipo | Cuándo aplicar |
|------|---------------|
| No requiere | Sistema interno, bajo volumen, sin SLA crítico |
| Smoke Performance | Validación básica de tiempos antes de release |
| Load Test | Comportamiento bajo volumen esperado normal |
| Stress Test | Encontrar límite máximo del sistema |
| Spike Test | Comportamiento ante picos repentinos de carga |
| Soak Test | Estabilidad y memory leaks en el tiempo |

### Umbrales Mínimos de Performance
- Tiempo de respuesta API: < 200ms (percentil 95)
- Disponibilidad: >= 99.9%
- Error rate bajo carga normal: < 1%

## 10. Regresión

### Suite de Regresión Mínima Obligatoria
Incluye SIEMPRE:
- Flujos críticos de negocio
- Flujos de autenticación y autorización
- Contratos de integración core
- Operaciones CRUD de recursos principales

Frecuencia: en cada PR y cada deploy

### Suite de Regresión Ampliada
Se activa bajo:
- Release a producción
- Cambios de alto riesgo
- Refactoring mayor

Frecuencia: ejecución nocturna automática
