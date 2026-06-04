import { useState } from 'react'
import { calculateOpportunity } from '../services/followUpLossService'
import type { FollowUpLossInputs, FollowUpLossResult } from '../domain/sales-opportunity/follow-up-loss-types'

export function useFollowUpLoss() {
  const [result, setResult] = useState<FollowUpLossResult | null>(null)
  const [inputs, setInputs] = useState<FollowUpLossInputs | null>(null)

  function calculate(data: FollowUpLossInputs) {
    const r = calculateOpportunity(data)
    setResult(r)
    setInputs(data)
    return r
  }

  function reset() {
    setResult(null)
    setInputs(null)
  }

  return { result, inputs, calculate, reset }
}
