import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { register } from './registerServiceWorker'

import { OptionAvailabilityList } from './OptionAvailabilities/OptionAvailabilityList'

ReactDOM.render(<OptionAvailabilityList />, document.getElementById(
  'root',
) as HTMLElement)

register()
