import * as React from 'react'
import { Field, Formik, Form } from 'formik'
import * as yup from 'yup'

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
    cityId: yup.number().required('Select City'),
    exclusions: yup.string().required('Exclusions required'),
  })
export const AddCityBreakExclusionInnerForm = (props: any) => {
  return (
    <div>
      <Formik
        initialValues={activityValues}
        onSubmit={(values: CityBreakExclusionFormValues, actions: any) => {
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
                <label className="label">Exclusions</label>
                <Field className="input" name="exclusions" type="text" />
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

export const AddCityBreakExclusionForm = (props: any) => {
  return (
    <div>
      <AddCityBreakExclusionInnerForm
        destinations={props.destinations}
        onSubmit={props.handleAddMealTypeSubmit}
        onClose={props.handleCloseClick}
      />
    </div>
  )
}
