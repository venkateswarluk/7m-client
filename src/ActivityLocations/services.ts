import axios from 'axios'
import { url } from '../config'

export const getActivityLocations = async () => {
  const res = await axios.get(`${url}/activityLocations`)
  return res.data
}

export const getActivityLocationsById = (id: string) =>
  fetch(`${url}/activityLocations/${id}`, {
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

export const postActivityLocation = async (values: any) => {
  const res = await axios({
    method: 'post',
    url: `${url}/activityLocations`,
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

export const putActivityLocation = (values: any) =>
  fetch(`${url}/activityLocations/${values.id}`, {
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

export const deleteActivityLocation = async (id: string) =>
  await axios({
    method: 'delete',
    url: `${url}/activityLocations/${id}`,
  })
