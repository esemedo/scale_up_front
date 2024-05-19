import React from 'react'
import {  PRIORITY_COLOR, STATUS, STATUS_COLOR_BG, STATUS_COLOR_TEXT } from '../../lib/constants';
import axios from 'axios';
import { useToast } from '../ui/use-toast';
import { format } from 'date-fns';
import { it } from 'node:test';

function ListTasks({data, setData ,handleItemClick, selectedItem, status =0, session, updateState} :ListTasksProps) {
  const {toast} = useToast()
  
  React.useEffect(() => {
    setData([])
    if(session){
      let url = `${process.env.NEXT_PUBLIC_API_URL}/dei?status=${status}`
     
      axios
        .get<Dei[]>(url, {headers:{Authorization: `Bearer ${session?.accessToken}`}}) 
        .then((result) => {
          setData(result.data);
          handleItemClick(result.data[0])

        })
        .catch((error) => {
          toast({
            variant: "destructive",
            title: "Oh là là ! Quelque chose s'est mal passé.",
            description:axios.isAxiosError(error)?  error.response?.data?.error ??
            "Une erreur s'est produite lors de la mis à jour de la tâche.": "Une erreur inattendue s'est produite.",
          })
        });
  }
    }, [session, updateState]);
 
    return (    
    <ul className="task-list overflow-auto mt-6 flex flex-col items-center">
        {data.map((item: TasksProps) => {
         return  <li
            key={item.id}
            style={{backgroundColor:STATUS_COLOR_BG[item.status]}}
            className={`bg-${STATUS_COLOR_BG[item.status]} text-${STATUS_COLOR_TEXT[item.status]}  p-5 mt-3 rounded-lg relative w-11/12 ${
              selectedItem?.id === item.id ? "selected border-2 border-electric-blue border-solid" : ""
            }`}
            onClick={() => handleItemClick(item)}
          > 
          {item.sashaStatus !==3 && <div style={{background: PRIORITY_COLOR[item.priority]}} className={`rounded-3xl absolute top-0 left-0 -translate-x-1 bg-[${PRIORITY_COLOR[item.priority]}] w-3 h-3`}></div>}
            <h4>Tâche n°{item.id}</h4>
           <span className='text-sm'>Date d'écheance : {format(new Date(item.dueDate), "dd/mm/yyyy")}</span> 
          </li>}
        )}
      </ul>
  )
}

export default ListTasks
