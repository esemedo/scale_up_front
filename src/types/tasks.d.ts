interface Dei {
    id: number;
    sashaStatus: number;
    status: number;
    totalPrice: number;
    dueDate: string;
    hourlyPrice: number;
    priority: number;
    purchaseOrder: Array<{fileUrl: string}>
  
  }
type DeiDisabled =  {
  sashaStatus: boolean;
  totalPrice: boolean;
  dueDate: boolean;
  hourlyPrice: boolean;
  priority: boolean;
  purchaseOrder: boolean;
}
type DeiProps = {
    dei : Dei,
    update: Function,
    disabled:  DeiDisabled
    session: Session|null
}

type SelectType = {
    label : string;
    options: Array<string>;
    placeholder: string;
    property: string;
    disabled: boolean;form: any;
}

interface StatusConfig {
  [key: number |string]: {
    purchaseOrder: boolean;
    sashaStatus: boolean;
    totalPrice: boolean;
    dueDate: boolean;
    hourlyPrice: boolean;
    priority: boolean;
  };
}
type TasksProps = { id: number; status: number, priority :number ,  sashaStatus?: number;}
type Calendar = {

    data : Array<{id: number; dueDate: string;}>;
}
type ListTasksProps = {
    data : Array<TasksProps>;
    setData: Function
    updateState: boolean
    status: number
    session: Session | null
    handleItemClick: Function;
    selectedItem: Dei | null;
   
}