---
name: 'Clean Code Reviewer'
description: 'Revisa y refactoriza código aplicando principios SOLID, patrones de diseño y los lineamientos del proyecto'

---

## ⚠️ Prerrequisito

El agente debe haber cargado `.github/guidelines/guidelines.md` antes de ejecutar esta skill.
Aplica EXCLUSIVAMENTE los estándares definidos en **Sección 1 - Estándares de Código**.

---

## Instrucciones de Ejecución

### Paso 1 - Inventario
Lee todos los archivos de código fuente del proyecto usando la tool `codebase`.
Genera una lista de archivos a revisar, excluyendo: `node_modules`, `dist`, `build`, `.git`.

### Paso 2 - Checklist SOLID por archivo

Para cada archivo evalúa:

| Principio | Verificación |
|-----------|-------------|
| **S** - Single Responsibility | ¿Cada clase/función tiene una sola razón para cambiar? |
| **O** - Open/Closed | ¿Se puede extender sin modificar el código existente? |
| **L** - Liskov Substitution | ¿Las subclases son sustituibles por su clase base? |
| **I** - Interface Segregation | ¿Las interfaces son específicas, no genéricas? |
| **D** - Dependency Inversion | ¿Se depende de abstracciones, no de implementaciones? |

### Paso 3 - Detectar Code Smells

Busca y corrige los siguientes problemas según lineamientos:

- **Función larga** (> 20 líneas según lineamientos) → extraer en funciones menores con nombres descriptivos
- **Clase larga** (> 200 líneas según lineamientos) → dividir en clases con responsabilidad única
- **Código duplicado** → extraer a función o clase común reutilizable
- **Nombres confusos** (`x`, `data`, `temp`, `aux`, `obj`, `var1`) → renombrar descriptivamente según lineamientos
- **Números mágicos** (`if status == 3`) → extraer a constantes nombradas (`if status == STATUS_ACTIVE`)
- **Comentarios que explican QUÉ** → reescribir el código para que se explique solo
- **Funciones con efectos secundarios ocultos** → hacerlos explícitos o eliminarlos

### Paso 4 - Aplicar Patrones de Diseño

Aplica los siguientes patrones según el contexto detectado:

| Patrón | Cuándo aplicar |
|--------|----------------|
| **Repository Pattern** | Si hay acceso directo a BD en servicios o controllers |
| **Factory Pattern** | Si hay múltiples instanciaciones condicionales |
| **Strategy Pattern** | Si hay múltiples if/else por tipo de comportamiento |
| **Observer Pattern** | Si hay eventos o notificaciones entre componentes |
| **Decorator Pattern** | Si hay funcionalidad transversal repetida (logging, validación) |

### Paso 5 - Validar Nomenclatura (según lineamientos Sección 1)

Verifica que el código siga exactamente los estándares del lineamiento:
- Clases en PascalCase
- Métodos y variables en camelCase
- Constantes en UPPER_SNAKE_CASE
- Archivos en kebab-case

### Paso 6 - Validar Estructura de Carpetas (según lineamientos Sección 1)

Verifica que los archivos estén en las carpetas correctas:
- `controllers/` → solo manejo de requests/responses
- `services/` → solo lógica de negocio
- `repositories/` → solo acceso a datos
- `models/` → solo entidades y DTOs
- `utils/` → solo funciones utilitarias

---

## Output Esperado

Para cada archivo revisado:

```
📁 [nombre-archivo]
─────────────────────────────────
Violaciones encontradas:
  ⚠️  [descripción del problema] → [línea X]

Cambios aplicados:
  ✅ [descripción del cambio]
  ✅ [patrón de diseño aplicado y justificación]

Lineamiento aplicado: Sección 1 - [regla específica]
```

Al finalizar todos los archivos:

```
🔵 SKILL clean-code-reviewer COMPLETADA
────────────────────────────────────────
Archivos revisados:      X
Funciones refactorizadas: X
Patrones aplicados:      X
Violaciones corregidas:  X
Cumplimiento Sección 1:  X%
```
