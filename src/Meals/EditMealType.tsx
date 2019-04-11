import * as React from 'react'
import { ErrorMessage, Field, Formik, Form, FormikActions } from 'formik'
import * as yup from 'yup'
import { MealType } from './MealList'
import { EditFormProps } from '../types'

export interface MealTypeForm {
  readonly name: string
  readonly mealType: string
  readonly imageUrl: string
  readonly description: string
  readonly price: number
  readonly items: string
}

export const MealTypeFormSchema: yup.ObjectSchema<MealTypeForm> = yup.object({
  name: yup.string().required('Name Required'),
  mealType: yup.string().required('MealType Required'),
  imageUrl: yup.string().required('ImageUrl Required'),
  description: yup.string().required('Description Required'),
  price: yup.number().required('Price Required'),
  items: yup.string(),
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
              <label className="label">Meal Name</label>
              <Field className="input" name="name" type="text" />
              <div className="has-text-danger is-size-7">
                <ErrorMessage name="name" />
              </div>
            </div>
          </div>

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
              <label className="label">Image Url</label>
              <Field className="input" name="imageUrl" type="text" />
              <div className="has-text-danger is-size-7">
                <ErrorMessage name="imageUrl" />
              </div>
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label className="label">Description</label>
              <Field className="input" name="description" type="text" />
              <div className="has-text-danger is-size-7">
                <ErrorMessage name="description" />
              </div>
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label className="label">Price</label>
              <Field className="input" name="price" type="number" />
              <div className="has-text-danger is-size-7">
                <ErrorMessage name="price" />
              </div>
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label className="label">Items</label>
              <Field className="input" name="items" type="text" />
              <div className="has-text-danger is-size-7">
                <ErrorMessage name="items" />
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
