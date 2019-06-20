import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { register } from './registerServiceWorker'

// import { App } from './App'
import { AppRoutes } from './React-router-config/App'
ReactDOM.render(<AppRoutes />, document.getElementById('root') as HTMLElement)

register()
