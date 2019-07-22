import * as React from 'react'
import { ErrorMessage, Field, Formik, Form, FormikActions } from 'formik'
import * as yup from 'yup'

import { AddFormProps, MealTypeProps } from '../types'
import { OptionValues } from '../CityBreakLocations/CityBreakLocationList'
import { buttonDisableProps } from 'src/Activities/AddActivity'

export interface MealTypeForm {
  readonly name: string
  readonly mealType: string
  readonly mealCategory: string
  readonly imageUrl: string
  readonly description: string
  readonly price: number
  readonly items: string
  readonly note: string
}

const mealTypeValues: MealTypeForm = {
  name: '',
  mealType: '',
  mealCategory: '',
  imageUrl: '',
  description: '',
  price: 0.0,
  items: '',
  note: '',
}

export const MealTypeFormSchema: yup.ObjectSchema<MealTypeForm> = yup.object({
  name: yup.string().required('Name Required'),
  mealType: yup
    .string()
    .required('Meal Type Required')
    .test('mealType', 'Meal Type Required', value => {
      if (value === '' || value === 'Select MealType') {
        return false
      }
      return true
    }),

  mealCategory: yup
    .string()
    .required('Meal Category Required')
    .test('mealCategory', 'Meal Category Required', value => {
      if (value === '' || value === 'Select MealCategory') {
        return false
      }
      return true
    }),
  imageUrl: yup.string().required('ImageUrl Required'),
  description: yup.string().required('Description Required'),
  price: yup
    .number()
    .positive()
    .min(1, 'Price Required')
    .required('Price Required'),
  items: yup.string().required('Items Required'),
  note: yup.string().required('Note Required'),
})

export const mealCategories: ReadonlyArray<OptionValues> = [
  { value: 1, label: 'FIT' },
  { value: 2, label: 'Group' },
]

export const mealTypesByCategory = (category: string, mealTypes: any) => {
  return category
    ? category === 'FIT'
      ? mealTypes.filter((x: any) => x.mealCategory === 'FIT')
      : category === 'Group'
        ? mealTypes.filter((x: any) => x.mealCategory === 'Group')
        : mealTypes
    : mealTypes
}

export const AddMealTypeInnerForm = (
  props: AddFormProps<MealTypeForm> & MealTypeProps & buttonDisableProps,
) => {
  const [currentMealCategory, setCurrentMealCategory] = React.useState('')
  return (
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
                <div className="has-text-danger is-size-7">
                  <ErrorMessage name="name" />
                </div>
              </div>
            </div>

            <div className="field">
              <div className="control">
                <label className="label">Meal Category</label>
                <div className="select">
                  <Field
                    name="mealCategory"
                    render={({ form }: any) => (
                      <select
                        onChange={e => {
                          setCurrentMealCategory(e.target.value)
                          form.setFieldValue('mealCategory', e.target.value)
                        }}
                        value={currentMealCategory}
                      >
                        <option>Select MealCategory</option>
                        {mealCategories.map(d => (
                          <option key={d.value} value={d.label}>
                            {d.label}
                          </option>
                        ))}
                      </select>
                    )}
                  />

                  <div className="has-text-danger is-size-7">
                    <ErrorMessage name="mealCategory" />
                  </div>
                </div>
              </div>
            </div>

            <div className="field">
              <div className="control">
                <label className="label">Meal Type</label>
                <div className="select">
                  <Field name="mealType" component="select">
                    <option>Select MealType</option>
                    {mealTypesByCategory(
                      currentMealCategory,
                      props.mealTypes,
                    ).map((d: any, i: number) => (
                      <option key={i} value={d.label}>
                        {d.label}
                      </option>
                    ))}
                  </Field>
                  <div className="has-text-danger is-size-7">
                    <ErrorMessage name="mealType" />
                  </div>
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

            <div className="field">
              <label className="label">Note</label>
              <Field
                name="note"
                render={({ field }: any) => (
                  <div className="control">
                    <textarea {...field} className="textarea" />
                  </div>
                )}
              />
            </div>
            <div className="has-text-danger is-size-7">
              <ErrorMessage name="note" />
            </div>
            <br />
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
}

export const AddMealTypeForm = (
  props: AddFormProps<MealTypeForm> & MealTypeProps & buttonDisableProps,
) => {
  return (
    <div>
      <AddMealTypeInnerForm
        buttonDisable={props.buttonDisable}
        handleAddSubmit={props.handleAddSubmit}
        handleCloseClick={props.handleCloseClick}
        mealTypes={props.mealTypes}
      />
    </div>
  )
}
