import { describe, it, expect, vi } from 'vitest'
import React from 'react'
import { render } from '@testing-library/react'
import { FollowUpLossResultCard } from '../../components/quick-session/FollowUpLossResultCard'
import type { FollowUpLossResult } from '../../domain/sales-opportunity/follow-up-loss-types'

vi.mock('framer-motion', () => ({
  motion: { div: ({ children, ...p }: React.HTMLAttributes<HTMLDivElement>) => <div {...p}>{children}</div> },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

const IHANN_RESULT: FollowUpLossResult = {
  closeRate: 0.12,
  lostLeadRate: 0.24,
  grossLostPipeline: 4_800_000,
  potentialLostClosures: 1.44,
  expectedLostSales: 576_000,
  warnings: [],
}

describe('FollowUpLossResultCard — terminología correcta (Ajuste 5 del plan)', () => {
  it('muestra "Venta esperada perdida" como título principal', () => {
    // GIVEN: resultado del motor Ihann
    // WHEN: se renderiza el card
    // THEN: el título contiene "Venta esperada perdida"
    const { container } = render(<FollowUpLossResultCard result={IHANN_RESULT} />)
    expect(container.innerHTML.toLowerCase()).toContain('venta esperada perdida')
  })

  it('muestra $576.000 formateado en COP', () => {
    // GIVEN: expectedLostSales = 576000
    // WHEN: se renderiza el card
    // THEN: el valor aparece formateado en COP
    const { container } = render(<FollowUpLossResultCard result={IHANN_RESULT} />)
    expect(container.innerHTML).toContain('576')
  })

  it('incluye disclaimer pedagógico sobre promesa de ventas', () => {
    // GIVEN: resultado válido
    // WHEN: se renderiza el card
    // THEN: hay texto sobre estimación, no promesa
    const { container } = render(<FollowUpLossResultCard result={IHANN_RESULT} />)
    const html = container.innerHTML.toLowerCase()
    const hasDisclaimer = html.includes('estimación') || html.includes('estimacion') || html.includes('promesa')
    expect(hasDisclaimer).toBe(true)
  })

  it('muestra botón "Profundizar con ROI" como acción secundaria (no como resultado)', () => {
    // GIVEN: resultado válido con callback onDeepDive
    // WHEN: se renderiza el card
    // THEN: el botón existe pero el resultado principal NO dice ROI
    const { container } = render(
      <FollowUpLossResultCard result={IHANN_RESULT} onDeepDive={() => {}} />
    )
    // El botón puede decir "Profundizar con ROI" porque es una acción, no un resultado
    const buttons = container.querySelectorAll('button')
    const deepDiveBtn = Array.from(buttons).find(b => b.textContent?.toLowerCase().includes('profundizar'))
    expect(deepDiveBtn).toBeDefined()
    // Pero el título principal NO debe decir solo "ROI"
    const h2s = container.querySelectorAll('h2, h3, [data-testid="result-title"]')
    const hasROITitle = Array.from(h2s).some(el =>
      el.textContent?.trim().toLowerCase() === 'roi' ||
      el.textContent?.trim().toLowerCase() === 'retorno roi'
    )
    expect(hasROITitle).toBe(false)
  })
})
