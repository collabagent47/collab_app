---
description: 'Skill independiente: Genera tests de contrato (consumer-driven contract testing) entre servicios.'
agent: 'agent'
---

Activa únicamente el skill `contract-test-generator` del Backend Agent.

Lee el skill en `.github/skills/skill_backend_contract-test-generator.md` y aplícalo sobre el siguiente input:

**[PEGA AQUÍ: definición del contrato de la API — consumer, provider, endpoints, payloads esperados]**

**Instrucciones:**
1. Cargar `.github/docs/lineamientos/dev-guidelines.md`
2. Identificar consumer y provider del contrato
3. Generar tests de contrato que validen:
   - Estructura del request (campos obligatorios, tipos, formatos)
   - Estructura del response (campos, tipos, códigos HTTP)
   - Compatibilidad de versiones
4. Usar Pact o equivalente según el stack del proyecto

**Output esperado:** Archivo de contract tests con pacts definidos listos para ejecutar
