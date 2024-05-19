import { isBefore, isSameDay } from "date-fns";

export function formatTime(date: Date) {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }
export  const getCombinedDate = (date : string, time : string) =>{
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth();
    const day = dateObj.getDate();
    const [hours, minutes, seconds] = time.split(':');
    const combinedDateTime = new Date(year, month, day, parseInt(hours), parseInt(minutes), parseInt(seconds));
    return combinedDateTime
  }

  export  const isCancellable = (date1: Date, date2: Date)=>{
    if (isSameDay(date1, date2)){
      return isBefore(date1, date2) 
    }
    return isBefore(date1, date2) 
  }