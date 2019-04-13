import { FormikActions } from 'formik'

export interface OptionValues {
  readonly value: number | string
  readonly label: string
}

export interface DestinationProps {
  readonly destinations: ReadonlyArray<OptionValues>
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
