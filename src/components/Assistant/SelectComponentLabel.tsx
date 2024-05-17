import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"


function SelectComponent({label,options,property, placeholder,  form,disabled} : SelectType) {
    return (
        <FormField
        control={form.control}
        name={property}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <Select disabled={disabled} onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={placeholder}/>
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                  {options.map((option : string) => (
                <SelectItem key={option} value={`${options.indexOf(option)}`}>{option}</SelectItem>
                  ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
  )
}
export default SelectComponent
