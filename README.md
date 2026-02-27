# ASD — AI-Driven Development Framework

Framework de desarrollo impulsado por IA basado en el modelo **GAIDD** (Generative AI-Driven Development). Orquesta agentes especializados de GitHub Copilot para validar, analizar e implementar requerimientos de software con coherencia, trazabilidad y calidad.

---

## Estructura

```
.github/
├── agents/          # 10 agentes especializados (.agent.md)
├── prompts/         # 14 prompts de entrada (.prompt.md)
├── skills/          # 17 habilidades reutilizables por dominio
├── docs/
│   ├── config/      # config.yaml — configuración del usuario
│   ├── lineamientos/ # Estándares dev, QA y generales
│   ├── context/     # Arquitectura, dominio, stack técnico, DoD, DoR
│   ├── GAIDD/       # Documentación del framework
│   └── output/      # Reportes generados (por artefacto)
├── INDEX.md         # Inventario completo con relaciones
└── HU-P001.md       # Ejemplo de Historia de Usuario
README.md            # Este archivo
```

---

## Inicio Rápido

### 1. Configura tu perfil

Edita [`.github/docs/config/config.yaml`](.github/docs/config/config.yaml):

```yaml
user_name: TuNombre
user_role: TuRol
seniority_level: Junior | Mid | Senior
communication_language: Español
document_output_language: Español
requirements_folder: "{project-root}/.github/docs/requirements"
output_folder: "{project-root}/.github/docs/output"
```

### 2. Ejecuta el pipeline completo

En GitHub Copilot Chat, escribe:

```
/prompt_full-flow
```

Luego pega tu Historia de Usuario o Requerimiento. El sistema clasifica, evalúa y genera el reporte automáticamente.

---

## Prompts Disponibles

| Prompt | Descripción |
|--------|-------------|
| `prompt_full-flow` | **Recomendado.** Pipeline GAIDD completo → agente especializado |
| `prompt_spec` | Solo validación del requerimiento (pasos 0–3) |
| `prompt_backend` | Activa directamente el agente de backend |
| `prompt_frontend` | Activa directamente el agente de frontend |
| `prompt_qa` | Activa directamente el agente de QA |
| `prompt_automation` | Activa directamente el agente de automatización |
| `prompt_quick_*` | Flujos rápidos: spec, tests, review, pipeline |

---

## Pipeline GAIDD

```
Artefacto de entrada
       ↓
[Paso 0] Clasificación → HU o Req. Tradicional
       ↓
[Paso 0] Evaluación INVEST / IEEE 830
       ↓
[Paso 2] Validación de completitud y viabilidad
       ↓
[Paso 3] Análisis técnico (QUÉ / DÓNDE / POR QUÉ)
       ↓
Selección de agente especializado
(Backend / Frontend / QA / Automation)
       ↓
Generación en docs/output/{artifact_id}/
```

---

## Documentación Completa

Consulta el [Índice del Proyecto](.github/INDEX.md) para un inventario detallado de todos los agentes, prompts, skills y sus relaciones.

