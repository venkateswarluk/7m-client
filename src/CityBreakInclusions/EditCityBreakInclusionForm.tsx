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
  CityBreakInclusionFormValues,
  FormSchema,
} from './AddCityBreakInclusionForm'
import { EditFormProps, DestinationProps, TourProps } from '../types'
import { tourNamesByCityId } from '../CityBreakDetails/AddCityBreakDetailForm'

export const EditCityBreakInclusionInnerForm = (
  props: EditFormProps<CityBreakInclusionFormValues> &
    DestinationProps &
    TourProps,
) => {
  return (
    <div>
      <Formik
        initialValues={{
          ...props.currentItem,
          tourName: props.currentItem.tourName,
        }}
        onSubmit={(
          values: CityBreakInclusionFormValues,
          actions: FormikActions<CityBreakInclusionFormValues>,
        ) => {
          const submitValues = {
            ...values,
            cityId: parseInt(values.cityId.toString(), 10),
          }

          props.handleEditSubmit(submitValues, actions)
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
        )}
      />
    </div>
  )
}

export const EditCityBreakInclusionForm = (
  props: EditFormProps<CityBreakInclusionFormValues> &
    DestinationProps &
    TourProps,
) => {
  return (
    <div>
      <EditCityBreakInclusionInnerForm
        tourNames={props.tourNames}
        currentItem={props.currentItem}
        destinations={props.destinations}
        handleEditSubmit={props.handleEditSubmit}
        handleCloseClick={props.handleCloseClick}
      />
    </div>
  )
}
