// Small inline SVG icons. They use currentColor, so they take the text colour of their parent.

// Two overlapping circles: the creator and their twin.
export function TwinLogo({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <circle cx="12" cy="16" r="9" fill="#6c3cf0" />
      <circle cx="20" cy="16" r="9" fill="#ff7a93" fillOpacity="0.85" />
    </svg>
  )
}

export function FlagIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 21V4" />
      <path d="M5 4h12l-2.5 4.5L17 13H5" />
    </svg>
  )
}

export function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  )
}

export function ChevronIcon({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={direction === 'left' ? 'm15 6-6 6 6 6' : 'm9 6 6 6-6 6'} />
    </svg>
  )
}

export function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  )
}

// ---------- Empty-state illustrations (animated with CSS, see "Illustrations" in index.css) ----------

// "No matches": a magnifying glass searching over two chat bubbles, with question marks popping up.
export function NoResultsArt() {
  return (
    <svg className="art" width="140" height="110" viewBox="0 0 140 110" aria-hidden="true">
      <ellipse cx="70" cy="100" rx="38" ry="5" fill="#1a1433" opacity="0.07" />

      {/* the chat bubbles being searched */}
      <rect x="12" y="24" width="64" height="24" rx="12" fill="#efe9ff" />
      <rect x="23" y="33" width="34" height="6" rx="3" fill="#cbb8ff" />
      <rect x="62" y="60" width="66" height="24" rx="12" fill="#ffe3ea" />
      <rect x="73" y="69" width="40" height="6" rx="3" fill="#ffb3c1" />

      <g className="art-magnifier">
        <circle cx="66" cy="50" r="18" fill="#fff" fillOpacity="0.6" stroke="#6c3cf0" strokeWidth="5" />
        <path d="M58 42a11 11 0 0 1 9-5" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
        <path d="M79 63l14 14" stroke="#1a1433" strokeWidth="8" strokeLinecap="round" />
      </g>

      <text x="114" y="32" className="art-q" fill="#ff7a93">?</text>
      <text x="16" y="86" className="art-q art-q--late" fill="#6c3cf0">?</text>
    </svg>
  )
}

// "Nothing flagged": a waving flag with a tick, and twinkling sparkles. Good news, so it's cheerful.
export function AllClearArt() {
  const sparkle = 'M0-7C1-2 2-1 7 0 2 1 1 2 0 7-1 2-2 1-7 0-2-1-1-2 0-7Z'
  return (
    <svg className="art" width="140" height="110" viewBox="0 0 140 110" aria-hidden="true">
      <ellipse cx="62" cy="100" rx="30" ry="4" fill="#1a1433" opacity="0.07" />

      <rect x="50" y="20" width="5" height="80" rx="2.5" fill="#1a1433" />
      <circle cx="52.5" cy="18" r="4.5" fill="#6c3cf0" />

      <g className="art-flag">
        <path d="M55 24h44l-10 14 10 14H55z" fill="#ff7a93" />
        <path d="M67 38l6 6 11-12" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      <g transform="translate(112 22)">
        <path className="art-sparkle" d={sparkle} fill="#6c3cf0" />
      </g>
      <g transform="translate(30 44)">
        <path className="art-sparkle art-sparkle--2" d={sparkle} fill="#ffc94d" />
      </g>
      <g transform="translate(114 72)">
        <path className="art-sparkle art-sparkle--3" d={sparkle} fill="#ff7a93" />
      </g>
    </svg>
  )
}
