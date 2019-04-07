import axios from 'axios'
import { ActivityForm } from './AddActivity'
import { Activity } from './ActivityList'

export const getActivites = async () => {
  const res = await axios.get(`http://localhost:4000/activities`)
  return res.data
}

export const getActivityById = (id: string) =>
  fetch(`http://localhost:4000/activities/${id}`, {
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

export const postActivity = async (values: ActivityForm) => {
  const res = await axios({
    method: 'post',
    url: `http://localhost:4000/activities`,
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

export const putActivity = (values: Activity) =>
  fetch(`http://localhost:4000/activities/${values.id}`, {
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

export const deleteActivity = async (id: string) =>
  await axios({
    method: 'delete',
    url: `http://localhost:4000/activities/${id}`,
  })
