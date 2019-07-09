import * as React from 'react'
import axios from 'axios'
import 'bulma/css/bulma.css'
import { FormikActions } from 'formik'
import {
  AddActivityLocationForm,
  ActivityForm,
} from './AddActivityLocationForm'
import { EditActivityLocationForm } from './EditActivityLocationForm'
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

const url = `${mainUrl}/activityLocations`

export interface ActivityLocation {
  readonly id: string
  readonly locationId: number
  readonly countryCode: string
  readonly stateCode: string
  readonly city: string
  readonly searchingState: string
  readonly searchingCity: string
  readonly location: string
  readonly address: string
  readonly longitude: string
  readonly latitude: string
}

const currentActivity: ActivityLocation = {
  id: '',
  locationId: 0,
  countryCode: '',
  stateCode: '',
  city: '',
  searchingCity: '',
  searchingState: '',
  location: '',
  address: '',
  longitude: '',
  latitude: '',
}

export const ActivityLocationList = () => {
  const [activities, setActivities] = React.useState<
    ReadonlyArray<ActivityLocation>
  >([])
  const [addActivityOpen, setAddActivityOpen] = React.useState(false)
  const [editActivityOpen, setEditActivityOpen] = React.useState(false)
  const [editActivityData, setEditActivityData] = React.useState(
    currentActivity,
  )
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const [Search, setSearch] = React.useState('')

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

  const handleSearch = (Search: string) => {
    const activities1 = activities.filter(
      (x: ActivityLocation) =>
        Search !== ''
          ? handleSearchSpecific(Search, x.id.toString()) ||
            handleSearchSpecific(Search, x.locationId.toString()) ||
            handleSearchSpecific(Search, x.countryCode.toString()) ||
            handleSearchSpecific(Search, x.stateCode.toString()) ||
            handleSearchSpecific(Search, x.city.toString()) ||
            handleSearchSpecific(Search, x.searchingState.toString()) ||
            handleSearchSpecific(Search, x.location.toString()) ||
            handleSearchSpecific(Search, x.address.toString()) ||
            handleSearchSpecific(Search, x.searchingCity.toString()) ||
            handleSearchSpecific(Search, x.longitude.toString()) ||
            handleSearchSpecific(Search, x.latitude.toString())
          : x,
    )
    setSearch(Search)
    setActivities(activities1)
  }

  const handleRefreshSearch = () => {
    setSearch('')
    fetchMealTypeData()
  }

  const fetchMealTypeData = async () => {
    const result = await axios(`${url}`)
    setActivities(result.data)
  }

  const handleAddMealClick = () => {
    setAddActivityOpen(!addActivityOpen)
  }

  const handleAddActivitySubmit = (
    values: ActivityForm,
    actions: FormikActions<ActivityForm>,
  ) => {
    if (
      activities.filter(
        (y: ActivityLocation) =>
          y.city.toLowerCase() === values.city.toLowerCase(),
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
      actions.setFieldError('city', 'City Already Exists')
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
    values: ActivityLocation,
    action: FormikActions<ActivityLocation>,
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
        Activity Location Details
      </div>
      <div className="field">
        <SearchField
          Search={Search}
          handleRefreshSearch={handleRefreshSearch}
          handleSearch={handleSearch}
        />
        <div className="control has-text-right">
          <button className="button is-info " onClick={handleAddMealClick}>
            Add Activity Location
          </button>
        </div>
      </div>

      <Modal
        closeModal={handleAddMealClick}
        modalState={addActivityOpen}
        title=" Activity Location Form"
      >
        {
          <AddActivityLocationForm
            count={activities.length}
            handleAddSubmit={handleAddActivitySubmit}
            handleCloseClick={handleAddMealClick}
          />
        }
      </Modal>

      <Modal
        closeModal={handleEditActivityCloseClick}
        modalState={editActivityOpen}
        title=" Activity Location Form"
      >
        {
          <EditActivityLocationForm
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
                <th>LocationId</th>
                <th>CountryCode</th>
                <th>StateCode</th>
                <th>City</th>
                <th>SearchingCity</th>
                <th>SearchingState</th>
                <th>Location</th>
                <th>Address</th>
                <th>Longitude</th>
                <th>Latitude</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {activities
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((activity: ActivityLocation) => (
                  <tr key={activity.id}>
                    <td>{activity.locationId}</td>
                    <td>{activity.countryCode}</td>
                    <td>{activity.stateCode}</td>
                    <td>{activity.city}</td>
                    <td>{activity.searchingCity}</td>
                    <td>{activity.searchingState}</td>
                    <td>{activity.location}</td>
                    <td>{activity.address}</td>
                    <td>{activity.longitude}</td>
                    <td>{activity.latitude}</td>
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
          <div className="has-text-info is-size-3 has-text-centered ">
            No Activity Locations Exist
          </div>
        )}
      </div>
      <Pagination
        rowsPerPage={rowsPerPage}
        handleRowsPerPageChange={handleRowsPerPage}
        handleSpecificPageChange={handleSpecificPageChange}
        currentPage={page}
        totalPages={Math.ceil(activities.length / rowsPerPage)}
        handleNext={handleNext}
        handlePrevious={handlePrevious}
      />
    </div>
  )
}
