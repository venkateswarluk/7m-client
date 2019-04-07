import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { register } from './registerServiceWorker'

import { CityBreakInclusionsList } from './CityBreakInclusions/CityBreakInclusionList'

ReactDOM.render(<CityBreakInclusionsList />, document.getElementById(
  'root',
) as HTMLElement)

register()
