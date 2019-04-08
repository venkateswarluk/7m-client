import * as React from 'react'
import axios from 'axios'
import 'bulma/css/bulma.css'
import {
  AddActivityLocationForm,
  ActivityForm,
} from './AddActivityLocationForm'
import { EditActivityLocationForm } from './EditActivityLocationForm'
import { Modal } from '../Model'
import {
  getActivityLocations,
  getActivityLocationsById,
  postActivityLocation,
  putActivityLocation,
  deleteActivityLocation,
} from './services'

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

// const activityinitialValues: ReadonlyArray<ActivityLocation> = [
//   {
//     id: '',
//     locationId: 0,
//     countryCode: '',
//     stateCode: '',
//     city: '',
//     searchingCity: '',
//     searchingState: '',
//     location: '',
//     address: '',
//     longitude: '',
//     latitude: '',
//   },
// ]

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

  const fetchMealTypeData = async () => {
    const result = await axios('http://localhost:4000/activityLocations')
    setActivities(result.data)
  }

  const handleAddMealClick = () => {
    setAddActivityOpen(!addActivityOpen)
  }

  const handleAddActivitySubmit = (values: ActivityForm, actions: any) => {
    postActivityLocation(values)
      .then(() => {
        getActivityLocations()
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
    const res = await getActivityLocationsById(id)
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
    action: any,
  ) => {
    const updateMealType = await putActivityLocation(values)
    const meals = await getActivityLocations()
    if (updateMealType.status === 200) {
      setActivities(meals)
      setEditActivityOpen(!editActivityOpen)
      action.setSubmitting(false)
    }
  }

  const handleDeleteActivitySubmit = (id: string) => {
    deleteActivityLocation(id)
      .then(() => {
        getActivityLocations()
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
            handleAddMealTypeSubmit={handleAddActivitySubmit}
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
            activityLocations={editActivityData}
            handleEditMealTypeSubmit={handleEditActivitySubmit}
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
              {activities.map((activity: ActivityLocation) => (
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
    </div>
  )
}
