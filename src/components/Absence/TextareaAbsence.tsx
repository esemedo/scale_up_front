import React from 'react'
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { Textarea } from '@/components/ui/textarea'
import { UseFormReturn } from 'react-hook-form'

function TextareaAbsence({form, disabled} :{form: UseFormReturn<{ substitute: string; reason: string; startTime: string; endTime: string; }, any, undefined>, disabled: boolean}) {
  return (
    <FormField
          control={form.control}
          name="reason"
          render={({ field }) => (
            <FormItem className='w-full px-3'>
              <FormLabel>Raison</FormLabel>
              <FormControl>
                <Textarea
                className="resize-none"
                  disabled={disabled}
                  placeholder="Raison"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
  )
}

export default TextareaAbsence
