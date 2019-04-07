import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { register } from './registerServiceWorker'

import { CityBreakDetailsList } from './CityBreakDetails/CityBreakDetailList'

ReactDOM.render(<CityBreakDetailsList />, document.getElementById(
  'root',
) as HTMLElement)

register()
