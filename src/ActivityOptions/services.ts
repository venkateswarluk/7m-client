import axios from 'axios'

export const getActivityOptions = async () => {
  const res = await axios.get(`http://localhost:4000/activityoptions`)
  return res.data
}

export const getActivityOptionsById = (id: string) =>
  fetch(`http://localhost:4000/activityoptions/${id}`, {
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

export const postActivityOptions = async (values: any) => {
  const res = await axios({
    method: 'post',
    url: `http://localhost:4000/activityoptions`,
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

export const putActivityOptions = (values: any) =>
  fetch(`http://localhost:4000/activityoptions/${values.id}`, {
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

export const deleteActivityOptions = async (id: string) =>
  await axios({
    method: 'delete',
    url: `http://localhost:4000/activityoptions/${id}`,
  })
