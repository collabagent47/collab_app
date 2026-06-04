# Matriz de Riesgos — Collab ROI Explorer MVP
**Feature:** `collab-roi-explorer-mvp` | **Spec:** SPEC-002 | **Generado:** 2026-06-03
**Regla ASD:** Alto (A) = Obligatorio — bloquea release | Medio (S) = Recomendado | Bajo (D) = Opcional

---

## Resumen

Total: 18 | **Alto (A): 6** | **Medio (S): 8** | **Bajo (D): 4**

---

## Detalle

| ID    | HU     | Descripción del Riesgo                                              | Factores                                    | Nivel | Testing     |
|-------|--------|----------------------------------------------------------------------|---------------------------------------------|-------|-------------|
| R-001 | HU-04  | Motor ROI calcula beneficio con ventas brutas en lugar de margen    | Lógica de negocio compleja, impacto financiero estimado | **A** | Obligatorio |
| R-002 | HU-04  | División por cero cuando totalBenefit = 0 (payback)                | Lógica crítica sin fallback visible          | **A** | Obligatorio |
| R-003 | HU-04  | Resultados ROI falsamente optimistas sin alertas                    | Lógica compleja, alta frecuencia de uso     | **A** | Obligatorio |
| R-004 | HU-08  | Notas internas visibles en DOM durante modo presentación            | Datos sensibles internos expuestos a cliente | **A** | Obligatorio |
| R-005 | HU-07  | Sugerencia de usuario modifica plantilla oficial automáticamente    | Operación destructiva sobre datos base      | **A** | Obligatorio |
| R-006 | HU-04  | Escenario optimista mostrado como "garantizado" sin disclaimers     | Impacto comercial / reputacional             | **A** | Obligatorio |
| R-007 | HU-03  | Lógica de oportunidad (comercial/operativa/mixta) infiere mal tipo  | Lógica de negocio compleja                  | **S** | Recomendado |
| R-008 | HU-02  | Pérdida de datos en localStorage por borrado o expiración           | Persistencia sin backup ni sync             | **S** | Recomendado |
| R-009 | HU-11  | Precio promedio de insumos sobreescribe ticket confirmado sin avisar | Código nuevo, sin historial, lógica implícita | **S** | Recomendado |
| R-010 | HU-03  | DataBadge no diferencia "pendiente" de "confirmado" visualmente     | Componente con muchas dependencias          | **S** | Recomendado |
| R-011 | HU-01  | Dashboard no muestra estados correctos tras actualización de exploración | Alta frecuencia de uso, store reactivo   | **S** | Recomendado |
| R-012 | HU-04  | Escenarios conservador/optimista producen valores idénticos al medio | Factores 0.8/1.2× no aplicados correctamente | **S** | Recomendado |
| R-013 | HU-09  | Cambio de modo aprendiz/experto no persiste entre sesiones          | Preferencia de usuario — localStorage        | **S** | Recomendado |
| R-014 | HU-06  | Academia muestra contenido que contradice las reglas de negocio ROI | Contenido estático puede quedar desactualizado | **S** | Recomendado |
| R-015 | HU-05  | Preparación de sesión no guarda en la exploración correcta (bug de ID) | Feature interna, código nuevo              | **D** | Opcional    |
| R-016 | HU-10  | Resumen ejecutivo generado automáticamente con datos incorrectos    | Feature de contenido generado               | **D** | Opcional    |
| R-017 | HU-09  | UI de modo aprendiz/experto no es suficientemente diferenciada visualmente | Ajuste estético/UX                     | **D** | Opcional    |
| R-018 | HU-06  | Casos de práctica de Academia no coinciden con caso Fertilizantes Mix real | Contenido educativo vs fixture            | **D** | Opcional    |

---

## Plan de Mitigación — Riesgos ALTO

### R-001: Motor ROI usa ventas brutas como beneficio
- **Descripción**: El motor podría calcular `commercialBenefit = additionalSales` directamente, sin multiplicar por `grossMargin`, inflando el resultado hasta 5× el valor correcto.
- **Mitigación técnica**:
  - Función `calculateCommercialBenefit(additionalSales, grossMargin)` retorna 0 si `grossMargin` es falsy ✅
  - Test unitario dedicado: `commercialBenefit_usa_margen_no_ventas_brutas`
  - Alerta en UI si `grossMargin` está vacío al intentar calcular ROI
- **Tests obligatorios**:
  - `test_calculateCommercialBenefit_con_margen_20_retorna_567000`
  - `test_calculateCommercialBenefit_sin_margen_retorna_0`
  - `test_calculateROI_no_usa_ventas_brutas_como_beneficio`
- **Bloqueante para release**: ✅ Sí
- **Estado actual**: ✅ Cubierto en `src/tests/unit/roi-engine.test.ts`

---

### R-002: División por cero en payback
- **Descripción**: Si `totalBenefit === 0`, la fórmula `paybackMonths = monthlyInvestment / totalBenefit` produce `Infinity` o lanza error, rompiendo la UI.
- **Mitigación técnica**:
  - `calculatePayback` retorna `null` si `totalBenefit === 0` ✅
  - La UI muestra "No disponible" cuando `paybackMonths === null`
  - Zod valida que `monthlyInvestment >= 0`
- **Tests obligatorios**:
  - `test_calculatePayback_retorna_null_cuando_totalBenefit_es_cero`
  - `test_ui_muestra_no_disponible_cuando_payback_es_null`
- **Bloqueante para release**: ✅ Sí
- **Estado actual**: ✅ Cubierto en `src/tests/unit/roi-engine.test.ts`

---

### R-003: Resultados ROI falsamente optimistas sin alertas
- **Descripción**: El sistema podría mostrar ROI de 5000% sin advertir al usuario, generando expectativas irreales que dañan la credibilidad de Collab frente al cliente.
- **Mitigación técnica**:
  - `generateWarnings` dispara alertas para: ROI > 1000%, margen > 80%, tasa esperada > 50%, tasa esperada < actual ✅
  - Las alertas son visibles antes de mostrar los resultados
  - Tono de alerta calmado y pedagógico (no alarmista)
- **Tests obligatorios**:
  - `test_generateWarnings_roi_sobre_1000_porciento`
  - `test_generateWarnings_margen_sobre_80_porciento`
  - `test_generateWarnings_tasa_esperada_sobre_50_porciento`
  - `test_generateWarnings_tasa_esperada_menor_que_actual`
  - `test_ui_muestra_QualityWarning_cuando_hay_alertas`
- **Bloqueante para release**: ✅ Sí
- **Estado actual**: ✅ Cubierto en `src/tests/unit/roi-validations.test.ts`

---

### R-004: Notas internas visibles en modo presentación
- **Descripción**: Si `PresentationModePage` oculta notas con CSS (`display: none`) en lugar de no renderizarlas, el texto sigue en el DOM y es visible para quien inspecciona el HTML — o para screen readers en una sala de presentación.
- **Mitigación técnica**:
  - `PresentationModePage` NO importa ni usa el componente de notas internas — directamente no se renderiza ✅
  - Test de integración verifica que el texto de notas no está en el DOM
  - Revisión de código en PR obligatoria para este componente
- **Tests obligatorios**:
  - `test_modo_presentacion_notas_internas_no_en_DOM`
  - `test_modo_presentacion_alertas_privadas_no_en_DOM`
  - Test E2E: inspeccionar `document.body.innerHTML` para validar ausencia de notas
- **Bloqueante para release**: ✅ Sí
- **Estado actual**: ⚠️ Cubierto parcialmente en `src/tests/unit/components.test.tsx` — se requiere test E2E completo

---

### R-005: Sugerencia contamina plantilla oficial
- **Descripción**: Si el flujo de sugerencias no tiene el estado `pending_review` correctamente implementado, cualquier miembro del equipo podría modificar las fricciones base o módulos de la plantilla Agroinsumos permanentemente.
- **Mitigación técnica**:
  - Toda sugerencia se crea con `status: 'pending_review'` ✅
  - Solo el curador puede cambiar a `'approved'` o `'rejected'`
  - La plantilla base (`agroinsumos.template.ts`) es un archivo estático TypeScript — no se modifica por código de runtime
  - El `knowledgeService` nunca modifica los archivos de templates directamente
- **Tests obligatorios**:
  - `test_createSuggestion_status_es_pending_review`
  - `test_sugerencia_rechazada_no_altera_plantilla_oficial`
  - `test_plantilla_agroinsumos_inmutable_en_runtime`
- **Bloqueante para release**: ✅ Sí
- **Estado actual**: ✅ Cubierto en `src/tests/integration/exploration-creation.test.tsx`

---

### R-006: Escenario optimista sin disclaimers pedagógicos
- **Descripción**: La app resalta el escenario optimista por defecto. Sin disclaimers claros, el equipo podría presentarlo al cliente como un número garantizado, generando compromisos imposibles de cumplir.
- **Mitigación técnica**:
  - Bloque narrativo aparece ANTES de los números en la UI ✅
  - `ROIScenarioCard` incluye microcopy de disclaimer en todos los escenarios
  - Academia ROI incluye sección explícita "Qué no prometer"
  - El resumen ejecutivo incluye campo "Nivel de confianza"
- **Tests obligatorios**:
  - `test_pantalla_roi_muestra_narrativa_antes_que_numeros`
  - `test_ROIScenarioCard_incluye_disclaimer`
  - `test_academia_incluye_seccion_que_no_prometer`
- **Bloqueante para release**: ✅ Sí
- **Estado actual**: ⚠️ Test de narrativa-antes-números pendiente de test E2E

---

## Riesgos MEDIO — Acciones recomendadas

| ID    | Acción recomendada |
|-------|--------------------|
| R-007 | Extraer `inferOpportunityType` a función exportada en `domain/` y cubrirla con tests unitarios dedicados |
| R-008 | Documentar limitación de localStorage. Añadir mecanismo de exportación JSON como backup manual (TODO) |
| R-009 | Agregar confirmación explícita cuando ticket sugerido por insumo difiere > 20% del ticket ingresado manualmente |
| R-010 | Test visual (Storybook o snapshot) para DataBadge con los tres estados |
| R-011 | Test de integración para invalidación de caché del store al actualizar una exploración |
| R-012 | Agregar test de contrato: `optimistic.totalBenefit > medium.totalBenefit > conservative.totalBenefit` |
| R-013 | Test: `useAppMode` persiste en localStorage y se recupera al recargar |
| R-014 | Revisión manual del contenido de Academia contra reglas de negocio antes de cada release |

---

## Checklist de liberación (basado en riesgos ALTO)

```
[ ] R-001: Test unitario commercialBenefit con y sin margen — PASANDO
[ ] R-002: Test unitario payback null cuando totalBenefit=0 — PASANDO
[ ] R-003: Tests de generateWarnings (4 alertas) — PASANDO
[ ] R-004: Test DOM modo presentación sin notas internas — PASANDO
[ ] R-005: Test sugerencia pending_review no altera plantilla — PASANDO
[ ] R-006: Test narrativa aparece antes que números en pantalla ROI — PASANDO
[ ] DoD-027: Caso regresión Fertilizantes Mix escenario medio — PASANDO
[ ] Build de producción exitoso (npm run build) — PASANDO
[ ] Modo presentación validado visualmente — CONFIRMADO
[ ] UI no parece Excel — VALIDADO
```
