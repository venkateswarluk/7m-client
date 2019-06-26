import * as React from 'react'
import { ErrorMessage, Field, Formik, Form, FormikActions } from 'formik'
import * as yup from 'yup'
import { MealType } from './MealList'
import { EditFormProps } from '../types'

import { mealTypes } from './AddMealType'

export interface MealTypeForm {
  readonly mealType: string
  readonly mealCategory: string
}

export const MealTypeFormSchema: yup.ObjectSchema<MealTypeForm> = yup.object({
  mealType: yup.string().required('MealType Required'),
  mealCategory: yup.string().required('MealCategory Required'),
})

export const EditMealTypeInnerForm = (props: EditFormProps<MealType>) => (
  <div>
    <Formik
      initialValues={props.currentItem}
      onSubmit={(values: MealType, actions: FormikActions<MealType>) => {
        props.handleEditSubmit(values, actions)
      }}
      validationSchema={MealTypeFormSchema}
    >
      <div className="">
        <Form>
          <div className="field">
            <div className="control">
              <label className="label">Meal Type</label>
              <Field className="input" name="mealType" type="text" />
              <div className="has-text-danger is-size-7">
                <ErrorMessage name="mealType" />
              </div>
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label className="label">Meal Type</label>
              <div className="select">
                <Field name="mealCategory" component="select">
                  <option>Select MealCategory</option>
                  {mealTypes.map(d => (
                    <option key={d.value} value={d.label}>
                      {d.label}
                    </option>
                  ))}
                </Field>
                <div className="has-text-danger is-size-7">
                  <ErrorMessage name="mealCategory" />
                </div>
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

export const EditMealTypeForm = (props: EditFormProps<MealType>) => {
  return (
    <div>
      <EditMealTypeInnerForm
        currentItem={props.currentItem}
        handleEditSubmit={props.handleEditSubmit}
        handleCloseClick={props.handleCloseClick}
      />
    </div>
  )
}
