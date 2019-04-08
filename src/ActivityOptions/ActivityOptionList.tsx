import * as React from 'react'
import axios from 'axios'
import 'bulma/css/bulma.css'
import { ActivityOptionForm, AddActivityOptionForm } from './AddActivityOption'
import { EditActivityOptionForm } from './EditActivityOption'
import { Modal } from '../Model'
import {
  getActivityOptions,
  getActivityOptionsById,
  postActivityOptions,
  putActivityOptions,
  deleteActivityOptions,
} from './services'

export interface ActivityOption {
  readonly id: string
  readonly activityOptionId: number
  readonly typeVal: string
  readonly typeDescription: string
  readonly name: string
  readonly activityId: number
}

// const activityOptioninitialValues: ReadonlyArray<ActivityOption> = [
//   {
//     id: '',
//     activityOptionId: 0,
//     activityId: 0,
//     typeDescription: '',
//     typeVal: '',
//     name: '',
//   },
// ]

const currentActivityOption: ActivityOption = {
  id: '',
  activityOptionId: 0,
  activityId: 0,
  typeDescription: '',
  typeVal: '',
  name: '',
}

export const ActivityOptionList = () => {
  const [activityOptions, setActivityOptions] = React.useState<
    ReadonlyArray<ActivityOption>
  >([])
  const [addActivityOpen, setAddActivityOpen] = React.useState(false)
  const [editActivityOpen, setEditActivityOpen] = React.useState(false)
  const [editActivityData, setEditActivityData] = React.useState(
    currentActivityOption,
  )

  const fetchMealTypeData = async () => {
    const result = await axios('http://localhost:4000/activityoptions')
    setActivityOptions(result.data)
  }

  const handleAddMealClick = () => {
    setAddActivityOpen(!addActivityOpen)
  }

  const handleAddActivitySubmit = (
    values: ActivityOptionForm,
    actions: any,
  ) => {
    postActivityOptions(values)
      .then(() => {
        getActivityOptions()
          .then(res => {
            setActivityOptions(res)
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
    const res = await getActivityOptionsById(id)
    if (res) {
      setEditActivityData(res)
      setEditActivityOpen(!editActivityOpen)
    }
  }

  const handleEditActivityCloseClick = () => {
    setEditActivityOpen(!editActivityOpen)
  }

  const handleEditActivitySubmit = async (
    values: ActivityOption,
    action: any,
  ) => {
    const updateMealType = await putActivityOptions(values)
    const meals = await getActivityOptions()
    if (updateMealType.status === 200) {
      setActivityOptions(meals)
      setEditActivityOpen(!editActivityOpen)
      action.setSubmitting(false)
    }
  }

  const handleDeleteActivitySubmit = (id: string) => {
    deleteActivityOptions(id)
      .then(() => {
        getActivityOptions()
          .then(res => {
            setActivityOptions(res)
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
        Activity Options
      </div>
      <div className="field">
        <div className="control has-text-right">
          <button className="button is-info " onClick={handleAddMealClick}>
            Add Activity Option
          </button>
        </div>
      </div>

      <Modal
        closeModal={handleAddMealClick}
        modalState={addActivityOpen}
        title="Activity Option Form"
      >
        {
          <AddActivityOptionForm
            handleAddMealTypeSubmit={handleAddActivitySubmit}
            handleCloseClick={handleAddMealClick}
          />
        }
      </Modal>

      <Modal
        closeModal={handleEditActivityCloseClick}
        modalState={editActivityOpen}
        title="Activity Option Form"
      >
        {
          <EditActivityOptionForm
            activityOptionValues={editActivityData}
            handleEditMealTypeSubmit={handleEditActivitySubmit}
            handleCloseClick={handleEditActivityCloseClick}
          />
        }
      </Modal>

      <div className="box">
        {activityOptions.length > 0 ? (
          <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth is-responsive">
            <thead>
              <tr>
                <th>ActivityOptionId</th>
                <th>TypeVal</th>
                <th>TypeDescription</th>
                <th>Name</th>
                <th>ActivityId</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {activityOptions.map((activity: ActivityOption) => (
                <tr key={activity.id}>
                  <td>{activity.activityOptionId}</td>
                  <td>{activity.typeVal}</td>
                  <td>{activity.typeDescription}</td>
                  <td>{activity.name}</td>
                  <td>{activity.activityId}</td>

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
            No Activity Options Exist
          </div>
        )}
      </div>
    </div>
  )
}
