import * as React from 'react'
import { Field, Formik, Form } from 'formik'
import {
  FormSchema,
  CityBreakExclusionFormValues,
} from './AddCityBreakExclusionForm'

export const EditCityBreakExclusionInnerForm = (props: any) => {
  return (
    <div>
      <Formik
        initialValues={props.values}
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

export const EditCityBreakExclusionForm = (props: any) => {
  return (
    <div>
      <EditCityBreakExclusionInnerForm
        values={props.cityBreakEclusions}
        destinations={props.destinations}
        onSubmit={props.handleEditMealTypeSubmit}
        onClose={props.handleCloseClick}
      />
    </div>
  )
}
