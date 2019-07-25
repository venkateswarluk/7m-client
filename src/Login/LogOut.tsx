import * as React from 'react'
// import { createBrowserHistory } from 'history'
import { LoginList } from './LoginPage'
export const LogOutList = () => {
  localStorage.removeItem('isLoggedIn')
  // const history = createBrowserHistory()
  // history.push('/');
  return <LoginList />
}
