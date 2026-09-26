import { ChevronIcon } from './icons'

const PAGE_SIZES = [10, 25, 50]

interface Props {
  page: number // current page, starting at 1
  pageSize: number
  total: number // number of results across all pages
  onChange: (page: number) => void
  onPageSizeChange: (size: number) => void
}

export function Pagination({ page, pageSize, total, onChange, onPageSizeChange }: Props) {
  const lastPage = Math.ceil(total / pageSize)
  const from = (page - 1) * pageSize + 1
  const to = Math.min(page * pageSize, total)

  // Everything fits on one page even at the smallest size (e.g. 5 questions): nothing to paginate.
  if (total <= PAGE_SIZES[0]) return null

  return (
    <nav className="pagination" aria-label="Pagination">
      <div className="pagination-left">
        {/* A native <select>: its option list is the popup. In Chrome it's styled to match (see index.css). */}
        <label className="page-size">
          Show
          <select value={pageSize} onChange={(e) => onPageSizeChange(Number(e.target.value))}>
            {PAGE_SIZES.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
          per page
        </label>
        <span className="pagination-divider" aria-hidden="true" />
        <p className="pagination-info">
          Showing <strong>{from === to ? from : `${from}–${to}`}</strong> of <strong>{total}</strong>
        </p>
      </div>

      {lastPage > 1 && (
        <div className="pages">
          <button
            className="page-btn"
            aria-label="Previous page"
            disabled={page === 1}
            onClick={() => onChange(page - 1)}
          >
            <ChevronIcon direction="left" />
          </button>

          {pageList(page, lastPage).map((p, i) =>
            p === '…' ? (
              <span key={`gap-${i}`} className="page-gap" aria-hidden="true">
                …
              </span>
            ) : (
              <button
                key={p}
                className="page-btn"
                aria-current={p === page ? 'page' : undefined}
                aria-label={`Page ${p}`}
                onClick={() => onChange(p)}
              >
                {p}
              </button>
            ),
          )}

          <button
            className="page-btn"
            aria-label="Next page"
            disabled={page === lastPage}
            onClick={() => onChange(page + 1)}
          >
            <ChevronIcon direction="right" />
          </button>
        </div>
      )}
    </nav>
  )
}

// Always shows the first page, the last page, and the pages next to the current one,
// with "…" for the gaps. For example, page 5 of 50 → 1 … 4 5 6 … 50
function pageList(current: number, last: number): (number | '…')[] {
  const pages: (number | '…')[] = []
  for (let p = 1; p <= last; p++) {
    if (p === 1 || p === last || Math.abs(p - current) <= 1) pages.push(p)
    else if (pages.at(-1) !== '…') pages.push('…')
  }
  return pages
}
