import * as React from 'react'
import { Field, Formik, Form, FormikActions } from 'formik'
import * as yup from 'yup'

export interface ActivityDetailForm {
  readonly activityDetailId: number
  readonly activityId: number
  readonly shortDescription: string
  readonly longDescription: string
  readonly images: string | ReadonlyArray<string>
  readonly videos: string | ReadonlyArray<string>
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

export interface AddFormProps {
  handleAddSubmit(
    values: ActivityDetailForm,
    actions: FormikActions<ActivityDetailForm>,
  ): void
  handleCloseClick(): void
}

export const ActivityDetailFormSchema: () => yup.ObjectSchema<
  ActivityDetailForm
> = (): yup.ObjectSchema<ActivityDetailForm> =>
  yup.object({
    activityDetailId: yup.number().required('ActivityDetailId Required'),
    activityId: yup.number().required('ActivityId Required'),
    shortDescription: yup.string().required(' Short Description Required'),
    longDescription: yup.string().required('Long Description Required'),
    images: yup.string(),
    videos: yup.string(),
    activityPhone: yup.string().required('Activity Phone Required'),
  })

export const AddActivityDetailsInnerForm = (props: AddFormProps) => (
  <div>
    <Formik
      initialValues={activityValues}
      onSubmit={(values: ActivityDetailForm, actions: FormikActions<any>) => {
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
        props.handleAddSubmit(submitValues, actions)
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
            onClick={() => props.handleCloseClick()}
          >
            Close
          </button>
        </Form>
      </div>
    </Formik>
  </div>
)

export const AddActivityDetailsForm = (props: AddFormProps) => {
  return (
    <div>
      <AddActivityDetailsInnerForm
        handleAddSubmit={props.handleAddSubmit}
        handleCloseClick={props.handleCloseClick}
      />
    </div>
  )
}
