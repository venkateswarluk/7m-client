import * as React from 'react'
import { ErrorMessage, Field, Formik, Form, FormikActions } from 'formik'
import {
  FormSchema,
  CityBreakExclusionFormValues,
} from './AddCityBreakExclusionForm'

import { EditFormProps, DestinationProps, OptionValues } from '../types'

export const EditCityBreakExclusionInnerForm = (
  props: EditFormProps<CityBreakExclusionFormValues> & DestinationProps,
) => {
  return (
    <div>
      <Formik
        initialValues={props.currentItem}
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

          props.handleEditSubmit(submitValues, actions)
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

export const EditCityBreakExclusionForm = (
  props: EditFormProps<CityBreakExclusionFormValues> & DestinationProps,
) => {
  return (
    <div>
      <EditCityBreakExclusionInnerForm
        currentItem={props.currentItem}
        destinations={props.destinations}
        handleEditSubmit={props.handleEditSubmit}
        handleCloseClick={props.handleCloseClick}
      />
    </div>
  )
}
