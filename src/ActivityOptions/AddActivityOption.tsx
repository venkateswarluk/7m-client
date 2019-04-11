import * as React from 'react'
import { ErrorMessage, Field, Formik, Form, FormikActions } from 'formik'
import * as yup from 'yup'

export interface ActivityOptionForm {
  readonly activityOptionId: number
  readonly typeVal: string
  readonly typeDescription: string
  readonly name: string
  readonly activityId: number
}

const activityValues: ActivityOptionForm = {
  activityOptionId: 0,
  activityId: 0,
  typeDescription: '',
  typeVal: '',
  name: '',
}

export interface AddFormProps {
  handleAddSubmit(
    values: ActivityOptionForm,
    actions: FormikActions<ActivityOptionForm>,
  ): void
  handleCloseClick(): void
}

export const FormSchema: () => yup.ObjectSchema<
  ActivityOptionForm
> = (): yup.ObjectSchema<ActivityOptionForm> =>
  yup.object({
    activityOptionId: yup
      .number()
      .moreThan(0, 'Must more Than 0')
      .required('ActivityOptionId Required'),
    activityId: yup
      .number()
      .moreThan(0, 'Must more Than 0')
      .required('ActivityId Required'),
    typeVal: yup.string().required(' TipeVal Required'),
    typeDescription: yup.string().required('TypeDescription Required'),
    name: yup.string().required('Name Required'),
  })

export const AddActivityOptionInnerForm = (props: AddFormProps) => (
  <div>
    <Formik
      initialValues={activityValues}
      onSubmit={(
        values: ActivityOptionForm,
        actions: FormikActions<ActivityOptionForm>,
      ) => {
        props.handleAddSubmit(values, actions)
      }}
      validationSchema={FormSchema}
    >
      <div>
        <Form>
          <div className="field">
            <div className="control">
              <label className="label">Activity Option Id</label>
              <Field className="input" name="activityOptionId" type="number" />
              <div className="has-text-danger is-size-7">
                <ErrorMessage name="activityOptionId" />
              </div>
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label className="label">TypeVal </label>
              <Field className="input" name="typeVal" type="text" />
              <div className="has-text-danger is-size-7">
                <ErrorMessage name="typeVal" />
              </div>
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label className="label">Type Description</label>
              <Field className="input" name="typeDescription" type="text" />
              <div className="has-text-danger is-size-7">
                <ErrorMessage name="typeDescription" />
              </div>
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label className="label">Name</label>
              <Field className="input" name="name" type="text" />
              <div className="has-text-danger is-size-7">
                <ErrorMessage name="name" />
              </div>
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label className="label">ActivityId</label>
              <Field className="input" name="activityId" type="number" />
              <div className="has-text-danger is-size-7">
                <ErrorMessage name="activityId" />
              </div>
            </div>
          </div>

          <button className="button is-link" type="submit">
            Submit
          </button>
          <button
            className="button is-danger"
            type="button"
            onClick={() => props.handleCloseClick()}
          >
            Close
          </button>
        </Form>
      </div>
    </Formik>
  </div>
)

export const AddActivityOptionForm = (props: AddFormProps) => {
  return (
    <div>
      <AddActivityOptionInnerForm
        handleAddSubmit={props.handleAddSubmit}
        handleCloseClick={props.handleCloseClick}
      />
    </div>
  )
}
