import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { register } from './registerServiceWorker'

import { CityBreakExclusionsList } from './CityBreakExclusions/CityBreakExclusionList'

ReactDOM.render(<CityBreakExclusionsList />, document.getElementById(
  'root',
) as HTMLElement)

register()
