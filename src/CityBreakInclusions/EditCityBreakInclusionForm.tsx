import * as React from 'react'
import { ErrorMessage, Field, Formik, Form, FormikActions } from 'formik'
import {
  CityBreakInclusionFormValues,
  FormSchema,
} from './AddCityBreakInclusionForm'
import { EditFormProps, DestinationProps, OptionValues } from '../types'

export const EditCityBreakInclusionInnerForm = (
  props: EditFormProps<CityBreakInclusionFormValues> & DestinationProps,
) => {
  return (
    <div>
      <Formik
        initialValues={props.currentItem}
        onSubmit={(
          values: CityBreakInclusionFormValues,
          actions: FormikActions<CityBreakInclusionFormValues>,
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
                <label className="label">Days </label>
                <Field className="input" name="days" type="number" />
                <div className="has-text-danger is-size-7">
                  <ErrorMessage name="days" />
                </div>
              </div>
            </div>

            <div className="field">
              <div className="control">
                <label className="label">Inclusions</label>
                <Field className="input" name="inclusions" type="text" />
                <div className="has-text-danger is-size-7">
                  <ErrorMessage name="inclusions" />
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

export const EditCityBreakInclusionForm = (
  props: EditFormProps<CityBreakInclusionFormValues> & DestinationProps,
) => {
  return (
    <div>
      <EditCityBreakInclusionInnerForm
        currentItem={props.currentItem}
        destinations={props.destinations}
        handleEditSubmit={props.handleEditSubmit}
        handleCloseClick={props.handleCloseClick}
      />
    </div>
  )
}
