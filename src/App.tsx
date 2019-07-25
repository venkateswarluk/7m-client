import * as React from 'react'

// import { AppRoutes } from './React-router-config/App'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { LoginList } from './Login/LoginPage'
// import { AppRoutes } from './React-router-config/App'

export const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact={true} component={LoginList} />
      <Route path="/logout" exact={true} render={LoginList} />
    </Switch>
  </BrowserRouter>
)
