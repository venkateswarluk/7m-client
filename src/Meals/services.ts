import axios from 'axios'
import { MealTypeForm } from './AddMealType'
import { MealType } from './MealList'

export const getMealTypes = async () => {
  const res = await axios.get(`http://localhost:4000/mealTypes`)
  return res.data
}

export const getMealTypeById = (id: string) =>
  fetch(`http://localhost:4000/mealTypes/${id}`, {
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

export const postMealType = async (values: MealTypeForm) => {
  const res = await axios({
    method: 'post',
    url: `http://localhost:4000/mealTypes`,
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

export const putMealType = (values: MealType) =>
  fetch(`http://localhost:4000/mealTypes/${values.id}`, {
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

export const deleteMealType = async (mealTypeId: string) =>
  await axios({
    method: 'delete',
    url: `http://localhost:4000/mealTypes/${mealTypeId}`,
  })
