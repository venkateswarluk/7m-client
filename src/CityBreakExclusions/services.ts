import axios from 'axios'
import { url } from '../config'

export const getCityBreakExclusions = async () => {
  const res = await axios.get(`${url}/cityBreakExclusions`)
  return res.data
}

export const getCityBreaksExclusionsById = (id: string) =>
  fetch(`${url}/cityBreakExclusions/${id}`, {
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

export const postCityBreakExclusion = async (values: any) => {
  const res = await axios({
    method: 'post',
    url: `${url}/cityBreakExclusions`,
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

export const putCityBreakExclusion = (values: any) =>
  fetch(`${url}/cityBreakExclusions/${values.id}`, {
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

export const deleteCityBreakExclusion = async (id: string) =>
  await axios({
    method: 'delete',
    url: `${url}/cityBreakExclusions/${id}`,
  })
