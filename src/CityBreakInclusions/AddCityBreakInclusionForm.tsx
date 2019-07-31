import * as React from 'react'
import {
  ErrorMessage,
  Field,
  Formik,
  Form,
  FormikActions,
  FormikProps,
} from 'formik'
import * as yup from 'yup'
import { AddFormProps, DestinationProps, TourProps } from '../types'
import { tourNamesByCityId } from '../CityBreakDetails/AddCityBreakDetailForm'
import { buttonDisableProps } from 'src/Activities/AddActivity'

export interface CityBreakInclusionFormValues {
  readonly cityId: number
  readonly days: number
  readonly inclusions: string
  readonly tourName: string
}

const activityValues: CityBreakInclusionFormValues = {
  cityId: 0,
  days: 0,
  inclusions: '',
  tourName: '',
}

export const FormSchema: () => yup.ObjectSchema<
  CityBreakInclusionFormValues
> = (): yup.ObjectSchema<CityBreakInclusionFormValues> =>
  yup.object({
    cityId: yup
      .number()
      .min(1, 'Select City')
      .required('Select City'),
    days: yup
      .number()
      .min(1, 'Days Required')
      .required('days Required'),
    inclusions: yup.string().required('inclusions required'),
    tourName: yup.string().required('TourName Required'),
  })

export const AddCityBreakInclusionInnerForm = (
  props: AddFormProps<CityBreakInclusionFormValues> &
    DestinationProps &
    TourProps &
    buttonDisableProps,
) => {
  return (
    <div>
      <Formik
        initialValues={activityValues}
        onSubmit={(
          values: CityBreakInclusionFormValues,
          actions: FormikActions<CityBreakInclusionFormValues>,
        ) => {
          const submitValues = {
            ...values,

            cityId: parseInt(values.cityId.toString(), 10),
          }
          props.handleAddSubmit(submitValues, actions)
        }}
        validationSchema={FormSchema}
        render={(formikBag: FormikProps<CityBreakInclusionFormValues>) => (
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
                      Number(formikBag.values.cityId),
                      Number(formikBag.values.days),
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

            <div className="field">
              <div className="control">
                <label className="label">Inclusions</label>
                <Field className="input" name="inclusions" type="text" />
                <div className="has-text-danger is-size-7">
                  <ErrorMessage name="inclusions" />
                </div>
              </div>
            </div>

            <button
              className="button is-link"
              type="submit"
              disabled={props.buttonDisable}
            >
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

export const AddCityBreakInclusionForm = (
  props: AddFormProps<CityBreakInclusionFormValues> &
    DestinationProps &
    TourProps &
    buttonDisableProps,
) => {
  return (
    <div>
      <AddCityBreakInclusionInnerForm
        buttonDisable={props.buttonDisable}
        tourNames={props.tourNames}
        destinations={props.destinations}
        handleAddSubmit={props.handleAddSubmit}
        handleCloseClick={props.handleCloseClick}
      />
    </div>
  )
}
