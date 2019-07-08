import * as React from 'react'
import { ErrorMessage, Field, Formik, Form, FormikActions } from 'formik'
import * as yup from 'yup'

import { AddFormProps } from '../types'
import { OptionValues } from '../CityBreakLocations/CityBreakLocationList'

export interface MealTypeForm {
  readonly mealType: string
  readonly mealCategory: string
}

const mealTypeValues: MealTypeForm = {
  mealType: '',
  mealCategory: '',
}

export const MealTypeFormSchema: yup.ObjectSchema<MealTypeForm> = yup.object({
  mealType: yup.string().required('MealType Required'),
  mealCategory: yup.string().required('MealCategory Required'),
})

export const mealTypes: ReadonlyArray<OptionValues> = [
  { value: 1, label: 'FIT' },
  { value: 2, label: 'Group' },
]

export const AddMealTypeInnerForm = (props: AddFormProps<MealTypeForm>) => (
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
      <div>
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
          <br />
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

export const AddMealTypeForm = (props: AddFormProps<MealTypeForm>) => {
  return (
    <div>
      <AddMealTypeInnerForm
        handleAddSubmit={props.handleAddSubmit}
        handleCloseClick={props.handleCloseClick}
      />
    </div>
  )
}
