export type FlagReason = 'wrong-fact' | 'not-my-view' | 'outdated' | 'inappropriate' | 'other'

// Labels shown to the creator. The keys are also the list of reasons in the flag form.
export const FLAG_REASONS: Record<FlagReason, string> = {
  'wrong-fact': 'Wrong fact',
  'not-my-view': "Not what I'd say",
  outdated: 'Out of date',
  inappropriate: 'Inappropriate',
  other: 'Something else',
}

export interface Flag {
  reason: FlagReason
  correction: string // what the creator says the right answer is; '' if they skipped it
  flaggedAt: string // ISO date
}

export interface Question {
  id: string
  askedBy: string
  askedAt: string // ISO date
  question: string
  answer: string // what the TWINii replied
  flag?: Flag // undefined = not flagged
}
