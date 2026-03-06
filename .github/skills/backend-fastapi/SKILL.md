---
name: backend-fastapi
description: Implementa un feature completo en el backend FastAPI del proyecto siguiendo la arquitectura en capas (routes → services → repositories). Usa esta skill cuando necesites crear modelos Pydantic, repositorios Motor async, servicios de negocio y endpoints FastAPI a partir de una spec ASSD aprobada.
argument-hint: "<nombre-feature> (debe existir .github/specs/<nombre-feature>.spec.md)"
---

# Skill: backend-fastapi

Implementa funcionalidades en el backend FastAPI respetando la arquitectura en capas del proyecto.

## Cuándo usar esta skill

- Cuando tengas una spec aprobada en `.github/specs/` y necesites implementar el backend
- Para crear nuevos endpoints, modelos, servicios o repositorios
- Para registrar un nuevo router en `app/main.py`

## Arquitectura obligatoria

```
FastAPI Router → Service → Repository → MongoDB (Motor)
                     ↓
               firebase_service (token verification)
```

### Responsabilidad de cada capa

| Capa | Directorio | Hace | NO hace |
|------|-----------|------|---------|
| Routes | `app/routes/` | Parsea HTTP, instancia deps, delega al service | Lógica de negocio |
| Services | `app/services/` | Lógica de negocio pura | Tocar MongoDB directamente |
| Repositories | `app/repositories/` | Operaciones async con Motor | Lógica de negocio |
| Models | `app/models/` | Pydantic schemas | Lógica ni DB |

## Patrón de Wiring (en el router — SIEMPRE)

```python
from app.config.database import get_db
from app.repositories.feature_repository import FeatureRepository
from app.services.feature_service import FeatureService

router = APIRouter(prefix="/feature", tags=["feature"])

@router.post("/", response_model=FeatureResponse)
async def create_feature(data: FeatureCreate, token: str = Header(...)):
    db = get_db()
    repo = FeatureRepository(db)
    service = FeatureService(repo)
    return await service.create(data)
```

## Proceso paso a paso

Sigue este orden de implementación. Usa el archivo [patterns.py](./patterns.py) como referencia.

### 1. Modelo (`app/models/<feature>_model.py`)
```python
from pydantic import BaseModel
from typing import Optional

class FeatureCreate(BaseModel):
    field: str

class FeatureResponse(BaseModel):
    id: str
    field: str
```

### 2. Repositorio (`app/repositories/<feature>_repository.py`)
```python
class FeatureRepository:
    def __init__(self, db):
        self.collection = db["feature_collection"]

    async def create(self, data: dict) -> dict:
        result = await self.collection.insert_one(data)
        return {**data, "id": str(result.inserted_id)}

    async def find_by_id(self, id: str) -> Optional[dict]:
        return await self.collection.find_one({"_id": id})
```

### 3. Servicio (`app/services/<feature>_service.py`)
```python
class FeatureService:
    def __init__(self, repo: FeatureRepository):
        self.repo = repo

    async def create(self, data: FeatureCreate) -> dict:
        # Validaciones de negocio aquí
        return await self.repo.create(data.model_dump())
```

### 4. Router (`app/routes/<feature>_router.py`)
Usa el patrón de wiring mostrado arriba.

### 5. Registrar en `app/main.py`
```python
from app.routes.feature_router import router as feature_router
app.include_router(feature_router, prefix="/feature")
```

## Verificación final

```bash
cd backend
poetry run python -m py_compile app/main.py
poetry run uvicorn app.main:app --reload
```

## Convenciones críticas

- SIEMPRE `async def` para funciones que tocan DB
- NUNCA importar `get_db()` en servicios o modelos
- `uid` de Firebase = clave única en MongoDB (upsert, no insert)
- Nombres en `snake_case`
- Documentar respuestas 4xx en los routers
