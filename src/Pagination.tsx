import * as React from 'react'
import 'bulma/css/bulma.css'

// const range = (current: number, totalPages: number) => {
//   if (current <= totalPages && totalPages > 5) {
//     return Array.from(Array(5).keys())
//       .map(x => x + current)
//       .filter(x => x <= totalPages)
//   } else {
//     return Array.from(Array(totalPages).keys()).map(x => x + current)
//   }
// }

// const visiblePages = (current: number, totalPages: number) => {
//   if (current > 1 && current + 5 < totalPages) {
//     return [1, 'e', ...range(current, totalPages), 'e', totalPages]
//   } else if (current === 1) {
//     return [...range(current, totalPages), 'e', totalPages]
//   } else {
//     return [1, 'e', ...range(current, totalPages)]
//   }
// }

export interface PaginationProps {
  readonly currentPage: number
  readonly totalPages: number
  readonly rowsPerPage: number
  handleNext(currentPage: number): void
  handlePrevious(currentPage: number): void
  handleSpecificPageChange(currentPage: number | string): void
  handleRowsPerPageChange(rowsPerPage: number): void
}

export const Pagination: (
  {
    currentPage,
    totalPages,
    rowsPerPage,
    handleNext,
    handlePrevious,
    handleSpecificPageChange,
    handleRowsPerPageChange,
  }: PaginationProps,
) => JSX.Element = ({
  currentPage,
  totalPages,
  handleNext,
  // rowsPerPage,
  handlePrevious,
  // handleSpecificPageChange,
  // handleRowsPerPageChange,
}) => {
  //  const [currentPage] = React.useState(currentPage) // need to refactor
  return (
    <nav
      className="pagination is-centered is-rounded is-small"
      role="navigation"
      aria-label="pagination"
    >
      <button
        className="pagination-previous"
        onClick={() => handlePrevious(currentPage)}
        disabled={currentPage <= 1 ? true : false}
        type="button"
      >
        Previous
      </button>

      <button
        className="pagination-next"
        onClick={() => handleNext(currentPage)}
        disabled={currentPage >= totalPages ? true : false}
        type="button"
      >
        Next
      </button>

      {/* <div>
        <select
          value={rowsPerPage}
          onClick={() => handleRowsPerPageChange(rowsPerPage)}
        >
          <option value="5" className="dropdown-item">
            5
          </option>
          <hr className="dropdown-divider" />

          <option value="10" className="dropdown-item">
            10
          </option>
          <hr className="dropdown-divider" />

          <option value="15" className="dropdown-item">
            15
          </option>
        </select>
      </div> */}

      {/* <ul className="pagination-list">
        {visiblePages(currentPage, totalPages).map(
          x =>
            x === currentPage ? (
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
                <a
                  className="pagination-link"
                  aria-label={`Goto page ${x}`}
                  onClick={() => handleSpecificPageChange(x)}
                >
                  {x}
                </a>
              </li>
            ),
        )}
      </ul> */}
    </nav>
  )
}
