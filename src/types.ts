import { FormikActions } from 'formik'
export interface AddFormProps<T> {
  handleAddSubmit(values: T, actions: FormikActions<T>): void
  handleCloseClick(): void
}

export interface EditFormProps<T> {
  readonly currentItem: T
  handleEditSubmit(values: T, actions: FormikActions<T>): void
  handleCloseClick(): void
}
