import * as React from 'react'
import { ErrorMessage, Field, Formik, FormikActions, Form } from 'formik'
import * as yup from 'yup'

export interface ActivityCategoryForm {
  readonly serviceType: string
  readonly categoryName: string
  readonly categoryId?: number
}

const activityValues: ActivityCategoryForm = {
  serviceType: '',
  categoryName: '',
  categoryId: 0,
}

export interface AddActivityFormProps {
  readonly count: number
  handleAddSubmit(
    values: ActivityCategoryForm,
    actions: FormikActions<ActivityCategoryForm>,
  ): void
  handleCloseClick(): void
}

export const FormSchema: yup.ObjectSchema<ActivityCategoryForm> = yup.object({
  serviceType: yup.string().required('Required'),
  categoryName: yup.string().required('Required'),
})

export const AddActivityCategoryInnerForm = (props: AddActivityFormProps) => (
  <div>
    <Formik
      initialValues={activityValues}
      onSubmit={(values: ActivityCategoryForm, actions: any) => {
        const submitValues = { ...values, categoryId: props.count }
        props.handleAddSubmit(submitValues, actions)
      }}
      validationSchema={FormSchema}
    >
      <div>
        <Form>
          <div className="field">
            <div className="control">
              <label className="label">Service Type</label>
              <Field className="input" name="serviceType" type="text" />
              <div className="has-text-danger is-size-7">
                <ErrorMessage name="serviceType" />
              </div>
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label className="label">Category</label>
              <Field className="input" name="categoryName" type="text" />
              <div className="has-text-danger is-size-7">
                <ErrorMessage name="categoryName" />
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

export const AddActivityCategoryForm = (props: AddActivityFormProps) => {
  return (
    <div>
      <AddActivityCategoryInnerForm
        count={props.count}
        handleAddSubmit={props.handleAddSubmit}
        handleCloseClick={props.handleCloseClick}
      />
    </div>
  )
}
