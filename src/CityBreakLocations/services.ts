import axios from 'axios'

export const getCityBreakLocations = async () => {
  const res = await axios.get(`http://localhost:4000/cityBreakLocations`)
  return res.data
}

export const getCityBreaksLocationsById = (id: string) =>
  fetch(`http://localhost:4000/cityBreakLocations/${id}`, {
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

export const postCityBreakLocation = async (values: any) => {
  const res = await axios({
    method: 'post',
    url: `http://localhost:4000/cityBreakLocations`,
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

export const putCityBreakLocation = (values: any) =>
  fetch(`http://localhost:4000/cityBreakLocations/${values.id}`, {
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

export const deleteCityBreakLocation = async (id: string) =>
  await axios({
    method: 'delete',
    url: `http://localhost:4000/cityBreakLocations/${id}`,
  })
