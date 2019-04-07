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
  getCityBreakLocations,
  getCityBreaksLocationsById,
  postCityBreakLocation,
  putCityBreakLocation,
  deleteCityBreakLocation,
} from './services'

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

const cityBreakDetailinitialValues: ReadonlyArray<CityBreakLocation> = [
  {
    id: '',
    cityId: 0,
    city: '',
    country: '',
  },
]

const currentCityBreakDetail: CityBreakLocation = {
  id: '',
  cityId: 0,
  city: '',
  country: '',
}

export const CityBreakLocationsList = () => {
  const [cityBreakLocations, setCityBreaks] = React.useState(
    cityBreakDetailinitialValues,
  )
  const [addCityBreakOpen, setAddCityBreakOpen] = React.useState(false)
  const [editCityBreakOpen, setEditCityBreakOpen] = React.useState(false)
  const [editCityBreakData, setEditCityBreakData] = React.useState(
    currentCityBreakDetail,
  )
  const [destinations, setDestinations] = React.useState<
    ReadonlyArray<OptionValues>
  >([])

  const fetchMealTypeData = async () => {
    const result = await axios('http://localhost:4000/cityBreakLocations')
    setCityBreaks(result.data)
  }

  const fetchCitiesData = async () => {
    const result = await axios('http://localhost:4000/cityBreakLocations')
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
    postCityBreakLocation(values)
      .then(() => {
        getCityBreakLocations()
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
    const res = await getCityBreaksLocationsById(id)
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
    const updateMealType = await putCityBreakLocation(values)
    const meals = await getCityBreakLocations()
    if (updateMealType.status === 200) {
      setCityBreaks(meals)
      setEditCityBreakOpen(!editCityBreakOpen)
      action.setSubmitting(false)
    }
  }

  const handleDeleteActivitySubmit = (id: string) => {
    deleteCityBreakLocation(id)
      .then(() => {
        getCityBreakLocations()
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
        <div className="control has-text-right">
          <button className="button is-info " onClick={handleAddMealClick}>
            Add CityBreakLocation
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
            count={cityBreakLocations.length}
            destinations={destinations}
            handleAddMealTypeSubmit={() => handleAddActivitySubmit}
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
            count={cityBreakLocations.length}
            destinations={destinations}
            cityBreakLocations={editCityBreakData}
            handleEditMealTypeSubmit={handleEditActivitySubmit}
            handleCloseClick={handleEditActivityCloseClick}
          />
        }
      </Modal>

      <div className="box">
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
            {cityBreakLocations.length > 0 ? (
              cityBreakLocations.map((cityBreak: CityBreakLocation) => (
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
              ))
            ) : (
              <div>No Activities Exist</div>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}