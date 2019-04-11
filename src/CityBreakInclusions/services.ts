import axios from 'axios'
import { url } from '../config'

export const getCityBreakInclusions = async () => {
  const res = await axios.get(`${url}/cityBreakInclusions`)
  return res.data
}

export const getCityBreaksInclusionsById = (id: string) =>
  fetch(`${url}/cityBreakInclusions/${id}`, {
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

export const postCityBreakInclusion = async (values: any) => {
  const res = await axios({
    method: 'post',
    url: `${url}/cityBreakInclusions`,
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

export const putCityBreakInclusion = (values: any) =>
  fetch(`${url}/cityBreakInclusions/${values.id}`, {
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

export const deleteCityBreakInclusion = async (id: string) =>
  await axios({
    method: 'delete',
    url: `${url}/cityBreakInclusions/${id}`,
  })
