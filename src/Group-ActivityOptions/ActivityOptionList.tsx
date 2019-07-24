import * as React from 'react'
import axios from 'axios'
import 'bulma/css/bulma.css'
import { FormikActions } from 'formik'
import { ActivityOptionForm, AddActivityOptionForm } from './AddActivityOption'
import { EditActivityOptionForm } from './EditActivityOption'
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

const url = `${mainUrl}/group-activityoptions`

export interface ActivityOption {
  readonly id: string
  readonly activityOptionId: number
  readonly typeVal: string
  readonly typeDescription: string
  readonly name: string
  readonly activityId: number
}

const currentActivityOption: ActivityOption = {
  id: '',
  activityOptionId: 0,
  activityId: 0,
  typeDescription: '',
  typeVal: '',
  name: '',
}

export const GroupActivityOptionList = () => {
  const [activityOptions, setActivityOptions] = React.useState<
    ReadonlyArray<ActivityOption>
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
    const total: number = Math.ceil(activityOptions.length / rowsPerPage)
    if (page !== total) {
      setPage(page)
    }
  }
  const handleRowsPerPage = (event: any) => {
    setRowsPerPage(event.value)
  }

  const fetchMealTypeData = async () => {
    const result = await axios(`${url}`)
    setActivityOptions(result.data)
  }

  const handleAddMealClick = () => {
    setAddActivityOpen(!addActivityOpen)
  }

  const handleAddActivitySubmit = (
    values: ActivityOptionForm,
    actions: FormikActions<ActivityOption>,
  ) => {
    setButtonDisable(true)
    postItem(url, values)
      .then(() => {
        getAllItems(url)
          .then(res => {
            setActivityOptions(res)
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
    values: ActivityOption,
    action: FormikActions<ActivityOption>,
  ) => {
    const updateMealType = await putItem(url, values)
    const meals = await getAllItems(url)
    if (updateMealType.status === 200) {
      setActivityOptions(meals)
      setEditActivityOpen(!editActivityOpen)
      action.setSubmitting(false)
    }
  }

  const handleDeleteActivitySubmit = (id: string) => {
    deleteItem(url, id)
      .then(() => {
        getAllItems(url)
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
        <SearchField Search={Search} handleSearch={setSearch} />
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
            buttonDisable={buttonDisable}
            handleAddSubmit={handleAddActivitySubmit}
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
            currentItem={editActivityData}
            handleEditSubmit={handleEditActivitySubmit}
            handleCloseClick={handleEditActivityCloseClick}
          />
        }
      </Modal>

      <div style={{ overflowX: 'auto' }} className="box">
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
              {activityOptions
                .filter(
                  (x: ActivityOption) =>
                    Search !== ''
                      ? handleSearchSpecific(Search, x.id.toString()) ||
                        handleSearchSpecific(
                          Search,
                          x.typeDescription.toString(),
                        ) ||
                        handleSearchSpecific(Search, x.typeVal.toString()) ||
                        handleSearchSpecific(Search, x.activityId.toString()) ||
                        handleSearchSpecific(
                          Search,
                          x.activityOptionId.toString(),
                        ) ||
                        handleSearchSpecific(Search, x.name.toString())
                      : x,
                )
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

                .map((activity: ActivityOption) => (
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
      <Pagination
        rowsPerPage={rowsPerPage}
        handleRowsPerPageChange={handleRowsPerPage}
        handleSpecificPageChange={handleSpecificPageChange}
        currentPage={page}
        totalPages={Math.ceil(activityOptions.length / rowsPerPage)}
        handleNext={handleNext}
        handlePrevious={handlePrevious}
      />
    </div>
  )
}
