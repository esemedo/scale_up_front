import React from 'react'

function SelectComponentLabel({label,value,position,options, onChange, classSelect, withNoValue} : SelectType) {
    return (
    <div className={position}>
    <label
        htmlFor={label}
        className="absolute -top-2 left-3 bg-white px-1 text-sm transition-all duration-200 ease-in-out peer-placeholder-shown:top-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:opacity-100 peer-focus:top-1 peer-focus:scale-75 peer-focus:opacity-100"
    >
        {label}
    </label>
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

export default SelectComponentLabel
