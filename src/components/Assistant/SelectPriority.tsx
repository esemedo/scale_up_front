import { PRIORITY } from '@/lib/constants'
import React from 'react'

function SelectPriority({handleChangePriority, priority}: {handleChangePriority: Function, priority: string}) {
    return (
        <div className={`w-3/6`}>
        <select 
            value={priority}
            className={`w-full rounded-md border border-black px-2 text-center h-full`}
            onChange={(e)=>{
                handleChangePriority(e.target.value)
            }}
        >
            <option value=''>Priorité</option> 
            {PRIORITY.map(option => (
                <option key={option} value={PRIORITY.indexOf(option)}>{option}</option>
            ))}
           
        </select>
        </div>
      )
}



export default SelectPriority
