import axios from 'axios'

export const getCityBreaks = async () => {
  const res = await axios.get(`http://localhost:4000/citybreaks`)
  return res.data
}

export const getCityBreaksById = (id: string) =>
  fetch(`http://localhost:4000/citybreaks/${id}`, {
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

export const postCityBreak = async (values: any) => {
  const res = await axios({
    method: 'post',
    url: `http://localhost:4000/citybreaks`,
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

export const putCityBreak = (values: any) =>
  fetch(`http://localhost:4000/citybreaks/${values.id}`, {
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

export const deleteCityBreak = async (id: string) =>
  await axios({
    method: 'delete',
    url: `http://localhost:4000/citybreaks/${id}`,
  })
