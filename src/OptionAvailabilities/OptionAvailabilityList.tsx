import * as React from 'react'
import axios from 'axios'
import 'bulma/css/bulma.css'
import {
  OptionAvailabilityForm,
  AddOptionAvailabilityForm,
} from './AddOptionAvailability'
import { EditOptionAvailabilityForm } from './EditOptionAvailabilityForm'
import { Modal } from '../Model'
import {
  getOptionsAvailabilities,
  getOptionAvailabilityById,
  postOptionAvailability,
  putOptionAvailability,
  deleteOptionAvailability,
} from './services'

export interface OptionAvailability {
  readonly id: string
  readonly optionAvailabilityId: number
  readonly maxAdults: number
  readonly maxChilds: number
  readonly maxUnits: number
  readonly adultPrice: number
  readonly childPrice: number
  readonly unitPrice: number
  readonly optionId: number
  readonly activityId: number
  readonly fromDate: string
  readonly toDate: string
}

const currentActivityOption: OptionAvailability = {
  id: '',
  optionAvailabilityId: 0,
  maxAdults: 0,
  maxChilds: 0,
  maxUnits: 0,
  adultPrice: 0.0,
  childPrice: 0.0,
  unitPrice: 0.0,
  optionId: 0,
  activityId: 0,
  fromDate: '',
  toDate: '',
}

export const OptionAvailabilityList = () => {
  const [optionAvailabilities, setOptionAvailabilities] = React.useState<
    ReadonlyArray<OptionAvailability>
  >([])
  const [addActivityOpen, setAddActivityOpen] = React.useState(false)
  const [editActivityOpen, setEditActivityOpen] = React.useState(false)
  const [editActivityData, setEditActivityData] = React.useState(
    currentActivityOption,
  )

  const fetchMealTypeData = async () => {
    const result = await axios('http://localhost:4000/optionavailabilities')
    setOptionAvailabilities(result.data)
  }

  const handleAddMealClick = () => {
    setAddActivityOpen(!addActivityOpen)
  }

  const handleAddActivitySubmit = (
    values: OptionAvailabilityForm,
    actions: any,
  ) => {
    postOptionAvailability(values)
      .then(() => {
        getOptionsAvailabilities()
          .then(res => {
            setOptionAvailabilities(res)
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
    const res = await getOptionAvailabilityById(id)
    if (res) {
      setEditActivityData(res)
      setEditActivityOpen(!editActivityOpen)
    }
  }

  const handleEditActivityCloseClick = () => {
    setEditActivityOpen(!editActivityOpen)
  }

  const handleEditActivitySubmit = async (
    values: OptionAvailability,
    action: any,
  ) => {
    const updateMealType = await putOptionAvailability(values)
    const meals = await getOptionsAvailabilities()
    if (updateMealType.status === 200) {
      setOptionAvailabilities(meals)
      setEditActivityOpen(!editActivityOpen)
      action.setSubmitting(false)
    }
  }

  const handleDeleteActivitySubmit = (id: string) => {
    deleteOptionAvailability(id)
      .then(() => {
        getOptionsAvailabilities()
          .then(res => {
            setOptionAvailabilities(res)
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
        Option Availabilities
      </div>
      <div className="field">
        <div className="control has-text-right">
          <button className="button is-info " onClick={handleAddMealClick}>
            Add Availability
          </button>
        </div>
      </div>

      <Modal
        closeModal={handleAddMealClick}
        modalState={addActivityOpen}
        title=" Option Availability Form"
      >
        {
          <AddOptionAvailabilityForm
            handleAddMealTypeSubmit={handleAddActivitySubmit}
            handleCloseClick={handleAddMealClick}
          />
        }
      </Modal>

      <Modal
        closeModal={handleEditActivityCloseClick}
        modalState={editActivityOpen}
        title=" Option Availability Form"
      >
        {
          <EditOptionAvailabilityForm
            optionAvailabilitiesValues={editActivityData}
            handleEditMealTypeSubmit={handleEditActivitySubmit}
            handleCloseClick={handleEditActivityCloseClick}
          />
        }
      </Modal>

      <div className="box">
        {optionAvailabilities.length > 0 ? (
          <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth is-responsive">
            <thead>
              <tr>
                <th>OptionAvailabilityId</th>
                <th>MaxAdults</th>
                <th>MaxChilds</th>
                <th>AdultPrice</th>
                <th>ChildPrice</th>
                <th>FromDate</th>
                <th>ToDate</th>
                <th>OptionId</th>
                <th>ActivityId</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {optionAvailabilities.map((activity: OptionAvailability) => (
                <tr key={activity.id}>
                  <td>{activity.optionAvailabilityId}</td>
                  <td>{activity.maxAdults}</td>
                  <td>{activity.maxChilds}</td>
                  <td>{activity.adultPrice}</td>
                  <td>{activity.childPrice}</td>
                  <td>{activity.fromDate}</td>
                  <td>{activity.toDate}</td>
                  <td>{activity.optionId}</td>
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
            No Availabilities Exist
          </div>
        )}
      </div>
    </div>
  )
}
