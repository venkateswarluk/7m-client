import * as React from 'react'
import axios from 'axios'
import 'bulma/css/bulma.css'
import { FormikActions } from 'formik'
import {
  CityBreakInclusionFormValues,
  AddCityBreakInclusionForm,
} from './AddCityBreakInclusionForm'
import { EditCityBreakInclusionForm } from './EditCityBreakInclusionForm'
import { Modal } from '../Model'
import {
  getAllItems,
  getItemById,
  postItem,
  putItem,
  deleteItem,
} from '../services'
import { OptionValues1 } from '../types'

import { mainUrl } from '../config'
import { Pagination } from 'src/Pagination'
import { SearchField } from 'src/Activities/search'
import { handleSearchSpecific } from 'src/Activities/ActivityList'
import { HandleSearch } from 'src/Activities/SearchHandler'

const url = `${mainUrl}/cityBreakInclusions`

export interface CityBreakInclusion {
  readonly id: string
  readonly cityId: number
  readonly days: number
  readonly tourName: string
  readonly inclusions: string
}

export interface OptionValues {
  readonly value: number | string
  readonly label: string
}

const currentCityBreakDetail: CityBreakInclusion = {
  id: '',
  cityId: 0,
  days: 0,
  tourName: '',
  inclusions: '',
}

export const CityBreakInclusionsList = () => {
  const [cityBreaks, setCityBreaks] = React.useState<
    ReadonlyArray<CityBreakInclusion>
  >([])
  const [addCityBreakOpen, setAddCityBreakOpen] = React.useState(false)
  const [editCityBreakOpen, setEditCityBreakOpen] = React.useState(false)
  const [editCityBreakData, setEditCityBreakData] = React.useState(
    currentCityBreakDetail,
  )
  const [destinations, setDestinations] = React.useState<
    ReadonlyArray<OptionValues>
  >([])

  const [tourNames, setTourNames] = React.useState<
    ReadonlyArray<OptionValues1>
  >([])

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
    const total: number = Math.ceil(cityBreaks.length / rowsPerPage)
    if (page !== total) {
      setPage(page)
    }
  }

  const handleRowsPerPage = (event: any) => {
    setRowsPerPage(event.value)
  }

  const fetchMealTypeData = async () => {
    const result = await axios(`${url}`)
    setCityBreaks(result.data)
  }

  const fetchCitiesData = async () => {
    const result = await axios(`${mainUrl}/cityBreakLocations`)
    const cities = result.data.map((x: any) => ({
      value: x.cityId,
      label: x.city,
    }))
    setDestinations(cities)
  }

  const fetchTourNames = async () => {
    const result = await axios(`${mainUrl}/citybreaks`)
    const cities = result.data.map((x: any) => ({
      value: x.tourName,
      label: x.tourName,
      cityId: x.cityId,
      days: x.days,
    }))
    setTourNames(cities)
  }

  const handleAddMealClick = () => {
    setAddCityBreakOpen(!addCityBreakOpen)
  }

  const handleAddActivitySubmit = (
    values: CityBreakInclusionFormValues,
    actions: FormikActions<CityBreakInclusionFormValues>,
  ) => {
    setButtonDisable(true)

    postItem(url, values)
      .then(() => {
        getAllItems(url)
          .then(res => {
            setCityBreaks(res)
            setAddCityBreakOpen(!addCityBreakOpen)
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
      setEditCityBreakData(res)
      setEditCityBreakOpen(!editCityBreakOpen)
    }
  }

  const handleEditActivityCloseClick = () => {
    setEditCityBreakOpen(!editCityBreakOpen)
  }

  const handleEditActivitySubmit = async (
    values: CityBreakInclusion,
    actions: FormikActions<CityBreakInclusionFormValues>,
  ) => {
    const updateMealType = await putItem(url, values)
    const meals = await getAllItems(url)
    if (updateMealType.status === 200) {
      setCityBreaks(meals)
      setEditCityBreakOpen(!editCityBreakOpen)
      actions.setSubmitting(false)
    }
  }

  const handleDeleteActivitySubmit = (id: string) => {
    deleteItem(url, id)
      .then(() => {
        getAllItems(url)
          .then(res => {
            setCityBreaks(res)
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

  React.useEffect(() => {
    fetchCitiesData()
  }, [])

  React.useEffect(() => {
    fetchTourNames()
  }, [])

  return (
    <div>
      <div className="has-text-centered has-text-info is-size-3">
        CityBreak Inclusions
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
            Add CityBreakInclusion
          </button>
        </div>
      </div>

      <Modal
        closeModal={handleAddMealClick}
        modalState={addCityBreakOpen}
        title="CityBreakInclusion Form"
      >
        {
          <AddCityBreakInclusionForm
            buttonDisable={buttonDisable}
            tourNames={tourNames}
            destinations={destinations}
            handleAddSubmit={handleAddActivitySubmit}
            handleCloseClick={handleAddMealClick}
          />
        }
      </Modal>

      <Modal
        closeModal={handleEditActivityCloseClick}
        modalState={editCityBreakOpen}
        title="CityBreakInclusion Form"
      >
        {
          <EditCityBreakInclusionForm
            tourNames={tourNames}
            destinations={destinations}
            currentItem={editCityBreakData}
            handleEditSubmit={handleEditActivitySubmit}
            handleCloseClick={handleEditActivityCloseClick}
          />
        }
      </Modal>

      <div style={{ overflowX: 'auto' }} className="box">
        {/* tslint:disable-next-line:no-console */}
        {console.log(cityBreaks)}
        {cityBreaks.length > 0 ? (
          <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth is-responsive">
            <thead>
              <tr>
                <th>CityId</th>
                <th>Days</th>
                <th>TourName</th>
                <th>Inclusions</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cityBreaks
                .filter(
                  (x: CityBreakInclusion) =>
                    Search !== ''
                      ? handleSearchSpecific(Search, x.id.toString()) ||
                        handleSearchSpecific(Search, x.cityId.toString()) ||
                        handleSearchSpecific(Search, x.tourName.toString()) ||
                        handleSearchSpecific(Search, x.days.toString()) ||
                        handleSearchSpecific(Search, x.inclusions.toString())
                      : x,
                )
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

                .map((cityBreak: CityBreakInclusion) => (
                  <tr key={cityBreak.id}>
                    <td>{cityBreak.cityId}</td>
                    <td>{cityBreak.days}</td>
                    <td>{cityBreak.tourName}</td>
                    <td>{cityBreak.inclusions}</td>
                    <td>
                      <span
                        className="icon"
                        onClick={() => handleEditActivityClick(cityBreak.id)}
                      >
                        <i className="fa fa-edit" />
                      </span>

                      <span
                        className="icon"
                        onClick={() => handleDeleteActivitySubmit(cityBreak.id)}
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
            No Inclusions Exist
          </div>
        )}
      </div>
      <Pagination
        rowsPerPage={rowsPerPage}
        handleRowsPerPageChange={handleRowsPerPage}
        handleSpecificPageChange={handleSpecificPageChange}
        currentPage={page}
        totalPages={Math.ceil(cityBreaks.length / rowsPerPage)}
        handleNext={handleNext}
        handlePrevious={handlePrevious}
      />
    </div>
  )
}
