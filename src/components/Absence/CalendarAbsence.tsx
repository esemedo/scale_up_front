import React, { useEffect, useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { DateRange } from 'react-day-picker';
import axios, { AxiosError } from 'axios';
import { useSession } from 'next-auth/react';
import { addDays, isBefore, isSameDay, parseISO } from 'date-fns';
import TimePickerWithRange from './TimePickerWithRange';
import { z } from "zod"
import { formSchema } from './FormSchema';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SelectSubstitut } from './SelectSubstitut';
import TextareaAbsence from './TextareaAbsence';
import { CalendarAbsenceProps } from '@/types/absence';
import { formatTime, isCancellable } from '@/lib/datetime';
import { Button } from '../ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useToast } from '../ui/use-toast';



function CalendarAbsence({update, absence, assistants }: CalendarAbsenceProps) {
  const [date, setDate] = useState<DateRange | undefined>();
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date(absence.startDate));
  const { data: session  } = useSession();
 const {toast} = useToast() 
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        substitute: `${absence.substituteUserId !== null? assistants.filter(assistant => assistant.id === absence.substituteUserId).length > 0?absence.substituteUserId: "": ""}`,
        reason: absence.reason,
        startTime: formatTime(new Date(absence.startDate)),
        endTime: formatTime(new Date(absence.endDate)),
      },

    })

  const handleMonthChange = (newDate: Date) => {
    setCurrentMonth(newDate);
  };
  useEffect(() => {
    if(absence.startDate === ""|| absence.endDate === ""){
      setDate({from: new Date(), to: addDays(new Date(),20)})
    }
    else{
      setDate({
        from: new Date(absence.startDate),
        to: new Date(absence.endDate),
      } );
  }
   
  }, [absence.startDate, absence.endDate]);
  const updateSubstitute =async (data: z.infer<typeof formSchema>)=>{
    try {
      const substitutUserId= data.substitute === ""? null : parseInt(data.substitute)
      const result = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/absence/${absence.id}/substitute`,{substitutUserId},{headers:{Authorization: `Bearer ${session?.accessToken}`}})
      toast({
        variant: "successful",
          title: result.data.message ?? "L'absence a été mis à jour",
        })
      update()
  } catch (error) {
    toast({
      variant: "destructive",
      title: "Uh oh! Something went wrong.",
      description:axios.isAxiosError(error)?  error.response?.data ??
      "An error occurred while updating subtitute.": "An unexpected error occurred.",
    })
    }
  }

  const deleteAbsence =async ()=>{
    try {
     const result =  await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/absence/${absence.id}/delete`,{headers:{Authorization: `Bearer ${session?.accessToken}`}})
      toast({
      variant: "successful",
        title: result.data.message ?? "L'absence a été supprimée",
      })
      update()
  } catch (error) {
    toast({
      variant: "destructive",
      title: "Oh là là ! Quelque chose s'est mal passé.",
      description:axios.isAxiosError(error)?  error.response?.data?.error ??
      "Une erreur s'est produite lors de la création d'une absence.": "Une erreur inattendue s'est produite.",
    })
    }
  }
 
  
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(updateSubstitute)}
        className='flex flex-col justify-around items-center gap-y-2 h-full py-2 px-2'
      >
          {isCancellable(new Date(), new Date(absence.startDate)) ===true ?
            <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button type="button" className='self-end bg-destructive' onClick={deleteAbsence}>X</Button> 
                </TooltipTrigger>
              <TooltipContent>
                <p>Annuler l'absence</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
                      :
            <div className='self-end h-10 px-4 py-2'></div>}
          <h1 className="text-3xl font-bold text-[#41494e]">Absence n°{absence?.id}</h1>
          <div className='w-full flex flex-col gap-1 items-center justify-center h-full  '>
            <Calendar
              mode="range"
              selected={date}
              disabled={{ dayOfWeek: [0, 6] }}
              defaultMonth={currentMonth}
              onMonthChange={(newDate: Date) => handleMonthChange(newDate)}
              numberOfMonths={2} />
        
            <TimePickerWithRange form={form} disabled={true} />
            <TextareaAbsence disabled form={form}/>
            <div className='flex items-end'>
              <SelectSubstitut disabled={isCancellable( new Date(absence.startDate), new Date())} form={form}  options={assistants}/>
              <Button type="submit">Valider</Button>
            </div>
        </div>
      </form>
    </FormProvider>
  );
}

export default CalendarAbsence;
