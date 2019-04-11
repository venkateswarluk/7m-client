import * as React from 'react'
import { Field, Formik, Form, FormikActions } from 'formik'
import { ActivityFormSchema, destinations, categories } from './AddActivity'

export interface ActivityForm {
  readonly id?: string
  readonly activityName: string
  readonly description: string
  readonly stars: number
  readonly thumbUrl: string
  readonly minChildAge: number
  readonly maxChildAge: number
  readonly destinationId: number
  readonly activityId: number
  readonly categoryId: number
  readonly optionId: number
}

interface EditFormProps {
  readonly values: ActivityForm
  handleEditSubmit(
    values: ActivityForm,
    actions: FormikActions<ActivityForm>,
  ): void
  handleCloseClick(): void
}

export const EditActivityInnerForm = (props: EditFormProps) => (
  <div>
    <Formik
      initialValues={props.values}
      onSubmit={(
        values: ActivityForm,
        actions: FormikActions<ActivityForm>,
      ) => {
        props.handleEditSubmit(values, actions)
      }}
      validationSchema={ActivityFormSchema}
    >
      <div>
        <Form>
          <div className="field">
            <div className="control">
              <label className="label">Activity Name</label>
              <Field className="input" name="activityName" type="text" />
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
              <label className="label">StarRating</label>
              <Field className="input" name="stars" type="number" />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label className="label">Image Url</label>
              <Field className="input" name="thumbUrl" type="url" />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label className="label">MinChildAge</label>
              <Field className="input" name="minChildAge" type="number" />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label className="label">MaxChildAge</label>
              <Field className="input" name="maxChildAge" type="number" />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label className="label">Destination</label>
              <div className="select">
                <Field name="destinationId" component="select">
                  <option>Select Destination</option>
                  {destinations.map(d => (
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
              <label className="label">Category</label>
              <div className="select">
                <Field name="categoryId" component="select">
                  <option>Select Category</option>
                  {categories.map(d => (
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
              <label className="label">OptionId</label>
              <Field className="input" name="optionId" type="number" />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <label className="label">ActivityId</label>
              <Field className="input" name="activityId" type="number" />
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

export const EditActivityForm = (props: EditFormProps) => {
  return (
    <div>
      <EditActivityInnerForm
        values={props.values}
        handleEditSubmit={props.handleEditSubmit}
        handleCloseClick={props.handleCloseClick}
      />
    </div>
  )
}
