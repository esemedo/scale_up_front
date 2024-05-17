import React from 'react'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
type InputComponent = {
    label : string,
    property: "id" | "status" | "totalPrice" | "dueDate" | "hourlyPrice" | "priority" | "sashaStatus" |"purchaseOrder",
    form: any
    readOnly: boolean 
    type?: string
}
function InputInfoDei({label,property,form, type = "text", readOnly }: InputComponent) {
  return (
    <FormField
    control={form.control}
    name={property}
    render={({ field }) => {
      return <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <Input placeholder={label} type={type} disabled={readOnly} {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    }}
  />
  )
}

export default InputInfoDei
