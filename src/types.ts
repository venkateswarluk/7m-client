import { FormikActions } from 'formik'

export interface OptionValues {
  readonly value: number | string
  readonly label: string
}

export interface OptionValues1 {
  readonly value: number | string
  readonly label: string
  readonly cityId: number
  readonly days: number
}

export interface DestinationProps {
  readonly destinations: ReadonlyArray<OptionValues>
}

export interface CategoryProps {
  readonly categories: ReadonlyArray<OptionValues>
}

export interface TourProps {
  readonly tourNames: ReadonlyArray<OptionValues1>
}

export interface MealTypeProps {
  readonly mealTypes: ReadonlyArray<OptionValues>
}

export interface MealCategoryProps {
  readonly currentMealCategory: string
}

export interface AddFormProps<T> {
  handleAddSubmit(values: T, actions: FormikActions<T>): void
  handleCloseClick(): void
}

export interface EditFormProps<T> {
  readonly currentItem: T
  handleEditSubmit(values: T, actions: FormikActions<T>): void
  handleCloseClick(): void
}

export interface PaginationResult<T> {
  readonly result: T
  readonly total: number
}

export interface LoginFormProps<T> {
  handleLoginSubmit(values: T, actions: FormikActions<T>): void
}
