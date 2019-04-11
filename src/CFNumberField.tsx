import * as Cleave from 'cleave.js/react'
import { Field, FieldProps } from 'formik'
import * as React from 'react'

interface CFNumberFieldProps {
  readonly type: 'none' | 'lakh' | 'thousand' | 'wan'
  readonly decimalScale?: number
  readonly name: string
  readonly [key: string]: any
}

export type OwnProps<T> = FieldProps<T> & CFNumberFieldProps

const CleaveNumberField: React.FC<OwnProps<any>> = ({
  type,
  field,
  form,
  ...props
}: CFNumberFieldProps) => {
  return (
    <div>
      <Cleave
        {...field}
        placeholder={field.name}
        options={{
          numeral: true,
          numeralThousandsGroupStyle: type,
          numeralDecimalScale: props.decimalScale ? props.decimalScale : 2,
        }}
        onChange={(evt: React.SyntheticEvent) => {
          const { value } = evt.target as HTMLInputElement
          form.setFieldValue(
            field.name,
            value ? parseFloat(value.replace(/\,/g, '')) : '',
          )
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

export const CFNumberField: React.FC<CFNumberFieldProps> = ({
  type,
  name,
  ...props
}: CFNumberFieldProps) => {
  return (
    <div>
      <Field type={type} name={name} component={CleaveNumberField} {...props} />
    </div>
  )
}
