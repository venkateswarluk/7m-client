import * as React from 'react'

interface SearchProps {
  readonly Search: string
  handleSearch(Search: string): void
  handleRefreshSearch(): void
}

const SearchField = (props: SearchProps) => (
  <div className="level-left">
    <div className="level-item">
      <div className="field has-addons">
        <p className="control">
          <input
            className="input"
            type="text"
            placeholder="Search Text"
            name="activityCategorySearch"
            value={props.Search}
            onChange={event => props.handleSearch(event.target.value)}
          />
        </p>

        <p className="control">
          <button
            className="button is-info "
            onClick={props.handleRefreshSearch}
          >
            Refresh
          </button>
        </p>
      </div>
    </div>
  </div>
)

export { SearchField }
