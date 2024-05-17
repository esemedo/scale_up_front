import React, { useEffect, useState } from 'react';
import { DateRange } from 'react-day-picker';
import axios, { AxiosError } from 'axios';
import { useSession } from 'next-auth/react';
import { addDays } from 'date-fns';
import { DatePickerWithRange } from './DatePickerWithRange';
import TimePickerWithRange from './TimePickerWithRange';
import { z } from "zod"
import { formSchema } from './FormSchema';
import {  FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SelectSubstitut } from './SelectSubstitut';
import { Button } from '../ui/button';
import TextareaAbsence from './TextareaAbsence';
import { CalendarAbsenceProps } from '@/types/absence';
import { formatTime, getCombinedDate } from '@/lib/datetime';



function CalendarAbsenceCreate({update, absence, assistants }: CalendarAbsenceProps) {
  const [date, setDate] = useState<DateRange | undefined>();
  const { data: session  } = useSession();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        substitute: "",
        reason: "",
        startTime: formatTime(new Date()),
        endTime: formatTime(new Date()),
      },

    })

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
 
  


  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      if(!date)return
      if(!date.to || !date.from )return
      const combinedDateTimeFrom = getCombinedDate(date?.from?.toDateString(), data.startTime)
      const combinedDateTimeTo =getCombinedDate(date?.to?.toDateString(), data.endTime)
      
      const formData = {
        startDate: combinedDateTimeFrom.toISOString(),
        endDate: combinedDateTimeTo.toISOString(),
        reason: data.reason,
        substitutUserId: data.substitute === ""? null : parseInt(data.substitute)
      };

      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/absence/create`, formData, {headers:{Authorization: `Bearer ${session?.accessToken}`}});

      console.log('Réponse du serveur:', response.data.message);
      update()
      setDate(undefined);
      form.reset()
    } catch (error: any) {
      console.error('Erreur lors de la soumission du formulaire:', error.message);
    }
  };
  ;
  
  return (
  <FormProvider {...form}>
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className='flex flex-col justify-around items-center gap-y-2 h-full py-2'
    >
     <h1 className="text-3xl font-bold text-[#41494e]"> Nouvelle Absence</h1>
      <div className='w-full flex flex-col gap-5 items-center justify-center '>
      <DatePickerWithRange date={date} setDate={setDate} />
      <TimePickerWithRange disabled={false} form={form} />
      <TextareaAbsence form={form} disabled={false}/>
      <SelectSubstitut disabled={false} form={form} options={assistants}/>
      </div>
     <Button type="submit">Valider</Button>
    </form>
    </FormProvider>
  );
}

export default CalendarAbsenceCreate;
