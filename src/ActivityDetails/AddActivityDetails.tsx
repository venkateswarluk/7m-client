import * as React from 'react'
import { ErrorMessage, Field, Formik, Form, FormikActions } from 'formik'
import * as yup from 'yup'
import { AddFormProps } from '../types'
import { buttonDisableProps } from 'src/Activities/AddActivity'

export interface ActivityDetailForm {
  readonly activityDetailId: number
  readonly activityId: number
  readonly shortDescription: string
  readonly longDescription: string
  readonly images: string | ReadonlyArray<string>
  readonly videos: string | ReadonlyArray<string>
  readonly activityPhone: string
}

export interface DetailsProps {
  readonly activityDetailId: number
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
    activityDetailId: yup
      .number()
      .integer()
      .positive()
      .min(1, 'ActivityDetailId Required')
      .required('ActivityDetailId Required'),
    activityId: yup
      .number()
      .integer()
      .positive()
      .min(1, 'ActivityId Required')
      .required('ActivityId Required'),
    shortDescription: yup.string().required(' Short Description Required'),
    longDescription: yup.string().required('Long Description Required'),
    images: yup.string().required(),
    videos: yup.string().notRequired(),
    activityPhone: yup.string().required('Activity Phone Required'),
  })

export const AddActivityDetailsInnerForm = (
  props: AddFormProps<ActivityDetailForm> & buttonDisableProps & DetailsProps,
) => (
  <div>
    <Formik
      initialValues={{
        ...activityValues,
        activityDetailId: props.activityDetailId,
      }}
      onSubmit={(values: ActivityDetailForm, actions: FormikActions<any>) => {
        const submitValues = {
          ...values,
          activityDetailId: props.activityDetailId,
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
              <label className="label">Image URL</label>
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

          <button
            className="button is-link"
            type="submit"
            disabled={props.buttonDisable}
          >
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

export const AddActivityDetailsForm = (
  props: AddFormProps<ActivityDetailForm> & buttonDisableProps & DetailsProps,
) => {
  return (
    <div>
      <AddActivityDetailsInnerForm
        activityDetailId={props.activityDetailId}
        buttonDisable={props.buttonDisable}
        handleAddSubmit={props.handleAddSubmit}
        handleCloseClick={props.handleCloseClick}
      />
    </div>
  )
}
