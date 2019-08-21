import * as React from 'react'
import {
  Field,
  Formik,
  Form,
  FormikActions,
  ErrorMessage,
  FormikProps,
} from 'formik'
import { FormSchema, OptionAvailabilityForm } from './AddOptionAvailability'
import { CFIntegerField } from 'src/CFIntegerField'

interface EditFormProps {
  readonly currentItem: OptionAvailabilityForm
  handleEditSubmit(
    values: OptionAvailabilityForm,
    actions: FormikActions<OptionAvailabilityForm>,
  ): void
  handleCloseClick(): void
}

export const EditOptionAvailabilityInnerForm = (props: EditFormProps) => (
  <div>
    <Formik
      initialValues={props.currentItem}
      onSubmit={(values: OptionAvailabilityForm, actions: any) => {
        const submitValues = {
          ...values,
          maxUnits: values.maxUnits
            ? parseFloat(values.maxUnits.toString())
            : 0,
          maxAdults: values.maxAdults
            ? parseFloat(values.maxAdults.toString())
            : 0,
          maxChilds: values.maxChilds
            ? parseFloat(values.maxChilds.toString())
            : 0,
          adultPrice: values.adultPrice
            ? parseFloat(values.adultPrice.toString())
            : 0,
          childPrice: values.childPrice
            ? parseFloat(values.childPrice.toString())
            : 0,
          unitPrice: values.unitPrice
            ? parseFloat(values.unitPrice.toString())
            : 0,
        }

        props.handleEditSubmit(submitValues, actions)
      }}
      validationSchema={FormSchema}
      render={(formikBag: FormikProps<OptionAvailabilityForm>) => {
        return (
          <div>
            <Form>
              <div className="field">
                <div className="control">
                  <label className="label">OptionavailabilityId</label>
                  <Field
                    className="input"
                    name="optionAvailabilityId"
                    type="number"
                  />
                  <div className="has-text-danger is-size-7">
                    <ErrorMessage name="optionAvailabilityId" />
                  </div>
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <label className="label">MaxAdults </label>
                  <CFIntegerField className="input" name="maxAdults" />

                  {/* <Field className="input" name="maxAdults" type="number" />
                  <div className="has-text-danger is-size-7">
                    <ErrorMessage name="maxAdults" />
                  </div> */}
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <label className="label">MaxChilds</label>
                  <CFIntegerField className="input" name="maxChilds" />

                  {/* <Field className="input" name="maxChilds" type="number" />
                  <div className="has-text-danger is-size-7">
                    <ErrorMessage name="maxChilds" />
                  </div> */}
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <label className="label">MaxUnits</label>
                  <CFIntegerField className="input" name="maxUnits" />

                  {/* <Field className="input" name="maxUnits" type="number" />
                  {formikBag.values.maxUnits !== 0 ? (
                    <div />
                  ) : formikBag.values.maxAdults === 0 ||
                  formikBag.values.maxAdults === undefined ||
                  formikBag.values.maxChilds === 0 ||
                  formikBag.values.maxChilds === undefined ? (
                    <div className="has-text-danger is-size-7">
                      MaxUnits should be greater than 9
                    </div>
                  ) : (
                    <div />
                  )}
                  <div className="has-text-danger is-size-7">
                    <ErrorMessage name="maxUnits" />
                  </div> */}
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <label className="label">AdultPrice</label>
                  <CFIntegerField className="input" name="adultPrice" />

                  {/* <Field className="input" name="adultPrice" type="number" />
                  <div className="has-text-danger is-size-7">
                    <ErrorMessage name="adultPrice" />
                  </div> */}
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <label className="label">ChildPrice</label>
                  <CFIntegerField className="input" name="childPrice" />

                  {/* <Field className="input" name="childPrice" type="number" />
                  <div className="has-text-danger is-size-7">
                    <ErrorMessage name="childPrice" />
                  </div> */}
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <label className="label">UnitPrice</label>
                  {/* <CFIntegerField className="input" name="unitPrice" /> */}

                  <Field className="input" name="unitPrice" type="number" />
                  <div className="has-text-danger is-size-7">
                    <ErrorMessage name="unitPrice" />
                  </div>
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <label className="label">FromDate</label>
                  <Field className="input" name="fromDate" type="date" />
                  <div className="has-text-danger is-size-7">
                    <ErrorMessage name="fromDate" />
                  </div>
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <label className="label">ToDate</label>
                  <Field className="input" name="toDate" type="date" />
                  <div className="has-text-danger is-size-7">
                    <ErrorMessage
                      name="toDate"
                      render={() =>
                        formikBag.values.toDate < formikBag.values.fromDate ? (
                          <div>Please Select Date Greater than FromDate</div>
                        ) : (
                          <div>Required</div>
                        )
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <label className="label">ActivityId</label>
                  <Field className="input" name="activityId" type="number" />
                  <div className="has-text-danger is-size-7">
                    <ErrorMessage name="activityId" />
                  </div>
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <label className="label">OptionId</label>
                  <Field className="input" name="optionId" type="number" />
                  <div className="has-text-danger is-size-7">
                    <ErrorMessage name="optionId" />
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
        )
      }}
    />
  </div>
)

export const EditOptionAvailabilityForm = (props: EditFormProps) => {
  return (
    <div>
      <EditOptionAvailabilityInnerForm
        currentItem={props.currentItem}
        handleEditSubmit={props.handleEditSubmit}
        handleCloseClick={props.handleCloseClick}
      />
    </div>
  )
}
