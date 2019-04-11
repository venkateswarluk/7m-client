import axios from 'axios'
import { url } from '../config'
export const getActivityDetails = async () => {
  const res = await axios.get(`${url}/activitydetails`)
  return res.data
}

export const getActivityDetailsById = (id: string) =>
  fetch(`${url}/activitydetails/${id}`, {
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

export const postActivityDetail = async (values: any) => {
  const res = await axios({
    method: 'post',
    url: `${url}/activitydetails`,
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

export const putActivityDetail = (values: any) =>
  fetch(`${url}/activitydetails/${values.id}`, {
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

export const deleteActivityDetail = async (id: string) =>
  await axios({
    method: 'delete',
    url: `${url}/activitydetails/${id}`,
  })
