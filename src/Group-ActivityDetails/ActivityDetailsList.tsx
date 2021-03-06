import * as React from 'react'
import axios from 'axios'
import 'bulma/css/bulma.css'
import { FormikActions } from 'formik'
import {
  AddActivityDetailsForm,
  ActivityDetailForm,
} from './AddActivityDetails'
import { EditActivityDetailsForm } from './EditActivityDetails'
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

const url = `${mainUrl}/group-activitydetails`

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

export const GroupActivityDetailsList = () => {
  const [activityDetails, setActivityDetails] = React.useState<
    ReadonlyArray<ActivityDetails>
  >([])
  const [addActivityOpen, setAddActivityOpen] = React.useState(false)
  const [editActivityOpen, setEditActivityOpen] = React.useState(false)
  const [editActivityData, setEditActivityData] = React.useState(
    currentActivityDetail,
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
    const total: number = Math.ceil(activityDetails.length / rowsPerPage)
    if (page !== total) {
      setPage(page)
    }
  }

  const handleRowsPerPage = (event: any) => {
    setRowsPerPage(event.value)
  }

  const fetchMealTypeData = async () => {
    const result = await axios(`${url}`)
    setActivityDetails(result.data)
  }

  const handleAddMealClick = () => {
    setAddActivityOpen(!addActivityOpen)
  }

  const handleAddActivitySubmit = (
    values: ActivityDetailForm,
    actions: FormikActions<ActivityDetailForm>,
  ) => {
    setButtonDisable(true)

    postItem(url, values)
      .then(() => {
        getAllItems(url)
          .then(res => {
            setActivityDetails(res)
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
    values: ActivityDetails,
    action: FormikActions<ActivityDetailForm>,
  ) => {
    const updateMealType = await putItem(url, values)
    const meals = await getAllItems(url)
    if (updateMealType.status === 200) {
      setActivityDetails(meals)
      setEditActivityOpen(!editActivityOpen)
      action.setSubmitting(false)
    }
  }

  const handleDeleteActivitySubmit = (id: string) => {
    deleteItem(url, id)
      .then(() => {
        getAllItems(url)
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
        <SearchField
          Search={Search}
          handleSearch={(SearchText: string) =>
            HandleSearch(SearchText, setSearch, setPage)
          }
        />
        <div className="control has-text-right">
          <button className="button is-info " onClick={handleAddMealClick}>
            Add Activity Detail
          </button>
        </div>
      </div>

      <Modal
        closeModal={handleAddMealClick}
        modalState={addActivityOpen}
        title="Activity Details Form"
      >
        {
          <AddActivityDetailsForm
            buttonDisable={buttonDisable}
            handleAddSubmit={handleAddActivitySubmit}
            handleCloseClick={handleAddMealClick}
          />
        }
      </Modal>

      <Modal
        closeModal={handleEditActivityCloseClick}
        modalState={editActivityOpen}
        title="Activity DetailsForm"
      >
        {
          <EditActivityDetailsForm
            currentItem={editActivityData}
            handleEditSubmit={handleEditActivitySubmit}
            handleCloseClick={handleEditActivityCloseClick}
          />
        }
      </Modal>

      <div style={{ overflowX: 'auto' }} className="box">
        {activityDetails.length > 0 ? (
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
              {activityDetails
                .filter(
                  (x: ActivityDetails) =>
                    Search !== ''
                      ? handleSearchSpecific(Search, x.id.toString()) ||
                        handleSearchSpecific(
                          Search,
                          x.activityDetailId.toString(),
                        ) ||
                        handleSearchSpecific(Search, x.activityId.toString()) ||
                        handleSearchSpecific(
                          Search,
                          x.shortDescription.toString(),
                        ) ||
                        handleSearchSpecific(
                          Search,
                          x.longDescription.toString(),
                        ) ||
                        handleSearchSpecific(Search, x.images.toString()) ||
                        handleSearchSpecific(Search, x.videos.toString()) ||
                        handleSearchSpecific(Search, x.activityPhone.toString())
                      : x,
                )
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((activity: ActivityDetails) => (
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
                ))}
            </tbody>
          </table>
        ) : (
          <div className="has-text-info is-size-3 has-text-centered">
            No Activity Details Exist
          </div>
        )}
      </div>
      <Pagination
        rowsPerPage={rowsPerPage}
        handleRowsPerPageChange={handleRowsPerPage}
        handleSpecificPageChange={handleSpecificPageChange}
        currentPage={page}
        totalPages={Math.ceil(activityDetails.length / rowsPerPage)}
        handleNext={handleNext}
        handlePrevious={handlePrevious}
      />
    </div>
  )
}
