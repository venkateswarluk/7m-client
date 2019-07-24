import * as React from 'react'
import { ErrorMessage, Field, Formik, Form, FormikActions } from 'formik'
import * as yup from 'yup'

import { LoginFormProps } from '../types'

export interface LoginForm {
  readonly userName: string
  readonly password: string
}

const loginValues: LoginForm = {
  userName: '',
  password: '',
}

export const LoginFormSchema: yup.ObjectSchema<LoginForm> = yup.object({
  userName: yup.string().required('UserName Required'),
  password: yup.string().required('Password Required'),
})

export const LoginInnerForm = (props: LoginFormProps<LoginForm>) => (
  <div>
    <Formik
      initialValues={loginValues}
      onSubmit={(values: LoginForm, actions: FormikActions<LoginForm>) => {
        props.handleLoginSubmit(values, actions)
      }}
      validationSchema={LoginFormSchema}
    >
      <div>
        <Form>
          <div className="field">
            <div className="control">
              <label className="label">User Name</label>
              <Field className="input" name="userName" type="text" />
              <div className="has-text-danger is-size-7">
                <ErrorMessage name="userName" />
              </div>
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label className="label">Password</label>
              <Field className="input" name="password" type="password" />
              <div className="has-text-danger is-size-7">
                <ErrorMessage name="password" />
              </div>
            </div>
          </div>
          <br />
          <button className="button is-link" type="submit">
            Submit
          </button>
        </Form>
      </div>
    </Formik>
  </div>
)

export const LoginForm = (props: LoginFormProps<LoginForm>) => {
  return (
    <div>
      <LoginInnerForm handleLoginSubmit={props.handleLoginSubmit} />
    </div>
  )
}
