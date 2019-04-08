import * as React from 'react'
import axios from 'axios'
import 'bulma/css/bulma.css'
import {
  CityBreakExclusionFormValues,
  AddCityBreakExclusionForm,
} from './AddCityBreakExclusionForm'
import { EditCityBreakExclusionForm } from './EditCityBreakExclusionForm'
import { Modal } from '../Model'
import {
  getCityBreakExclusions,
  getCityBreaksExclusionsById,
  postCityBreakExclusion,
  putCityBreakExclusion,
  deleteCityBreakExclusion,
} from './services'

export interface CityBreakExclusion {
  readonly id: string
  readonly cityId: number
  readonly exclusions: string
}

export interface OptionValues {
  readonly value: number | string
  readonly label: string
}

const currentCityBreakDetail: CityBreakExclusion = {
  id: '',
  cityId: 0,
  exclusions: '',
}

export const CityBreakExclusionsList = () => {
  const [cityBreaks, setCityBreaks] = React.useState<
    ReadonlyArray<CityBreakExclusion>
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
    const result = await axios('http://localhost:4000/cityBreakExclusions')
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
    values: CityBreakExclusionFormValues,
    actions: any,
  ) => {
    postCityBreakExclusion(values)
      .then(() => {
        getCityBreakExclusions()
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
    const res = await getCityBreaksExclusionsById(id)
    if (res) {
      setEditCityBreakData(res)
      setEditCityBreakOpen(!editCityBreakOpen)
    }
  }

  const handleEditActivityCloseClick = () => {
    setEditCityBreakOpen(!editCityBreakOpen)
  }

  const handleEditActivitySubmit = async (
    values: CityBreakExclusion,
    action: any,
  ) => {
    const updateMealType = await putCityBreakExclusion(values)
    const meals = await getCityBreakExclusions()
    if (updateMealType.status === 200) {
      setCityBreaks(meals)
      setEditCityBreakOpen(!editCityBreakOpen)
      action.setSubmitting(false)
    }
  }

  const handleDeleteActivitySubmit = (id: string) => {
    deleteCityBreakExclusion(id)
      .then(() => {
        getCityBreakExclusions()
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
        CityBreak Exclusions
      </div>
      <div className="field">
        <div className="control has-text-right">
          <button className="button is-info " onClick={handleAddMealClick}>
            Add CityBreakExclusion
          </button>
        </div>
      </div>

      <Modal
        closeModal={handleAddMealClick}
        modalState={addCityBreakOpen}
        title="CityBreakExclusion Form"
      >
        {
          <AddCityBreakExclusionForm
            destinations={destinations}
            handleAddMealTypeSubmit={handleAddActivitySubmit}
            handleCloseClick={handleAddMealClick}
          />
        }
      </Modal>

      <Modal
        closeModal={handleEditActivityCloseClick}
        modalState={editCityBreakOpen}
        title="CityBreakExclusion Form"
      >
        {
          <EditCityBreakExclusionForm
            destinations={destinations}
            cityBreakEclusions={editCityBreakData}
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
                <th>CityId</th>
                <th>Exclusions</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cityBreaks.map((cityBreak: CityBreakExclusion) => (
                <tr key={cityBreak.id}>
                  <td>{cityBreak.cityId}</td>
                  <td>{cityBreak.exclusions}</td>
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
            No Exclusions Exist
          </div>
        )}
      </div>
    </div>
  )
}
