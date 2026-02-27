---
description: 'Skill que genera casos de prueba en formato Gherkin a partir de los criterios de aceptación del SPEC. Cubre happy paths, error paths y edge cases con lenguaje de negocio claro y verificable.'
---

# Skill: gherkin-case-generator [QA]

## Responsabilidad
Transformar los criterios de aceptación del SPEC en casos de prueba
Gherkin completos, precisos y verificables.

---

## Estándares Gherkin (según qa-guidelines)

### Reglas de formato obligatorias
```gherkin
# Idioma: Español (por defecto) o Inglés (consistente con el proyecto)
# Encoding: UTF-8
# Indentación: 2 espacios
# Máximo: 80 caracteres por línea
# Prohibido: tecnicismos como "POST /api/v1/", IDs de base de datos

# Nomenclatura del archivo: [dominio]-[funcionalidad].feature
# Ejemplo: autenticacion-login.feature, pedidos-crear.feature
```

### Plantilla base de Feature file
```gherkin
#language: es
Característica: [Nombre de la funcionalidad — mismo que la HU]
  Como [rol de negocio del usuario]
  Quiero [acción o capacidad]
  Para [valor de negocio que obtiene]

  Contexto:
    Dado que el sistema está disponible
    Y existe un usuario con rol "[rol]" en el sistema

  # ═══════════════════════════════════
  # HAPPY PATH — flujo exitoso principal
  # ═══════════════════════════════════
  @happy-path @critico
  Escenario: [descripción del flujo exitoso en lenguaje de negocio]
    Dado que [precondición del negocio — no técnica]
    Cuando [el usuario realiza la acción de negocio]
    Entonces [resultado de negocio verificable]
    Y [resultado secundario verificable si aplica]

  # ═══════════════════════════════════
  # ERROR PATH — manejo de errores
  # ═══════════════════════════════════
  @error-path
  Escenario: [descripción del error desde perspectiva del usuario]
    Dado que [precondición del escenario de error]
    Cuando [el usuario realiza la acción con datos inválidos]
    Entonces [el sistema muestra el mensaje de error apropiado]
    Y [el sistema NO realiza la operación destructiva]

  # ═══════════════════════════════════
  # EDGE CASE — casos borde del negocio
  # ═══════════════════════════════════
  @edge-case
  Escenario: [descripción del caso borde]
    Dado que [contexto en el límite del negocio]
    Cuando [el usuario actúa en ese límite]
    Entonces [el sistema responde apropiadamente al límite]

  # ═══════════════════════════════════
  # ESQUEMA DE ESCENARIO — multiples datos
  # ═══════════════════════════════════
  @parametrizado
  Esquema del escenario: Validar [campo] con diferentes valores
    Dado que el usuario completa el formulario con [campo] = "<valor>"
    Cuando intenta guardar el formulario
    Entonces el sistema muestra "<resultado_esperado>"

    Ejemplos:
      | valor          | resultado_esperado                    |
      | ""             | "El campo es requerido"               |
      | "x"            | "Mínimo 3 caracteres"                 |
      | "valor válido" | "Formulario guardado correctamente"   |
```

---

## Tags Obligatorios por Tipo de Escenario

```
@critico        → escenario de alto impacto en negocio (debe estar en smoke suite)
@happy-path     → flujo exitoso principal
@error-path     → manejo de errores de negocio
@edge-case      → casos borde
@parametrizado  → escenarios con múltiples conjuntos de datos
@regresion      → incluir en suite de regresión
@wip            → en construcción, excluir de pipeline
@manual         → requiere ejecución manual, no automatizable
@performance    → escenario con validación de tiempo de respuesta
```

---

## Proceso de Generación

```
PASO 1 → Tomar cada HU con sus criterios de aceptación del SPEC
PASO 2 → Identificar el happy path principal de cada HU
PASO 3 → Identificar todos los error paths posibles
PASO 4 → Identificar edge cases del negocio
PASO 5 → Generar el .feature file con todos los escenarios
PASO 6 → Verificar que el Gherkin usa lenguaje de negocio (no técnico)
PASO 7 → Asignar tags correctamente
PASO 8 → Guardar en /tests/features/[dominio]/[nombre].feature
```

## Reporte de Generación

```
🥒 GHERKIN-CASE-GENERATOR [QA] — REPORTE
════════════════════════════════════════════════
HU procesadas:                   X
Feature files generados:         X

Casos generados por tipo:
  Happy paths:                   X
  Error paths:                   X
  Edge cases:                    X
  Esquemas parametrizados:       X
  TOTAL:                         X

Tags aplicados:
  @critico:                      X
  @regresion:                    X
  @manual:                       X

Archivos generados:
  tests/features/[dominio]/*.feature  ✅
════════════════════════════════════════════════
```
