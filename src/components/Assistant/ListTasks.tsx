import React from 'react'
import { PRIORITY, PRIORITY_COLOR, STATUS } from '../../lib/constants';
import axios from 'axios';

function ListTasks({data, setData ,handleItemClick, selectedItem, status =0, session, updateState} :ListTasksProps) {
  React.useEffect(() => {
    if(session){
      let url = `${process.env.NEXT_PUBLIC_API_URL}/dei?status=${status}`
     
      axios
        .get<Dei[]>(url, {headers:{Authorization: `Bearer ${session?.accessToken}`}}) 
        .then((result) => {
          setData(result.data);
          handleItemClick(result.data[0])

        })
        .catch((error) => {
          console.error("Error:", error);
        });
  }
    }, [session, updateState]);

    return (    
    <ul className="task-list max-h-96 overflow-auto mt-6 flex flex-col items-center">
        {data.map((item: TasksProps) => (
          <li
            key={item.id}
            className={`bg-[#f0f2fc]  p-5 mt-3 rounded-lg relative w-11/12 ${
              selectedItem?.id === item.id ? "selected border-2 border-electric-blue border-solid" : ""
            }`}
            onClick={() => handleItemClick(item)}
          > 
          {item.sashaStatus !==3 && <div style={{background: PRIORITY_COLOR[item.priority]}} className={`rounded-3xl absolute top-0 left-0 -translate-x-1 bg-[${PRIORITY_COLOR[item.priority]}] w-3 h-3`}></div>}
            <h4>Tâche n°{item.id}</h4>
            {STATUS[item.status]}
          </li>
        ))}
      </ul>
    // </div>
  )
}

export default ListTasks
