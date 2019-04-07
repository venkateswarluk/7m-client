import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { register } from './registerServiceWorker'

import { ActivityCategoryList } from './ActivityCategories/ActivityCategoryList'

ReactDOM.render(<ActivityCategoryList />, document.getElementById(
  'root',
) as HTMLElement)

register()
