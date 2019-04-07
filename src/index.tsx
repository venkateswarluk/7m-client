import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { register } from './registerServiceWorker'

import { CityBreakList } from './CityBreaks/CityBreakList'

ReactDOM.render(<CityBreakList />, document.getElementById(
  'root',
) as HTMLElement)

register()
