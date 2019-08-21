import * as React from 'react'
import axios from 'axios'
import 'bulma/css/bulma.css'
import { FormikActions } from 'formik'
import { AddSevenmShuttleForm } from './AddSevenmShuttle'
import { EditSevenmShuttleForm } from './EditSevenmShuttle'
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
import { SearchField } from 'src/Activities/search'
import { HandleSearch } from 'src/Activities/SearchHandler'

const url = `${mainUrl}/sevenmshuttles`

export interface Sevenmshuttles {
  readonly id: string
  readonly shuttleId: number
  readonly shuttleType: string
  readonly maxQuantity: number
  readonly imageUrl: string
  readonly description: string
  readonly price: number
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

const currentActivity: Sevenmshuttles = {
  id: '',
  shuttleId: 0,
  shuttleType: '',
  maxQuantity: 0,
  imageUrl: '',
  description: '',
  price: 0,
}

export const SevenmShuttleList = () => {
  const [activities, setActivities] = React.useState<
    ReadonlyArray<Sevenmshuttles>
  >([])
  const [addActivityOpen, setAddActivityOpen] = React.useState(false)
  const [editActivityOpen, setEditActivityOpen] = React.useState(false)
  const [editActivityData, setEditActivityData] = React.useState(
    currentActivity,
  )

  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const [buttonDisable, setButtonDisable] = React.useState(false)

  const [activitySearch, setActivitySearch] = React.useState('')

  const fetchMealTypeData = async () => {
    const result = await axios(`${url}`)
    setActivities(result.data)
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

  const handleRowsPerPage = (event: any) => {
    setRowsPerPage(event)
  }

  const handleAddMealClick = () => {
    setAddActivityOpen(!addActivityOpen)
  }

  const handleAddActivitySubmit = (
    values: Sevenmshuttles,
    actions: FormikActions<Sevenmshuttles>,
  ) => {
    setButtonDisable(true)
    if (
      activities.filter((y: Sevenmshuttles) => y.shuttleId === values.shuttleId)
        .length === 0
    ) {
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
    } else {
      setButtonDisable(false)
      actions.setFieldError('shuttleId', 'ShuttleId already Exist,')
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
    values: Sevenmshuttles,
    action: FormikActions<Sevenmshuttles>,
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

  return (
    <div>
      <div className="has-text-centered has-text-info is-size-3">
        7m-Shuttles
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
            Add 7m-Shuttle
          </button>
        </div>
      </div>

      <Modal
        closeModal={handleAddMealClick}
        modalState={addActivityOpen}
        title="Add 7m-Shuttles Form"
      >
        {
          <AddSevenmShuttleForm
            buttonDisable={buttonDisable}
            handleAddSubmit={handleAddActivitySubmit}
            handleCloseClick={handleAddMealClick}
          />
        }
      </Modal>

      <Modal
        closeModal={handleEditActivityCloseClick}
        modalState={editActivityOpen}
        title="Edit 7m-Shuttle Form"
      >
        {
          <EditSevenmShuttleForm
            currentItem={editActivityData}
            handleEditSubmit={handleEditActivitySubmit}
            handleCloseClick={handleEditActivityCloseClick}
          />
        }
      </Modal>

      <div style={{ overflowX: 'auto' }} className="box">
        {activities && activities.length > 0 ? (
          <table
            style={{ width: '100%' }}
            className="table is-bordered is-striped is-narrow is-hoverable  is-responsive"
          >
            <thead>
              <tr>
                <th>ShuttleId</th>
                <th>ShuttleType</th>
                <th>Max Quantiy</th>
                <th>image URL</th>
                <th>Description</th>
                <th>price</th>
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
                  (x: Sevenmshuttles) =>
                    activitySearch !== ''
                      ? handleSearchSpecific(
                          activitySearch,
                          x.shuttleId.toString(),
                        ) ||
                        handleSearchSpecific(
                          activitySearch,
                          x.description.toString(),
                        ) ||
                        handleSearchSpecific(
                          activitySearch,
                          x.price.toString(),
                        ) ||
                        handleSearchSpecific(
                          activitySearch,
                          x.maxQuantity.toString(),
                        ) ||
                        handleSearchSpecific(
                          activitySearch,
                          x.shuttleType.toString(),
                        ) ||
                        handleSearchSpecific(
                          activitySearch,
                          x.imageUrl.toString(),
                        )
                      : x,
                )
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

                .map((activity: Sevenmshuttles) => (
                  <tr
                    key={activity.id}
                    style={{
                      height: '50px',
                    }}
                  >
                    <td>{activity.shuttleId}</td>
                    <td>{activity.shuttleType}</td>
                    <td>{activity.maxQuantity}</td>
                    <td>{activity.imageUrl.substring(0, 35)}</td>
                    <td>{activity.description.substring(0, 45)}</td>
                    <td>{activity.price}</td>

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
            No 7m Shuttles Exist
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
