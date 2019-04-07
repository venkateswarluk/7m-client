import * as React from 'react'
import { Field, Formik, Form } from 'formik'
import { ActivityForm } from './AddActivityLocationForm'

export const EditActivityLocationInnerForm = (props: any) => (
  <div>
    <Formik
      initialValues={props.values}
      onSubmit={(values: ActivityForm, actions: any) => {
        const submitValues = {
          ...values,
          locationId: props.count + 1,
          searchingCity: values.city,
          location: values.city,
        }
        props.onSubmit(submitValues, actions)
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
              <Field className="input" name="searchingState" type="url" />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label className="label">Address</label>
              <Field className="input" name="address" type="url" />
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
            onClick={() => props.onClose()}
          >
            Close
          </button>
        </Form>
      </div>
    </Formik>
  </div>
)

export const EditActivityLocationForm = (props: any) => {
  return (
    <div>
      <EditActivityLocationInnerForm
        values={props.activityLocations}
        count={props.count}
        onSubmit={props.handleAddMealTypeSubmit}
        onClose={props.handleCloseClick}
      />
    </div>
  )
}
