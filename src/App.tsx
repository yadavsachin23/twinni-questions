import { useEffect, useRef, useState } from 'react'
import type { Flag, Question } from './types'
import { generateQuestions } from './mockData'
import { QuestionCard } from './QuestionCard'
import { FlagDialog } from './FlagDialog'
import { Pagination } from './Pagination'
import { AllClearArt, NoResultsArt, SearchIcon, TwinLogo } from './icons'

type Filter = 'all' | 'flagged'
type Sort = 'newest' | 'oldest'

interface Toast {
  text: string
  undo: () => void
}

const DEMO_SIZES = [500, 5, 0] // lets reviewers switch between the three states from the brief
const TWINII_LINK = 'https://twinii.ai/sachin' // mock
const WEEK_MS = 7 * 24 * 60 * 60 * 1000

export default function App() {
  const [questions, setQuestions] = useState<Question[]>(() => generateQuestions(500))
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<Filter>('all')
  const [sort, setSort] = useState<Sort>('newest')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10) // questions per page: 10, 25 or 50
  const [flagging, setFlagging] = useState<Question | null>(null) // question open in the flag popup
  const [toast, setToast] = useState<Toast | null>(null)
  const [copied, setCopied] = useState(false)
  const [pageOpenedAt] = useState(() => Date.now()) // fixed "now" for the "This week" count
  const listTopRef = useRef<HTMLDivElement>(null) // where to scroll back to when the page changes

  // Hide the toast after 5 seconds. A new toast restarts the timer.
  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => setToast(null), 5000)
    return () => clearTimeout(timer)
  }, [toast])

  // --- Derived data (recomputed each render; 500 items is cheap) ---
  const query = search.trim().toLowerCase()
  const flaggedCount = questions.filter((q) => q.flag).length
  const thisWeekCount = questions.filter((q) => pageOpenedAt - Date.parse(q.askedAt) < WEEK_MS).length
  const results = questions
    .filter((q) => filter === 'all' || q.flag)
    .filter(
      (q) =>
        !query ||
        q.question.toLowerCase().includes(query) ||
        q.answer.toLowerCase().includes(query) ||
        q.askedBy.toLowerCase().includes(query),
    )
    // ISO date strings sort correctly as plain text
    .toSorted((a, b) =>
      sort === 'newest' ? b.askedAt.localeCompare(a.askedAt) : a.askedAt.localeCompare(b.askedAt),
    )
  const lastPage = Math.max(1, Math.ceil(results.length / pageSize))
  const currentPage = Math.min(page, lastPage) // unflagging on the Flagged tab can shrink the list
  const visible = results.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  // --- Actions ---
  function setFlag(id: string, flag: Flag | undefined) {
    setQuestions((qs) => qs.map((q) => (q.id === id ? { ...q, flag } : q)))
  }

  function saveFlag(question: Question, flag: Flag) {
    const previous = question.flag
    setFlag(question.id, flag)
    setFlagging(null)
    setToast({
      text: previous ? 'Flag updated' : 'Answer flagged. Your TWINii will learn from it.',
      undo: () => setFlag(question.id, previous),
    })
  }

  function removeFlag(question: Question) {
    const previous = question.flag
    setFlag(question.id, undefined)
    setToast({ text: 'Flag removed', undo: () => setFlag(question.id, previous) })
  }

  // Any change to search, filter or sort starts again from page 1.
  function resetPage() {
    setPage(1)
  }

  function goToPage(p: number) {
    setPage(p)
    listTopRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  // Keep the question you were looking at on screen: jump to the page that contains it at the new size.
  function changePageSize(size: number) {
    const firstIndex = (currentPage - 1) * pageSize
    setPageSize(size)
    setPage(Math.floor(firstIndex / size) + 1)
  }

  function showFilter(f: Filter) {
    setFilter(f)
    resetPage()
  }

  function clearFilters() {
    setSearch('')
    setFilter('all')
    resetPage()
  }

  function loadDemo(count: number) {
    setQuestions(generateQuestions(count))
    setCopied(false)
    setToast(null)
    clearFilters()
  }

  async function copyLink() {
    await navigator.clipboard.writeText(TWINII_LINK)
    setCopied(true)
  }

  return (
    <>
      <header className="topbar">
        <div className="brand">
          <TwinLogo />
          <span className="brand-name">TWINii</span>
          <span className="brand-tag">Creator studio</span>
        </div>
        <div className="topbar-right">
          <label className="demo-switch">
            Demo
            <select value={questions.length} onChange={(e) => loadDemo(Number(e.target.value))}>
              {DEMO_SIZES.map((n) => (
                <option key={n} value={n}>
                  {n === 0 ? 'No questions' : `${n} questions`}
                </option>
              ))}
            </select>
          </label>
          <span className="creator">
            <span className="avatar avatar--creator" aria-hidden="true">
              SY
            </span>
            <span className="creator-name">Sachin Yadav</span>
          </span>
        </div>
      </header>

      <main className="page">
        <section className="hero">
          <p className="eyebrow">Audience questions</p>
          <h1>
            What your audience <em>asked</em>, and what your twin <em>said</em>.
          </h1>
          <p className="hero-sub">
            Spot an answer that isn't quite you? Flag it, and your TWINii learns the right one.
          </p>
          {questions.length > 0 && (
            <dl className="stats">
              <div>
                <dt>Questions</dt>
                <dd>{questions.length}</dd>
              </div>
              <div>
                <dt>This week</dt>
                <dd>{thisWeekCount}</dd>
              </div>
              <div className="stat--flag">
                <dt>Flagged</dt>
                <dd>{flaggedCount}</dd>
              </div>
            </dl>
          )}
        </section>

        {questions.length === 0 ? (
          <section className="empty">
            <div className="empty-art" aria-hidden="true">
              <span />
              <span />
            </div>
            <h2>No questions yet</h2>
            <p>
              When your audience asks your TWINii something, the question and its answer will show up
              here. Share your link to get the first one.
            </p>
            <button className="btn btn--primary" onClick={copyLink}>
              {copied ? 'Link copied!' : 'Copy your TWINii link'}
            </button>
          </section>
        ) : (
          <>
            <div ref={listTopRef} className="scroll-anchor" />
            <div className="toolbar">
              <div className="search">
                <SearchIcon />
                <input
                  type="search"
                  placeholder="Search questions, answers or people"
                  aria-label="Search questions"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value)
                    resetPage()
                  }}
                />
              </div>
              <div className="tabs" role="group" aria-label="Filter questions">
                <button aria-pressed={filter === 'all'} onClick={() => showFilter('all')}>
                  All <span className="count">{questions.length}</span>
                </button>
                <button aria-pressed={filter === 'flagged'} onClick={() => showFilter('flagged')}>
                  Flagged <span className="count">{flaggedCount}</span>
                </button>
              </div>
              <select
                className="sort"
                aria-label="Sort questions"
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value as Sort)
                  resetPage()
                }}
              >
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
              </select>
            </div>

            <p className="results-summary" aria-live="polite">
              {results.length > 0 && `${results.length} ${results.length === 1 ? 'question' : 'questions'}`}
            </p>

            {results.length === 0 ? (
              <section className="empty empty--small">
                {query ? (
                  <>
                    <NoResultsArt />
                    <h2>No matches for “{search.trim()}”</h2>
                    <p>Try a different word, or search all questions.</p>
                    <button className="btn btn--ghost" onClick={clearFilters}>
                      Clear search
                    </button>
                  </>
                ) : (
                  <>
                    <AllClearArt />
                    <h2>Nothing flagged</h2>
                    <p>Answers you flag will show up here, so you can keep track of what needs fixing.</p>
                  </>
                )}
              </section>
            ) : (
              <ul className="question-list">
                {visible.map((q) => (
                  <li key={q.id}>
                    <QuestionCard
                      question={q}
                      search={query}
                      onFlag={() => setFlagging(q)}
                      onUnflag={() => removeFlag(q)}
                    />
                  </li>
                ))}
              </ul>
            )}

            {results.length > 0 && (
              <Pagination
                page={currentPage}
                pageSize={pageSize}
                total={results.length}
                onChange={goToPage}
                onPageSizeChange={changePageSize}
              />
            )}
          </>
        )}
      </main>

      {flagging && (
        <FlagDialog
          key={flagging.id}
          question={flagging}
          onSave={(flag) => saveFlag(flagging, flag)}
          onClose={() => setFlagging(null)}
        />
      )}

      {toast && (
        <div className="toast" role="status">
          {toast.text}
          <button
            onClick={() => {
              toast.undo()
              setToast(null)
            }}
          >
            Undo
          </button>
        </div>
      )}
    </>
  )
}
