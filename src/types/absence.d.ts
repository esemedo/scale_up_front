interface Absence {
    id: number;
    startDate : string;
    endDate : string;
    reason: string;
}

type ListAbsenceParams = {
    data : Array<{ id: number; startDate: string , endDate : string,reason: string}>;
    handleItemClick: Function;
    selectedItem: Absence | null;
   
}