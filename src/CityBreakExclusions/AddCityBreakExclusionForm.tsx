import * as React from 'react'
import { ErrorMessage, Field, Formik, Form, FormikActions } from 'formik'
import * as yup from 'yup'
import { AddFormProps, DestinationProps, OptionValues } from '../types'

export interface CityBreakExclusionFormValues {
  readonly cityId: number
  readonly exclusions: string
}

const activityValues: CityBreakExclusionFormValues = {
  cityId: 0,
  exclusions: '',
}

export const FormSchema: () => yup.ObjectSchema<
  CityBreakExclusionFormValues
> = (): yup.ObjectSchema<CityBreakExclusionFormValues> =>
  yup.object({
    cityId: yup
      .number()
      .min(1, 'Select City')
      .required('Select City'),
    exclusions: yup.string().required('Exclusions required'),
  })
export const AddCityBreakExclusionInnerForm = (
  props: AddFormProps<CityBreakExclusionFormValues> & DestinationProps,
) => {
  return (
    <div>
      <Formik
        initialValues={activityValues}
        onSubmit={(
          values: CityBreakExclusionFormValues,
          actions: FormikActions<CityBreakExclusionFormValues>,
        ) => {
          const city = props.destinations.find(
            (x: OptionValues) =>
              x.value.toString() === values.cityId.toString(),
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
                    {props.destinations.map((d: any) => (
                      <option key={d.value} value={d.value}>
                        {d.label}
                      </option>
                    ))}
                  </Field>
                  <div className="has-text-danger is-size-7">
                    <ErrorMessage name="cityId" />
                  </div>
                </div>
              </div>
            </div>

            <div className="field">
              <div className="control">
                <label className="label">Exclusions</label>
                <Field className="input" name="exclusions" type="text" />
                <div className="has-text-danger is-size-7">
                  <ErrorMessage name="exclusions" />
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
}

export const AddCityBreakExclusionForm = (
  props: AddFormProps<CityBreakExclusionFormValues> & DestinationProps,
) => {
  return (
    <div>
      <AddCityBreakExclusionInnerForm
        destinations={props.destinations}
        handleAddSubmit={props.handleAddSubmit}
        handleCloseClick={props.handleCloseClick}
      />
    </div>
  )
}
