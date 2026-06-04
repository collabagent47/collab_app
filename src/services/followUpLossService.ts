import { calculateFollowUpOpportunity } from '../domain/sales-opportunity/follow-up-loss-engine'
import type { FollowUpLossInputs, FollowUpLossResult } from '../domain/sales-opportunity/follow-up-loss-types'

export function calculateOpportunity(inputs: FollowUpLossInputs): FollowUpLossResult {
  return calculateFollowUpOpportunity(inputs)
}
