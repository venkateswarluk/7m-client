import * as React from 'react'
import { Field, Formik, Form } from 'formik'
import * as yup from 'yup'

export interface CityBreakInclusionFormValues {
  readonly cityId: number
  readonly days: number
  readonly inclusions: string
}

const activityValues: CityBreakInclusionFormValues = {
  cityId: 0,
  days: 0,
  inclusions: '',
}

export const FormSchema: () => yup.ObjectSchema<
  CityBreakInclusionFormValues
> = (): yup.ObjectSchema<CityBreakInclusionFormValues> =>
  yup.object({
    cityId: yup.number().required('Select City'),
    days: yup.number().required('days Required'),
    inclusions: yup.string().required('DayInfo required'),
  })
export const AddCityBreakInclusionInnerForm = (props: any) => {
  return (
    <div>
      <Formik
        initialValues={activityValues}
        onSubmit={(values: CityBreakInclusionFormValues, actions: any) => {
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
                <label className="label">Inclusions</label>
                <Field className="input" name="inclusions" type="text" />
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

export const AddCityBreakInclusionForm = (props: any) => {
  return (
    <div>
      <AddCityBreakInclusionInnerForm
        destinations={props.destinations}
        onSubmit={props.handleAddMealTypeSubmit}
        onClose={props.handleCloseClick}
      />
    </div>
  )
}
