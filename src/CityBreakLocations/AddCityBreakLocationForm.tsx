import * as React from 'react'
import { Field, Formik, Form, ErrorMessage } from 'formik'
import * as yup from 'yup'

export interface CityBreakLocationFormValues {
  readonly city: string
  readonly country: string
  readonly cityId: number
}

const cityBreakLocationValues: CityBreakLocationFormValues = {
  cityId: 0,
  city: '',
  country: '',
}

export const FormSchema: () => yup.ObjectSchema<
  CityBreakLocationFormValues
> = (): yup.ObjectSchema<CityBreakLocationFormValues> =>
  yup.object({
    cityId: yup
      .number()
      .min(1, 'Select City')
      .required('Select City'),
    city: yup.string().required('City required'),
    country: yup.string().required('Country required'),
  })
export const AddCityBreakLocationInnerForm = (props: any) => {
  return (
    <div>
      <Formik
        initialValues={{
          ...cityBreakLocationValues,
          cityId: props.count + 1,
        }}
        onSubmit={(values: CityBreakLocationFormValues, actions: any) => {
          const submitValues = {
            ...values,
            cityId: props.count + 1,
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
                <Field className="input" name="city" type="text" />
                <div className="has-text-danger is-size-7">
                  <ErrorMessage name="city" />
                </div>
              </div>
            </div>

            <div className="field">
              <div className="control">
                <label className="label">Country</label>
                <Field className="input" name="country" type="text" />
                <div className="has-text-danger is-size-7">
                  <ErrorMessage name="country" />
                </div>
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

export const AddCityBreakLocationForm = (props: any) => {
  return (
    <div>
      <AddCityBreakLocationInnerForm
        count={props.count}
        destinations={props.destinations}
        onSubmit={props.handleAddMealTypeSubmit}
        onClose={props.handleCloseClick}
      />
    </div>
  )
}
