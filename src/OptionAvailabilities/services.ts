import axios from 'axios'
import { OptionAvailabilityForm } from './AddOptionAvailability'

export const getOptionsAvailabilities = async () => {
  const res = await axios.get(`http://localhost:4000/optionavailabilities`)
  return res.data
}

export const getOptionAvailabilityById = (id: string) =>
  fetch(`http://localhost:4000/optionavailabilities/${id}`, {
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
    url: `http://localhost:4000/optionavailabilities`,
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
  fetch(`http://localhost:4000/optionavailabilities/${values.id}`, {
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
    url: `http://localhost:4000/optionavailabilities/${id}`,
  })
