import * as React from 'react'
import { Field, Formik, Form } from 'formik'
import { CityBreakFormValues, FormSchema } from './AddCityBreakForm'

export const EditCityBreakInnerForm = (props: any) => (
  <div>
    <Formik
      initialValues={props.values}
      onSubmit={(values: CityBreakFormValues, actions: any) => {
        const submitValues = {
          ...values,
          city: props.destinations.find((x: any) => x.value === values.cityId),
        }
        props.onSubmit(submitValues, actions)
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
              </div>
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label className="label">Days </label>
              <Field className="input" name="days" type="number" />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label className="label">Description</label>
              <Field className="input" name="description" type="text" />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label className="label">Price</label>
              <Field className="input" name="price" type="number" />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label className="label">ImageUrl</label>
              <Field className="input" name="imageUrl" type="url" />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label className="label">Phone</label>
              <Field className="input" name="phone" type="text" />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label className="label">StarRating</label>
              <Field className="input" name="starRating" type="number" />
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

export const EditCityBreakForm = (props: any) => {
  return (
    <div>
      <EditCityBreakInnerForm
        destinations={props.destinations}
        values={props.editCityBreakData}
        onSubmit={props.handleAddMealTypeSubmit}
        onClose={props.handleCloseClick}
      />
    </div>
  )
}
