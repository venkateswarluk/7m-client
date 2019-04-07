import * as React from 'react'
import { Field, Formik, Form } from 'formik'
import {
  ActivityDetailForm,
  ActivityDetailFormSchema,
} from './AddActivityDetails'

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

export const EditActivityDetialsInnerForm = (props: any) => (
  <div>
    <Formik
      initialValues={props.values}
      onSubmit={(values: ActivityDetailForm, actions: any) => {
        const submitValues = {
          ...values,
          images: values.images.split(','),
          videos: values.videos.split(','),
        }
        props.onSubmit(submitValues, actions)
      }}
      validationSchema={ActivityDetailFormSchema}
    >
      <div>
        <Form>
          <div className="field">
            <div className="control">
              <label className="label">Activity Detail Id</label>
              <Field className="input" name="activityDetailId" type="number" />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label className="label">Short Description</label>
              <Field className="input" name="shortDescription" type="text" />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label className="label">Long Description </label>
              <Field className="input" name="longDescription" type="text" />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label className="label">Images</label>
              <Field className="input" name="images" type="text" />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label className="label">Videos</label>
              <Field className="input" name="videos" type="text" />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label className="label">Activity Phone</label>
              <Field className="input" name="ActivityPhone" type="number" />
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
            onClick={() => props.onClose()}
          >
            Close
          </button>
        </Form>
      </div>
    </Formik>
  </div>
)

export const EditActivityDetailsForm = (props: any) => {
  return (
    <div>
      <EditActivityDetialsInnerForm
        values={props.activityValues}
        onSubmit={props.handleAddMealTypeSubmit}
        onClose={props.handleCloseClick}
      />
    </div>
  )
}
