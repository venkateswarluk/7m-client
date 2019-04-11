import * as React from 'react'
import axios from 'axios'
import 'bulma/css/bulma.css'
import { FormikActions } from 'formik'
import { AddActivityForm, ActivityForm } from './AddActivity'
import { EditActivityForm } from './EditActivity'
import { Modal } from '../Model'
import {
  getActivites,
  getActivityById,
  postActivity,
  putActivity,
  deleteActivity,
} from './services'

export interface Activity {
  readonly id: string
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

const currentActivity: Activity = {
  id: '',
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

export const ActivityList = () => {
  const [activities, setActivities] = React.useState<ReadonlyArray<Activity>>(
    [],
  )
  const [addActivityOpen, setAddActivityOpen] = React.useState(false)
  const [editActivityOpen, setEditActivityOpen] = React.useState(false)
  const [editActivityData, setEditActivityData] = React.useState(
    currentActivity,
  )

  const fetchMealTypeData = async () => {
    const result = await axios('http://localhost:4000/activities')
    setActivities(result.data)
  }

  const handleAddMealClick = () => {
    setAddActivityOpen(!addActivityOpen)
  }

  const handleAddActivitySubmit = (
    values: ActivityForm,
    actions: FormikActions<ActivityForm>,
  ) => {
    postActivity(values)
      .then(() => {
        getActivites()
          .then(res => {
            setActivities(res)
            setAddActivityOpen(!addActivityOpen)
            actions.setSubmitting(false)
          })
          .catch(err => {
            throw Error(err)
          })
      })
      .catch(err => {
        throw Error(err)
      })
  }

  const handleEditActivityClick = async (id: string) => {
    const res = await getActivityById(id)
    if (res) {
      setEditActivityData(res)
      setEditActivityOpen(!editActivityOpen)
    }
  }

  const handleEditActivityCloseClick = () => {
    setEditActivityOpen(!editActivityOpen)
  }

  const handleEditActivitySubmit = async (
    values: Activity,
    action: FormikActions<ActivityForm>,
  ) => {
    const updateMealType = await putActivity(values)
    const meals = await getActivites()
    if (updateMealType.status === 200) {
      setActivities(meals)
      setEditActivityOpen(!editActivityOpen)
      action.setSubmitting(false)
    }
  }

  const handleDeleteActivitySubmit = (id: string) => {
    deleteActivity(id)
      .then(() => {
        getActivites()
          .then(res => {
            setActivities(res)
          })
          .catch(err => {
            throw Error(err)
          })
      })
      .catch(err => {
        throw Error(err)
      })
  }

  React.useEffect(() => {
    fetchMealTypeData()
  }, [])

  return (
    <div>
      <div className="has-text-centered has-text-info is-size-3">
        Activity Details
      </div>
      <div className="field">
        <div className="control has-text-right">
          <button className="button is-info " onClick={handleAddMealClick}>
            Add Activity
          </button>
        </div>
      </div>

      <Modal
        closeModal={handleAddMealClick}
        modalState={addActivityOpen}
        title="Meal Type Form"
      >
        {
          <AddActivityForm
            handleAddSubmit={handleAddActivitySubmit}
            handleCloseClick={handleAddMealClick}
          />
        }
      </Modal>

      <Modal
        closeModal={handleEditActivityCloseClick}
        modalState={editActivityOpen}
        title="Meal Type Form"
      >
        {
          <EditActivityForm
            values={editActivityData}
            handleEditSubmit={handleEditActivitySubmit}
            handleCloseClick={handleEditActivityCloseClick}
          />
        }
      </Modal>

      <div className="box">
        {activities.length > 0 ? (
          <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth is-responsive">
            <thead>
              <tr>
                <th>ActivityName</th>
                <th>Stars</th>
                <th>Description</th>
                <th>MinChildAge</th>
                <th>MaxChildAge</th>
                <th>destinationId</th>
                <th>ActivityId</th>
                <th>OptionId</th>
                <th>CategoryId</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity: Activity) => (
                <tr key={activity.id}>
                  <td>{activity.activityName}</td>
                  <td>{activity.stars}</td>
                  <td>{activity.description}</td>
                  <td>{activity.minChildAge}</td>
                  <td>{activity.maxChildAge}</td>
                  <td>{activity.destinationId}</td>
                  <td>{activity.activityId}</td>
                  <td>{activity.optionId}</td>
                  <td>{activity.categoryId}</td>

                  <td>
                    <span
                      className="icon"
                      onClick={() => handleEditActivityClick(activity.id)}
                    >
                      <i className="fa fa-edit" />
                    </span>

                    <span
                      className="icon"
                      onClick={() => handleDeleteActivitySubmit(activity.id)}
                    >
                      <i className="fa fa-trash" />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className=" has-text-info is-size-3 has-text-centered">
            No Activities Exist
          </div>
        )}
      </div>
    </div>
  )
}
