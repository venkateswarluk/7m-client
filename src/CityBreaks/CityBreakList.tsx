import * as React from 'react'
import axios from 'axios'
import 'bulma/css/bulma.css'
import { CityBreakFormValues, AddCityBreakForm } from './AddCityBreakForm'
import { EditCityBreakForm } from './EditCityBreakForm'
import { Modal } from '../Model'
import {
  getCityBreaks,
  getCityBreaksById,
  postCityBreak,
  putCityBreak,
  deleteCityBreak,
} from './services'

export interface CityBreak {
  readonly id: string
  readonly cityId: number
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

  const fetchMealTypeData = async () => {
    const result = await axios('http://localhost:4000/citybreaks')
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
    values: CityBreakFormValues,
    actions: any,
  ) => {
    postCityBreak(values)
      .then(() => {
        getCityBreaks()
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
    const res = await getCityBreaksById(id)
    if (res) {
      setEditCityBreakData(res)
      setEditCityBreakOpen(!editCityBreakOpen)
    }
  }

  const handleEditActivityCloseClick = () => {
    setEditCityBreakOpen(!editCityBreakOpen)
  }

  const handleEditActivitySubmit = async (values: CityBreak, action: any) => {
    const updateMealType = await putCityBreak(values)
    const meals = await getCityBreaks()
    if (updateMealType.status === 200) {
      setCityBreaks(meals)
      setEditCityBreakOpen(!editCityBreakOpen)
      action.setSubmitting(false)
    }
  }

  const handleDeleteActivitySubmit = (id: string) => {
    deleteCityBreak(id)
      .then(() => {
        getCityBreaks()
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
            handleAddMealTypeSubmit={handleAddActivitySubmit}
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
            editCityBreakData={editCityBreakData}
            handleEditMealTypeSubmit={handleEditActivitySubmit}
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
                <th>Description</th>
                <th>Price</th>
                <th>Phone</th>
                <th>StarRating</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cityBreaks.map((cityBreak: CityBreak) => (
                <tr key={cityBreak.id}>
                  <td>{cityBreak.city}</td>
                  <td>{cityBreak.days}</td>
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
    </div>
  )
}
