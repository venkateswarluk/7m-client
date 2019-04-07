import * as React from 'react'
import { Field, Formik, Form } from 'formik'
import { ActivityOption } from './ActivityOptionList'
import { FormSchema } from './AddActivityOption'

export const EditActivityOptionInnerForm = (props: any) => (
  <div>
    <Formik
      initialValues={props.values}
      onSubmit={(values: ActivityOption, actions: any) => {
        props.onSubmit(values, actions)
      }}
      validationSchema={FormSchema}
    >
      <div>
        <Form>
          <div className="field">
            <div className="control">
              <label className="label">Activity Option Id</label>
              <Field className="input" name="activityOptionId" type="number" />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label className="label">TypeVal </label>
              <Field className="input" name="typeVal" type="text" />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label className="label">Type Description</label>
              <Field className="input" name="typeDescription" type="text" />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label className="label">Name</label>
              <Field className="input" name="name" type="text" />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label className="label">ActivityId</label>
              <Field className="input" name="activityId" type="number" />
            </div>
          </div>

          <button className="button is-link" type="submit">
            Submit
          </button>
          <button
            className="button is-danger"
            type="button"
            onClick={() => props.onClose()}
          >
            Close
          </button>
        </Form>
      </div>
    </Formik>
  </div>
)

export const EditActivityOptionForm = (props: any) => {
  return (
    <div>
      <EditActivityOptionInnerForm
        values={props.activityOptionValues}
        onSubmit={props.handleAddMealTypeSubmit}
        onClose={props.handleCloseClick}
      />
    </div>
  )
}
