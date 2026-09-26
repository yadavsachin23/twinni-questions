import { useEffect, useRef, useState } from 'react'
import { FLAG_REASONS, type Question } from './types'
import { FlagIcon, TwinLogo } from './icons'

interface Props {
  question: Question
  search: string // lower-cased search text, '' when not searching
  onFlag: () => void // opens the flag popup (also used to edit an existing flag)
  onUnflag: () => void
}

export function QuestionCard({ question, search, onFlag, onUnflag }: Props) {
  const [expanded, setExpanded] = useState(false)
  const [overflows, setOverflows] = useState(false) // true when the 3-line limit is hiding text
  const answerRef = useRef<HTMLParagraphElement>(null)
  const { flag } = question

  // Answers are cut to 3 lines. Only offer "Read full answer" when text is really hidden,
  // re-checking whenever the answer changes size (window resize, phone rotation).
  useEffect(() => {
    const el = answerRef.current
    if (!el) return
    const observer = new ResizeObserver(() => setOverflows(el.scrollHeight > el.clientHeight + 1))
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // If the search matched inside the answer, show all of it so the match isn't hidden.
  const answerMatches = search !== '' && question.answer.toLowerCase().includes(search)
  const clamped = !expanded && !answerMatches

  return (
    <article className={flag ? 'card card--flagged' : 'card'}>
      <header className="card-head">
        <Avatar name={question.askedBy} />
        <div className="card-who">
          <strong>{highlight(question.askedBy, search)}</strong>
          <time dateTime={question.askedAt} title={new Date(question.askedAt).toLocaleString()}>
            {timeAgo(question.askedAt)}
          </time>
        </div>
        {flag && (
          <span className="badge">
            <FlagIcon /> {FLAG_REASONS[flag.reason]}
          </span>
        )}
      </header>

      {/* Laid out like a chat: audience question on the left, TWINii's reply on the right */}
      <h2 className="bubble bubble--asked">{highlight(question.question, search)}</h2>

      <div className="reply">
        <div className="bubble bubble--twin">
          <span className="bubble-label">
            <TwinLogo size={14} /> Your TWINii
          </span>
          <p ref={answerRef} className={clamped ? 'clamped' : undefined}>
            {highlight(question.answer, search)}
          </p>
          {(overflows || expanded) && !answerMatches && (
            <button className="link-btn" aria-expanded={expanded} onClick={() => setExpanded(!expanded)}>
              {expanded ? 'Show less' : 'Read full answer'}
            </button>
          )}
        </div>
      </div>

      {flag && (
        <div className="flag-note">
          <p>
            <strong>Flagged {timeAgo(flag.flaggedAt)}.</strong>{' '}
            {flag.correction
              ? 'Your TWINii will learn from your correction:'
              : 'Add a correction so your TWINii learns the right answer.'}
          </p>
          {flag.correction && <blockquote>{flag.correction}</blockquote>}
        </div>
      )}

      <footer className="card-foot">
        {flag ? (
          <>
            <button className="btn btn--ghost" onClick={onUnflag}>
              Unflag
            </button>
            <button className="btn btn--soft" onClick={onFlag}>
              {flag.correction ? 'Edit flag' : 'Add correction'}
            </button>
          </>
        ) : (
          <button className="btn btn--flag" onClick={onFlag}>
            <FlagIcon /> Flag answer
          </button>
        )}
      </footer>
    </article>
  )
}

const AVATAR_COLORS = ['#ffd8be', '#c9f2d8', '#cfe6ff', '#e2d6ff', '#ffd6e7', '#fff1b8']

// Initials on a pastel circle. The colour is picked from the name, so each person keeps the same colour.
function Avatar({ name }: { name: string }) {
  const initials = name
    .split(' ')
    .map((word) => word[0])
    .join('')
  const color = AVATAR_COLORS[(name.charCodeAt(0) + name.charCodeAt(1)) % AVATAR_COLORS.length]
  return (
    <span className="avatar" style={{ background: color }} aria-hidden="true">
      {initials}
    </span>
  )
}

// Wraps every match of `search` in <mark>. split() with a capture group puts the matches at odd indexes.
function highlight(text: string, search: string) {
  if (!search) return text
  const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  return text
    .split(new RegExp(`(${escaped})`, 'gi'))
    .map((part, i) => (i % 2 === 1 ? <mark key={i}>{part}</mark> : part))
}

const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })

// "just now", "5 minutes ago", "3 hours ago", "yesterday", then a plain date after 30 days.
function timeAgo(iso: string) {
  const minutes = Math.round((new Date(iso).getTime() - Date.now()) / 60_000)
  if (minutes > -1) return 'just now'
  if (minutes > -60) return rtf.format(minutes, 'minute')
  const hours = Math.round(minutes / 60)
  if (hours > -24) return rtf.format(hours, 'hour')
  const days = Math.round(hours / 24)
  if (days > -30) return rtf.format(days, 'day')
  return new Date(iso).toLocaleDateString()
}
