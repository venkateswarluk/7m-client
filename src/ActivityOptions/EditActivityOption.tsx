import * as React from 'react'
import { ErrorMessage, Field, Formik, Form, FormikActions } from 'formik'
import { ActivityOptionForm } from './AddActivityOption'
import { FormSchema } from './AddActivityOption'

interface EditFormProps {
  readonly currentItem: ActivityOptionForm
  handleEditSubmit(
    values: ActivityOptionForm,
    actions: FormikActions<ActivityOptionForm>,
  ): void
  handleCloseClick(): void
}

export const EditActivityOptionInnerForm = (props: EditFormProps) => (
  <div>
    <Formik
      initialValues={props.currentItem}
      onSubmit={(values: ActivityOptionForm, actions: any) => {
        props.handleEditSubmit(values, actions)
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

export const EditActivityOptionForm = (props: EditFormProps) => {
  return (
    <div>
      <EditActivityOptionInnerForm
        currentItem={props.currentItem}
        handleEditSubmit={props.handleEditSubmit}
        handleCloseClick={props.handleCloseClick}
      />
    </div>
  )
}
