# Definition of Ready (DoR) del Proyecto

> ⚠️ **PLANTILLA** — Reemplazar el contenido de ejemplo con los criterios DoR del equipo.
> Este archivo es leído por los agentes antes de iniciar una spec para verificar que el requerimiento está listo para desarrollo.

---

## 1) Criterios de negocio (obligatorios)

Una historia está Ready cuando:

1. Usa estructura completa **Como / Quiero / Para que**.
2. Usa términos canónicos del diccionario de dominio vigente.
3. El rol está definido de forma unívoca.
4. El valor de negocio es claro y verificable (sin subjetivos sin métrica).
5. No contiene términos ambiguos sin operacionalizar.

---

## 2) Criterios de aceptación BDD (obligatorios)

1. Criterios en formato **Dado / Cuando / Entonces**.
2. Cubren: escenario feliz, validaciones de entrada, errores de negocio esperados.
3. Cada criterio es testeable y tiene resultado observable.
4. Sin decisiones de comportamiento abiertas.

---

## 3) Contrato API (obligatorio para historias con endpoints)

1. Método HTTP y ruta versionada definidos.
2. Request explícito: campos obligatorios, tipos, reglas de validación.
3. Response explícito: estructura de éxito y de error definidas.
4. Códigos HTTP definidos y coherentes con el estándar del proyecto.

---

## 4) Alineación técnica (obligatorios)

1. Pertenece a un único contexto funcional o justifica explícitamente cruces.
2. Encaja en la arquitectura del proyecto (ver `project_architecture.context.md`).
3. Respeta el stack aprobado (ver `tech_stack_constraints.context.md`).
4. El impacto estimado es manejable en un sprint.

---

## 5) Preparación para ejecución (obligatorios)

1. Cumple INVEST (**Small** y **Testeable** son decisivos).
2. Dependencias críticas identificadas.
3. Riesgos principales identificados con mitigación inicial.
4. Estimable por el equipo sin supuestos críticos pendientes.

---

## 6) Checklist de entrada

- [ ] Términos canónicos del dominio.
- [ ] Criterios BDD completos y verificables.
- [ ] Contrato API explícito (cuando aplica).
- [ ] Alineación con arquitectura y stack aprobados.
- [ ] Dependencias y riesgos documentados.
- [ ] Aceptación del equipo en refinamiento/planning.

---

## 7) Relación DoR vs DoD

- **DoR**: controla la calidad de entrada al desarrollo.
- **DoD**: controla la calidad de salida al terminar la implementación.

Una historia puede iniciar desarrollo solo si está **Ready**, y solo puede cerrarse si está **Done**.
