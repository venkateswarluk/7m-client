import axios from 'axios'
import { url } from '../config'

export const getActivityOptions = async () => {
  const res = await axios.get(`${url}/activityoptions`)
  return res.data
}

export const getActivityOptionsById = (id: string) =>
  fetch(`${url}/activityoptions/${id}`, {
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

export const postActivityOptions = async (values: any) => {
  const res = await axios({
    method: 'post',
    url: `${url}/activityoptions`,
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

export const putActivityOptions = (values: any) =>
  fetch(`${url}/activityoptions/${values.id}`, {
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

export const deleteActivityOptions = async (id: string) =>
  await axios({
    method: 'delete',
    url: `${url}/activityoptions/${id}`,
  })
