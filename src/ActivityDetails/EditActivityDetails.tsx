import * as React from 'react'
import { ErrorMessage, Field, Formik, Form, FormikActions } from 'formik'
import {
  ActivityDetailForm,
  ActivityDetailFormSchema,
} from './AddActivityDetails'

interface EditFormProps {
  readonly currentItem: ActivityDetailForm
  handleEditSubmit(
    values: ActivityDetailForm,
    actions: FormikActions<ActivityDetailForm>,
  ): void
  handleCloseClick(): void
}

export const EditActivityDetialsInnerForm = (props: EditFormProps) => (
  <div>
    <Formik
      initialValues={props.currentItem}
      onSubmit={(
        values: ActivityDetailForm,
        actions: FormikActions<ActivityDetailForm>,
      ) => {
        const submitValues = {
          ...values,
          images:
            typeof values.images === 'string'
              ? values.images.split(',')
              : values.images,
          videos:
            typeof values.videos === 'string'
              ? values.videos.split(',')
              : values.videos,
        }
        console.log(JSON.stringify(submitValues))
        props.handleEditSubmit(submitValues, actions)
      }}
      validationSchema={ActivityDetailFormSchema}
    >
      <div>
        <Form>
          <div className="field">
            <div className="control">
              <label className="label">Activity Detail Id</label>
              <Field className="input" name="activityDetailId" type="number" />
              <div className="has-text-danger is-size-7">
                <ErrorMessage name="activityDetailId" />
              </div>
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label className="label">Short Description</label>
              <Field className="input" name="shortDescription" type="text" />
              <div className="has-text-danger is-size-7">
                <ErrorMessage name="shortDescription" />
              </div>
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label className="label">Long Description </label>
              <Field className="input" name="longDescription" type="text" />
              <div className="has-text-danger is-size-7">
                <ErrorMessage name="longDescription" />
              </div>
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label className="label">Images</label>
              <Field className="input" name="images" type="text" />
              <div className="has-text-danger is-size-7">
                <ErrorMessage name="images" />
              </div>
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label className="label">Videos</label>
              <Field className="input" name="videos" type="text" />
              <div className="has-text-danger is-size-7">
                <ErrorMessage name="videos" />
              </div>
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label className="label">Activity Phone</label>
              <Field className="input" name="activityPhone" type="text" />
              <div className="has-text-danger is-size-7">
                <ErrorMessage name="activityPhone" />
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

export const EditActivityDetailsForm = (props: EditFormProps) => {
  return (
    <div>
      <EditActivityDetialsInnerForm
        currentItem={props.currentItem}
        handleEditSubmit={props.handleEditSubmit}
        handleCloseClick={props.handleCloseClick}
      />
    </div>
  )
}
