import * as React from 'react'
import axios from 'axios'
import 'bulma/css/bulma.css'
import {
  AddActivityCategoryForm,
  ActivityCategoryForm,
} from './AddActivityCategoryForm'
import { EditActivityCategoryForm } from './EditActivityCategoryForm'
import { Modal } from '../Model'
import {
  getActivityCategories,
  getActivityCategoriesById,
  postActivityCategory,
  putActivityCategory,
  deleteActivityCategory,
} from './services'

export interface ActivityCategory {
  readonly id: string
  readonly serviceType: string
  readonly categoryName: string
  readonly categoryId: number
}

const activityinitialValues: ReadonlyArray<ActivityCategory> = [
  {
    id: '',
    serviceType: '',
    categoryName: '',
    categoryId: 0,
  },
]

const currentActivity: ActivityCategory = {
  id: '',
  serviceType: '',
  categoryName: '',
  categoryId: 0,
}

export const ActivityCategoryList = () => {
  const [activities, setActivities] = React.useState(activityinitialValues)
  const [addActivityOpen, setAddActivityOpen] = React.useState(false)
  const [editActivityOpen, setEditActivityOpen] = React.useState(false)
  const [editActivityData, setEditActivityData] = React.useState(
    currentActivity,
  )

  const fetchMealTypeData = async () => {
    const result = await axios('http://localhost:4000/categories')
    setActivities(result.data)
  }

  const handleAddMealClick = () => {
    setAddActivityOpen(!addActivityOpen)
  }

  const handleAddActivitySubmit = (
    values: ActivityCategoryForm,
    actions: any,
  ) => {
    postActivityCategory(values)
      .then(() => {
        getActivityCategories()
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
    const res = await getActivityCategoriesById(id)
    if (res) {
      setEditActivityData(res)
      setEditActivityOpen(!editActivityOpen)
    }
  }

  const handleEditActivityCloseClick = () => {
    setEditActivityOpen(!editActivityOpen)
  }

  const handleEditActivitySubmit = async (
    values: ActivityCategory,
    action: any,
  ) => {
    const updateMealType = await putActivityCategory(values)
    const meals = await getActivityCategories()
    if (updateMealType.status === 200) {
      setActivities(meals)
      setEditActivityOpen(!editActivityOpen)
      action.setSubmitting(false)
    }
  }

  const handleDeleteActivitySubmit = (id: string) => {
    deleteActivityCategory(id)
      .then(() => {
        getActivityCategories()
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
        Activity Category Details
      </div>
      <div className="field">
        <div className="control has-text-right">
          <button className="button is-info " onClick={handleAddMealClick}>
            Add Activity Category
          </button>
        </div>
      </div>

      <Modal
        closeModal={handleAddMealClick}
        modalState={addActivityOpen}
        title=" Activity Category Form"
      >
        {
          <AddActivityCategoryForm
            count={activities.length}
            handleAddMealTypeSubmit={() => handleAddActivitySubmit}
            handleCloseClick={handleAddMealClick}
          />
        }
      </Modal>

      <Modal
        closeModal={handleEditActivityCloseClick}
        modalState={editActivityOpen}
        title=" Activity Category Form"
      >
        {
          <EditActivityCategoryForm
            count={activities.length}
            activityCategories={editActivityData}
            handleEditMealTypeSubmit={handleEditActivitySubmit}
            handleCloseClick={handleEditActivityCloseClick}
          />
        }
      </Modal>

      <div className="box">
        <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth is-responsive">
          <thead>
            <tr>
              <th>ServiceType</th>
              <th>CategoryId</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {activities.length > 0 ? (
              activities.map((activity: ActivityCategory) => (
                <tr key={activity.id}>
                  <td>{activity.serviceType}</td>
                  <td>{activity.categoryId}</td>
                  <td>{activity.categoryName}</td>
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
              ))
            ) : (
              <div>No Activity Category Exist</div>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
