import * as React from 'react'
import { Field, Formik, Form, FormikActions, ErrorMessage } from 'formik'
import * as yup from 'yup'
import { OptionValues } from 'src/CityBreaks/CityBreakList'

export interface CityBreakDetailsFormValues {
  readonly cityId: number
  readonly days: number
  readonly dayNo: number
  readonly dayInfo: string
}

export interface AddFormProps {
  readonly destinations: ReadonlyArray<OptionValues>
  handleAddSubmit(
    values: CityBreakDetailsFormValues,
    actions: FormikActions<CityBreakDetailsFormValues>,
  ): void
  handleCloseClick(): void
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
export const AddCityBreakDateailInnerForm = (props: AddFormProps) => {
  return (
    <div>
      <Formik
        initialValues={activityValues}
        onSubmit={(
          values: CityBreakDetailsFormValues,
          actions: FormikActions<CityBreakDetailsFormValues>,
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
                <label className="label">Days </label>
                <Field className="input" name="days" type="number" />
                <div className="has-text-danger is-size-7">
                  <ErrorMessage name="days" />
                </div>
              </div>
            </div>

            <div className="field">
              <div className="control">
                <label className="label">Day Number</label>
                <Field className="input" name="dayNo" type="number" />
                <div className="has-text-danger is-size-7">
                  <ErrorMessage name="dayNo" />
                </div>
              </div>
            </div>

            <div className="field">
              <div className="control">
                <label className="label">DayInfo</label>
                <Field className="input" name="dayInfo" type="text" />
                <div className="has-text-danger is-size-7">
                  <ErrorMessage name="dayInfo" />
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

export const AddCityBreakDetailForm = (props: AddFormProps) => {
  return (
    <div>
      <AddCityBreakDateailInnerForm
        destinations={props.destinations}
        handleAddSubmit={props.handleAddSubmit}
        handleCloseClick={props.handleCloseClick}
      />
    </div>
  )
}
