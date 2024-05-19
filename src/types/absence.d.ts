import { UseFormProps, UseFormReturn } from "react-hook-form";

interface Absence {
    id?: number;
    startDate : string;
    endDate : string;
    reason: string;
    substituteUserId:number|null;

}
type CalendarAbsenceProps = {
    update: Function;
    absence: Absence 
    session: Session |null
    assistants:Array<{id: number, name: string}>
}
type ListAbsenceParams = {
    data : Array<{ id?: number; startDate: string , endDate : string,reason: string, substituteUserId:number|null} >;
    handleMode: Function;
    handleItemClick: Function;
    selectedItem: Absence | null;
   
}

type DatePickerWithRangeProps = {
    date: DateRange |undefined, 
    setDate: SelectRangeEventHandler
}
type TimePickerWithRangeProps = {
    disabled: boolean,
    form: UseFormReturn<{ substitute: string; reason: string; startTime: string; endTime: string; }, any, undefined>
}