import axios from 'axios'

export const getActivityCategories = async () => {
  const res = await axios.get(`http://localhost:4000/categories`)
  return res.data
}

export const getActivityCategoriesById = (id: string) =>
  fetch(`http://localhost:4000/categories/${id}`, {
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
    url: `http://localhost:4000/categories`,
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
  fetch(`http://localhost:4000/categories/${values.id}`, {
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
    url: `http://localhost:4000/categories/${id}`,
  })
