import * as React from 'react'
import { Field, Formik, Form, FormikActions, ErrorMessage } from 'formik'
import { CityBreakFormValues, FormSchema } from './AddCityBreakForm'
import { OptionValues } from 'src/CityBreakDetails/CityBreakDetailList'
import { EditFormProps, DestinationProps } from '../types'

export const EditCityBreakInnerForm = (
  props: EditFormProps<CityBreakFormValues> & DestinationProps,
) => (
  <div>
    <Formik
      initialValues={props.currentItem}
      onSubmit={(
        values: CityBreakFormValues,
        actions: FormikActions<CityBreakFormValues>,
      ) => {
        const city = props.destinations.find(
          (x: OptionValues) => x.value === values.cityId,
        )

        const submitValues = {
          ...values,
          city: city ? city.label : '',
          cityId: parseInt(values.cityId.toString(), 10),
          starRating: parseInt(values.starRating.toString(), 10),
          price: parseFloat(values.price.toString()),
        }

        // tslint:disable-next-line:no-console
        console.log(props.destinations)

        props.handleEditSubmit(submitValues, actions)
      }}
      validationSchema={FormSchema}
    >
      <div>
        <Form>
          <div className="field">
            <div className="control">
              <label className="label">City</label>
              <div className="select">
                <Field name="cityId" component="select">
                  <option>Select City</option>
                  {props.destinations.map((d: any) => (
                    <option key={d.value} value={d.value}>
                      {d.label}
                    </option>
                  ))}
                </Field>
                <div className="has-text-danger is-size-7">
                  <ErrorMessage name="cityId" />
                </div>
              </div>
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label className="label">Days </label>
              <Field className="input" name="days" type="number" />
              <div className="has-text-danger is-size-7">
                <ErrorMessage name="days" />
              </div>
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label className="label">TourName</label>
              <Field className="input" name="tourName" type="text" />
              <div className="has-text-danger is-size-7">
                <ErrorMessage name="tourName" />
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
              <label className="label">ImageUrl</label>
              <Field className="input" name="imageUrl" type="url" />
              <div className="has-text-danger is-size-7">
                <ErrorMessage name="imageUrl" />
              </div>
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label className="label">Phone</label>
              <Field className="input" name="phone" type="text" />
              <div className="has-text-danger is-size-7">
                <ErrorMessage name="phone" />
              </div>
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label className="label">StarRating</label>
              <Field className="input" name="starRating" type="number" />
              <div className="has-text-danger is-size-7">
                <ErrorMessage name="starRating" />
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

export const EditCityBreakForm = (
  props: EditFormProps<CityBreakFormValues> & DestinationProps,
) => {
  return (
    <div>
      <EditCityBreakInnerForm
        destinations={props.destinations}
        currentItem={props.currentItem}
        handleEditSubmit={props.handleEditSubmit}
        handleCloseClick={props.handleCloseClick}
      />
    </div>
  )
}
