import React from 'react'

function SelectComponent({label,value,position,options, onChange, classSelect, withNoValue} : SelectType) {
    return (
    <div className={position}>
    <select
        value={value}
        className={`w-full rounded-md border border-black px-2 text-center h-full ${classSelect}`}
        onChange={(e)=>{
            onChange(e.target.value)
        }}
    >
        {withNoValue&&<option value=''>{label}</option> }
        {options.map(option => (
            <option key={option} value={options.indexOf(option)}>{option}</option>
        ))}
       
    </select>
    </div>
  )
}

export default SelectComponent
