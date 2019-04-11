import axios from 'axios'
import { url } from '../config'

export const getActivityCategories = async () => {
  const res = await axios.get(`${url}/categories`)
  return res.data
}

export const getActivityCategoriesById = (id: string) =>
  fetch(`${url}/categories/${id}`, {
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

export const postActivityCategory = async (values: any) => {
  const res = await axios({
    method: 'post',
    url: `${url}/categories`,
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

export const putActivityCategory = (values: any) =>
  fetch(`${url}/categories/${values.id}`, {
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

export const deleteActivityCategory = async (id: string) =>
  await axios({
    method: 'delete',
    url: `${url}/categories/${id}`,
  })
