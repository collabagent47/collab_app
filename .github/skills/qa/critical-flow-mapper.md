---
description: 'Skill que mapea y documenta los flujos críticos de negocio del proyecto. Identifica los caminos de mayor impacto, sus dependencias y genera los happy/sad paths como base para E2E y smoke testing.'
---

# Skill: critical-flow-mapper [QA]

## Responsabilidad
Identificar, documentar y priorizar los flujos críticos de negocio
que deben tener cobertura garantizada en todo momento.

---

## Criterios para Clasificar un Flujo como Crítico

Un flujo es crítico si cumple UNO O MÁS de estos criterios:

```
✅ CRITERIO FINANCIERO:     Involucra pagos, cobros, créditos o saldos
✅ CRITERIO DE ACCESO:      Es el flujo de autenticación o autorización
✅ CRITERIO DE DATOS CLAVE: Crea, modifica o elimina datos del usuario
✅ CRITERIO DE VOLUMEN:     Más del 30% de los usuarios lo ejecutan diariamente
✅ CRITERIO DE NEGOCIO:     Su falla detiene la operación del negocio
✅ CRITERIO DE INTEGRACIÓN: Conecta con sistemas externos críticos
✅ CRITERIO DE CUMPLIMIENTO:Requerido por regulación, contrato o SLA
```

---

## Formato de Documentación de Flujo Crítico

Por cada flujo crítico identificado:

```markdown
## FLUJO-[número]: [Nombre descriptivo del flujo]

**Criticidad:**   Alta / Media
**HU asociadas:** HU-001, HU-002
**Criterios:**    [lista de criterios aplicados]

### Actores
- **Iniciador:**  [quién o qué decide el flujo]
- **Sistemas:**   [qué servicios/componentes participan]
- **Externo:**    [APIs o sistemas externos involucrados]

### Happy Path (flujo exitoso principal)
```
[Paso 1] → [Paso 2] → [Paso 3] → ... → [Resultado exitoso]
```
Detalle:
1. El usuario [acción] en [pantalla/endpoint]
2. El sistema [acción de negocio]
3. [Sistema externo] responde con [resultado]
4. El sistema actualiza [entidad] con [estado]
5. El usuario recibe [confirmación]

### Sad Paths (variantes de error del flujo)
| Paso | Escenario de error         | Impacto        | Respuesta esperada del sistema |
|------|---------------------------|----------------|-------------------------------|
| 2    | [descripción del error]   | [impacto]      | [qué debe hacer el sistema]   |
| 3    | [descripción del error]   | [impacto]      | [qué debe hacer el sistema]   |

### Dependencias Entre Flujos
- Requiere que [FLUJO-X] haya completado exitosamente antes
- Habilita la ejecución de [FLUJO-Y]

### Puntos de Control QA
- [ ] Happy path E2E cubierto
- [ ] Todos los sad paths con escenario Gherkin
- [ ] Flujo incluido en suite de smoke testing
- [ ] Flujo monitoreado en producción (si aplica)
```

---

## Entregable: Mapa de Flujos Críticos

Genera `docs/critical-flows.md`:

```markdown
# Mapa de Flujos Críticos — [Nombre del Proyecto]
**Generado por:** QA Agent | **Fecha:** [fecha]

## Resumen

| ID        | Nombre del Flujo             | Criticidad | HU       | E2E | Smoke |
|-----------|------------------------------|------------|----------|-----|-------|
| FLUJO-001 | [nombre]                     | Alta       | HU-001   | ✅  | ✅    |
| FLUJO-002 | [nombre]                     | Alta       | HU-002   | ✅  | ✅    |
| FLUJO-003 | [nombre]                     | Media      | HU-003   | ✅  | ❌    |

## Detalle de Flujos
[Sección completa por flujo según formato definido arriba]

## Mapa de Dependencias
[Diagrama o tabla de dependencias entre flujos]
```

---

## Proceso de Mapeo

```
PASO 1 → Revisar todas las HU del SPEC
PASO 2 → Aplicar criterios de criticidad a cada HU y funcionalidad
PASO 3 → Documentar happy path con pasos detallados
PASO 4 → Identificar sad paths y puntos de falla posibles
PASO 5 → Mapear dependencias entre flujos
PASO 6 → Asignar a suite de smoke o regresión
PASO 7 → Generar docs/critical-flows.md
```

## Reporte

```
🗺️ CRITICAL-FLOW-MAPPER [QA] — REPORTE
════════════════════════════════════════════════
HU analizadas:                   X
Flujos críticos identificados:   X
  Criticidad Alta:               X → incluidos en smoke suite
  Criticidad Media:              X → incluidos en regresión

Happy paths documentados:        X
Sad paths identificados:         X por flujo (promedio)
Dependencias mapeadas:           X relaciones entre flujos

Documento generado: docs/critical-flows.md ✅
════════════════════════════════════════════════
```
