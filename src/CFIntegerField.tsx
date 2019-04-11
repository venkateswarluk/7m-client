import * as Cleave from 'cleave.js/react'
import { Field, FieldProps } from 'formik'
import * as React from 'react'

interface CFIntegerFieldProps {
  readonly name: string
  readonly [key: string]: any
}

export type OwnProps<T> = FieldProps<T> & CFIntegerFieldProps

const CleaveIntegerField: React.FC<OwnProps<any>> = ({
  field,
  form,
  ...props
}: CFIntegerFieldProps) => {
  return (
    <div>
      <Cleave
        {...field}
        placeholder={field.name}
        options={{
          numericOnly: true,
          numeralDecimalScale: 0,
        }}
        onChange={(evt: React.SyntheticEvent) => {
          const { value } = evt.target as HTMLInputElement
          form.setFieldValue(field.name, value ? parseInt(value, 10) : '')
        }}
        {...props}
      />
      <div className="has-text-danger is-size-7">
        {form.touched[field.name] &&
          form.errors[field.name] &&
          form.errors[field.name]}
      </div>
    </div>
  )
}

export const CFIntegerField: React.FC<CFIntegerFieldProps> = ({
  name,
  ...props
}: CFIntegerFieldProps) => {
  return (
    <div>
      <Field name={name} component={CleaveIntegerField} {...props} />
    </div>
  )
}
