import { useEffect, useRef, useState, type FormEvent } from 'react'
import { FLAG_REASONS, type Flag, type FlagReason, type Question } from './types'
import { CloseIcon, FlagIcon } from './icons'

interface Props {
  question: Question // the question being flagged (question.flag is set when editing)
  onSave: (flag: Flag) => void
  onClose: () => void
}

export function FlagDialog({ question, onSave, onClose }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const initial = question.flag
  const [reason, setReason] = useState<FlagReason | ''>(initial?.reason ?? '')
  const [correction, setCorrection] = useState(initial?.correction ?? '')

  // <dialog> is the browser's built-in popup. showModal() gives us the backdrop,
  // keeps keyboard focus inside the popup, and closes on Escape, all for free.
  useEffect(() => {
    const dialog = dialogRef.current
    if (dialog && !dialog.open) dialog.showModal()
  }, [])

  function close() {
    dialogRef.current?.close() // fires the dialog's onClose → parent removes the popup
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!reason) return // the browser's `required` check normally stops this first
    onSave({
      reason,
      correction: correction.trim(),
      flaggedAt: initial?.flaggedAt ?? new Date().toISOString(),
    })
  }

  return (
    <dialog
      ref={dialogRef}
      className="dialog"
      aria-labelledby="flag-title"
      onClose={onClose}
      // A click that lands on the <dialog> itself (not the form inside) is a click on the backdrop
      onClick={(e) => e.target === e.currentTarget && close()}
    >
      <form className="dialog-panel" onSubmit={handleSubmit}>
        <header className="dialog-head">
          <span className="dialog-icon">
            <FlagIcon />
          </span>
          <div>
            <h2 id="flag-title">{initial ? 'Edit flag' : 'Flag this answer'}</h2>
            <p>Tell your TWINii what went wrong. It uses this to answer better next time.</p>
          </div>
          <button type="button" className="icon-btn" aria-label="Close" onClick={close}>
            <CloseIcon />
          </button>
        </header>

        <div className="dialog-context">
          <p className="context-q">“{question.question}”</p>
          <div className="context-a">
            <span>Your TWINii said</span>
            {question.answer}
          </div>
        </div>

        <fieldset>
          <legend>What's wrong with it?</legend>
          <div className="chips">
            {(Object.keys(FLAG_REASONS) as FlagReason[]).map((r) => (
              <label key={r} className="chip">
                <input
                  type="radio"
                  name="reason"
                  checked={reason === r}
                  onChange={() => setReason(r)}
                  required
                />
                <span>{FLAG_REASONS[r]}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <label className="field">
          <span>
            What should your TWINii have said? <span className="optional">Optional</span>
          </span>
          <textarea
            value={correction}
            onChange={(e) => setCorrection(e.target.value)}
            placeholder="Write the answer you'd give. Your TWINii learns from this."
          />
        </label>

        <footer className="dialog-foot">
          <button type="button" className="btn btn--ghost" onClick={close}>
            Cancel
          </button>
          <button type="submit" className="btn btn--danger">
            <FlagIcon />
            {initial ? 'Save changes' : 'Flag answer'}
          </button>
        </footer>
      </form>
    </dialog>
  )
}
