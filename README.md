# ASD — AI-Driven Development Framework

Framework de desarrollo impulsado por IA, basado en el modelo **GAIDD** (Generative AI-Driven Development). Proporciona un ecosistema de agentes especializados, prompts estructurados y skills reutilizables para guiar el ciclo completo de desarrollo de software: desde la validación de requerimientos hasta la implementación y automatización.

---

## ¿Qué es GAIDD?

**GAIDD** es una metodología de desarrollo que integra GitHub Copilot como orquestador de un pipeline de agentes de IA especializados. Cada agente tiene un rol definido y colabora en orden para asegurar calidad, trazabilidad y consistencia a lo largo del proceso de desarrollo.

---

## Estructura del Proyecto

```
.github/
├── agents/        → Agentes especializados (backend, frontend, QA, automation, orchestrator, spec)
├── prompts/       → Prompts de entrada para iniciar flujos y activar skills/agentes
├── skills/        → Habilidades reutilizables por dominio (qa, backend, frontend, automation)
└── docs/
    ├── config/        → Configuración de usuario (config.yaml)
    ├── context/       → Contexto del proyecto (arquitectura, stack, dominio)
    ├── lineamientos/  → Estándares de desarrollo y QA
    ├── output/        → Reportes generados por el pipeline GAIDD
    ├── requirements/  → Requerimientos e historias de usuario
    └── GAIDD/         → Documentación del framework y fases del pipeline
```

---

## Inicio Rápido

### 1. Configura tu perfil
Edita `.github/docs/config/config.yaml` con tus datos:
```yaml
user_name: TuNombre
user_role: TuRol
seniority_level: Senior
communication_language: Español
```

### 2. Ejecuta el flujo completo
Usa el prompt principal en GitHub Copilot Chat:
```
@workspace #file:.github/prompts/prompt_full-flow.prompt.md
```

### 3. Flujos disponibles

| Prompt | Descripción |
|--------|-------------|
| `prompt_full-flow.prompt.md` | Flujo completo: GAIDD → Selección de agente |
| `prompt_spec.prompt.md` | Solo pipeline GAIDD (validación de requerimiento) |
| `prompt_backend.prompt.md` | Agente backend directamente |
| `prompt_frontend.prompt.md` | Agente frontend directamente |
| `prompt_qa.prompt.md` | Agente QA directamente |
| `prompt_automation.prompt.md` | Agente automation directamente |
| `prompt_quick_*.prompt.md` | Flujos rápidos por dominio |

---

## Pipeline GAIDD

```
Requerimiento / HU
       ↓
  Paso 0: Clasificación (HU vs Req. Tradicional)
       ↓
  Paso 1: Evaluación INVEST / IEEE 830
       ↓
  Paso 2: Validación de completitud y viabilidad
       ↓
 Paso 2.1: Resolución de conflictos (si aplica)
       ↓
  Paso 3: Análisis técnico (QUÉ / DÓNDE / POR QUÉ)
       ↓
  Selección de Agente (Backend / Frontend / QA / Automation)
```

---

## Índice Completo

Ver [.github/INDEX.md](.github/INDEX.md) para el inventario completo de agentes, prompts y skills con sus relaciones.

