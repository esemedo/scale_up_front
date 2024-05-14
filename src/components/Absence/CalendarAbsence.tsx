import React, { useEffect, useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { DateRange } from 'react-day-picker';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { addDays } from 'date-fns';
import { DatePickerWithRange } from './DatePickerWithRange';
import TimePickerWithRange from './TimePickerWithRange';
import SelectComponent from '../Assistant/SelectComponent';

function formatTime(date: Date) {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}
const getCombinedDate = (date : string, time : string) =>{
  const dateObj = new Date(date);
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth();
  const day = dateObj.getDate();
  const [hours, minutes, seconds] = time.split(':');
  const combinedDateTime = new Date(year, month, day, parseInt(hours), parseInt(minutes), parseInt(seconds));
  return combinedDateTime
}
const option = [ "assistant 1",  "assistant 2", "assistant 3"]

function CalendarAbsence({update, absence, isCreate }: CalendarAbsenceProps) {
  const [date, setDate] = useState<DateRange | undefined>();
  const [time, setTime] = useState<{from: string, to: string} | undefined>({from:"", to : ""});
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date(absence.startDate));
  const [formReason, setFormReason] = useState('');
  const [substitut, setSubstitut] = useState<{id: number|string, name: string}>({id:'', name:''});
  const { data: session  } = useSession();
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
      const timeStartString = formatTime(new Date(absence.startDate));
      const timeEndString = formatTime(new Date(absence.endDate));
      setTime({from: timeStartString, to:timeEndString})
  }
    setFormReason(absence.reason)
    handleMonthChange(new Date(absence.startDate));
  }, [absence.startDate, absence.endDate]);
  const updateSubstitute =async ()=>{
    try {
      const substitutUserId= substitut.id !== "" && typeof substitut.id === 'number'? substitut.id + 1 : null
      await axios.patch(`http://localhost:3000/api/absence/${absence.id}/substitute`,{substitutUserId},{headers:{Authorization: `Bearer ${session?.accessToken}`}})
    } catch (error) {
      console.error(`Error:${error}`)
    }
  }
  useEffect(()=>{
    if(!isCreate && substitut.name !== ""){
      updateSubstitute()
    }
  },[substitut])
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if(!date)return
      if(!time)return
     
      if(!date.to || !date.from || !time.from || !time.to)return
      const combinedDateTimeFrom = getCombinedDate(date?.from?.toDateString(), time.from)
      const combinedDateTimeTo =getCombinedDate(date?.to?.toDateString(), time.to)
      
      const formData = {
        startDate: combinedDateTimeFrom.toISOString(),
        endDate: combinedDateTimeTo.toISOString(),
        reason: formReason,
        substitutUserId: substitut.id !== "" && typeof substitut.id === 'number'? substitut.id + 1 : null
      };

      const response = await axios.post(`http://localhost:3000/api/absence/create`, formData, {headers:{Authorization: `Bearer ${session?.accessToken}`}});

      console.log('Réponse du serveur:', response.data);
      update()
      setDate(undefined);
      setFormReason('');
    } catch (error) {
      console.error('Erreur lors de la soumission du formulaire:', error);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col justify-center items-center gap-y-2'
    >
      {isCreate? (
        <>
        <h1>Nouvelle Absence</h1>
        <DatePickerWithRange date={date} setDate={setDate} />
        </>
      )
     :
      (
        <>
          <h1>Absence n°{absence?.id}</h1>
          <Calendar
            mode="range"
            selected={date}
            disabled={{ dayOfWeek: [0, 6] }}
            defaultMonth={currentMonth}
            onMonthChange={(newDate: Date) => setCurrentMonth(newDate)}
            numberOfMonths={2} />
        </>
      )}
        <TimePickerWithRange disabled={!isCreate} time={time} setTime={setTime} />

      <div className="relative h-32 w-4/5">
        <label
          htmlFor="description"
          className="absolute -top-2 left-2 bg-white px-1 text-xs transition-all duration-200 ease-in-out peer-placeholder-shown:top-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:opacity-100 peer-focus:top-1 peer-focus:scale-75 peer-focus:opacity-100"
        >
          Raison
        </label>
        <textarea
          id="description"
          disabled={!isCreate}
          className="clss"
          placeholder="Raison"
          value={formReason}
          onChange={(e) => setFormReason(e.target.value)}
        />
      </div>
      <SelectComponent withNoValue position="" label='Remplaçant' options={option} value={substitut?.id} onChange={(value: string)=> {
        const parsedValue = value ===""?"": parseInt(value)
        const parsedName = value ===""?"": option[parseInt(value)]
        setSubstitut({id:parsedValue, name: parsedName})}}/>
      {isCreate && <button type="submit">Valider</button>}
    </form>
  );
}

export default CalendarAbsence;
