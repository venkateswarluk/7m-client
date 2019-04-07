import * as React from 'react'
import { Field, Formik, Form } from 'formik'
import * as yup from 'yup'

export interface ActivityOptionForm {
  readonly activityOptionId: number
  readonly typeVal: string
  readonly typeDescription: string
  readonly name: string
  readonly activityId: number
}

const activityValues: ActivityOptionForm = {
  activityOptionId: 0,
  activityId: 0,
  typeDescription: '',
  typeVal: '',
  name: '',
}

export const FormSchema: () => yup.ObjectSchema<
  ActivityOptionForm
> = (): yup.ObjectSchema<ActivityOptionForm> =>
  yup.object({
    activityOptionId: yup.number().required('ActivityOptionId Required'),
    activityId: yup.number().required('ActivityId Required'),
    typeVal: yup.string().required(' TipeVal Required'),
    typeDescription: yup.string().required('TypeDescription Required'),
    name: yup.string().required('Name Required'),
  })

export const AddActivityOptionInnerForm = (props: any) => (
  <div>
    <Formik
      initialValues={activityValues}
      onSubmit={(values: ActivityOptionForm, actions: any) => {
        props.onSubmit(values, actions)
      }}
      validationSchema={FormSchema}
    >
      <div>
        <Form>
          <div className="field">
            <div className="control">
              <label className="label">Activity Option Id</label>
              <Field className="input" name="activityDetailId" type="number" />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label className="label">TypeVal </label>
              <Field className="input" name="typeVal" type="text" />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label className="label">Type Description</label>
              <Field className="input" name="typeDescription" type="text" />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label className="label">Name</label>
              <Field className="input" name="name" type="text" />
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

export const AddActivityOptionForm = (props: any) => {
  return (
    <div>
      <AddActivityOptionInnerForm
        onSubmit={props.handleAddMealTypeSubmit}
        onClose={props.handleCloseClick}
      />
    </div>
  )
}
