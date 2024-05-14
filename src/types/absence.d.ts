interface Absence {
    id?: number;
    startDate : string;
    endDate : string;
    reason: string;
}
type CalendarAbsenceProps = {
    update: Function;
    isCreate: boolean;
    absence: {
        id?:number;
        startDate : string,
        endDate : string,
        reason: string
        }
}
type ListAbsenceParams = {
    data : Array<{ id?: number; startDate: string , endDate : string,reason: string}>;
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
    time: {from: string, to: string} |undefined, 
    setTime: Function
}