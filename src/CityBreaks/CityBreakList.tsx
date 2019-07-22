import * as React from 'react'
import axios from 'axios'
import 'bulma/css/bulma.css'
import { FormikActions } from 'formik'
import { CityBreakFormValues, AddCityBreakForm } from './AddCityBreakForm'
import { EditCityBreakForm } from './EditCityBreakForm'
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

const url = `${mainUrl}/citybreaks`
export interface CityBreak {
  readonly id: string
  readonly cityId: number
  readonly tourName: string
  readonly city: string
  readonly days: number
  readonly description: string
  readonly price: number
  readonly imageUrl: string
  readonly phone: string
  readonly starRating: number
}

export interface OptionValues {
  readonly value: number | string
  readonly label: string
}

const currentCityBreak: CityBreak = {
  id: '',
  cityId: 0,
  tourName: '',
  city: '',
  days: 0,
  description: '',
  price: 0.0,
  imageUrl: '',
  phone: '',
  starRating: 0,
}

export const CityBreakList = () => {
  const [cityBreaks, setCityBreaks] = React.useState<ReadonlyArray<CityBreak>>(
    [],
  )
  const [addCityBreakOpen, setAddCityBreakOpen] = React.useState(false)
  const [editCityBreakOpen, setEditCityBreakOpen] = React.useState(false)
  const [editCityBreakData, setEditCityBreakData] = React.useState(
    currentCityBreak,
  )
  const [destinations, setDestinations] = React.useState<
    ReadonlyArray<OptionValues>
  >([])

  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
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

  const handleAddMealClick = () => {
    setAddCityBreakOpen(!addCityBreakOpen)
  }

  const handleAddActivitySubmit = (
    values: CityBreakFormValues,
    actions: FormikActions<CityBreakFormValues>,
  ) => {
    postItem(url, values)
      .then(() => {
        getAllItems(url)
          .then(res => {
            setCityBreaks(res)
            setAddCityBreakOpen(!addCityBreakOpen)
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
    values: CityBreak,
    actions: FormikActions<CityBreakFormValues>,
  ) => {
    const city = destinations
      .filter(y => y.value === values.cityId)
      .map(y => y.label)[0]
    const updateMealType = await putItem(url, { ...values, city })
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

  return (
    <div>
      <div className="has-text-centered has-text-info is-size-3">
        CityBreak Details
      </div>
      <div className="field">
        <SearchField Search={Search} handleSearch={setSearch} />
        <div className="control has-text-right">
          <button className="button is-info " onClick={handleAddMealClick}>
            Add CityBreak
          </button>
        </div>
      </div>

      <Modal
        closeModal={handleAddMealClick}
        modalState={addCityBreakOpen}
        title="CityBreak Form"
      >
        {
          <AddCityBreakForm
            destinations={destinations}
            handleAddSubmit={handleAddActivitySubmit}
            handleCloseClick={handleAddMealClick}
          />
        }
      </Modal>

      <Modal
        closeModal={handleEditActivityCloseClick}
        modalState={editCityBreakOpen}
        title="CityBreak Form"
      >
        {
          <EditCityBreakForm
            destinations={destinations}
            currentItem={editCityBreakData}
            handleEditSubmit={handleEditActivitySubmit}
            handleCloseClick={handleEditActivityCloseClick}
          />
        }
      </Modal>

      <div className="box">
        {cityBreaks.length > 0 ? (
          <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth is-responsive">
            <thead>
              <tr>
                <th>City</th>
                <th>Days</th>
                <th>TourName</th>
                <th>Description</th>
                <th>Price</th>
                <th>Phone</th>
                <th>StarRating</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cityBreaks
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .filter(
                  (x: CityBreak) =>
                    Search !== ''
                      ? handleSearchSpecific(Search, x.id.toString()) ||
                        handleSearchSpecific(Search, x.cityId.toString()) ||
                        handleSearchSpecific(Search, x.city.toString()) ||
                        handleSearchSpecific(Search, x.tourName.toString()) ||
                        handleSearchSpecific(Search, x.days.toString()) ||
                        handleSearchSpecific(
                          Search,
                          x.description.toString(),
                        ) ||
                        handleSearchSpecific(Search, x.price.toString()) ||
                        handleSearchSpecific(Search, x.imageUrl.toString()) ||
                        handleSearchSpecific(Search, x.starRating.toString()) ||
                        handleSearchSpecific(Search, x.phone.toString())
                      : x,
                )
                .map((cityBreak: CityBreak) => (
                  <tr key={cityBreak.id}>
                    <td>{cityBreak.city}</td>
                    <td>{cityBreak.days}</td>
                    <td>{cityBreak.tourName}</td>
                    <td>{cityBreak.description}</td>
                    <td>{cityBreak.price}</td>
                    <td>{cityBreak.phone}</td>
                    <td>{cityBreak.starRating}</td>
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
            No CityBreaks Exist
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
