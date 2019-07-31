import * as React from 'react'
import {
  Field,
  Formik,
  Form,
  FormikActions,
  ErrorMessage,
  FormikProps,
} from 'formik'
import * as yup from 'yup'
import { AddFormProps } from '../types'
import { buttonDisableProps } from 'src/Activities/AddActivity'

export interface OptionAvailabilityForm {
  readonly optionAvailabilityId: number
  readonly maxAdults: number
  readonly maxChilds: number
  readonly maxUnits?: number
  readonly adultPrice: number
  readonly childPrice: number
  readonly unitPrice?: number
  readonly optionId: number
  readonly activityId: number
  readonly fromDate: Date
  readonly toDate: Date
}

const optionAvailabilitiesValues: OptionAvailabilityForm = {
  optionAvailabilityId: 0,
  maxAdults: 0,
  maxChilds: 0,
  maxUnits: 0,
  adultPrice: 0.0,
  childPrice: 0.0,
  unitPrice: 0.0,
  optionId: 0,
  activityId: 0,
  fromDate: new Date(),
  toDate: new Date(),
}

export const FormSchema: () => yup.ObjectSchema<
  OptionAvailabilityForm
> = (): yup.ObjectSchema<OptionAvailabilityForm> =>
  yup.object({
    optionAvailabilityId: yup
      .number()
      .min(1, 'ActivityOptionId Required')
      .required('ActivityOptionId Required'),
    activityId: yup
      .number()
      .positive()
      .min(1, 'ActivityId Required')
      .required('ActivityId Required'),
    optionId: yup
      .number()
      .positive()
      .min(1, 'OptionId Required')
      .required('OptionId Required'),
    maxAdults: yup
      .number()
      .notRequired()
      .when('maxUnits', {
        is: val => Number(val) === 0,
        then: yup
          .number()
          .min(1, 'MaxAdults Required')
          .required('MaxAdults Required'),
        // tslint:disable-next-line:object-literal-sort-keys
        otherwise: yup.number().notRequired(),
      }),
    maxChilds: yup
      .number()
      .notRequired()
      .when('maxUnits', {
        is: val => Number(val) === 0,
        then: yup
          .number()
          .min(1, 'MaxChilds Required')
          .required('MaxChilds Required'),
        // tslint:disable-next-line:object-literal-sort-keys
        otherwise: yup.number().notRequired(),
      }),
    maxUnits: yup.number().notRequired(),
    // .when('maxChilds', {
    //   is: val => val === 0,
    //   then: yup
    //     .number()
    //     .min(1, 'MaxUnits Required')
    //     .required('MaxUnits Required'),
    //   // tslint:disable-next-line:object-literal-sort-keys
    //   otherwise: yup.number().notRequired(),
    // }),
    adultPrice: yup
      .number()
      .positive()
      .notRequired()
      .when('maxUnits', {
        is: val => Number(val) === 0,
        then: yup
          .number()
          .min(1, 'AdultPrice Required')
          .required('adultPrice Required'),
        // tslint:disable-next-line:object-literal-sort-keys
        otherwise: yup.number().notRequired(),
      }),
    childPrice: yup
      .number()
      .positive()
      .notRequired()
      .when('maxUnits', {
        is: val => Number(val) === 0,
        then: yup
          .number()
          .min(1, 'ChildPrice Required')
          .required('ChildPrice Required'),
        // tslint:disable-next-line:object-literal-sort-keys
        otherwise: yup.number().notRequired(),
      }),
    unitPrice: yup
      .number()
      .positive()
      .notRequired()
      .when('maxAdults', {
        is: val => val === 0,
        then: yup
          .number()
          .min(1, 'UnitPrice Required')
          .required('UnitPrice Required'),
        // tslint:disable-next-line:object-literal-sort-keys
        otherwise: yup.number().notRequired(),
      }),
    fromDate: yup
      .date()
      .min(new Date(), 'Please Select from Current Date')
      .required('Required'),
    toDate: yup
      .date()
      .required('Required')
      .when('fromDate', (st: Date) => {
        return yup
          .date()
          .min(st)
          .required('Please Select Date Greater than fromDate')
      })
      .required('Required'),
  })

export const AddOptionAvailabilityInnerForm = (
  props: AddFormProps<OptionAvailabilityForm> & buttonDisableProps,
) => (
  <div>
    <Formik
      initialValues={optionAvailabilitiesValues}
      onSubmit={(
        values: OptionAvailabilityForm,
        actions: FormikActions<OptionAvailabilityForm>,
      ) => {
        const submitValues = {
          ...values,
          adultPrice: parseFloat(values.adultPrice.toString()),
          childPrice: parseFloat(values.childPrice.toString()),
          unitPrice: values.unitPrice
            ? parseFloat(values.unitPrice.toString())
            : 0,
        }

        props.handleAddSubmit(submitValues, actions)
      }}
      validationSchema={FormSchema}
      render={(formikBag: FormikProps<OptionAvailabilityForm>) => {
        return (
          <div>
            <Form>
              <div className="field">
                <div className="control">
                  <label className="label">OptionavailabilityId</label>
                  <Field
                    className="input"
                    name="optionAvailabilityId"
                    type="number"
                  />
                  <div className="has-text-danger is-size-7">
                    <ErrorMessage name="optionAvailabilityId" />
                  </div>
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <label className="label">MaxAdults </label>
                  <Field className="input" name="maxAdults" type="number" />
                  <div className="has-text-danger is-size-7">
                    <ErrorMessage name="maxAdults" />
                  </div>
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <label className="label">MaxChilds</label>
                  <Field className="input" name="maxChilds" type="number" />
                  <div className="has-text-danger is-size-7">
                    <ErrorMessage name="maxChilds" />
                  </div>
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <label className="label">MaxUnits</label>
                  <Field className="input" name="maxUnits" type="number" />
                  <div className="has-text-danger is-size-7">
                    <ErrorMessage name="maxUnits" />
                  </div>
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <label className="label">AdultPrice</label>
                  <Field className="input" name="adultPrice" type="number" />
                  <div className="has-text-danger is-size-7">
                    <ErrorMessage name="adultPrice" />
                  </div>
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <label className="label">ChildPrice</label>
                  <Field className="input" name="childPrice" type="number" />
                  <div className="has-text-danger is-size-7">
                    <ErrorMessage name="childPrice" />
                  </div>
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <label className="label">UnitPrice</label>
                  <Field className="input" name="unitPrice" type="number" />
                  <div className="has-text-danger is-size-7">
                    <ErrorMessage name="unitPrice" />
                  </div>
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <label className="label">FromDate</label>
                  <Field className="input" name="fromDate" type="date" />
                  <div className="has-text-danger is-size-7">
                    <ErrorMessage name="fromDate" />
                  </div>
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <label className="label">ToDate</label>
                  <Field className="input" name="toDate" type="date" />
                  <div className="has-text-danger is-size-7">
                    <ErrorMessage
                      name="toDate"
                      render={() =>
                        formikBag.values.toDate < formikBag.values.fromDate ? (
                          <div>Please Select Date Greater than FromDate</div>
                        ) : (
                          <div>Required</div>
                        )
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <label className="label">ActivityId</label>
                  <Field className="input" name="activityId" type="number" />
                  <div className="has-text-danger is-size-7">
                    <ErrorMessage name="activityId" />
                  </div>
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <label className="label">OptionId</label>
                  <Field className="input" name="optionId" type="number" />
                  <div className="has-text-danger is-size-7">
                    <ErrorMessage name="optionId" />
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
          </div>
        )
      }}
    />
  </div>
)

export const AddOptionAvailabilityForm = (
  props: AddFormProps<OptionAvailabilityForm> & buttonDisableProps,
) => {
  return (
    <div>
      <AddOptionAvailabilityInnerForm
        buttonDisable={props.buttonDisable}
        handleAddSubmit={props.handleAddSubmit}
        handleCloseClick={props.handleCloseClick}
      />
    </div>
  )
}
