import * as React from 'react'
import { Field, Formik, Form, FormikActions, ErrorMessage } from 'formik'
import * as yup from 'yup'
import { buttonDisableProps } from 'src/Activities/AddActivity'

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

export const FormSchema: () => yup.ObjectSchema<
  ActivityForm
> = (): yup.ObjectSchema<ActivityForm> =>
  yup.object({
    locationId: yup
      .number()
      .min(1, 'locationId Required')
      .required('locationId Required'),
    countryCode: yup.string().required(),
    stateCode: yup.string().required(),
    city: yup.string().required(),
    searchingCity: yup.string(),
    searchingState: yup.string().required(),
    location: yup.string(),
    address: yup.string().required(),
    longitude: yup.string().required('Required'),
    latitude: yup.string().required('Required'),
  })

export const AddActivityLocationInnerForm = (
  props: AddFormProps & buttonDisableProps,
) => (
  <div>
    <Formik
      initialValues={{
        ...activityValues,
        locationId: props.count,
        searchingCity: activityValues.city,
        location: activityValues.city,
      }}
      onSubmit={(
        values: ActivityForm,
        actions: FormikActions<ActivityForm>,
      ) => {
        const submitValues = {
          ...values,

          locationId: props.count,
          searchingCity: values.city,
          location: values.city,
          latitude: values.latitude === '' ? '' : values.latitude.toString(),
          longitude: values.longitude === '' ? '' : values.longitude.toString(),
        }
        props.handleAddSubmit(submitValues, actions)
      }}
      validationSchema={FormSchema}
    >
      <div>
        <Form>
          <div className="field">
            <div className="control">
              <label className="label">Country Code</label>
              <Field className="input" name="countryCode" type="text" />
              <div className="has-text-danger is-size-7">
                <ErrorMessage name="countryCode" />
              </div>
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label className="label">State Code</label>
              <Field className="input" name="stateCode" type="text" />
              <div className="has-text-danger is-size-7">
                <ErrorMessage name="stateCode" />
              </div>
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label className="label">City</label>
              <Field className="input" name="city" type="text" />
              <div className="has-text-danger is-size-7">
                <ErrorMessage name="city" />
              </div>
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label className="label">State</label>
              <Field className="input" name="searchingState" type="text" />
              <div className="has-text-danger is-size-7">
                <ErrorMessage name="searchingState" />
              </div>
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label className="label">Address</label>
              <Field className="input" name="address" type="text" />
              <div className="has-text-danger is-size-7">
                <ErrorMessage name="address" />
              </div>
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label className="label">Longitude</label>
              <Field className="input" name="longitude" type="number" />
              <div className="has-text-danger is-size-7">
                <ErrorMessage name="longitude" />
              </div>
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label className="label">latitude</label>
              <Field className="input" name="latitude" type="number" />
              <div className="has-text-danger is-size-7">
                <ErrorMessage name="latitude" />
              </div>
            </div>
          </div>

          <button
            className="button is-link"
            type="submit"
            disabled={props.buttonDisable}
          >
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

export const AddActivityLocationForm = (
  props: AddFormProps & buttonDisableProps,
) => {
  return (
    <div>
      <AddActivityLocationInnerForm
        buttonDisable={props.buttonDisable}
        count={props.count}
        handleAddSubmit={props.handleAddSubmit}
        handleCloseClick={props.handleCloseClick}
      />
    </div>
  )
}
