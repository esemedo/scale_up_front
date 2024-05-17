import React from 'react'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "@/components/ui/input"
import { TimePickerWithRangeProps } from '@/types/absence';

function TimePickerWithRange({form, disabled}: TimePickerWithRangeProps) {
    return (
      <div className='flex items-center justify-around w-4/5 gap-3'>
        <FormField
          control={form.control}
          name="startTime"
          render={({ field }) => (
            <FormItem className='w-3/6'>
              <FormLabel>Heure de début</FormLabel>
              <FormControl>
                <Input type='time' disabled={disabled} placeholder="Heure de début" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
       <FormField
          control={form.control}
          name="endTime"
          render={({ field }) => (
            <FormItem className='w-3/6'>
              <FormLabel>Heure de fin</FormLabel>
              <FormControl>
                <Input type='time' disabled={disabled} placeholder="Heure de fin" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    );
}

export default TimePickerWithRange
