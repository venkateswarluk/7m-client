import * as React from 'react'
import axios from 'axios'
import { FormikActions } from 'formik'
import 'bulma/css/bulma.css'
import {
  AddActivityCategoryForm,
  ActivityCategoryForm,
} from './AddActivityCategoryForm'
import { EditActivityCategoryForm } from './EditActivityCategoryForm'
import { Modal } from '../Model'
import {
  getAllItems,
  getItemById,
  postItem,
  putItem,
  deleteItem,
} from '../services'

import { mainUrl } from '../config'
import { Pagination } from 'src/Pagination'
import { handleSearchSpecific } from 'src/Activities/ActivityList'
import { SearchField } from 'src/Activities/search'

const url = `${mainUrl}/categories`

export interface ActivityCategory {
  readonly id: string
  readonly serviceType: string
  readonly categoryName: string
  readonly categoryId: number
}

const currentActivity: ActivityCategory = {
  id: '',
  serviceType: '',
  categoryName: '',
  categoryId: 0,
}

export const ActivityCategoryList = () => {
  const [activities, setActivities] = React.useState<
    ReadonlyArray<ActivityCategory>
  >([])
  const [addActivityOpen, setAddActivityOpen] = React.useState(false)
  const [editActivityOpen, setEditActivityOpen] = React.useState(false)
  const [editActivityData, setEditActivityData] = React.useState(
    currentActivity,
  )
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(15)
  const [activityCategorySearch, setActivityCategorySearch] = React.useState('')

  const handleNext = (page: number) => {
    setPage(page + 1)
  }

  const handlePrevious = (page: number) => {
    setPage(page - 1)
  }

  const handleSpecificPageChange = (page: number) => {
    const total: number = Math.ceil(activities.length / rowsPerPage)
    if (page !== total) {
      setPage(page)
    }
  }

  const handleRowsPerPage = (event: any) => {
    setRowsPerPage(event.value)
  }
  const handleActivityCategorySearch = (activityCategorySearch: string) => {
    const activities1 = activities.filter(
      (x: ActivityCategory) =>
        activityCategorySearch !== ''
          ? handleSearchSpecific(activityCategorySearch, x.id.toString()) ||
            handleSearchSpecific(
              activityCategorySearch,
              x.serviceType.toString(),
            ) ||
            handleSearchSpecific(
              activityCategorySearch,
              x.categoryName.toString(),
            ) ||
            handleSearchSpecific(
              activityCategorySearch,
              x.categoryId.toString(),
            )
          : x,
    )
    setActivityCategorySearch(activityCategorySearch)
    setActivities(activities1)
  }

  const handleRefreshSearch = () => {
    setActivityCategorySearch('')
    fetchMealTypeData()
  }

  const fetchMealTypeData = async () => {
    const result = await axios(`${url}`)
    console.log(result.data)
    setActivities(result.data)
  }

  const handleAddMealClick = () => {
    setAddActivityOpen(!addActivityOpen)
  }

  const handleAddActivitySubmit = (
    values: ActivityCategoryForm,
    actions: FormikActions<ActivityCategoryForm>,
  ) => {
    if (
      activities.filter(
        (y: ActivityCategory) =>
          y.categoryName.toLowerCase() === values.categoryName.toLowerCase(),
      ).length === 0
    ) {
      postItem(url, values)
        .then(() => {
          getAllItems(url)
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
    } else {
      actions.setFieldError('categoryName', 'categoryName Already Exists')
    }
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
    values: ActivityCategory,
    action: FormikActions<ActivityCategoryForm>,
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
        <SearchField
          Search={activityCategorySearch}
          handleRefreshSearch={handleRefreshSearch}
          handleSearch={handleActivityCategorySearch}
        />
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
            handleAddSubmit={handleAddActivitySubmit}
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
            currentItem={editActivityData}
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
                <th>ServiceType</th>
                <th>CategoryId</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {activities
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((activity: ActivityCategory) => (
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
                ))}
            </tbody>
          </table>
        ) : (
          <div className="has-text-info is-size-3 has-text-centered">
            No Activity Categories Exist
          </div>
        )}
      </div>
      <Pagination
        handleRowsPerPageChange={handleRowsPerPage}
        rowsPerPage={rowsPerPage}
        handleSpecificPageChange={handleSpecificPageChange}
        currentPage={page}
        totalPages={Math.ceil(activities.length / rowsPerPage)}
        handleNext={handleNext}
        handlePrevious={handlePrevious}
      />
    </div>
  )
}
