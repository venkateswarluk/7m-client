import * as React from 'react'

import { BrowserRouter, Switch, Route } from 'react-router-dom'
// import { LoginList } from './Login/LoginPage'
import { AppRoutes } from './React-router-config/App'
// import { LogOutList } from './Login/LogOut'

// const otherRoutes = () => {
//   const isLoggedIn = localStorage.getItem('isLoggedIn')
//   return isLoggedIn ? (
//     <Route path="/home" exact={true} render={() => <AppRoutes />} />
//   ) : (
//     <Route path="/login" render={LoginList} />
//   )
// }

export const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact={true} component={AppRoutes} />
        {/* <Route path="/" exact={true} component={LoginList} />
        <Route path="/login" exact={true} component={LoginList} />
        <Route path="/home" render={otherRoutes} />
        <Route path="/logout" exact={true} render={LogOutList} /> */}
      </Switch>
    </BrowserRouter>
  )
}
