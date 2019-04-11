import * as React from 'react'
import axios from 'axios'
import 'bulma/css/bulma.css'
import { url } from '../config'
import { FormikActions } from 'formik'
import {
  CityBreakDetailsFormValues,
  AddCityBreakDetailForm,
} from './AddCityBreakDetailForm'
import { EditCityBreakDetailForm } from './EditCityBreakDetailForm'
import { Modal } from '../Model'
import {
  getCityBreakDetails,
  getCityBreaksDetailsById,
  postCityBreakDetail,
  putCityBreakDetail,
  deleteCityBreakDetail,
} from './services'

export interface CityBreakDetails {
  readonly id: string
  readonly cityId: number
  readonly days: number
  readonly dayNo: number
  readonly dayInfo: string
}

export interface OptionValues {
  readonly value: number | string
  readonly label: string
}

const currentCityBreakDetail: CityBreakDetails = {
  id: '',
  cityId: 0,
  days: 0,
  dayNo: 0,
  dayInfo: '',
}

export const CityBreakDetailsList = () => {
  const [cityBreaks, setCityBreaks] = React.useState<
    ReadonlyArray<CityBreakDetails>
  >([])
  const [addCityBreakOpen, setAddCityBreakOpen] = React.useState(false)
  const [editCityBreakOpen, setEditCityBreakOpen] = React.useState(false)
  const [editCityBreakData, setEditCityBreakData] = React.useState(
    currentCityBreakDetail,
  )
  const [destinations, setDestinations] = React.useState<
    ReadonlyArray<OptionValues>
  >([])

  const fetchMealTypeData = async () => {
    const result = await axios(`${url}/citybreakdetails`)
    setCityBreaks(result.data)
  }

  const fetchCitiesData = async () => {
    const result = await axios(`${url}/cityBreakLocations`)
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
    values: CityBreakDetailsFormValues,
    actions: FormikActions<CityBreakDetailsFormValues>,
  ) => {
    postCityBreakDetail(values)
      .then(() => {
        getCityBreakDetails()
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
    const res = await getCityBreaksDetailsById(id)
    if (res) {
      setEditCityBreakData(res)
      setEditCityBreakOpen(!editCityBreakOpen)
    }
  }

  const handleEditActivityCloseClick = () => {
    setEditCityBreakOpen(!editCityBreakOpen)
  }

  const handleEditActivitySubmit = async (
    values: CityBreakDetails,
    actions: FormikActions<CityBreakDetailsFormValues>,
  ) => {
    const updateMealType = await putCityBreakDetail(values)
    const meals = await getCityBreakDetails()
    if (updateMealType.status === 200) {
      setCityBreaks(meals)
      setEditCityBreakOpen(!editCityBreakOpen)
      actions.setSubmitting(false)
    }
  }

  const handleDeleteActivitySubmit = (id: string) => {
    deleteCityBreakDetail(id)
      .then(() => {
        getCityBreakDetails()
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
            Add CityBreakDetail
          </button>
        </div>
      </div>

      <Modal
        closeModal={handleAddMealClick}
        modalState={addCityBreakOpen}
        title="CityBreakDetail Form"
      >
        {
          <AddCityBreakDetailForm
            destinations={destinations}
            handleAddSubmit={handleAddActivitySubmit}
            handleCloseClick={handleAddMealClick}
          />
        }
      </Modal>

      <Modal
        closeModal={handleEditActivityCloseClick}
        modalState={editCityBreakOpen}
        title="CityBreakDetail Form"
      >
        {
          <EditCityBreakDetailForm
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
                <th>CityId</th>
                <th>Days</th>
                <th>DayNo</th>
                <th>DayInfo</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cityBreaks.map((cityBreak: CityBreakDetails) => (
                <tr key={cityBreak.id}>
                  <td>{cityBreak.cityId}</td>
                  <td>{cityBreak.days}</td>
                  <td>{cityBreak.dayNo}</td>
                  <td>{cityBreak.dayInfo}</td>
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
            No CityBreak Details Exist
          </div>
        )}
      </div>
    </div>
  )
}
