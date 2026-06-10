---
name: init-framework
description: Bootstrapea el framework ASDD completo en un proyecto nuevo o existente. Copia todos los skills, rules y meta-prompts desde el repositorio fuente del framework. Una sola ejecución deja el proyecto listo para usar /deploy-setup, /generate-spec, /asdd-orchestrate y todos los demás skills.
argument-hint: "<ruta-proyecto-destino>"
---

# Skill: init-framework [BOOTSTRAP ASDD]

Instala el framework ASDD completo en cualquier proyecto en **una sola ejecución**.

Copia skills, rules y meta-prompts desde el repositorio fuente y los coloca en la estructura correcta del proyecto destino.

---

## Cuándo ejecutar

- Al iniciar un nuevo proyecto y querer todos los skills disponibles desde el día 1
- Al incorporar un repositorio existente al flujo ASDD
- Después de clonar un repo vacío que no tiene `.claude/`

---

## Proceso

```
1. Confirmar ruta del proyecto destino
2. Verificar que la ruta existe y es un proyecto (tiene package.json o es un repo git)
3. Copiar estructura completa de .claude/
4. Copiar estructura completa de .github/skills/ (mirror)
5. Descargar skill externo: emil-design-eng desde GitHub
6. Verificar que todos los archivos llegaron
7. Reportar resumen de lo instalado
```

---

## Paso 1 — Determinar origen y destino

**Origen (este proyecto):**
El framework vive en el directorio actual. Si el skill se ejecuta desde este repo, el origen es `./`.

Si el usuario pasa una ruta como argumento: esa es la ruta **destino**.
Si no pasa argumentos: preguntar la ruta destino.

**Pregunta al usuario:**
```
¿Cuál es la ruta absoluta del proyecto destino?
Ejemplo: C:\Proyectos\mi-nuevo-proyecto
         /home/user/proyectos/nuevo-app
```

---

## Paso 2 — Verificar destino

Antes de copiar, verificar que el destino es válido:
- El directorio existe
- Contiene `package.json` O es un repositorio git (tiene `.git/`)
- Si ya tiene `.claude/skills/`, advertir: "El proyecto ya tiene skills. ¿Sobrescribir? (s/n)"

---

## Paso 3 — Ejecutar copia

Usar PowerShell (Windows) o bash (Linux/Mac) según la plataforma.

### Windows (PowerShell)

```powershell
$origen = "RUTA_ORIGEN"
$destino = "RUTA_DESTINO"

# Crear estructura de directorios
New-Item -ItemType Directory -Force "$destino\.claude\skills"
New-Item -ItemType Directory -Force "$destino\.claude\rules"
New-Item -ItemType Directory -Force "$destino\.claude\meta-prompts"
New-Item -ItemType Directory -Force "$destino\.github\skills"
New-Item -ItemType Directory -Force "$destino\.github\requirements"
New-Item -ItemType Directory -Force "$destino\.github\specs"
New-Item -ItemType Directory -Force "$destino\docs\output\feedback"

# Copiar skills
Copy-Item -Recurse -Force "$origen\.claude\skills\*" "$destino\.claude\skills\"

# Copiar rules
Copy-Item -Recurse -Force "$origen\.claude\rules\*" "$destino\.claude\rules\"

# Copiar meta-prompts
Copy-Item -Recurse -Force "$origen\.claude\meta-prompts\*" "$destino\.claude\meta-prompts\"

# Copiar mirror .github/skills
Copy-Item -Recurse -Force "$origen\.github\skills\*" "$destino\.github\skills\"

Write-Host "Framework ASDD instalado en $destino"
```

### Linux / macOS (bash)

```bash
ORIGEN="RUTA_ORIGEN"
DESTINO="RUTA_DESTINO"

mkdir -p "$DESTINO/.claude/skills"
mkdir -p "$DESTINO/.claude/rules"
mkdir -p "$DESTINO/.claude/meta-prompts"
mkdir -p "$DESTINO/.github/skills"
mkdir -p "$DESTINO/.github/requirements"
mkdir -p "$DESTINO/.github/specs"
mkdir -p "$DESTINO/docs/output/feedback"

cp -r "$ORIGEN/.claude/skills/." "$DESTINO/.claude/skills/"
cp -r "$ORIGEN/.claude/rules/." "$DESTINO/.claude/rules/"
cp -r "$ORIGEN/.claude/meta-prompts/." "$DESTINO/.claude/meta-prompts/"
cp -r "$ORIGEN/.github/skills/." "$DESTINO/.github/skills/"

echo "Framework ASDD instalado en $DESTINO"
```

---

## Paso 4 — Descargar skills externos

Algunos skills provienen de repositorios externos y deben descargarse por separado.

### emil-design-eng (Emil Kowalski — UI polish y animaciones)

**Fuente:** https://github.com/emilkowalski/skill

#### Windows (PowerShell)

```powershell
$emilUrl = "https://raw.githubusercontent.com/emilkowalski/skill/main/skills/emil-design-eng/SKILL.md"
$emilContent = Invoke-RestMethod $emilUrl -Headers @{"User-Agent"="Mozilla/5.0"}

New-Item -ItemType Directory -Force "$destino\.claude\skills\emil-design-eng" | Out-Null
New-Item -ItemType Directory -Force "$destino\.github\skills\emil-design-eng" | Out-Null

$emilContent | Out-File -FilePath "$destino\.claude\skills\emil-design-eng\SKILL.md" -Encoding utf8
$emilContent | Out-File -FilePath "$destino\.github\skills\emil-design-eng\SKILL.md" -Encoding utf8

Write-Host "✅ emil-design-eng instalado"
```

#### Linux / macOS (bash)

```bash
EMIL_URL="https://raw.githubusercontent.com/emilkowalski/skill/main/skills/emil-design-eng/SKILL.md"

mkdir -p "$DESTINO/.claude/skills/emil-design-eng"
mkdir -p "$DESTINO/.github/skills/emil-design-eng"

curl -s -H "User-Agent: Mozilla/5.0" "$EMIL_URL" \
  -o "$DESTINO/.claude/skills/emil-design-eng/SKILL.md"
cp "$DESTINO/.claude/skills/emil-design-eng/SKILL.md" \
   "$DESTINO/.github/skills/emil-design-eng/SKILL.md"

echo "✅ emil-design-eng instalado"
```

> Si no hay conexión a internet, saltar este paso y documentarlo como pendiente.
> El skill se puede agregar después ejecutando solo el bloque de descarga anterior.

---

## Paso 5 — Verificar integridad

Después de copiar, verificar que existen los archivos críticos en el destino:

```
✅ .claude/skills/asdd-orchestrate/SKILL.md
✅ .claude/skills/generate-spec/SKILL.md
✅ .claude/skills/deploy-setup/SKILL.md
✅ .claude/skills/unit-testing/SKILL.md
✅ .claude/skills/responsive-review/SKILL.md
✅ .claude/skills/feedback/SKILL.md
✅ .claude/skills/emil-design-eng/SKILL.md   ← skill externo
✅ .claude/rules/testing.md
✅ .claude/rules/frontend.md
✅ .claude/rules/backend.md
✅ .claude/rules/specs.md
✅ .claude/meta-prompts/gpt-dev-prompt-factory.md
```

Si falta alguno: reportar qué falló y ejecutar la copia del archivo específico.

---

## Paso 6 — Reportar al usuario

```
Framework ASDD instalado en: <RUTA_DESTINO>

Skills disponibles (14):
  /asdd-orchestrate      — Orquesta el ciclo completo Spec → Impl → Tests → QA → Deploy
  /generate-spec         — Genera spec técnica antes de cualquier implementación
  /deploy-setup          — Configura CI/CD para GitHub Pages + Vercel + Netlify
  /unit-testing          — Genera tests unitarios e integración
  /responsive-review     — Auditoría RWD para React + Tailwind
  /feedback              — Retrospectiva y mejora del framework
  /owasp-scan            — Auditoría de seguridad OWASP Top 10
  /implement-backend     — Implementa features de backend
  /implement-frontend    — Implementa features de frontend
  /gherkin-case-generator — Genera casos de prueba Gherkin
  /risk-identifier       — Identifica riesgos antes de implementar
  /performance-analyzer  — Define estrategia de performance testing
  /automation-flow-proposer — Propone qué automatizar y en qué orden
  /init-framework        — (este skill) Bootstrap del framework en nuevos proyectos
  /emil-design-eng       — UI polish, animaciones, easing — filosofía de Emil Kowalski ★ externo

Rules activas:
  testing.md    — Vitest, testing-library, estructura AAA
  frontend.md   — Tailwind v4, RWD rules, componentes
  backend.md    — Stack backend del proyecto
  specs.md      — Ciclo de vida y formato de specs ASDD
  database.md   — Modelos, migrations, seeders

Meta-prompts:
  gpt-dev-prompt-factory.md — 10 secciones de preguntas diagnóstico para onboarding

Próximo paso recomendado:
  → Abrir Claude Code en el proyecto destino
  → Ejecutar /generate-spec <nombre-feature> para empezar
  → O /deploy-setup si el proyecto necesita CI/CD primero
```

---

## Notas

- Este skill NO modifica el proyecto destino más allá de la carpeta `.claude/` y `.github/skills/`
- No toca `package.json`, `vite.config.ts` ni ningún archivo de código del destino
- Para configurar CI/CD después de instalar el framework: ejecutar `/deploy-setup` en el proyecto destino
- Los skills se actualizan en este repositorio fuente; para sincronizar un proyecto existente, re-ejecutar `/init-framework`
