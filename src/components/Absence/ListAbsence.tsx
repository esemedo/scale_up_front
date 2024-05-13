import React from 'react'

function ListAbsence({data, selectedItem, handleItemClick} : ListAbsenceParams) {
  return (
    <div className="left-side mx-auto mt-2 w-2/6 rounded-3xl bg-white p-8 shadow-lg h-3/4">
      <h3 className="text-lg ">Mes absences</h3>
      <ul className="task-list max-h-full overflow-auto">
            {data.map((item: { id: number; startDate: string, endDate: string }) => (
              <li
                key={item.id}
                className={`bg-[#f0f2fc] mb-3 p-5 mt-3 rounded-lg  ${
                  selectedItem === item ? "selected border-2 border-electric-blue border-solid" : ""
                }`}
                onClick={() => handleItemClick(item.id)}
              >
                <h4>Absence n°{item.id}</h4>
                <span className='text-sm'>{new Date(item.startDate).toLocaleString("fr")} - {new Date(item.endDate).toLocaleString("fr")}</span>
              </li>
            ))}
          </ul>
    </div>
  )
}

export default ListAbsence
