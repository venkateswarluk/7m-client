import * as React from 'react'
import { Field, Formik, Form, FormikActions } from 'formik'
import * as yup from 'yup'

export interface MealTypeForm {
  readonly name: string
  readonly mealType: string
  readonly imageUrl: string
  readonly description: string
  readonly price: number
  readonly items: string
}

export interface AddFormProps {
  handleAddSubmit(
    values: MealTypeForm,
    actions: FormikActions<MealTypeForm>,
  ): void
  handleCloseClick(): void
}

const mealTypeValues: MealTypeForm = {
  name: '',
  mealType: '',
  imageUrl: '',
  description: '',
  price: 0.0,
  items: '',
}

export const MealTypeFormSchema: yup.ObjectSchema<MealTypeForm> = yup.object({
  name: yup.string().required('Name Required'),
  mealType: yup.string().required('MealType Required'),
  imageUrl: yup.string().required('ImageUrl Required'),
  description: yup.string().required('Description Required'),
  price: yup.number().required('Price Required'),
  items: yup.string(),
})

export const AddMealTypeInnerForm = (props: AddFormProps) => (
  <div>
    <Formik
      initialValues={mealTypeValues}
      onSubmit={(
        values: MealTypeForm,
        actions: FormikActions<MealTypeForm>,
      ) => {
        props.handleAddSubmit(values, actions)
      }}
      validationSchema={MealTypeFormSchema}
    >
      <div className="">
        <Form>
          <div className="field">
            <div className="control">
              <label className="label">Meal Name</label>
              <Field className="input" name="name" type="text" />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label className="label">Meal Type</label>
              <Field className="input" name="mealType" type="text" />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label className="label">Image Url</label>
              <Field className="input" name="imageUrl" type="text" />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label className="label">Description</label>
              <Field className="input" name="description" type="text" />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label className="label">Price</label>
              <Field className="input" name="price" type="number" />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label className="label">Items</label>
              <Field className="input" name="items" type="text" />
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

export const AddMealTypeForm = (props: AddFormProps) => {
  return (
    <div>
      <AddMealTypeInnerForm
        handleAddSubmit={props.handleAddSubmit}
        handleCloseClick={props.handleCloseClick}
      />
    </div>
  )
}
