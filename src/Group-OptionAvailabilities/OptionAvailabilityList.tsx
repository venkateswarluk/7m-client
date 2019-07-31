import * as React from 'react'
import axios from 'axios'
import 'bulma/css/bulma.css'
import { FormikActions } from 'formik'
import {
  OptionAvailabilityForm,
  AddOptionAvailabilityForm,
} from './AddOptionAvailability'
import { EditOptionAvailabilityForm } from './EditOptionAvailabilityForm'
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
import { handleSearchSpecific } from 'src/Activities/ActivityList'
import { HandleSearch } from 'src/Activities/SearchHandler'

const url = `${mainUrl}/group-optionavailabilities`

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

export const GroupOptionAvailabilityList = () => {
  const [optionAvailabilities, setOptionAvailabilities] = React.useState<
    ReadonlyArray<OptionAvailability>
  >([])
  const [addActivityOpen, setAddActivityOpen] = React.useState(false)
  const [editActivityOpen, setEditActivityOpen] = React.useState(false)
  const [editActivityData, setEditActivityData] = React.useState(
    currentActivityOption,
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
    const total: number = Math.ceil(optionAvailabilities.length / rowsPerPage)
    if (page !== total) {
      setPage(page)
    }
  }

  const handleRowsPerPage = (event: any) => {
    setRowsPerPage(event.value)
  }

  const fetchMealTypeData = async () => {
    const result = await axios(`${url}`)
    setOptionAvailabilities(result.data)
  }

  const handleAddMealClick = () => {
    setAddActivityOpen(!addActivityOpen)
  }

  const handleAddActivitySubmit = (
    values: OptionAvailabilityForm,
    actions: FormikActions<OptionAvailabilityForm>,
  ) => {
    setButtonDisable(true)
    postItem(url, values)
      .then(() => {
        getAllItems(url)
          .then(res => {
            setOptionAvailabilities(res)
            setAddActivityOpen(!addActivityOpen)
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
    values: OptionAvailability,
    actions: FormikActions<OptionAvailabilityForm>,
  ) => {
    const updateMealType = await putItem(url, values)
    const meals = await getAllItems(url)
    if (updateMealType.status === 200) {
      setOptionAvailabilities(meals)
      setEditActivityOpen(!editActivityOpen)
      actions.setSubmitting(false)
    }
  }

  const handleDeleteActivitySubmit = (id: string) => {
    deleteItem(url, id)
      .then(() => {
        getAllItems(url)
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
        Group Option Availabilities
      </div>
      <div className="field">
        <SearchField
          Search={Search}
          handleSearch={(SearchText: string) =>
            HandleSearch(SearchText, setSearch, setPage)
          }
        />
        <div className="control has-text-right">
          <button className="button is-info " onClick={handleAddMealClick}>
            Add Group Availability
          </button>
        </div>
      </div>

      <Modal
        closeModal={handleAddMealClick}
        modalState={addActivityOpen}
        title="Group Option Availability Form"
      >
        {
          <AddOptionAvailabilityForm
            buttonDisable={buttonDisable}
            handleAddSubmit={handleAddActivitySubmit}
            handleCloseClick={handleAddMealClick}
          />
        }
      </Modal>

      <Modal
        closeModal={handleEditActivityCloseClick}
        modalState={editActivityOpen}
        title="Group Option Availability Form"
      >
        {
          <EditOptionAvailabilityForm
            currentItem={editActivityData}
            handleEditSubmit={handleEditActivitySubmit}
            handleCloseClick={handleEditActivityCloseClick}
          />
        }
      </Modal>

      <div style={{ overflowX: 'auto' }} className="box">
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
              {optionAvailabilities
                .filter(
                  (x: OptionAvailability) =>
                    Search !== ''
                      ? handleSearchSpecific(Search, x.id.toString()) ||
                        handleSearchSpecific(
                          Search,
                          x.optionAvailabilityId.toString(),
                        ) ||
                        handleSearchSpecific(Search, x.optionId.toString()) ||
                        handleSearchSpecific(Search, x.maxAdults.toString()) ||
                        handleSearchSpecific(Search, x.maxChilds.toString()) ||
                        handleSearchSpecific(Search, x.maxUnits.toString()) ||
                        handleSearchSpecific(Search, x.adultPrice.toString()) ||
                        handleSearchSpecific(Search, x.unitPrice.toString()) ||
                        handleSearchSpecific(Search, x.activityId.toString()) ||
                        handleSearchSpecific(Search, x.childPrice.toString()) ||
                        handleSearchSpecific(Search, x.fromDate.toString()) ||
                        handleSearchSpecific(Search, x.toDate.toString())
                      : x,
                )
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

                .map((activity: OptionAvailability) => (
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
      <Pagination
        rowsPerPage={rowsPerPage}
        handleRowsPerPageChange={handleRowsPerPage}
        handleSpecificPageChange={handleSpecificPageChange}
        currentPage={page}
        totalPages={Math.ceil(optionAvailabilities.length / rowsPerPage)}
        handleNext={handleNext}
        handlePrevious={handlePrevious}
      />
    </div>
  )
}
