import * as React from "react"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { UseFormReturn } from "react-hook-form"

export function SelectSubstitut({form, options, disabled }: {disabled:boolean,form: UseFormReturn<{ substitute: string; reason: string; startTime: string; endTime: string; }, any, undefined>, options: Array<{id: number, name: string}>}) {
    return (
        <FormField
          control={form.control}
          name="substitute"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Remplaçant</FormLabel>
              <Select disabled={disabled} onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un remplaçant" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                    {options.map((option : {id: number, name: string}) => (
                  <SelectItem key={option.id} value={`${option.id}`}>{option.name}</SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
  )
}
