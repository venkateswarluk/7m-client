import * as React from 'react'
import { ErrorMessage, Field, Formik, Form, FormikActions } from 'formik'
import { ActivityFormSchema, destinations, categories } from './AddActivity'
import { CFIntegerField } from '../CFIntegerField'
import { EditFormProps } from '../types'

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

export const EditActivityInnerForm = (props: EditFormProps<ActivityForm>) => (
  <div>
    <Formik
      initialValues={props.currentItem}
      onSubmit={(
        values: ActivityForm,
        actions: FormikActions<ActivityForm>,
      ) => {
        const submitValues: ActivityForm = {
          ...values,
          destinationId: parseInt(values.destinationId.toString(), 10),
          categoryId: parseInt(values.categoryId.toString(), 10),
          stars: parseInt(values.stars.toString(), 10),
        }
        props.handleEditSubmit(submitValues, actions)
      }}
      validationSchema={ActivityFormSchema}
    >
      <div>
        <Form>
          <div className="field">
            <div className="control">
              <label className="label">Activity Name</label>
              <Field className="input" name="activityName" type="text" />
              <div className="has-text-danger is-size-7">
                <ErrorMessage name="activityName" />
              </div>
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label className="label">Description</label>
              <Field className="input" name="description" type="text" />
              <div className="has-text-danger is-size-7">
                <ErrorMessage name="description" />
              </div>
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label className="label">StarRating</label>
              <CFIntegerField className="input" name="stars" />
              <div className="has-text-danger is-size-7" />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label className="label">Image Url</label>
              <Field className="input" name="thumbUrl" type="url" />
              <div className="has-text-danger is-size-7">
                <ErrorMessage name="thumbUrl" />
              </div>
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label className="label">MinChildAge</label>
              <CFIntegerField className="input" name="minChildAge" />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label className="label">MaxChildAge</label>
              <CFIntegerField className="input" name="maxChildAge" />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label className="label">Destination</label>
              <div className="select">
                <Field name="destinationId" component="select">
                  <option>Select Destination</option>
                  {destinations.map(d => (
                    <option
                      key={d.value}
                      value={parseInt(d.value.toString(), 10)}
                    >
                      {d.label}
                    </option>
                  ))}
                </Field>
                <div className="has-text-danger is-size-7">
                  <ErrorMessage name="destinationId" />
                </div>
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
                <div className="has-text-danger is-size-7">
                  <ErrorMessage name="categoryId" />
                </div>
              </div>
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label className="label">OptionId</label>
              <CFIntegerField className="input" name="optionId" />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <label className="label">ActivityId</label>
              <CFIntegerField className="input" name="activityId" />
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

export const EditActivityForm = (props: EditFormProps<ActivityForm>) => {
  return (
    <div>
      <EditActivityInnerForm
        currentItem={props.currentItem}
        handleEditSubmit={props.handleEditSubmit}
        handleCloseClick={props.handleCloseClick}
      />
    </div>
  )
}
