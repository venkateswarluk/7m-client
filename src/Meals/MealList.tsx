import * as React from 'react'
import axios from 'axios'
import 'bulma/css/bulma.css'
import { url } from '../config'
import { FormikActions } from 'formik'
import { AddMealTypeForm, MealTypeForm } from './AddMealType'
import { EditMealTypeForm } from './EditMealType'
import { Modal } from '../Model'
import {
  getMealTypes,
  getMealTypeById,
  postMealType,
  putMealType,
  deleteMealType,
} from './services'

export interface MealType {
  readonly id: string
  readonly name: string
  readonly mealType: string
  readonly imageUrl: string
  readonly description: string
  readonly price: number
  readonly items: ReadonlyArray<string>
}

const currentMealType: MealType = {
  id: '',
  name: '',
  mealType: '',
  imageUrl: '',
  description: '',
  price: 0.0,
  items: [],
}

export const MealTypeList = () => {
  const [mealTypes, setMealTypes] = React.useState<ReadonlyArray<MealType>>([])
  const [addMealOpen, setAddMealOpen] = React.useState(false)
  const [editMealOpen, setEditMealOpen] = React.useState(false)
  const [editMealTypeData, SetEditMealTypeData] = React.useState(
    currentMealType,
  )

  const fetchMealTypeData = async () => {
    const result = await axios(`${url}/mealTypes`)
    setMealTypes(result.data)
  }

  const handleAddMealClick = () => {
    setAddMealOpen(!addMealOpen)
  }

  const handleAddMealTypeSubmit = (
    values: MealTypeForm,
    actions: FormikActions<MealTypeForm>,
  ) => {
    postMealType(values)
      .then(() => {
        getMealTypes()
          .then(res => {
            setMealTypes(res)
            setAddMealOpen(!addMealOpen)
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

  const handleEditMealClick = async (id: string) => {
    const res = await getMealTypeById(id)
    if (res) {
      SetEditMealTypeData(res)
      setEditMealOpen(!editMealOpen)
    }
  }

  const handleEditMealCloseClick = () => {
    setEditMealOpen(!editMealOpen)
  }

  const handleEditMealSubmit = async (
    values: MealType,
    actions: FormikActions<MealTypeForm>,
  ) => {
    const updateMealType = await putMealType(values)
    const meals = await getMealTypes()
    if (updateMealType.status === 200) {
      setMealTypes(meals)
      setEditMealOpen(!editMealOpen)
      actions.setSubmitting(false)
    }
  }

  const handleDeleteMealSubmit = (id: string) => {
    deleteMealType(id)
      .then(() => {
        getMealTypes()
          .then(res => {
            setMealTypes(res)
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
        Meal Details
      </div>
      <div className="field">
        <div className="control has-text-right">
          <button className="button is-info " onClick={handleAddMealClick}>
            Add Meal
          </button>
        </div>
      </div>

      <Modal
        closeModal={handleAddMealClick}
        modalState={addMealOpen}
        title="Meal Type Form"
      >
        {
          <AddMealTypeForm
            handleAddSubmit={handleAddMealTypeSubmit}
            handleCloseClick={handleAddMealClick}
          />
        }
      </Modal>

      <Modal
        closeModal={handleEditMealCloseClick}
        modalState={editMealOpen}
        title="Meal Type Form"
      >
        {
          <EditMealTypeForm
            currentItem={editMealTypeData}
            handleEditSubmit={handleEditMealSubmit}
            handleCloseClick={handleEditMealCloseClick}
          />
        }
      </Modal>

      <div className="box">
        {mealTypes.length > 0 ? (
          <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth is-responsive">
            <thead>
              <tr>
                <th>Name</th>
                <th>Meal Type</th>
                <th>Description</th>
                <th>Price</th>
                <th>Items</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {mealTypes.map((mealType: MealType) => (
                <tr key={mealType.id}>
                  <td>{mealType.name}</td>
                  <td>{mealType.mealType}</td>
                  <td>{mealType.description}</td>
                  <td>{mealType.price}</td>
                  <td>{mealType.items.join(',')}</td>
                  <td>
                    <span
                      className="icon"
                      onClick={() => handleEditMealClick(mealType.id)}
                    >
                      <i className="fa fa-edit" />
                    </span>

                    <span
                      className="icon"
                      onClick={() => handleDeleteMealSubmit(mealType.id)}
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
            No Meal Types Exist
          </div>
        )}
      </div>
    </div>
  )
}
