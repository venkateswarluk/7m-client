import * as React from 'react'
import { Field, Formik, Form } from 'formik'

import {
  CityBreakLocationFormValues,
  FormSchema,
} from './AddCityBreakLocationForm'

export const EditCityBreakLocationInnerForm = (props: any) => {
  return (
    <div>
      <Formik
        initialValues={props.values}
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
              </div>
            </div>

            <div className="field">
              <div className="control">
                <label className="label">Country</label>
                <Field className="input" name="country" type="text" />
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

export const EditCityBreakLocationForm = (props: any) => {
  return (
    <div>
      <EditCityBreakLocationInnerForm
        count={props.count}
        values={props.cityBreakLocations}
        destinations={props.destinations}
        onSubmit={props.handleEditMealTypeSubmit}
        onClose={props.handleCloseClick}
      />
    </div>
  )
}
