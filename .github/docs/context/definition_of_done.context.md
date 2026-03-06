# Definition of Done (DoD) del Proyecto

> ⚠️ **PLANTILLA** — Reemplazar el contenido de ejemplo con los criterios DoD del equipo.
> Este archivo es leído por los agentes para verificar que las specs e implementaciones cumplen los criterios de terminado.

---

## 1) Criterios de negocio

Una historia se considera "Done" cuando:

1. Usa términos canónicos del diccionario de dominio vigente.
2. No contiene términos ambiguos sin criterio verificable.
3. Tiene estructura completa **Como / Quiero / Para que**.
4. Contiene criterios de aceptación en formato **BDD (Dado / Cuando / Entonces)**.
5. Los criterios cubren: escenario feliz, validaciones, errores esperados.

---

## 2) Criterios funcionales

1. Contrato de API completo: método, ruta versionada, request, response, códigos HTTP.
2. Respuestas de error en formato consistente definido por el proyecto.
3. Validaciones de entrada cubiertas para los campos críticos de la historia.

---

## 3) Criterios técnicos y arquitectura

1. Respeta la arquitectura en capas del proyecto (ver `project_architecture.context.md`).
2. No introduce tecnologías fuera del stack aprobado (ver `tech_stack_constraints.context.md`).
3. Sin antipatrones prohibidos por los lineamientos del CoE.
4. Manejo de errores consistente con el contrato público del API.

---

## 4) Calidad de código

1. Código compilable y sin errores de build.
2. Nombres coherentes con la responsabilidad de dominio.
3. Cumple los límites definidos en `dev-guidelines.md` (≤ 50 LOC/función, ciclomática ≤ 10).
4. Sin código duplicado, muerto ni valores mágicos.

---

## 5) Pruebas

1. Evidencia de pruebas exitosas para los criterios de aceptación.
2. Cobertura ≥ 80% en lógica de negocio (quality gate bloqueante en CI).
3. Los cambios no rompen contratos existentes del módulo.

---

## 6) Documentación y trazabilidad

1. HU y criterios finales actualizados antes de cerrar.
2. Decisiones de diseño relevantes registradas.
3. Trazabilidad entre implementación y criterios de aceptación (PR o artefacto equivalente).

---

## 7) Checklist de cierre

- [ ] Términos canónicos del dominio.
- [ ] Criterios BDD completos y verificables.
- [ ] Contrato API explícito (request / response / errores).
- [ ] Implementación alineada con arquitectura y stack aprobados.
- [ ] Pruebas ejecutadas con resultado satisfactorio.
- [ ] Sin antipatrones ni desvíos de lineamientos.
- [ ] Documentación / artefactos actualizados.
- [ ] Revisión técnica completada (PR o mecanismo equivalente).
