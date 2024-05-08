interface Dei {
    id: number;
    sashaStatus: number;
    status: number;
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
    data : Array<{ id: number; status: number }>;
    handleItemClick: Function;
    selectedItem: Dei | null;
    handleChangePriority: Function;
    priority: string |number
   
}