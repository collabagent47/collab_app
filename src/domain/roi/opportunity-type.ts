import type { OpportunityType } from './roi-types'

type FrictionWithImpact = { id: string; impactType: string }

export function inferOpportunityType(
  frictionIds: string[],
  allFrictions: FrictionWithImpact[],
): OpportunityType {
  const selected = allFrictions.filter((f) => frictionIds.includes(f.id))
  const commercialCount = selected.filter((f) => f.impactType === 'commercial').length
  const operationalCount = selected.filter((f) => f.impactType === 'operational').length
  const mixedCount = selected.filter((f) => f.impactType === 'mixed').length

  if (mixedCount > 0 || (commercialCount > 0 && operationalCount > 0)) return 'mixed'
  if (commercialCount > operationalCount) return 'commercial'
  if (operationalCount > commercialCount) return 'operational'
  return 'mixed'
}
