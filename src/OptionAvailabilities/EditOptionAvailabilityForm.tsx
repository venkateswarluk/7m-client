import * as React from 'react'
import { Field, Formik, Form } from 'formik'
import { FormSchema, OptionAvailabilityForm } from './AddOptionAvailability'

export const EditOptionAvailabilityInnerForm = (props: any) => (
  <div>
    <Formik
      initialValues={props.values}
      onSubmit={(values: OptionAvailabilityForm, actions: any) => {
        props.onSubmit(values, actions)
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
            onClick={() => props.onClose()}
          >
            Close
          </button>
        </Form>
      </div>
    </Formik>
  </div>
)

export const EditOptionAvailabilityForm = (props: any) => {
  return (
    <div>
      <EditOptionAvailabilityInnerForm
        values={props.optionAvailabilitiesValues}
        onSubmit={props.handleAddMealTypeSubmit}
        onClose={props.handleCloseClick}
      />
    </div>
  )
}
