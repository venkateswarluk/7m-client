import * as React from 'react'

// import axios from 'axios'
import 'bulma/css/bulma.css'
import { FormikActions } from 'formik'
// import { getAllItems, postItem } from '../services'

// import { mainUrl } from '../config'
import { LoginForm } from './LoginForm'
// import { Route } from 'react-router'
// import { BrowserRouter } from 'react-router-dom'
// import { AppRoutes } from 'src/React-router-config/App'
import { createBrowserHistory } from 'history'

// const url = `${mainUrl}/activities`

export interface Login {
  readonly id: number
  readonly userName: string
  readonly password: string
}

// tslint:disable-next-line:typedef
export function LoginList() {
  const [loginValues, setLoginValues] = React.useState<Login>({
    id: 0,
    userName: '',
    password: '',
  })

  // const fetchMealTypeData = async () => {
  //   const result = await axios(`${mainUrl}/user`)
  // tslint:disable-next-line:no-console
  console.log(loginValues)
  //   setLoginValues(result.data)
  // }

  const handleLoginSubmit = (values: Login, actions: FormikActions<Login>) => {
    if (
      values.userName === 'sandeep@7mtours.com' &&
      values.password === '8097403106'
    ) {
      setLoginValues(values)
      actions.setSubmitting(false)
      localStorage.setItem('isLoggedIn', 'true')
      const history = createBrowserHistory()
      history.push('/home')
    } else {
      if (values.password !== '8097403106') {
        actions.setFieldError('password', 'Password is incorrect')
      } else if (values.userName !== 'sandeep@7mtours.com') {
        actions.setFieldError('userName', 'UserName is incorrect')
      }
    }
  }

  // const isLoggedIn = localStorage.getItem('isLoggedIn')
  return (
    // <BrowserRouter>
    //   {isLoggedIn ? (
    //     <Route path="/home" exact={true} render={() => <AppRoutes />} />
    //   ) : (
    //     <Route
    //       path="/"
    //       exact={true}
    //    render={() =>
    <LoginForm handleLoginSubmit={handleLoginSubmit} />
    // }
    //     />
    //   )}
    // </BrowserRouter>
  )
}
