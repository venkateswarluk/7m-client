import * as React from 'react'
import { Field, Formik, Form, FormikActions, ErrorMessage } from 'formik'
import * as yup from 'yup'
import { AddFormProps } from '../types'

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
  readonly fromDate: string
  readonly toDate: string
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
  fromDate: '',
  toDate: '',
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
      .min(1, 'MaxAdults Required')
      .required('Required'),
    maxChilds: yup
      .number()
      .min(1, 'MaxChilds Required')
      .required(),
    maxUnits: yup
      .number()
      .min(1, 'MaxUnits Required')
      .required(),
    adultPrice: yup
      .number()
      .min(1, 'AdultPrice Required')
      .required(' Required'),
    childPrice: yup
      .number()
      .min(1, 'ChildPrice Required')
      .required(' Required'),
    unitPrice: yup
      .number()
      .min(1, 'UnitPrice Required')
      .required(' Required'),
    fromDate: yup.string().required('Required'),
    toDate: yup.string().required('Required'),
  })

export const AddOptionAvailabilityInnerForm = (
  props: AddFormProps<OptionAvailabilityForm>,
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
          adultPrice: parseInt(values.adultPrice.toString(), 10),
          childPrice: parseInt(values.childPrice.toString(), 10),
          unitPrice: values.unitPrice
            ? parseInt(values.unitPrice.toString(), 10)
            : 0,
        }

        console.log(JSON.stringify(submitValues))
        props.handleAddSubmit(submitValues, actions)
      }}
      validationSchema={FormSchema}
    >
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
                <ErrorMessage name="toDate" />
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

export const AddOptionAvailabilityForm = (
  props: AddFormProps<OptionAvailabilityForm>,
) => {
  return (
    <div>
      <AddOptionAvailabilityInnerForm
        handleAddSubmit={props.handleAddSubmit}
        handleCloseClick={props.handleCloseClick}
      />
    </div>
  )
}
