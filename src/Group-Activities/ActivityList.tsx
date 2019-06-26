import * as React from 'react'
import axios from 'axios'
import 'bulma/css/bulma.css'
import { FormikActions } from 'formik'
import { AddActivityForm, ActivityForm } from './AddActivity'
import { EditActivityForm } from './EditActivity'
import { Modal } from '../Model'
import {
  getAllItems,
  getItemById,
  postItem,
  putItem,
  deleteItem,
} from '../services'
import { OptionValues } from '../types'

// import { PaginationResult } from '../types'

import { mainUrl } from '../config'

const url = `${mainUrl}/group-activities`

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

export const GroupActivityList = () => {
  const [activities, setActivities] = React.useState<ReadonlyArray<Activity>>(
    [],
  )
  const [addActivityOpen, setAddActivityOpen] = React.useState(false)
  const [editActivityOpen, setEditActivityOpen] = React.useState(false)
  const [editActivityData, setEditActivityData] = React.useState(
    currentActivity,
  )

  const [destinations, setDestinations] = React.useState<
    ReadonlyArray<OptionValues>
  >([])

  const [categories, setCategories] = React.useState<
    ReadonlyArray<OptionValues>
  >([])

  const fetchMealTypeData = async () => {
    const result = await axios(`${url}`)
    setActivities(result.data)
  }

  const fetchDestinations = async () => {
    const result = await axios(`${mainUrl}/activityLocations`)
    const meals = result.data.map((x: any) => ({
      value: x.locationId,
      label: x.city,
    }))
    setDestinations(meals)
  }

  const fetchCategories = async () => {
    const result = await axios(`${mainUrl}/group-categories`)
    const meals = result.data.map((x: any) => ({
      value: x.categoryId,
      label: x.categoryName,
    }))
    setCategories(meals)
  }

  const handleAddMealClick = () => {
    setAddActivityOpen(!addActivityOpen)
  }

  const handleAddActivitySubmit = (
    values: ActivityForm,
    actions: FormikActions<ActivityForm>,
  ) => {
    postItem(url, values)
      .then(() => {
        getAllItems(url)
          .then((res: any) => {
            setActivities(res)
            setAddActivityOpen(!addActivityOpen)
            actions.setSubmitting(false)
          })
          .catch((err: string) => {
            throw Error(err)
          })
      })
      .catch(err => {
        return Error(err)
      })
  }

  const handleEditActivityClick = async (id: string) => {
    const res = await getItemById(url, id)
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
    const updateMealType = await putItem(url, values)
    const meals = await getAllItems(url)
    if (updateMealType.status === 200) {
      setActivities(meals)
      setEditActivityOpen(!editActivityOpen)
      action.setSubmitting(false)
    }
  }

  const handleDeleteActivitySubmit = (id: string) => {
    deleteItem(url, id)
      .then(() => {
        getAllItems(url)
          .then((res: any) => {
            setActivities(res)
          })
          .catch((err: string) => {
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

  React.useEffect(() => {
    fetchDestinations()
  }, [])

  React.useEffect(() => {
    fetchCategories()
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
        title="Activity Form"
      >
        {
          <AddActivityForm
            destinations={destinations}
            categories={categories}
            handleAddSubmit={handleAddActivitySubmit}
            handleCloseClick={handleAddMealClick}
          />
        }
      </Modal>

      <Modal
        closeModal={handleEditActivityCloseClick}
        modalState={editActivityOpen}
        title="Activity Form"
      >
        {
          <EditActivityForm
            destinations={destinations}
            categories={categories}
            currentItem={editActivityData}
            handleEditSubmit={handleEditActivitySubmit}
            handleCloseClick={handleEditActivityCloseClick}
          />
        }
      </Modal>

      <div>
        {activities && activities.length > 0 ? (
          <table className="table is-bordered is-striped is-narrow is-hoverable  is-responsive">
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
