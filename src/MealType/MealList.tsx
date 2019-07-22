import * as React from 'react'
import axios from 'axios'
import 'bulma/css/bulma.css'
import { FormikActions } from 'formik'
import { AddMealTypeForm, MealTypeForm } from './AddMealType'
import { EditMealTypeForm } from './EditMealType'
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

const url = `${mainUrl}/mealstypes`

export interface MealType {
  readonly id: string
  readonly mealType: string
  readonly mealCategory: string
}

const currentMealType: MealType = {
  id: '',
  mealType: '',
  mealCategory: '',
}

export const MealsTypeList = () => {
  const [mealTypes, setMealTypes] = React.useState<ReadonlyArray<MealType>>([])
  const [addMealOpen, setAddMealOpen] = React.useState(false)
  const [editMealOpen, setEditMealOpen] = React.useState(false)
  const [editMealTypeData, SetEditMealTypeData] = React.useState(
    currentMealType,
  )

  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const [buttonDisable, setButtonDisable] = React.useState(false)

  const [Search, setSearch] = React.useState('')

  const handleNext = (page: number) => {
    setPage(page + 1)
  }

  const handlePrevious = (page: number) => {
    setPage(page - 1)
  }

  const handleSpecificPageChange = (page: number) => {
    const total: number = Math.ceil(mealTypes.length / rowsPerPage)
    if (page !== total) {
      setPage(page)
    }
  }

  const handleRowsPerPage = (event: any) => {
    setRowsPerPage(event.value)
  }

  const fetchMealTypeData = async () => {
    const result = await axios(`${url}`)
    setMealTypes(result.data)
  }

  const handleAddMealClick = () => {
    setAddMealOpen(!addMealOpen)
  }

  const handleAddMealTypeSubmit = (
    values: MealTypeForm,
    actions: FormikActions<MealTypeForm>,
  ) => {
    setButtonDisable(true)
    postItem(url, values)
      .then(() => {
        getAllItems(url)
          .then(res => {
            setMealTypes(res)
            setAddMealOpen(!addMealOpen)
            setButtonDisable(false)
            actions.setSubmitting(false)
          })
          .catch(err => {
            setButtonDisable(false)
            throw Error(err)
          })
      })
      .catch(err => {
        setButtonDisable(false)
        throw Error(err)
      })
  }

  const handleEditMealClick = async (id: string) => {
    const res = await getItemById(url, id)
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
    actions: FormikActions<MealType>,
  ) => {
    const updateMealType = await putItem(url, values)
    const meals = await getAllItems(url)
    if (updateMealType.status === 200) {
      setMealTypes(meals)
      setEditMealOpen(!editMealOpen)
      actions.setSubmitting(false)
    }
  }

  const handleDeleteMealSubmit = (id: string) => {
    deleteItem(url, id)
      .then(() => {
        getAllItems(url)
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
        MealType Details
      </div>
      <div className="field">
        <SearchField Search={Search} handleSearch={setSearch} />
        <div className="control has-text-right">
          <button className="button is-info " onClick={handleAddMealClick}>
            Add Meal Type
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
            buttonDisable={buttonDisable}
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
                <th>Meal Type</th>
                <th>Meal Category</th>

                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {mealTypes
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .filter(
                  (x: MealType) =>
                    Search !== ''
                      ? handleSearchSpecific(Search, x.id.toString()) ||
                        handleSearchSpecific(Search, x.mealType.toString()) ||
                        handleSearchSpecific(Search, x.mealCategory.toString())
                      : x,
                )
                .map((mealType: MealType) => (
                  <tr key={mealType.id}>
                    <td>{mealType.mealType}</td>
                    <td>{mealType.mealCategory}</td>

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
      <Pagination
        rowsPerPage={rowsPerPage}
        handleRowsPerPageChange={handleRowsPerPage}
        handleSpecificPageChange={handleSpecificPageChange}
        currentPage={page}
        totalPages={Math.ceil(mealTypes.length / rowsPerPage)}
        handleNext={handleNext}
        handlePrevious={handlePrevious}
      />
    </div>
  )
}
