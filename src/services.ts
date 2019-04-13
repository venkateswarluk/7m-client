import axios from 'axios'

export const getAllItems = async (url: string) => {
  const res = await axios.get(`${url}`)
  return res.data
}

export const getAllCount = async (url: string) => {
  const res = await axios.get(`${url}/all`)
  return res.data
}

export const getItemById = (url: string, id: string) =>
  fetch(`${url}/${id}`, {
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

export const postItem = <T>(url: string, values: T) =>
  fetch(`${url}`, {
    method: 'POST',
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

export const putItem = <T extends { readonly id: string }>(
  url: string,
  values: T,
) =>
  fetch(`${url}/${values.id}`, {
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

export const deleteItem = async (url: string, id: string) =>
  await axios({
    method: 'delete',
    url: `${url}/${id}`,
  })

// export const postItem = async <T>(url: string, values: T) => {
//   const res = await axios({
//     method: 'post',
//     url: `${url}`,
//     data: {
//       values,
//     },
//   })
//   if (res.status === 201) {
//     return res
//   } else {
//     throw res
//   }
// }
