import React from 'react'
import { PRIORITY, PRIORITY_COLOR, STATUS } from './constants';
import SelectComponent from './SelectComponent';

function ListTasks({data, handleItemClick, selectedItem, prioritySelect, handleChangePrioritySelect} :ListTasksParams) {
  return (
    <div className="left-side mx-auto mt-2 w-2/6 rounded-3xl bg-white p-8 shadow-lg">
          <h3 className="text-lg ">Mes tâches</h3>
          <SelectComponent label="Priorité" position="mt-10 w-28 rounded-sm text-center" value={prioritySelect} withNoValue  options={PRIORITY} onChange={(value : number | string)=>{handleChangePrioritySelect(value)}}/>

          <ul className="task-list max-h-96 overflow-auto">
            {data.map((item: { id: number; status: boolean; priority: number }) => (
              <li
                key={item.id}
                className={`bg-[#f0f2fc] mb-3 p-5 mt-3 rounded-lg relative  ${
                  selectedItem?.id === item.id ? "selected border-2 border-electric-blue border-solid" : ""
                }`}
                onClick={() => handleItemClick(item.id)}
              > <div style={{background: PRIORITY_COLOR[item.priority]}} className={`rounded-3xl absolute top-0 left-0 bg-[${PRIORITY_COLOR[item.priority]}] w-3 h-3`}></div>
                <h4>Tâche n°{item.id}</h4>
                {STATUS[item.status?1:0]}
              </li>
            ))}
          </ul>
        </div>
  )
}

export default ListTasks
