import * as React from 'react'
import {
  Field,
  Formik,
  Form,
  FormikActions,
  FormikProps,
  ErrorMessage,
} from 'formik'
import * as yup from 'yup'
import { OptionValues } from 'src/CityBreaks/CityBreakList'
import {
  AddFormProps,
  DestinationProps,
  TourProps,
  OptionValues1,
} from '../types'
import { buttonDisableProps } from 'src/Activities/AddActivity'

export interface CityBreakDetailsFormValues {
  readonly cityId: number
  readonly days: number
  readonly tourName: string
  readonly dayNo: number
  readonly dayInfo: string
}

// export interface AddFormProps {
//   readonly destinations: ReadonlyArray<OptionValues>
//   handleAddSubmit(
//     values: CityBreakDetailsFormValues,
//     actions: FormikActions<CityBreakDetailsFormValues>,
//   ): void
//   handleCloseClick(): void
// }

const activityValues: CityBreakDetailsFormValues = {
  cityId: 0,
  days: 0,
  tourName: '',
  dayNo: 0,
  dayInfo: '',
}

export const FormSchema: () => yup.ObjectSchema<
  CityBreakDetailsFormValues
> = (): yup.ObjectSchema<CityBreakDetailsFormValues> =>
  yup.object({
    cityId: yup
      .number()
      .min(1, 'Select City')
      .required('Select City'),
    days: yup
      .number()
      .integer()
      .positive()
      .min(1, 'Days Required')
      .required('Days Required'),
    tourName: yup.string().required('TourName required'),
    dayInfo: yup.string().required('DayInfo required'),
    dayNo: yup
      .number()
      .integer()
      .positive()
      .min(1, 'DayNo Required')
      .required('DayNo required'),
  })

export const tourNamesByCityId = (
  tours: ReadonlyArray<OptionValues1>,
  cityId: number,
  days: number,
) => {
  // tslint:disable-next-line:no-console
  console.log('cityId:', cityId, 'days:', days, 'tours:', tours)
  return cityId && days
    ? tours.filter((x: any) => x.cityId === cityId && x.days === days)
    : []
}

export const AddCityBreakDateailInnerForm = (
  props: AddFormProps<CityBreakDetailsFormValues> &
    DestinationProps &
    TourProps &
    buttonDisableProps,
) => {
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
                    <ErrorMessage
                      name="cityId"
                      render={() => <div> City Id Required</div>}
                    />
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

export const AddCityBreakDetailForm = (
  props: AddFormProps<CityBreakDetailsFormValues> &
    DestinationProps &
    TourProps &
    buttonDisableProps,
) => {
  return (
    <div>
      <AddCityBreakDateailInnerForm
        buttonDisable={props.buttonDisable}
        tourNames={props.tourNames}
        destinations={props.destinations}
        handleAddSubmit={props.handleAddSubmit}
        handleCloseClick={props.handleCloseClick}
      />
    </div>
  )
}
