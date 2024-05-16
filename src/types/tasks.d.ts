interface Dei {
    id: number;
    sashaStatus: number;
    status: boolean;
    totalPrice: number;
    dueDate: string;
    hourlyPrice: number;
    priority: number;
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
    data : Array<{ id: number; status: boolean, priority :number }>;
    handleItemClick: Function;
    selectedItem: Dei | null;
    handleChangePrioritySelect: Function;
    prioritySelect: string |number
   
}