import * as React from 'react'
import { Field, Formik, Form } from 'formik'
import * as yup from 'yup'

export interface CityBreakFormValues {
  readonly cityId: number
  readonly city: string
  readonly days: number
  readonly description: string
  readonly price: number
  readonly imageUrl: string
  readonly phone: string
  readonly starRating: number
}

const activityValues: CityBreakFormValues = {
  cityId: 0,
  city: '',
  days: 0,
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
    cityId: yup.number().required('Select City'),
    city: yup.string().required(' City Required'),
    days: yup.number().required('days Required'),
    description: yup.string().required('Description required'),
    price: yup.number().required('Price required'),
    imageUrl: yup.string().required('MealType required'),
    phone: yup.string().required('MealType required'),
    starRating: yup.number().required('MealType required'),
  })
export const AddCityBreakInnerForm = (props: any) => {
  return (
    <div>
      <Formik
        initialValues={activityValues}
        onSubmit={(values: CityBreakFormValues, actions: any) => {
          const submitValues = {
            ...values,
            city: props.destinations.find(
              (x: any) => x.value === values.cityId,
            ),
          }
          props.onSubmit(submitValues, actions)
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
                    {props.destinations.map((d: any) => (
                      <option key={d.value} value={d.value}>
                        {d.label}
                      </option>
                    ))}
                  </Field>
                </div>
              </div>
            </div>

            <div className="field">
              <div className="control">
                <label className="label">Days </label>
                <Field className="input" name="days" type="number" />
              </div>
            </div>

            <div className="field">
              <div className="control">
                <label className="label">Description</label>
                <Field className="input" name="description" type="text" />
              </div>
            </div>

            <div className="field">
              <div className="control">
                <label className="label">Price</label>
                <Field className="input" name="price" type="number" />
              </div>
            </div>

            <div className="field">
              <div className="control">
                <label className="label">ImageUrl</label>
                <Field className="input" name="imageUrl" type="url" />
              </div>
            </div>

            <div className="field">
              <div className="control">
                <label className="label">Phone</label>
                <Field className="input" name="phone" type="text" />
              </div>
            </div>

            <div className="field">
              <div className="control">
                <label className="label">StarRating</label>
                <Field className="input" name="starRating" type="number" />
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
}

export const AddCityBreakForm = (props: any) => {
  return (
    <div>
      <AddCityBreakInnerForm
        destinations={props.destinations}
        onSubmit={props.handleAddMealTypeSubmit}
        onClose={props.handleCloseClick}
      />
    </div>
  )
}
