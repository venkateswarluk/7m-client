import * as React from 'react'

interface SearchProps {
  readonly Search: string
  handleSearch(Search: string): void
  handleRefreshSearch(): void
}

const SearchField = (props: SearchProps) => (
  <div className="control has-text-left">
    <input
      // className="button is-info "
      type="text"
      name="activityCategorySearch"
      value={props.Search}
      onChange={event => props.handleSearch(event.target.value)}
    />
    <div className="control has-text-left">
      <button className="button is-info " onClick={props.handleRefreshSearch}>
        Refresh
      </button>
    </div>
  </div>
)

export { SearchField }
