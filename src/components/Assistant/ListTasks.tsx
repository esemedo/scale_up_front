import React from 'react'
import { PRIORITY } from './constants';
import SelectComponent from './SelectComponent';

function ListTasks({data, handleItemClick, selectedItem, priority, handleChangePriority} :ListTasksParams) {
  
  return (
    <div className="left-side mx-auto mt-2 w-2/6 rounded-3xl bg-white p-8 shadow-lg">
          <h3 className="text-lg ">Mes tâches</h3>
          <SelectComponent label="Priorité" position="mt-10 w-28 rounded-sm text-center" value={priority} withNoValue  options={PRIORITY} onChange={(value : number | string)=>{handleChangePriority(value)}}/>

          <ul className="task-list max-h-96 overflow-auto">
            {data.map((item: { id: number; status: number }) => (
              <li
                key={item.id}
                className={`bg-[#f0f2fc] mb-3 p-5 mt-3 rounded-lg  ${
                  selectedItem === item ? "selected border-2 border-electric-blue border-solid" : ""
                }`}
                onClick={() => handleItemClick(item.id)}
              >
                <h4>Tâche n°{item.id}</h4>
                {item.status ? "Complété" : "En cours"}
              </li>
            ))}
          </ul>
        </div>
  )
}

export default ListTasks
