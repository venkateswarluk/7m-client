import * as React from 'react'
import { Field, Formik, Form, FormikActions } from 'formik'
import * as yup from 'yup'

export interface ActivityForm {
  readonly activityName: string
  readonly description: string
  readonly stars: number
  readonly thumbUrl: string
  readonly minChildAge: number
  readonly maxChildAge: number
  readonly destinationId: number
  readonly activityId: number
  readonly categoryId: number
  readonly optionId: number
}

const activityValues: ActivityForm = {
  activityName: '',
  description: '',
  stars: 0,
  thumbUrl: '',
  minChildAge: 0,
  maxChildAge: 0,
  destinationId: 0,
  activityId: 0,
  categoryId: 0,
  optionId: 0,
}

export interface OptionValues {
  readonly value: number | string
  readonly label: string
}

export interface AddActivityFormProps {
  handleAddSubmit(
    values: ActivityForm,
    actions: FormikActions<ActivityForm>,
  ): void
  handleCloseClick(): void
}

export const categories: ReadonlyArray<OptionValues> = [
  { value: 588, label: 'Attraction Passes' },
  { value: 214, label: 'Museum' },
  { value: 213, label: 'Observation deck' },
  { value: 215, label: 'Entertainment' },
  { value: 212, label: 'Theme Parks' },
  { value: 216, label: 'Aquarium' },
  { value: 217, label: 'Cruise / Boat (Tour/Ride)' },
  { value: 219, label: 'Zoological Theme Park' },
  { value: 220, label: 'Political Attraction' },
  { value: 221, label: 'Bus (Tour/Ride)' },
  { value: 218, label: 'Helicopter Ride' },
  { value: 222, label: 'Wine Tour' },
  { value: 223, label: 'City Tour' },
  { value: 15, label: 'Transfer' },
  { value: 16, label: 'Guide' },
  { value: 224, label: 'Hop On Hop Off Tour' },
  { value: 225, label: 'Disney World' },
]

export const destinations: ReadonlyArray<OptionValues> = [
  { value: 1, label: 'New York' },
  { value: 2, label: 'Orlando' },
  { value: 3, label: 'Houston' },
  { value: 4, label: 'Seattle' },
  { value: 5, label: 'Los Angeles' },
  { value: 6, label: 'San Diego' },
  { value: 7, label: 'San Francisco' },
  { value: 8, label: 'Lake Tahoe' },
  { value: 9, label: 'Washington DC' },
  { value: 10, label: 'Alexandria Bay' },
  { value: 11, label: 'Niagara' },
  { value: 12, label: 'Boston' },
  { value: 13, label: 'Philadelphia' },
  { value: 14, label: 'Atlanta' },
  { value: 15, label: 'Miami' },
  { value: 16, label: 'Tampa' },
  { value: 17, label: 'Chicago' },
  { value: 18, label: 'Las Vegas' },
  { value: 19, label: 'Denver' },
  { value: 20, label: 'New Orleans' },
  { value: 21, label: 'Key west' },
  { value: 22, label: 'Anchorage' },
]

export const ActivityFormSchema: () => yup.ObjectSchema<
  ActivityForm
> = (): yup.ObjectSchema<ActivityForm> =>
  yup.object({
    activityName: yup.string().required('ActivityName Required'),
    description: yup.string().required(' Title Required'),
    stars: yup
      .number()
      .required(' Stars Required')
      .moreThan(0, 'Stars Must MoreThan 0'),
    thumbUrl: yup.string().required(' Thumb Url Required'),
    minChildAge: yup
      .number()
      .required()
      .moreThan(0, 'MinChildAge Must MoreThan 0'),
    maxChildAge: yup
      .number()
      .required()
      .lessThan(9, 'MaxChildAge Must lessThan 9'),
    destinationId: yup
      .number()
      .required()
      .moreThan(0, 'Select destination'),

    categoryId: yup.number().required(),
    activityId: yup.number().required(),
    optionId: yup.number().required(),
  })

export const AddActivityInnerForm = (props: AddActivityFormProps) => (
  <div>
    <Formik
      initialValues={activityValues}
      onSubmit={(
        values: ActivityForm,
        actions: FormikActions<ActivityForm>,
      ) => {
        const submitValues = {
          ...values,
          categoryId: parseInt(values.categoryId.toString(), 10),
          destinationId: parseInt(values.destinationId.toString(), 10),
        }

        props.handleAddSubmit(submitValues, actions)
      }}
      validationSchema={ActivityFormSchema}
    >
      <div>
        <Form>
          <div className="field">
            <div className="control">
              <label className="label">Activity Name</label>
              <Field className="input" name="activityName" type="text" />
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
              <label className="label">StarRating</label>
              <Field className="input" name="stars" type="number" />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label className="label">Image Url</label>
              <Field className="input" name="thumbUrl" type="url" />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label className="label">MinChildAge</label>
              <Field className="input" name="minChildAge" type="number" />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label className="label">MaxChildAge</label>
              <Field className="input" name="maxChildAge" type="number" />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label className="label">Destination</label>
              <div className="select">
                <Field name="destinationId" component="select">
                  <option>Select Destination</option>
                  {destinations.map(d => (
                    <option key={d.value} value={d.value}>
                      {d.label}
                    </option>
                  ))}
                </Field>
              </div>
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label className="label">Category</label>
              <div className="select">
                <Field name="categoryId" component="select">
                  <option>Select Category</option>
                  {categories.map(d => (
                    <option key={d.value} value={d.value}>
                      {d.label}
                    </option>
                  ))}
                </Field>
              </div>
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label className="label">OptionId</label>
              <Field className="input" name="optionId" type="number" />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <label className="label">ActivityId</label>
              <Field className="input" name="activityId" type="number" />
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

export const AddActivityForm = (props: AddActivityFormProps) => {
  return (
    <div>
      <AddActivityInnerForm
        handleAddSubmit={props.handleAddSubmit}
        handleCloseClick={props.handleCloseClick}
      />
    </div>
  )
}
