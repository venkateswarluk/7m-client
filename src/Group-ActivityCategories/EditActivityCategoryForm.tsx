import * as React from 'react'
import { ErrorMessage, Field, Formik, Form, FormikActions } from 'formik'
import { ActivityCategoryForm, FormSchema } from './AddActivityCategoryForm'

interface EditFormProps {
  readonly currentItem: ActivityCategoryForm
  readonly count: number
  handleEditSubmit(
    values: ActivityCategoryForm,
    actions: FormikActions<ActivityCategoryForm>,
  ): void
  handleCloseClick(): void
}

export const EditActivityCategoryInnerForm = (props: EditFormProps) => (
  <div>
    <Formik
      initialValues={props.currentItem}
      onSubmit={(values: ActivityCategoryForm, actions: any) => {
        const submitValues = { ...values, categoryId: props.count + 1 }
        props.handleEditSubmit(submitValues, actions)
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

export const EditActivityCategoryForm = (props: EditFormProps) => {
  return (
    <div>
      <EditActivityCategoryInnerForm
        currentItem={props.currentItem}
        count={props.count}
        handleEditSubmit={props.handleEditSubmit}
        handleCloseClick={props.handleCloseClick}
      />
    </div>
  )
}
