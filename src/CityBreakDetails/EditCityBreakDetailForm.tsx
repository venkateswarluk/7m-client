import * as React from 'react'
import { Field, Formik, Form } from 'formik'
import {
  CityBreakDetailsFormValues,
  FormSchema,
} from './AddCityBreakDetailForm'

export const EditCityBreakDateailInnerForm = (props: any) => {
  return (
    <div>
      <Formik
        initialValues={props.values}
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

export const EditCityBreakDetailForm = (props: any) => {
  return (
    <div>
      <EditCityBreakDateailInnerForm
        values={props.cityBreakDetails}
        destinations={props.destinations}
        onSubmit={props.handleAddMealTypeSubmit}
        onClose={props.handleCloseClick}
      />
    </div>
  )
}
