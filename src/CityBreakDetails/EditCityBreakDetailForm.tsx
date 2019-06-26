import * as React from 'react'
import {
  ErrorMessage,
  Field,
  Formik,
  Form,
  FormikActions,
  FormikProps,
} from 'formik'
import {
  CityBreakDetailsFormValues,
  FormSchema,
  tourNamesByCityId,
} from './AddCityBreakDetailForm'
import { OptionValues } from 'src/CityBreakLocations/CityBreakLocationList'
import { EditFormProps, DestinationProps, TourProps } from '../types'

export interface EditFormProps {
  readonly currentItem: CityBreakDetailsFormValues
  readonly destinations: ReadonlyArray<OptionValues>
  handleEditSubmit(
    values: CityBreakDetailsFormValues,
    actions: FormikActions<CityBreakDetailsFormValues>,
  ): void
  handleCloseClick(): void
}

export const MyApp = (
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
                <label className="label">TourName</label>
                <Field className="input" name="tourname" type="text" />
                <div className="has-text-danger is-size-7">
                  <ErrorMessage name="tourname" />
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

export const EditCityBreakDateailInnerForm = (
  props: EditFormProps<CityBreakDetailsFormValues> &
    DestinationProps &
    TourProps,
) => {
  return (
    <div>
      <h1>My Example</h1>
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
        render={(formikBag: FormikProps<CityBreakDetailsFormValues>) => (
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
                <label className="label">TourName</label>
                <div className="select">
                  <Field name="tourName" component="select">
                    <option>Select TourName</option>
                    {tourNamesByCityId(
                      props.tourNames,
                      formikBag.values.cityId,
                      formikBag.values.days,
                    ).map((d: any) => (
                      <option key={d.value} value={d.value}>
                        {d.label}
                      </option>
                    ))}
                  </Field>
                  <div className="has-text-danger is-size-7">
                    <ErrorMessage name="tourName" />
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="field">
              <div className="control">
                <label className="label">TourName</label>
                <Field className="input" name="tourName" type="text" />
                <div className="has-text-danger is-size-7">
                  <ErrorMessage name="tourName" />
                </div>
              </div>
            </div> */}

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
        )}
      />
    </div>
  )
}

export const EditCityBreakDetailForm = (
  props: EditFormProps<CityBreakDetailsFormValues> &
    DestinationProps &
    TourProps,
) => {
  return (
    <div>
      <EditCityBreakDateailInnerForm
        tourNames={props.tourNames}
        currentItem={props.currentItem}
        destinations={props.destinations}
        handleEditSubmit={props.handleEditSubmit}
        handleCloseClick={props.handleCloseClick}
      />
    </div>
  )
}
