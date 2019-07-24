import * as React from 'react'
import axios from 'axios'
import 'bulma/css/bulma.css'
import { FormikActions } from 'formik'
import { getAllItems, postItem } from '../services'

import { mainUrl } from '../config'
import { LoginForm } from './LoginForm'

const url = `${mainUrl}/activities`

export interface Login {
  readonly id: number
  readonly userName: string
  readonly password: string
}

export const LoginList = () => {
  const [loginValues, setLoginValues] = React.useState<Login>({
    id: 0,
    userName: '',
    password: '',
  })

  const fetchMealTypeData = async () => {
    const result = await axios(`${mainUrl}/user`)
    // tslint:disable-next-line:no-console
    console.log(loginValues)
    setLoginValues(result.data)
  }

  const handleLoginSubmit = (values: Login, actions: FormikActions<Login>) => {
    postItem(url, values)
      .then(() => {
        getAllItems(url)
          .then((res: any) => {
            setLoginValues(res)
            actions.setSubmitting(false)
          })
          .catch((err: string) => {
            throw Error(err)
          })
      })
      .catch(err => {
        return Error(err)
      })
  }

  React.useEffect(() => {
    fetchMealTypeData()
  }, [])

  return (
    <div>
      <LoginForm handleLoginSubmit={handleLoginSubmit} />
    </div>
  )
}
