import axios from 'axios'

export const getCityBreakExclusions = async () => {
  const res = await axios.get(`http://localhost:4000/cityBreakExclusions`)
  return res.data
}

export const getCityBreaksExclusionsById = (id: string) =>
  fetch(`http://localhost:4000/cityBreakExclusions/${id}`, {
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

export const postCityBreakExclusion = async (values: any) => {
  const res = await axios({
    method: 'post',
    url: `http://localhost:4000/cityBreakExclusions`,
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

export const putCityBreakExclusion = (values: any) =>
  fetch(`http://localhost:4000/cityBreakExclusions/${values.id}`, {
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

export const deleteCityBreakExclusion = async (id: string) =>
  await axios({
    method: 'delete',
    url: `http://localhost:4000/cityBreakExclusions/${id}`,
  })
