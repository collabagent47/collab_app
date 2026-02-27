# Índice del Proyecto ASD

Inventario completo de agentes, prompts, skills y documentación con sus relaciones.

---

## 🤖 Agentes (`agents/`)

| Archivo | Nombre | Descripción |
|---------|--------|-------------|
| `agent_orchestrator.agent.md` | Orchestrator | Orquestador maestro. Coordina el pipeline GAIDD y delega a agentes especializados |
| `agent_spec.agent.md` | Spec Agent | Ejecuta el pipeline GAIDD completo (Pasos 0 → 3) |
| `agent_backend.agent.md` | Backend Agent | Implementación de lógica de negocio, APIs y persistencia |
| `agent_frontend.agent.md` | Frontend Agent | Implementación de interfaces, componentes y flujos de usuario |
| `agent_qa.agent.md` | QA Agent | Estrategia de pruebas, casos Gherkin, riesgos y automatización |
| `agent_automation.agent.md` | Automation Agent | Pipelines CI/CD, README y release notes |
| `agent_spec_gaidd.epic-vs-user-story-evaluator.agent.md` | Evaluador INVEST | **Paso 0:** Evaluación INVEST — clasifica HU vs Épica |
| `agent_spec_gaidd.high-level-requirement-evaluator.agent.md` | — | **Paso 0:** Evaluación IEEE 830 para requerimientos tradicionales |
| `agent_spec_gaidd.requirement-validator.agent.md` | — | **Paso 2:** Validación de completitud y viabilidad técnica |
| `agent_spec_gaidd.requirement-analysis.agent.md` | Analizador Técnico | **Paso 3:** Análisis técnico (QUÉ / DÓNDE / POR QUÉ) |

---

## 📝 Prompts (`prompts/`)

### Flujos Principales

| Archivo | Descripción |
|---------|-------------|
| `prompt_agent_full-flow.prompt.md` | **Punto de entrada recomendado.** Ejecuta el ecosistema completo: GAIDD → selección de agente |
| `prompt_agent_spec.prompt.md` | Ejecuta solo el pipeline GAIDD (validación de requerimiento) |
| `prompt_agent_backend.prompt.md` | Activa directamente el Backend Agent |
| `prompt_agent_frontend.prompt.md` | Activa directamente el Frontend Agent |
| `prompt_agent_qa.prompt.md` | Activa directamente el QA Agent |
| `prompt_agent_automation.prompt.md` | Activa directamente el Automation Agent |

### Flujos Rápidos

| Archivo | Descripción |
|---------|-------------|
| `prompt_quick_spec.prompt.md` | Validación rápida de requerimiento |
| `prompt_quick_tests.prompt.md` | Generación rápida de casos de prueba |
| `prompt_quick_review.prompt.md` | Revisión rápida de código |
| `prompt_quick_pipeline.prompt.md` | Generación rápida de pipeline CI/CD |

### Prompts del Pipeline GAIDD

| Archivo | Paso | Descripción |
|---------|------|-------------|
| `prompt_agent_spec_gaidd.granularity-classifier.prompt.md` | Paso 0 | Clasifica el artefacto (HU vs Req. Tradicional) y activa agente correspondiente |
| `prompt_agent_spec_gaidd.requirement-validator.prompt.md` | Paso 2 | Valida completitud y viabilidad técnica |
| `prompt_agent_spec_gaidd.requirement-conflict-resolver.prompt.md` | Paso 2.1 | Resuelve conflictos y ambigüedades detectados |
| `prompt_agent_spec_gaidd.requirement-analysis.prompt.md` | Paso 3 | Análisis técnico del requerimiento |

### Prompts por Skill (ejecución independiente)

Permiten activar un skill específico sin cargar el agente completo.

**QA**

| Archivo | Skill que activa |
|---------|-----------------|
| `prompt_skill_qa_gherkin-case-generator.prompt.md` | Genera casos Gherkin a partir de criterios de aceptación |
| `prompt_skill_qa_test-strategy-planner.prompt.md` | Define estrategia base de pruebas |
| `prompt_skill_qa_risk-identifier.prompt.md` | Identifica riesgos técnicos y funcionales |
| `prompt_skill_qa_test-data-specifier.prompt.md` | Especifica datos de prueba |
| `prompt_skill_qa_critical-flow-mapper.prompt.md` | Mapea flujos críticos del sistema |
| `prompt_skill_qa_regression-strategy.prompt.md` | Define estrategia de regresión |
| `prompt_skill_qa_automation-flow-proposer.prompt.md` | Propone flujos candidatos para automatización |
| `prompt_skill_qa_performance-analyzer.prompt.md` | Analiza performance y define SLAs |

**Backend**

| Archivo | Skill que activa |
|---------|-----------------|
| `prompt_skill_backend_clean-code-reviewer.prompt.md` | Revisa y refactoriza código según SOLID y lineamientos |
| `prompt_skill_backend_integration-test-generator.prompt.md` | Genera tests de integración para un endpoint |
| `prompt_skill_backend_contract-test-generator.prompt.md` | Genera tests de contrato entre servicios |

**Frontend**

| Archivo | Skill que activa |
|---------|-----------------|
| `prompt_skill_frontend_component-reviewer.prompt.md` | Revisa calidad y buenas prácticas del componente |
| `prompt_skill_frontend_accessibility-checker.prompt.md` | Verifica accesibilidad WCAG 2.1 |
| `prompt_skill_frontend_ui-test-generator.prompt.md` | Genera tests de interfaz de usuario |

**Automation**

| Archivo | Skill que activa |
|---------|-----------------|
| `prompt_skill_automation_pipeline-config-generator.prompt.md` | Genera configuración completa de pipeline CI/CD |
| `prompt_skill_automation_readme-doc-writer.prompt.md` | Genera o actualiza README del proyecto/módulo |
| `prompt_skill_automation_release-notes-generator.prompt.md` | Genera notas de release / CHANGELOG |

---

## 🛠️ Skills (`skills/`)

### QA (`skill_qa_*`)

| Archivo | Descripción |
|---------|-------------|
| `skill_qa_test-strategy-planner.md` | Define la estrategia base de pruebas |
| `skill_qa_gherkin-case-generator.md` | Genera casos de prueba en formato Gherkin |
| `skill_qa_risk-identifier.md` | Identifica riesgos técnicos y funcionales |
| `skill_qa_test-data-specifier.md` | Especifica datos de prueba |
| `skill_qa_critical-flow-mapper.md` | Mapea flujos críticos del sistema |
| `skill_qa_regression-strategy.md` | Define estrategia de regresión |
| `skill_qa_automation-flow-proposer.md` | Propone flujos candidatos para automatización |
| `skill_qa_performance-analyzer.md` | Analiza requerimientos de performance y SLAs |

### Backend (`skill_backend_*`)

| Archivo | Descripción |
|---------|-------------|
| `skill_backend_clean-code-reviewer.md` | Revisa calidad del código generado |
| `skill_backend_integration-test-generator.md` | Genera tests de integración |
| `skill_backend_contract-test-generator.md` | Genera tests de contrato entre servicios |

### Frontend (`skill_frontend_*`)

| Archivo | Descripción |
|---------|-------------|
| `skill_frontend_component-reviewer.md` | Revisa componentes de UI |
| `skill_frontend_accessibility-checker.md` | Verifica accesibilidad (WCAG) |
| `skill_frontend_ui-test-generator.md` | Genera tests de interfaz de usuario |

### Automation (`skill_automation_*`)

| Archivo | Descripción |
|---------|-------------|
| `skill_automation_pipeline-config-generator.md` | Genera configuración de pipeline CI/CD |
| `skill_automation_readme-doc-writer.md` | Genera o actualiza documentación README |
| `skill_automation_release-notes-generator.md` | Genera notas de release |

---

## 📚 Documentación (`docs/`)

### Configuración (`docs/config/`)

| Archivo | Descripción |
|---------|-------------|
| `config.yaml` | **Configuración de usuario.** Nombre, rol, idioma, carpetas de entrada/salida |

### Lineamientos (`docs/lineamientos/`)

| Archivo | Descripción |
|---------|-------------|
| `guidelines.md` | Lineamientos generales del proyecto |
| `dev-guidelines.md` | Estándares de desarrollo (nomenclatura, estructura, reglas de código) |
| `qa-guidelines.md` | Estándares de QA (cobertura, Gherkin, automatización) |

### Contexto del Proyecto (`docs/context/`)

| Archivo | Descripción |
|---------|-------------|
| `project_architecture.context.md` | Arquitectura general del sistema |
| `project_architecture_standards.context.md` | Estándares y decisiones de arquitectura |
| `project_structure_principles.context.md` | Principios de estructura del proyecto |
| `tech_stack_constraints.context.md` | Stack tecnológico y restricciones |
| `business_domain_dictionary.context.md` | Diccionario del dominio de negocio |
| `architecture_decision_records.context.md` | Registro de decisiones de arquitectura (ADRs) |
| `definition_of_done.context.md` | Definición de completado (DoD) |
| `definition_of_ready.context.md` | Definición de listo (DoR) |
| `reglas-de-oro.md` | Reglas operativas de la IA en el proyecto |

### Outputs (`docs/output/`)

Reportes generados automáticamente por el pipeline GAIDD, organizados por agente. Ruta base configurada en `config.yaml` → `output_folder`.

```
.github/docs/output/
├── {artifact_id}/                        ← GAIDD pipeline (Spec Agent)
│   ├── {artifact_id}.step_1.epic_vs_user-story_evaluation.md
│   ├── {artifact_id}.step_2.requirement-validator.md
│   ├── {artifact_id}.step_2.resolution-of-conflicts.md
│   └── {artifact_id}.step_3.requirement-analysis.md
├── qa/                                   ← QA Agent ({qa_output_folder})
│   ├── test-strategy.md
│   ├── risk-matrix.md
│   ├── critical-flows.md
│   ├── regression-plan.md
│   ├── automation-roadmap.md
│   ├── performance-plan.md
│   ├── qa-quality-report.md
│   ├── features/{dominio}/*.feature
│   └── data/test-data-catalog.md
├── backend/                              ← Backend Agent ({backend_output_folder})
├── frontend/                             ← Frontend Agent ({frontend_output_folder})
└── automation/                           ← Automation Agent ({automation_output_folder})
```

---

## 🔗 Relaciones Clave

```
prompt_agent_full-flow.prompt.md
       ↓ activa
agent_orchestrator.agent.md
       ↓ ejecuta
prompt_agent_spec_gaidd.granularity-classifier.prompt.md
       ↓ activa según tipo de artefacto
┌──────────────────────────────────────────────────────────┐
│ Historia de Usuario → agent_spec_gaidd.epic-vs-user-story-evaluator  │
│ Req. Tradicional   → agent_spec_gaidd.high-level-requirement-evaluator │
└──────────────────────────────────────────────────────────┘
       ↓ Paso 2
agent_spec_gaidd.requirement-validator.agent.md
       ↓ Paso 3
agent_spec_gaidd.requirement-analysis.agent.md
       ↓ orquestador presenta menú de implementación
┌─────────────────────────────────────────────────────┐
│ agent_backend.agent.md    → skill_backend_*         │
│ agent_frontend.agent.md   → skill_frontend_*        │
│ agent_qa.agent.md         → skill_qa_*              │
│ agent_automation.agent.md → skill_automation_*      │
└─────────────────────────────────────────────────────┘
       ↓ genera reportes en
.github/docs/output/{agente}/
```

---

## ⚙️ Configuración Requerida

Antes de usar el framework, edita [docs/config/config.yaml](docs/config/config.yaml):

```yaml
user_name: TuNombre
user_role: TuRol
seniority_level: Junior | Mid | Senior
style_of_communication: profesional, claro, directo...
communication_language: Español
document_output_language: Español
requirements_folder: "{project-root}/.github/docs/requirements"
output_folder: "{project-root}/.github/docs/output"
qa_output_folder:         "{output_folder}/qa"
backend_output_folder:    "{output_folder}/backend"
frontend_output_folder:   "{output_folder}/frontend"
automation_output_folder: "{output_folder}/automation"
```
