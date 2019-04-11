import * as React from 'react'
import { Field, Formik, Form, FormikActions } from 'formik'
import * as yup from 'yup'

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

export interface AddFormProps {
  handleAddSubmit(
    values: OptionAvailabilityForm,
    actions: FormikActions<OptionAvailabilityForm>,
  ): void
  handleCloseClick(): void
}

export const FormSchema: () => yup.ObjectSchema<
  OptionAvailabilityForm
> = (): yup.ObjectSchema<OptionAvailabilityForm> =>
  yup.object({
    optionAvailabilityId: yup.number().required('ActivityOptionId Required'),
    activityId: yup.number().required('ActivityId Required'),
    optionId: yup.number().required('OptionId Required'),
    maxAdults: yup.number().required(' Required'),
    maxChilds: yup.number().required(' Required'),
    adultPrice: yup.number().required(' Required'),
    childPrice: yup.number().required(' Required'),
    fromDate: yup.string().required('Required'),
    toDate: yup.string().required('Required'),
  })

export const AddOptionAvailabilityInnerForm = (props: AddFormProps) => (
  <div>
    <Formik
      initialValues={optionAvailabilitiesValues}
      onSubmit={(
        values: OptionAvailabilityForm,
        actions: FormikActions<OptionAvailabilityForm>,
      ) => {
        const submitValues = {
          ...values,
          adultPrice: (values.adultPrice.toString(), 10),
          childPrice: (values.adultPrice.toString(), 10),
          unitPrice: (values.adultPrice.toString(), 10),
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
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label className="label">MaxAdults </label>
              <Field className="input" name="maxAdults" type="number" />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label className="label">MaxChilds</label>
              <Field className="input" name="maxChilds" type="number" />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label className="label">MaxUnits</label>
              <Field className="input" name="maxUnits" type="number" />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label className="label">AdultPrice</label>
              <Field className="input" name="adultPrice" type="number" />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label className="label">ChildPrice</label>
              <Field className="input" name="childPrice" type="number" />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <label className="label">UnitPrice</label>
              <Field className="input" name="unitPrice" type="number" />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label className="label">FromDate</label>
              <Field className="input" name="fromDate" type="date" />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label className="label">ToDate</label>
              <Field className="input" name="toDate" type="date" />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label className="label">ActivityId</label>
              <Field className="input" name="activityId" type="number" />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label className="label">OptionId</label>
              <Field className="input" name="optionId" type="number" />
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

export const AddOptionAvailabilityForm = (props: AddFormProps) => {
  return (
    <div>
      <AddOptionAvailabilityInnerForm
        handleAddSubmit={props.handleAddSubmit}
        handleCloseClick={props.handleCloseClick}
      />
    </div>
  )
}
