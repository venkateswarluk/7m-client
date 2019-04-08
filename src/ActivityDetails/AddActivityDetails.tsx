import * as React from 'react'
import { Field, Formik, Form } from 'formik'
import * as yup from 'yup'

export interface ActivityDetailForm {
  readonly activityDetailId: number
  readonly activityId: number
  readonly shortDescription: string
  readonly longDescription: string
  readonly images: string
  readonly videos: string
  readonly activityPhone: string
}

const activityValues: ActivityDetailForm = {
  activityDetailId: 0,
  activityId: 0,
  longDescription: '',
  shortDescription: '',
  images: '',
  videos: '',
  activityPhone: '',
}

export const ActivityDetailFormSchema: () => yup.ObjectSchema<
  ActivityDetailForm
> = (): yup.ObjectSchema<ActivityDetailForm> =>
  yup.object({
    activityDetailId: yup.number().required('ActivityDetailId Required'),
    activityId: yup.number().required('ActivityId Required'),
    shortDescription: yup.string().required(' TipeVal Required'),
    longDescription: yup.string().required('TypeDescription Required'),
    images: yup.string(),
    videos: yup.string(),
    activityPhone: yup.string().required('Name Required'),
  })

export const AddActivityDetailsInnerForm = (props: any) => (
  <div>
    <Formik
      initialValues={activityValues}
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
              <Field className="input" name="activityPhone" type="text" />
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

export const AddActivityDetailsForm = (props: any) => {
  return (
    <div>
      <AddActivityDetailsInnerForm
        onSubmit={props.handleAddMealTypeSubmit}
        onClose={props.handleCloseClick}
      />
    </div>
  )
}
