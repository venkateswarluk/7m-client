import * as React from 'react'
import { ErrorMessage, Field, Formik, Form, FormikActions } from 'formik'
import * as yup from 'yup'
import { AddFormProps } from '../types'
import { CFIntegerField } from 'src/CFIntegerField'

export interface Sevenmshuttles {
  readonly shuttleId: number
  readonly shuttleType: string
  readonly maxQuantity: number
  readonly imageUrl: string
  readonly description: string
  readonly price: number
}

const activityValues: Sevenmshuttles = {
  shuttleId: 0,
  shuttleType: '',
  maxQuantity: 0,
  imageUrl: '',
  description: '',
  price: 0,
}

export interface OptionValues {
  readonly value: number
  readonly label: string
}

export interface ButtonDisableProps {
  readonly buttonDisable: boolean
}

export const ActivityFormSchema: () => yup.ObjectSchema<
  Sevenmshuttles
> = (): yup.ObjectSchema<Sevenmshuttles> =>
  yup.object({
    shuttleType: yup.string().required('ShuttleType Required'),
    description: yup.string().required(' Description Required'),
    shuttleId: yup
      .number()
      .integer()
      .positive()
      .min(1, 'ShuttleId Required')
      .required('ShuttleId Required'),
    maxQuantity: yup
      .number()
      .integer()
      .positive()
      .min(1, 'MaxQuantity Required')
      .required('MaxQuantity Required'),
    imageUrl: yup.string().required('ImageUrl Required'),
    price: yup
      .number()
      .integer()
      .positive()
      .min(1, 'Price Required')

      .required('Price Required'),
  })

export const AddSevenmShuttleInnerForm = (
  props: AddFormProps<Sevenmshuttles> & ButtonDisableProps,
) => (
  <div>
    <Formik
      initialValues={activityValues}
      onSubmit={(
        values: Sevenmshuttles,
        actions: FormikActions<Sevenmshuttles>,
      ) => {
        const submitValues: Sevenmshuttles = {
          ...values,
        }
        props.handleAddSubmit(submitValues, actions)
      }}
      validationSchema={ActivityFormSchema}
    >
      <div>
        <Form>
          <div className="field">
            <div className="control">
              <label className="label">Shuttle Id</label>
              <CFIntegerField className="input" name="shuttleId" />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label className="label">Shuttle Type</label>
              <Field className="input" name="shuttleType" type="text" />
              <div className="has-text-danger is-size-7">
                <ErrorMessage name="shuttleType" />
              </div>
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label className="label">Max Quantity</label>
              <CFIntegerField className="input" name="maxQuantity" />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label className="label">Image Url</label>
              <Field className="input" name="imageUrl" type="url" />
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
              <CFIntegerField className="input" name="price" />
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

export const AddSevenmShuttleForm = (
  props: AddFormProps<Sevenmshuttles> & ButtonDisableProps,
) => {
  return (
    <div>
      <AddSevenmShuttleInnerForm
        buttonDisable={props.buttonDisable}
        handleAddSubmit={props.handleAddSubmit}
        handleCloseClick={props.handleCloseClick}
      />
    </div>
  )
}
