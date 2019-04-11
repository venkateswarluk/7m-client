import axios from 'axios'
import { OptionAvailabilityForm } from './AddOptionAvailability'
import { url } from '../config'

export const getOptionsAvailabilities = async () => {
  const res = await axios.get(`${url}/optionavailabilities`)
  return res.data
}

export const getOptionAvailabilityById = (id: string) =>
  fetch(`${url}/optionavailabilities/${id}`, {
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

export const postOptionAvailability = async (
  values: OptionAvailabilityForm,
) => {
  const res = await axios({
    method: 'post',
    url: `${url}/optionavailabilities`,
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

export const putOptionAvailability = (values: any) =>
  fetch(`${url}/optionavailabilities/${values.id}`, {
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

export const deleteOptionAvailability = async (id: string) =>
  await axios({
    method: 'delete',
    url: `${url}/optionavailabilities/${id}`,
  })
