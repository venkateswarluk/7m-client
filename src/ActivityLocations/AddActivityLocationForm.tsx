import * as React from 'react'
import { Field, Formik, Form, FormikActions } from 'formik'

export interface ActivityForm {
  readonly locationId: number
  readonly countryCode: string
  readonly stateCode: string
  readonly city: string
  readonly searchingState: string
  readonly searchingCity: string
  readonly location: string
  readonly address: string
  readonly longitude: string
  readonly latitude: string
}

const activityValues: ActivityForm = {
  locationId: 0,
  countryCode: '',
  stateCode: '',
  city: '',
  searchingCity: '',
  searchingState: '',
  location: '',
  address: '',
  longitude: '',
  latitude: '',
}

export interface AddFormProps {
  readonly count: number
  handleAddSubmit(
    values: ActivityForm,
    actions: FormikActions<ActivityForm>,
  ): void
  handleCloseClick(): void
}

export const AddActivityLocationInnerForm = (props: AddFormProps) => (
  <div>
    <Formik
      initialValues={activityValues}
      onSubmit={(
        values: ActivityForm,
        actions: FormikActions<ActivityForm>,
      ) => {
        const submitValues = {
          ...values,
          locationId: props.count + 1,
          searchingCity: values.city,
          location: values.city,
        }
        props.handleAddSubmit(submitValues, actions)
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

export const AddActivityLocationForm = (props: AddFormProps) => {
  return (
    <div>
      <AddActivityLocationInnerForm
        count={props.count}
        handleAddSubmit={props.handleAddSubmit}
        handleCloseClick={props.handleCloseClick}
      />
    </div>
  )
}
