import axios from 'axios'
import { url } from '../config'

export const getCityBreakDetails = async () => {
  const res = await axios.get(`${url}/citybreakdetails`)
  return res.data
}

export const getCityBreaksDetailsById = (id: string) =>
  fetch(`${url}/citybreakdetails/${id}`, {
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

export const postCityBreakDetail = async (values: any) => {
  const res = await axios({
    method: 'post',
    url: `${url}/citybreakdetails`,
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

export const putCityBreakDetail = (values: any) =>
  fetch(`${url}/citybreakdetails/${values.id}`, {
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

export const deleteCityBreakDetail = async (id: string) =>
  await axios({
    method: 'delete',
    url: `${url}/citybreakdetails/${id}`,
  })
