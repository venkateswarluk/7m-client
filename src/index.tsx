import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { register } from './registerServiceWorker'

import { MealTypeList } from './Meals/MealList'

ReactDOM.render(<MealTypeList />, document.getElementById(
  'root',
) as HTMLElement)

register()
