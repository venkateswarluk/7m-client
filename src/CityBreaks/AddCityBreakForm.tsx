import * as React from 'react'
import { ErrorMessage, Field, Formik, Form, FormikActions } from 'formik'
import * as yup from 'yup'
import { AddFormProps, DestinationProps } from '../types'
import { buttonDisableProps } from 'src/Activities/AddActivity'

export interface CityBreakFormValues {
  readonly cityId: number
  readonly days: number
  readonly tourName: string
  readonly description: string
  readonly price: number
  readonly imageUrl: string
  readonly phone: string
  readonly starRating: number
}

const activityValues: CityBreakFormValues = {
  cityId: 0,
  days: 0,
  tourName: '',
  description: '',
  price: 0.0,
  imageUrl: '',
  phone: '',
  starRating: 0,
}

export const FormSchema: () => yup.ObjectSchema<
  CityBreakFormValues
> = (): yup.ObjectSchema<CityBreakFormValues> =>
  yup.object({
    cityId: yup
      .number()
      .min(1, 'Select City')
      .required('Select City'),
    days: yup
      .number()
      .min(1, 'Days Required')
      .required('days Required'),
    tourName: yup.string().required('TourName required'),
    description: yup.string().required('Description required'),
    price: yup
      .number()
      .integer()
      .positive()
      .min(1, 'Price required')
      .required('Price required'),
    imageUrl: yup.string().required('Image required'),
    phone: yup.string().required('Phone required'),
    starRating: yup
      .number()
      .integer()
      .positive()
      .min(1, 'StarRating Must be Greater Than 0')
      .max(5, 'StarRating Must be Less Than 6')
      .required('StarRating required'),
  })
export const AddCityBreakInnerForm = (
  props: AddFormProps<CityBreakFormValues> &
    DestinationProps &
    buttonDisableProps,
) => {
  return (
    <div>
      <Formik
        initialValues={activityValues}
        onSubmit={(
          values: CityBreakFormValues,
          actions: FormikActions<CityBreakFormValues>,
        ) => {
          const city = props.destinations.find(
            x => x.value.toString() === values.cityId.toString(),
          )

          const submitValues = {
            ...values,
            city: city ? city.label : '',
            cityId: parseInt(values.cityId.toString(), 10),
          }

          props.handleAddSubmit(submitValues, actions)
        }}
        validationSchema={FormSchema}
      >
        <div>
          <Form>
            <div className="field">
              <div className="control">
                <label className="label">City</label>
                <div className="select">
                  <Field name="cityId" component="select">
                    <option>Select City</option>
                    {props.destinations.map(d => {
                      return (
                        <option key={d.value} value={d.value}>
                          {d.label}
                        </option>
                      )
                    })}
                  </Field>
                  <div className="has-text-danger is-size-7">
                    <ErrorMessage name="cityId" />
                  </div>
                </div>
              </div>
            </div>

            <div className="field">
              <div className="control">
                <label className="label">Days </label>
                <Field className="input" name="days" type="number" />
                <div className="has-text-danger is-size-7">
                  <ErrorMessage name="days" />
                </div>
              </div>
            </div>

            <div className="field">
              <div className="control">
                <label className="label">TourName</label>
                <Field className="input" name="tourName" type="text" />
                <div className="has-text-danger is-size-7">
                  <ErrorMessage name="tourName" />
                </div>
              </div>
            </div>

            <div className="field">
              <div className="control">
                <label className="label">Description</label>
                <Field className="input" name="description" type="text" />
                <div className="has-text-danger is-size-7">
                  <ErrorMessage name="description" />
                </div>
              </div>
            </div>

            <div className="field">
              <div className="control">
                <label className="label">Price</label>
                <Field className="input" name="price" type="number" />
                <div className="has-text-danger is-size-7">
                  <ErrorMessage name="price" />
                </div>
              </div>
            </div>

            <div className="field">
              <div className="control">
                <label className="label">ImageUrl</label>
                <Field className="input" name="imageUrl" type="url" />
                <div className="has-text-danger is-size-7">
                  <ErrorMessage name="imageUrl" />
                </div>
              </div>
            </div>

            <div className="field">
              <div className="control">
                <label className="label">Phone</label>
                <Field className="input" name="phone" type="text" />
                <div className="has-text-danger is-size-7">
                  <ErrorMessage name="phone" />
                </div>
              </div>
            </div>

            <div className="field">
              <div className="control">
                <label className="label">StarRating</label>
                <Field className="input" name="starRating" type="number" />
                <div className="has-text-danger is-size-7">
                  <ErrorMessage name="starRating" />
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
}

export const AddCityBreakForm = (
  props: AddFormProps<CityBreakFormValues> &
    DestinationProps &
    buttonDisableProps,
) => {
  return (
    <div>
      <AddCityBreakInnerForm
        buttonDisable={props.buttonDisable}
        destinations={props.destinations}
        handleAddSubmit={props.handleAddSubmit}
        handleCloseClick={props.handleCloseClick}
      />
    </div>
  )
}
