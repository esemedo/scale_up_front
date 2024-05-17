import React from 'react'
import { PRIORITY, PRIORITY_COLOR, STATUS } from '../../lib/constants';
import axios from 'axios';

function TaskView({ handleItemClick, selectedItem, status =0, session, updateState} :ListTasksProps) {
  const [data, setData] = React.useState<Dei[]>([]); 
          {/* <SelectComponent label="Priorité" position="mt-10 w-28 rounded-sm text-center" value={prioritySelect} withNoValue  options={PRIORITY} onChange={(value : number | string)=>{handleChangePrioritySelect(value)}}/> */}
  React.useEffect(() => {
    if(session){
      let url = `${process.env.NEXT_PUBLIC_API_URL}/dei?status=${1}`
      // if(priority !== ""){
      //     url += `?priority=${priority}`
      // }
      axios
        .get<Dei[]>(url, {headers:{Authorization: `Bearer ${session?.accessToken}`}}) 
        .then((result) => {
          setData(result.data);
          // if(selectedItem)
          //   handleItemClick(selectedItem)
          // else 
          handleItemClick(result.data[0])

        })
        .catch((error) => {
          console.error("Error:", error);
        });
  }
    }, [session, updateState]);

    return (    
    <ul className="task-list max-h-96 overflow-auto">
        {data.map((item: TasksProps) => (
          <li
            key={item.id}
            className={`bg-[#f0f2fc] mb-3 p-5 mt-3 rounded-lg relative  ${
              selectedItem?.id === item.id ? "selected border-2 border-electric-blue border-solid" : ""
            }`}
            onClick={() => handleItemClick(item)}
          > <div style={{background: PRIORITY_COLOR[item.priority]}} className={`rounded-3xl absolute top-0 left-0 bg-[${PRIORITY_COLOR[item.priority]}] w-3 h-3`}></div>
            <h4>Tâche n°{item.id}</h4>
            {STATUS[item.status]}
          </li>
        ))}
      </ul>
    // </div>
  )
}

export default TaskView
