import type { GuidedQuestionAnswer } from '../../../domain/session/session-types'
import { GuidedQuestionCard } from '../GuidedQuestionCard'

interface Props {
  answers: GuidedQuestionAnswer[]
  onUpdate: (answers: GuidedQuestionAnswer[]) => void
}

export function GuidedQuestionsPanel({ answers, onUpdate }: Props) {
  function handleChange(updated: GuidedQuestionAnswer) {
    onUpdate(answers.map((a) => (a.id === updated.id ? updated : a)))
  }

  return (
    <div className="flex flex-col gap-3">
      {answers.map((answer) => (
        <GuidedQuestionCard key={answer.id} question={answer} onChange={handleChange} />
      ))}
    </div>
  )
}
