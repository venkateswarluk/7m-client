import * as React from 'react'
import axios from 'axios'
import 'bulma/css/bulma.css'
import {
  AddActivityDetailsForm,
  ActivityDetailForm,
} from './AddActivityDetails'
import { EditActivityDetailsForm } from './EditActivityDetails'
import { Modal } from '../Model'
import {
  getActivityDetails,
  getActivityDetailsById,
  postActivityDetail,
  putActivityDetail,
  deleteActivityDetail,
} from './services'

export interface ActivityDetails {
  readonly id: string
  readonly activityDetailId: number
  readonly activityId: number
  readonly shortDescription: string
  readonly longDescription: string
  readonly images: ReadonlyArray<string>
  readonly videos: ReadonlyArray<string>
  readonly activityPhone: string
}

const activityinitialValues: ReadonlyArray<ActivityDetails> = [
  {
    id: '',
    activityDetailId: 0,
    activityId: 0,
    longDescription: '',
    shortDescription: '',
    images: [],
    videos: [],
    activityPhone: '',
  },
]

const currentActivityDetail: ActivityDetails = {
  id: '',
  activityDetailId: 0,
  activityId: 0,
  longDescription: '',
  shortDescription: '',
  images: [],
  videos: [],
  activityPhone: '',
}

export const ActivityDetailsList = () => {
  const [activityDetails, setActivityDetails] = React.useState(
    activityinitialValues,
  )
  const [addActivityOpen, setAddActivityOpen] = React.useState(false)
  const [editActivityOpen, setEditActivityOpen] = React.useState(false)
  const [editActivityData, setEditActivityData] = React.useState(
    currentActivityDetail,
  )

  const fetchMealTypeData = async () => {
    const result = await axios('http://localhost:4000/activitydetails')
    setActivityDetails(result.data)
  }

  const handleAddMealClick = () => {
    setAddActivityOpen(!addActivityOpen)
  }

  const handleAddActivitySubmit = (
    values: ActivityDetailForm,
    actions: any,
  ) => {
    postActivityDetail(values)
      .then(() => {
        getActivityDetails()
          .then(res => {
            setActivityDetails(res)
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
    const res = await getActivityDetailsById(id)
    if (res) {
      setEditActivityData(res)
      setEditActivityOpen(!editActivityOpen)
    }
  }

  const handleEditActivityCloseClick = () => {
    setEditActivityOpen(!editActivityOpen)
  }

  const handleEditActivitySubmit = async (
    values: ActivityDetails,
    action: any,
  ) => {
    const updateMealType = await putActivityDetail(values)
    const meals = await getActivityDetails()
    if (updateMealType.status === 200) {
      setActivityDetails(meals)
      setEditActivityOpen(!editActivityOpen)
      action.setSubmitting(false)
    }
  }

  const handleDeleteActivitySubmit = (id: string) => {
    deleteActivityDetail(id)
      .then(() => {
        getActivityDetails()
          .then(res => {
            setActivityDetails(res)
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
            Add Activity Detail
          </button>
        </div>
      </div>

      <Modal
        closeModal={handleAddMealClick}
        modalState={addActivityOpen}
        title="Meal Type Form"
      >
        {
          <AddActivityDetailsForm
            handleAddMealTypeSubmit={() => handleAddActivitySubmit}
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
          <EditActivityDetailsForm
            activityValues={editActivityData}
            handleEditMealTypeSubmit={handleEditActivitySubmit}
            handleCloseClick={handleEditActivityCloseClick}
          />
        }
      </Modal>

      <div className="box">
        <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth is-responsive">
          <thead>
            <tr>
              <th>ActivityDetailId</th>
              <th>shortDescription</th>
              <th>longDescription</th>
              <th>ActivityId</th>
              <th>activityPhone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {activityDetails.length > 0 ? (
              activityDetails.map((activity: ActivityDetails) => (
                <tr key={activity.id}>
                  <td>{activity.activityDetailId}</td>
                  <td>{activity.shortDescription}</td>
                  <td>{activity.longDescription}</td>
                  <td>{activity.activityId}</td>
                  <td>{activity.activityPhone}</td>

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
              <div>No Activities Exist</div>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
