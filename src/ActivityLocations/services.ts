import axios from 'axios'

export const getActivityLocations = async () => {
  const res = await axios.get(`http://localhost:4000/activityLocations`)
  return res.data
}

export const getActivityLocationsById = (id: string) =>
  fetch(`http://localhost:4000/activityLocations/${id}`, {
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
    url: `http://localhost:4000/activityLocations`,
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
  fetch(`http://localhost:4000/activityLocations/${values.id}`, {
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
    url: `http://localhost:4000/activityLocations/${id}`,
  })
