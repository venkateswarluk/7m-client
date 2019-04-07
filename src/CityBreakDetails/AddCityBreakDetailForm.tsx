import * as React from 'react'
import { Field, Formik, Form } from 'formik'
import * as yup from 'yup'

export interface CityBreakDetailsFormValues {
  readonly cityId: number
  readonly days: number
  readonly dayNo: number
  readonly dayInfo: string
}

const activityValues: CityBreakDetailsFormValues = {
  cityId: 0,
  days: 0,
  dayNo: 0,
  dayInfo: '',
}

export const FormSchema: () => yup.ObjectSchema<
  CityBreakDetailsFormValues
> = (): yup.ObjectSchema<CityBreakDetailsFormValues> =>
  yup.object({
    cityId: yup.number().required('Select City'),
    days: yup.number().required('days Required'),
    dayInfo: yup.string().required('DayInfo required'),
    dayNo: yup.number().required('DayNo required'),
  })
export const AddCityBreakDateailInnerForm = (props: any) => {
  return (
    <div>
      <Formik
        initialValues={activityValues}
        onSubmit={(values: CityBreakDetailsFormValues, actions: any) => {
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
                <label className="label">Day Number</label>
                <Field className="input" name="dayNo" type="number" />
              </div>
            </div>

            <div className="field">
              <div className="control">
                <label className="label">DayInfo</label>
                <Field className="input" name="dayInfo" type="text" />
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

export const AddCityBreakDetailForm = (props: any) => {
  return (
    <div>
      <AddCityBreakDateailInnerForm
        destinations={props.destinations}
        onSubmit={props.handleAddMealTypeSubmit}
        onClose={props.handleCloseClick}
      />
    </div>
  )
}
