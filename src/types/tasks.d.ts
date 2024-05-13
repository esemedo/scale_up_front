interface Dei {
    id: number;
    sashaStatus: number;
    status: boolean;
    totalPrice: number;
    hourlyPrice: number;
    priority: string;
  }


  type SelectType = {
    label : string;
    options: Array<string>;
    value: number | string;
    position: string;
    onChange: Function;
    classSelect?: string;
    withNoValue?: boolean
}

type ListTasksParams = {
    data : Array<{ id: number; status: boolean }>;
    handleItemClick: Function;
    selectedItem: Dei | null;
    handleChangePriority: Function;
    priority: string |number
   
}