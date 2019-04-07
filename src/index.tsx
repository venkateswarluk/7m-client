import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { register } from './registerServiceWorker'

import { CityBreakLocationsList } from './CityBreakLocations/CityBreakLocationList'

ReactDOM.render(<CityBreakLocationsList />, document.getElementById(
  'root',
) as HTMLElement)

register()
