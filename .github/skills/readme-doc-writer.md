---
name: 'README Doc Writer'
description: 'Genera o actualiza documentación README completa aplicando los lineamientos del proyecto'
---

## ⚠️ Prerrequisito

El agente debe haber cargado `.github/guidelines/guidelines.md` antes de ejecutar esta skill.
Documenta siguiendo TODOS los lineamientos definidos en el archivo.
El README debe reflejar los estándares reales del proyecto según los lineamientos.

---

## Instrucciones de Ejecución

### Paso 1 - Inventario del Proyecto

Lee el proyecto con `codebase` y recopila:
- Nombre, propósito y descripción del proyecto
- Lenguaje y framework principal
- Dependencias principales (package.json, pom.xml, requirements.txt, etc.)
- Scripts disponibles (start, test, build, deploy)
- Variables de entorno requeridas
- Endpoints de API disponibles
- Arquitectura: monolito, microservicios, frontend/backend

### Paso 2 - Estructura del README

Genera el README.md con las siguientes secciones en orden:

```markdown
# [Nombre del Proyecto]

[Badge de build] [Badge de cobertura] [Badge de versión]

> [Descripción breve en una línea]

## 📋 Tabla de Contenidos
- [Descripción](#descripción)
- [Tecnologías](#tecnologías)
- [Prerequisitos](#prerequisitos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Uso](#uso)
- [API Reference](#api-reference)
- [Testing](#testing)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Contribución](#contribución)
- [Lineamientos de Desarrollo](#lineamientos-de-desarrollo)

## 📖 Descripción
[Descripción detallada del propósito y funcionalidades principales]

## 🛠️ Tecnologías
[Lista del stack tecnológico con versiones]

## ✅ Prerequisitos
[Versiones requeridas de runtime, herramientas, etc.]

## 🚀 Instalación
[Pasos de instalación con comandos exactos y verificables]

## ⚙️ Configuración
[Variables de entorno requeridas - NUNCA con valores reales]

## 💻 Uso
[Comandos para iniciar, detener, construir el proyecto]

## 📡 API Reference
[Documentar TODOS los endpoints según formato del lineamiento Sección 3]

## 🧪 Testing
[Cómo ejecutar cada tipo de test: unitarios, integración, E2E]
[Comando para ver reporte de cobertura]
[Cobertura mínima requerida según lineamientos: 80%]

## 📁 Estructura del Proyecto
[Árbol de carpetas explicando cada directorio según lineamiento Sección 1]

## 🤝 Contribución
[Convenciones de ramas y commits según lineamiento Sección 4]

## 📋 Lineamientos de Desarrollo
[Referencia a .github/guidelines/guidelines.md]
[Resumen de reglas más importantes]
```

### Paso 3 - Documentar API Reference

Para CADA endpoint documenta con el formato del lineamiento Sección 3:

```markdown
### POST /api/users

Crea un nuevo usuario en el sistema.

**Request Body:**
| Campo    | Tipo   | Requerido | Descripción          |
|----------|--------|-----------|----------------------|
| name     | string | ✅        | Nombre completo      |
| email    | string | ✅        | Email único          |
| role     | string | ❌        | Rol (default: USER)  |

**Response exitoso (201):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  },
  "message": "Usuario creado exitosamente",
  "timestamp": "2026-02-25T00:00:00Z"
}
```

**Errores posibles:**
| Código | Error Code       | Descripción               |
|--------|------------------|---------------------------|
| 400    | INVALID_DATA     | Datos de entrada inválidos|
| 409    | EMAIL_DUPLICATE  | Email ya registrado       |
```

### Paso 4 - Variables de Entorno

Documenta TODAS las variables de entorno requeridas.
**NUNCA incluir valores reales** (lineamiento Sección 5 - Seguridad):

```bash
# .env.example - Copiar a .env y completar con valores reales
DATABASE_URL=postgresql://user:password@host:5432/dbname
JWT_SECRET=your-secret-key-here
API_PORT=3000
NODE_ENV=development
```

### Paso 5 - Sección de Contributing

Incluir las convenciones del lineamiento Sección 4:

```markdown
## 🤝 Contribución

### Ramas
- `feature/[ticket]-descripcion` para nuevas funcionalidades
- `bugfix/[ticket]-descripcion` para corrección de bugs

### Commits (Conventional Commits)
- `feat:` nueva funcionalidad
- `fix:` corrección de bug
- `test:` agregando tests
- `docs:` actualización de documentación
- `refactor:` refactorización sin cambio funcional
```

---

## Output Esperado

```
📄 SKILL readme-doc-writer COMPLETADA
────────────────────────────────────────
README.md generado/actualizado: ✅
Secciones incluidas:            X de X
Endpoints documentados:         X
Variables de entorno:           X
Lineamientos referenciados:     Todas las secciones ✅
Archivo:                        README.md
```
