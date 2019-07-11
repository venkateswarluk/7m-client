import * as React from 'react'
import { Field, Formik, Form, FormikActions } from 'formik'
import { ActivityForm } from './AddActivityLocationForm'

interface EditFormProps {
  readonly currentItem: ActivityForm
  readonly count: number
  handleEditSubmit(
    values: ActivityForm,
    actions: FormikActions<ActivityForm>,
  ): void
  handleCloseClick(): void
}

export const EditActivityLocationInnerForm = (props: EditFormProps) => (
  <div>
    <Formik
      initialValues={props.currentItem}
      onSubmit={(values: ActivityForm, actions: any) => {
        const submitValues = {
          ...values,
          locationId: values.locationId,
          searchingCity: values.city,
          location: values.city,
        }
        props.handleEditSubmit(submitValues, actions)
      }}
    >
      <div>
        <Form>
          <div className="field">
            <div className="control">
              <label className="label">Country Code</label>
              <Field className="input" name="countryCode" type="text" />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label className="label">State Code</label>
              <Field className="input" name="stateCode" type="text" />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label className="label">City</label>
              <Field className="input" name="city" type="text" />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label className="label">State</label>
              <Field className="input" name="searchingState" type="text" />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label className="label">Address</label>
              <Field className="input" name="address" type="text" />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label className="label">Longitude</label>
              <Field className="input" name="longitude" type="text" />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label className="label">latitude</label>
              <Field className="input" name="latitude" type="text" />
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

export const EditActivityLocationForm = (props: EditFormProps) => {
  return (
    <div>
      <EditActivityLocationInnerForm
        currentItem={props.currentItem}
        count={props.count}
        handleEditSubmit={props.handleEditSubmit}
        handleCloseClick={props.handleCloseClick}
      />
    </div>
  )
}
