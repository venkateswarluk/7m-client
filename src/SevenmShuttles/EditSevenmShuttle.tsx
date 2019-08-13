import * as React from 'react'
import { ErrorMessage, Field, Formik, Form, FormikActions } from 'formik'
import { ActivityFormSchema } from './AddSevenmShuttle'
import { CFIntegerField } from '../CFIntegerField'
import { EditFormProps } from '../types'

export interface Sevenmshuttles {
  readonly id?: string
  readonly shuttleId: number
  readonly shuttleType: string
  readonly maxQuantity: number
  readonly imageUrl: string
  readonly description: string
  readonly price: number
}

export const EditSevenmShuttleInnerForm = (
  props: EditFormProps<Sevenmshuttles>,
) => (
  <div>
    <Formik
      initialValues={props.currentItem}
      onSubmit={(
        values: Sevenmshuttles,
        actions: FormikActions<Sevenmshuttles>,
      ) => {
        const submitValues: Sevenmshuttles = {
          ...values,
        }
        props.handleEditSubmit(submitValues, actions)
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

export const EditSevenmShuttleForm = (props: EditFormProps<Sevenmshuttles>) => {
  return (
    <div>
      <EditSevenmShuttleInnerForm
        currentItem={props.currentItem}
        handleEditSubmit={props.handleEditSubmit}
        handleCloseClick={props.handleCloseClick}
      />
    </div>
  )
}
