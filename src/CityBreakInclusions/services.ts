import axios from 'axios'

export const getCityBreakInclusions = async () => {
  const res = await axios.get(`http://localhost:4000/cityBreakInclusions`)
  return res.data
}

export const getCityBreaksInclusionsById = (id: string) =>
  fetch(`http://localhost:4000/cityBreakInclusions/${id}`, {
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

export const postCityBreakInclusion = async (values: any) => {
  const res = await axios({
    method: 'post',
    url: `http://localhost:4000/cityBreakInclusions`,
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

export const putCityBreakInclusion = (values: any) =>
  fetch(`http://localhost:4000/cityBreakInclusions/${values.id}`, {
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

export const deleteCityBreakInclusion = async (id: string) =>
  await axios({
    method: 'delete',
    url: `http://localhost:4000/cityBreakInclusions/${id}`,
  })
