import * as React from 'react'
import axios from 'axios'
import 'bulma/css/bulma.css'
import {
  CityBreakLocationFormValues,
  AddCityBreakLocationForm,
} from './AddCityBreakLocationForm'
import { EditCityBreakLocationForm } from './EditCityBreakLocatiionForm'
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
import { unique } from 'src/ActivityCategories/ActivityCategoryList'

const url = `${mainUrl}/cityBreakLocations`

export interface CityBreakLocation {
  readonly id: string
  readonly city: string
  readonly country: string
  readonly cityId: number
}

export interface OptionValues {
  readonly value: number | string
  readonly label: string
}

const currentCityBreakDetail: CityBreakLocation = {
  id: '',
  cityId: 0,
  city: '',
  country: '',
}

export const CityBreakLocationsList = () => {
  const [cityBreakLocations, setCityBreaks] = React.useState<
    ReadonlyArray<CityBreakLocation>
  >([])
  const [addCityBreakOpen, setAddCityBreakOpen] = React.useState(false)
  const [editCityBreakOpen, setEditCityBreakOpen] = React.useState(false)
  const [editCityBreakData, setEditCityBreakData] = React.useState(
    currentCityBreakDetail,
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
    const total: number = Math.ceil(cityBreakLocations.length / rowsPerPage)
    if (page !== total) {
      setPage(page)
    }
  }

  const handleSearch = (Search: string) => {
    const activities1 = cityBreakLocations.filter(
      (x: CityBreakLocation) =>
        Search !== ''
          ? handleSearchSpecific(Search, x.id.toString()) ||
            handleSearchSpecific(Search, x.cityId.toString()) ||
            handleSearchSpecific(Search, x.country.toString()) ||
            handleSearchSpecific(Search, x.city.toString())
          : x,
    )
    setSearch(Search)
    setCityBreaks(activities1)
  }

  const handleRefreshSearch = () => {
    setSearch('')
    fetchMealTypeData()
  }

  const handleRowsPerPage = (event: any) => {
    setRowsPerPage(event.value)
  }

  const fetchMealTypeData = async () => {
    const result = await axios(`${url}`)
    setCityBreaks(result.data)
  }

  const fetchCitiesData = async () => {
    const result = await axios(`${url}`)
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
    values: CityBreakLocationFormValues,
    actions: any,
  ) => {
    if (
      values.city !== 'null' &&
      values.country !== 'null' &&
      cityBreakLocations.filter(
        (y: CityBreakLocation) =>
          y.city.toLowerCase() === values.city.toLowerCase(),
      ).length === 0
    ) {
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
    } else {
      if (values.city === 'null') {
        actions.setFieldError('city', 'Please Give a Valid City')
      } else if (values.country === 'null') {
        actions.setFieldError('country', 'Please Give a Valid Country')
      } else {
        actions.setFieldError('city', 'City Already Exists')
      }
    }
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
    values: CityBreakLocation,
    action: any,
  ) => {
    const updateMealType = await putItem(url, values)
    const meals = await getAllItems(url)
    if (updateMealType.status === 200) {
      setCityBreaks(meals)
      setEditCityBreakOpen(!editCityBreakOpen)
      action.setSubmitting(false)
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
        CityBreak Locations
      </div>
      <div className="field">
        <SearchField
          Search={Search}
          handleRefreshSearch={handleRefreshSearch}
          handleSearch={handleSearch}
        />
        <div className="control has-text-right">
          <button className="button is-info " onClick={handleAddMealClick}>
            Add CityBreak Location
          </button>
        </div>
      </div>

      <Modal
        closeModal={handleAddMealClick}
        modalState={addCityBreakOpen}
        title="CityBreakLocation Form"
      >
        {
          <AddCityBreakLocationForm
            count={unique(cityBreakLocations.map(y => y.cityId))}
            destinations={destinations}
            handleAddMealTypeSubmit={handleAddActivitySubmit}
            handleCloseClick={handleAddMealClick}
          />
        }
      </Modal>

      <Modal
        closeModal={handleEditActivityCloseClick}
        modalState={editCityBreakOpen}
        title="CityBreakLocation Form"
      >
        {
          <EditCityBreakLocationForm
            count={editCityBreakData.cityId}
            destinations={destinations}
            cityBreakLocations={editCityBreakData}
            handleEditMealTypeSubmit={handleEditActivitySubmit}
            handleCloseClick={handleEditActivityCloseClick}
          />
        }
      </Modal>

      <div className="box">
        {cityBreakLocations.length > 0 ? (
          <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth is-responsive">
            <thead>
              <tr>
                <th>CityId</th>
                <th>City</th>
                <th>Country</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cityBreakLocations
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((cityBreak: CityBreakLocation) => (
                  <tr key={cityBreak.id}>
                    <td>{cityBreak.cityId}</td>
                    <td>{cityBreak.city}</td>
                    <td>{cityBreak.country}</td>
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
            No CityBreak Locations Exist
          </div>
        )}
      </div>
      <Pagination
        rowsPerPage={rowsPerPage}
        handleRowsPerPageChange={handleRowsPerPage}
        handleSpecificPageChange={handleSpecificPageChange}
        currentPage={page}
        totalPages={Math.ceil(cityBreakLocations.length / rowsPerPage)}
        handleNext={handleNext}
        handlePrevious={handlePrevious}
      />
    </div>
  )
}
