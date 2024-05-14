import React, { ChangeEventHandler } from 'react'
type InputComponent = {
    label : string,
    value:string |number, 
    position: string,
    type?: string, 
    onChange?: ChangeEventHandler
    readOnly: boolean 
}
function InputInfoDei({label,value, position, type = "text", onChange = ()=>{}, readOnly }: InputComponent) {
  return (
    <div className={position}>
        <label
            htmlFor={label}
            className="absolute -top-2 left-3 bg-white px-1 text-sm transition-all duration-200 ease-in-out peer-placeholder-shown:top-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:opacity-100 peer-focus:top-1 peer-focus:scale-75 peer-focus:opacity-100"
            >
       {label} 
        </label>
        <input
            readOnly={readOnly}
            disabled={readOnly}
            type={type}
            placeholder={label}
            onChange={onChange}
            value={value}
            id={label}
            className="w-full rounded-md border border-black py-3 text-center"
        />
    </div>
  )
}

export default InputInfoDei
