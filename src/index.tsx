import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { register } from './registerServiceWorker'

// import { App } from './App'
import { Pagination } from './Pagination'
ReactDOM.render(<Pagination />, document.getElementById('root') as HTMLElement)

register()
