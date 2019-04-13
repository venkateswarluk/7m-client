import * as React from 'react'
import 'bulma/css/bulma.css'

const range = (current: number, totalPages: number) => {
  if (current <= totalPages && totalPages > 5) {
    return Array.from(Array(5).keys())
      .map(x => x + current)
      .filter(x => x <= totalPages)
  } else {
    return Array.from(Array(totalPages).keys()).map(x => x + current)
  }
}

const visiblePages = (current: number, totalPages: number) => {
  if (current > 1 && current + 5 < totalPages) {
    return [1, 'e', ...range(current, totalPages), 'e', totalPages]
  } else if (current === 1) {
    return [...range(current, totalPages), 'e', totalPages]
  } else {
    return [1, 'e', ...range(current, totalPages)]
  }
}

export interface PaginationProps {
  readonly currentPage: number
  readonly totalPages: number
}

export const Pagination: (
  { currentPage, totalPages }: PaginationProps,
) => JSX.Element = ({ currentPage, totalPages }) => {
  const [cp, setCp] = React.useState(currentPage) // need to refactor

  const handlePrevious = (cp: number) => {
    setCp(cp - 1)
  }
  const handleNext = (cp: number) => {
    setCp(cp + 1)
  }

  return (
    <nav
      className="pagination is-centered is-rounded is-small"
      role="navigation"
      aria-label="pagination"
    >
      <button
        className="pagination-previous"
        onClick={() => handlePrevious(cp)}
        disabled={cp <= 1 ? true : false}
        type="button"
      >
        Previous
      </button>

      <button
        className="pagination-next"
        onClick={() => handleNext(cp)}
        disabled={cp >= totalPages ? true : false}
        type="button"
      >
        Next
      </button>

      <ul className="pagination-list">
        {visiblePages(cp, totalPages).map(
          x =>
            x === cp ? (
              <li>
                <a
                  className="pagination-link is-current"
                  aria-label={`Goto page ${x}`}
                >
                  {x}
                </a>
              </li>
            ) : x === 'e' ? (
              <li>
                <span className="pagination-ellipsis">&hellip;</span>
              </li>
            ) : (
              <li>
                <a className="pagination-link" aria-label={`Goto page ${x}`}>
                  {x}
                </a>
              </li>
            ),
        )}
      </ul>
    </nav>
  )
}
