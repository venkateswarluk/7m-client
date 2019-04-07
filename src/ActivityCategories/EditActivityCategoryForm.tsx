import * as React from 'react'
import { Field, Formik, Form } from 'formik'
import { ActivityCategoryForm } from './AddActivityCategoryForm'

export const EditActivityCategoryInnerForm = (props: any) => (
  <div>
    <Formik
      initialValues={props.values}
      onSubmit={(values: ActivityCategoryForm, actions: any) => {
        const submitValues = { ...values, categoryId: props.count + 1 }
        props.onSubmit(submitValues, actions)
      }}
    >
      <div>
        <Form>
          <div className="field">
            <div className="control">
              <label className="label">Service Type</label>
              <Field className="input" name="serviceType" type="text" />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label className="label">Category</label>
              <Field className="input" name="categoryName" type="text" />
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

export const EditActivityCategoryForm = (props: any) => {
  return (
    <div>
      <EditActivityCategoryInnerForm
        values={props.activityCategories}
        count={props.count}
        onSubmit={props.handleAddMealTypeSubmit}
        onClose={props.handleCloseClick}
      />
    </div>
  )
}
