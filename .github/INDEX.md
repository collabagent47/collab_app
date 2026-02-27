# Índice del Proyecto ASD

Inventario completo de agentes, prompts, skills y documentación con sus relaciones.

---

## 🤖 Agentes (`agents/`)

| Archivo | Nombre | Descripción |
|---------|--------|-------------|
| `agent_orchestrator.agent.md` | Orchestrator Agent | Orquestador maestro. Coordina el pipeline GAIDD y delega a agentes especializados |
| `agent_spec.agent.md` | Spec Agent | Ejecuta el pipeline GAIDD completo (Pasos 0 → 3) |
| `agent_backend.agent.md` | Backend Agent | Implementación de lógica de negocio, APIs y persistencia |
| `agent_frontend.agent.md` | Frontend Agent | Implementación de interfaces, componentes y flujos de usuario |
| `agent_qa.agent.md` | QA Agent | Estrategia de pruebas, casos Gherkin, riesgos y automatización |
| `agent_automation.agent.md` | Automation Agent | Pipelines CI/CD, README y release notes |
| `agent_spec_gaidd.epic-vs-user-story-evaluator.agent.md` | Santiago | Paso 0: Evaluación INVEST — clasifica HU vs Épica |
| `agent_spec_gaidd.high-level-requirement-evaluator.agent.md` | — | Paso 0: Evaluación IEEE 830 para requerimientos tradicionales |
| `agent_spec_gaidd.requirement-validator.agent.md` | — | Paso 2: Validación de completitud y viabilidad técnica |
| `agent_spec_gaidd.requirement-analysis.agent.md` | Tomás | Paso 3: Análisis técnico (QUÉ / DÓNDE / POR QUÉ) |

---

## 📝 Prompts (`prompts/`)

### Flujos Principales
| Archivo | Descripción |
|---------|-------------|
| `prompt_full-flow.prompt.md` | **Punto de entrada recomendado.** Ejecuta el ecosistema completo: GAIDD → selección de agente |
| `prompt_spec.prompt.md` | Ejecuta solo el pipeline GAIDD (validación de requerimiento) |
| `prompt_backend.prompt.md` | Activa directamente el Backend Agent |
| `prompt_frontend.prompt.md` | Activa directamente el Frontend Agent |
| `prompt_qa.prompt.md` | Activa directamente el QA Agent |
| `prompt_automation.prompt.md` | Activa directamente el Automation Agent |

### Flujos Rápidos (`prompt_quick_*`)
| Archivo | Descripción |
|---------|-------------|
| `prompt_quick_spec.prompt.md` | Validación rápida de requerimiento |
| `prompt_quick_tests.prompt.md` | Generación rápida de casos de prueba |
| `prompt_quick_review.prompt.md` | Revisión rápida de código |
| `prompt_quick_pipeline.prompt.md` | Generación rápida de pipeline CI/CD |

### Prompts del Pipeline GAIDD (`prompt_spec_gaidd.*`)
| Archivo | Paso | Descripción |
|---------|------|-------------|
| `prompt_spec_gaidd.granularity-classifier.prompt.md` | Paso 0 | Clasifica el artefacto (HU vs Req. Tradicional) y activa agente correspondiente |
| `prompt_spec_gaidd.requirement-validator.prompt.md` | Paso 2 | Valida completitud y viabilidad técnica |
| `prompt_spec_gaidd.requirement-conflict-resolver.prompt.md` | Paso 2.1 | Resuelve conflictos y ambigüedades detectados |
| `prompt_spec_gaidd.requirement-analysis.prompt.md` | Paso 3 | Análisis técnico del requerimiento |

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
Reportes generados automáticamente por el pipeline GAIDD, organizados por artefacto:
```
docs/output/
└── {artifact_id}/
    ├── {artifact_id}.step_1.epic_vs_user-story_evaluation.md
    ├── {artifact_id}.step_2.requirement-validator.md
    ├── {artifact_id}.step_2.resolution-of-conflicts.md
    └── {artifact_id}.step_3.requirement-analysis.md
```

### Framework GAIDD (`docs/GAIDD/`)
Documentación del framework y prompts internos del pipeline de implementación (Fases 1-7).

---

## 🔗 Relaciones Clave

```
prompt_full-flow.prompt.md
       ↓ activa
agent_orchestrator.agent.md
       ↓ ejecuta
prompt_spec_gaidd.granularity-classifier.prompt.md
       ↓ activa según tipo
agent_spec_gaidd.epic-vs-user-story-evaluator.agent.md  (HU)
agent_spec_gaidd.high-level-requirement-evaluator.agent.md  (Req. Tradicional)
       ↓ continúa a
agent_spec_gaidd.requirement-validator.agent.md  (Paso 2)
       ↓ continúa a
agent_spec_gaidd.requirement-analysis.agent.md  (Paso 3)
       ↓ orquestador presenta menú
agent_backend.agent.md  →  skill_backend_*.md
agent_frontend.agent.md →  skill_frontend_*.md
agent_qa.agent.md       →  skill_qa_*.md
agent_automation.agent.md → skill_automation_*.md
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
```
