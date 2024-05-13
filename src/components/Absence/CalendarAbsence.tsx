import React, { useEffect } from 'react'
import { Calendar } from "@/components/ui/calendar"
import { DateRange } from 'react-day-picker'

function CalendarAbsence({startDate, endDate, reason}: Absence ) {
  const [date, setDate] = React.useState<DateRange | undefined>()
  const [currentMonth, setCurrentMonth] = React.useState<Date>();
    const handleMonthChange = (newDate: Date) => {
      setCurrentMonth(newDate);
    };
    useEffect(() => {
      setDate({
        from: new Date(startDate),
        to: new Date(endDate),
      });
      handleMonthChange(new Date(startDate))
    }, [startDate, endDate]);
    
  return (
    <div className="right-side mx-auto w-4/5">
     {date !== undefined && date?.from && <div className='top mx-auto mt-2 flex flex-col justify-center items-center gap-y-2 rounded-3xl bg-white shadow-lg h-3/4'>
        <Calendar
          initialFocus
          mode="range"
          selected={date}
          disabled={{ dayOfWeek: [0, 6] }}   
          defaultMonth={currentMonth}
          onMonthChange={handleMonthChange}
          numberOfMonths={2} />
          <div className="relative h-32 w-4/5">
              <label
                  htmlFor="description"
                  className="absolute -top-2 left-2 bg-white px-1 text-xs transition-all duration-200 ease-in-out peer-placeholder-shown:top-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:opacity-100 peer-focus:top-1 peer-focus:scale-75 peer-focus:opacity-100"
              >
                  Raison
              </label>
              <textarea
                  id="description"
                  disabled
                  className="vertical-align h-full w-full rounded-md border border-black px-1 py-2"
                  placeholder="Raison" value={reason} onChange={()=>{}} />
                  
          </div>
          </div>}
    </div>
  )
}

export default CalendarAbsence
