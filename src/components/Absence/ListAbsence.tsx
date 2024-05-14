import React from 'react'

function ListAbsence({data, selectedItem, handleItemClick, handleMode} : ListAbsenceParams) {
  return (
    <div className="left-side mx-auto mt-2 w-2/5 rounded-3xl bg-white p-8 shadow-lg h-3/4">
      <div className='flex justify-between items-center w-full px-2'>
        <h3 className="text-lg ">Mes absences</h3>
        <button onClick={()=>handleMode(true)} type='button' className='text-lg hover:bg-light-gray rounded-lg w-1/5'>+</button>
      </div>
      <ul className="task-list max-h-full overflow-auto">
            {data.map((item: Absence, index) => (
              <li
                key={item?.id ?? index}
                className={`bg-[#f0f2fc] mb-3 p-5 mt-3 rounded-lg  ${
                  selectedItem === item ? "selected border-2 border-electric-blue border-solid" : ""
                }`}
                onClick={() => handleItemClick(item)}
              >
                <h4>Absence n°{item.id?? index}</h4>
                <span className='text-sm'>{new Date(item.startDate).toLocaleString("fr")} - {new Date(item.endDate).toLocaleString("fr")}</span>
              </li>
            ))}
          </ul>
    </div>
  )
}

export default ListAbsence
