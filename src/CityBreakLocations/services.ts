import axios from 'axios'
import { url } from '../config'

export const getCityBreakLocations = async () => {
  const res = await axios.get(`${url}/cityBreakLocations`)
  return res.data
}

export const getCityBreaksLocationsById = (id: string) =>
  fetch(`${url}/cityBreakLocations/${id}`, {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  }).then(res => {
    if (res.ok) {
      return res.json()
    }
    throw res
  })

export const postCityBreakLocation = async (values: any) => {
  const res = await axios({
    method: 'post',
    url: `${url}/cityBreakLocations`,
    data: {
      ...values,
    },
  })
  if (res.status === 201) {
    return res
  } else {
    throw res
  }
}

export const putCityBreakLocation = (values: any) =>
  fetch(`${url}/cityBreakLocations/${values.id}`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(values),
  }).then(res => {
    if (res.ok) {
      return res
    }
    throw res
  })

export const deleteCityBreakLocation = async (id: string) =>
  await axios({
    method: 'delete',
    url: `${url}/cityBreakLocations/${id}`,
  })
