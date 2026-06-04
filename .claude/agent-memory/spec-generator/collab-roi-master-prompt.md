---
name: collab-roi-master-prompt
description: Sistema visual y componentes obligatorios para Collab ROI Explorer — referencia de diseño integral
metadata:
  type: project
---

**PROMPT MAESTRO — Collab ROI Explorer**

**Ubicación:** `d:\Estudio\studyVue\pokemon-game\src\node_modules\asd\.github\requirements\collab-roi-master-prompt.md`

**Filosofía UX:**
- Minimalista, cálida, profesional
- NO Excel / NO dashboard financiero antiguo
- SÍ SaaS premium / SÍ workspace moderno / SÍ herramienta de consultoría

**Paleta de colores:**
- Fondo: #FBFBFA
- Superficies: #FFFFFF
- Texto principal: #0F172A
- Verde principal: #10B981
- Ámbar pedagógico: #B45309
- Gris secundario: #71717A
- Bordes: #E4E4E7 (1px, border-radius 8-12px)
- Sombras: 0 20px 60px rgba(15,23,42,0.04), 0 8px 24px rgba(15,23,42,0.03)

**Tipografía:**
- Familias: Inter / Plus Jakarta Sans / ui-sans-serif
- Interlineado: generoso

**Templates (además de Agroinsumos):**
- Restaurante / Reservas
- Inmobiliaria
- WhatsApp Comercial
- Turismo
- Personalizado

**Componentes requeridos:**
- AppShell (layout global)
- Sidebar (navegación + toggle aprendiz/experto)
- Topbar (contexto de exploración activa)
- DashboardHome (bienvenida, resumen día, exploraciones activas, consejo pedagógico)
- ProgressRing (anillo progreso academia + calidad datos)
- AcademyLessonCard (tarjeta lección con progreso)
- ContextualModal (pedagógico)
- SuggestionReviewPanel (panel revisión sugerencias curador)

**Academia ROI:**
- Lecciones completadas / total
- Porcentaje avance
- Próxima recomendación
- Hitos/badges
- Evaluaciones o retos simples

**Dashboard enriquecido:**
- Bienvenida personalizada
- Resumen día (exploraciones activas, calidad promedio)
- Próxima sesión programada
- Consejo pedagógico día
- Acciones rápidas: Nueva Exploración, Preparar Sesión, Ir a Academia

**Estados de interacción:**
- Hover: elevación sutil, borde más visible
- Focus: borde #10B981, ring verde opacidad baja (accesible)
- Completed: verde sutil + badge "Validado"/"Completado"
- Warning: fondo ámbar opacidad baja, mensaje calmado

**Principio rector:**
Pasar de "No sé cómo explorar cliente ni explicar ROI" a "Entiendo cliente, identifico oportunidad, explico valor, presento propuesta con confianza."
