import { STORAGE_KEYS, STORAGE_SCHEMA_VERSION } from './constants'

export function getItem<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key)
    if (raw === null) return null
    return JSON.parse(raw) as T
  } catch {
    return null
  }
}

export function setItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // localStorage may be unavailable (private mode, quota exceeded)
  }
}

export function removeItem(key: string): void {
  try {
    localStorage.removeItem(key)
  } catch {
    // no-op
  }
}

/**
 * Verifica si el schema almacenado es compatible con la versión actual.
 * Si hay mismatch, limpia los datos y actualiza la versión.
 * Estructura preparada para migraciones — incrementar STORAGE_SCHEMA_VERSION
 * y añadir lógica de migración en lugar del clearAll cuando sea necesario.
 */
export function checkAndMigrateSchema(): void {
  try {
    const stored = getItem<number>(STORAGE_KEYS.SCHEMA_VERSION)
    if (stored === STORAGE_SCHEMA_VERSION) return

    if (stored !== null && stored < STORAGE_SCHEMA_VERSION) {
      // Migración: versión conocida pero anterior.
      // Por ahora limpia los datos (v1 → sin migración compleja aún).
      // Al incrementar STORAGE_SCHEMA_VERSION, añadir lógica de migración aquí.
      removeItem(STORAGE_KEYS.EXPLORATIONS)
      removeItem(STORAGE_KEYS.KNOWLEDGE_SUGGESTIONS)
    }

    setItem(STORAGE_KEYS.SCHEMA_VERSION, STORAGE_SCHEMA_VERSION)
  } catch {
    // no-op: si localStorage no está disponible, la app funciona sin persistencia
  }
}
