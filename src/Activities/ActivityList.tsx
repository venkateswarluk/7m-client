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

import { mainUrl } from '../config'
import { Pagination } from 'src/Pagination'
import { SearchField } from './search'
import { HandleSearch } from './SearchHandler'

const url = `${mainUrl}/activities`

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

export const handleSearchSpecific = (
  searchInput: string,
  middleName?: string,
) => {
  if (middleName) {
    return middleName.toLowerCase().includes(searchInput.toLowerCase())
  } else {
    return false
  }
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
  const [destinations, setDestinations] = React.useState<
    ReadonlyArray<OptionValues>
  >([])

  const [categories, setCategories] = React.useState<
    ReadonlyArray<OptionValues>
  >([])

  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const [buttonDisable, setButtonDisable] = React.useState(false)

  const [activitySearch, setActivitySearch] = React.useState('')

  const fetchMealTypeData = async () => {
    const result = await axios(`${url}`)
    setActivities(result.data)
  }

  const fetchDestinations = async () => {
    const result = await axios(`${mainUrl}/activityLocations`)
    const meals = result.data
      .map((x: any) => ({
        value: x.locationId,
        label: x.city,
      }))
      .reduce((result: any, elem: any) => {
        if (!result.some((e: any) => e.label === elem.label)) {
          result.push(elem)
        }
        return result
      }, [])

    // tslint:disable-next-line:no-console
    console.log(meals)

    setDestinations(meals)
  }

  const fetchCategories = async () => {
    const result = await axios(`${mainUrl}/categories`)
    const meals = result.data.map((x: any) => ({
      value: x.categoryId,
      label: x.categoryName,
    }))
    setCategories(meals)
  }

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

  // const handleSearch = (activitySearch: string) => {
  //   setActivitySearch(activitySearch)
  //   setPage(0)
  // }

  const handleRowsPerPage = (event: any) => {
    setRowsPerPage(event)
  }

  const handleAddMealClick = () => {
    setAddActivityOpen(!addActivityOpen)
  }

  const handleAddActivitySubmit = (
    values: ActivityForm,
    actions: FormikActions<ActivityForm>,
  ) => {
    setButtonDisable(true)
    postItem(url, values)
      .then(() => {
        getAllItems(url)
          .then((res: any) => {
            setActivities(res)
            setAddActivityOpen(!addActivityOpen)
            setButtonDisable(false)
            actions.setSubmitting(false)
          })
          .catch((err: string) => {
            setButtonDisable(false)
            throw Error(err)
          })
      })
      .catch(err => {
        setButtonDisable(false)
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
    setButtonDisable(true)
    const updateMealType = await putItem(url, values)
    const meals = await getAllItems(url)
    if (updateMealType.status === 200) {
      setActivities(meals)
      setEditActivityOpen(!editActivityOpen)
      setButtonDisable(false)
      action.setSubmitting(false)
    } else {
      setButtonDisable(false)
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
        Activities
      </div>
      <div className="field">
        <SearchField
          Search={activitySearch}
          handleSearch={(activitySearch: string) =>
            HandleSearch(activitySearch, setActivitySearch, setPage)
          }
        />

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
            buttonDisable={buttonDisable}
            categories={categories}
            destinations={destinations}
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
            categories={categories}
            destinations={destinations}
            currentItem={editActivityData}
            handleEditSubmit={handleEditActivitySubmit}
            handleCloseClick={handleEditActivityCloseClick}
          />
        }
      </Modal>

      <div style={{ overflowX: 'auto' }}>
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
            <tbody
              style={{
                height: '100px',
                overflowY: 'auto',
                overflowX: 'hidden',
              }}
            >
              {activities
                .filter(
                  (x: Activity) =>
                    activitySearch !== ''
                      ? handleSearchSpecific(
                          activitySearch,
                          x.activityName.toString(),
                        ) ||
                        handleSearchSpecific(
                          activitySearch,
                          x.description.toString(),
                        ) ||
                        handleSearchSpecific(
                          activitySearch,
                          x.activityId.toString(),
                        ) ||
                        handleSearchSpecific(
                          activitySearch,
                          x.optionId.toString(),
                        ) ||
                        handleSearchSpecific(
                          activitySearch,
                          x.categoryId.toString(),
                        ) ||
                        handleSearchSpecific(
                          activitySearch,
                          x.minChildAge.toString(),
                        ) ||
                        handleSearchSpecific(
                          activitySearch,
                          x.maxChildAge.toString(),
                        ) ||
                        handleSearchSpecific(
                          activitySearch,
                          x.destinationId.toString(),
                        ) ||
                        handleSearchSpecific(activitySearch, x.stars.toString())
                      : x,
                )
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

                .map((activity: Activity) => (
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
