import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { register } from './registerServiceWorker'

import { ActivityLocationList } from './ActivityLocations/ActivityLocationList'

ReactDOM.render(<ActivityLocationList />, document.getElementById(
  'root',
) as HTMLElement)

register()
