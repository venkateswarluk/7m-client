import * as React from 'react'
import { ErrorMessage, Field, Formik, Form, FormikActions } from 'formik'
import {
  CityBreakDetailsFormValues,
  FormSchema,
} from './AddCityBreakDetailForm'
import { OptionValues } from 'src/CityBreakLocations/CityBreakLocationList'
import { EditFormProps, DestinationProps } from '../types'

export interface EditFormProps {
  readonly currentItem: CityBreakDetailsFormValues
  readonly destinations: ReadonlyArray<OptionValues>
  handleEditSubmit(
    values: CityBreakDetailsFormValues,
    actions: FormikActions<CityBreakDetailsFormValues>,
  ): void
  handleCloseClick(): void
}

export const EditCityBreakDateailInnerForm = (
  props: EditFormProps<CityBreakDetailsFormValues> & DestinationProps,
) => {
  return (
    <div>
      <Formik
        initialValues={props.currentItem}
        onSubmit={(
          values: CityBreakDetailsFormValues,
          actions: FormikActions<CityBreakDetailsFormValues>,
        ) => {
          const submitValues = {
            ...values,
            city: props.destinations.find(
              (x: any) => x.value === values.cityId,
            ),
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

export const EditCityBreakDetailForm = (
  props: EditFormProps<CityBreakDetailsFormValues> & DestinationProps,
) => {
  return (
    <div>
      <EditCityBreakDateailInnerForm
        currentItem={props.currentItem}
        destinations={props.destinations}
        handleEditSubmit={props.handleEditSubmit}
        handleCloseClick={props.handleCloseClick}
      />
    </div>
  )
}
