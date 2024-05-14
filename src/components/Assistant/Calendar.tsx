import React from 'react'

function Calendar() {
  return (
    <div className="bottom mx-auto mt-4 flex flex-col rounded-3xl bg-white p-8 shadow-lg">
        <h3 className="text-lg">Calendrier</h3>
        <ul className="flex flex-row gap-x-2 overflow-x-auto">
          <li className="day-body w-44 rounded-2xl bg-[#f0f2fc]">
            <div className="day-header bg-light-gray rounded-t-xl text-center">
              <h6>Ajourd&apos;hui</h6>
            </div>
            <div className="day-content h-28"></div>
          </li>
          <li className="day-body w-44 rounded-2xl bg-[#f0f2fc]">
            <div className="day-header bg-light-gray rounded-t-xl text-center">
              <h6>Ajourd&apos;hui</h6>
            </div>
            <div className="day-content h-28"></div>
          </li>
          <li className="day-body w-44 rounded-2xl bg-[#f0f2fc]">
            <div className="day-header bg-light-gray rounded-t-xl text-center">
              <h6>Ajourd&apos;hui</h6>
            </div>
            <div className="day-content h-28"></div>
          </li>
          <li className="day-body w-44 rounded-2xl bg-[#f0f2fc]">
            <div className="day-header bg-light-gray rounded-t-xl text-center">
              <h6>Ajourd&apos;hui</h6>
            </div>
            <div className="day-content h-28"></div>
          </li>
          <li className="day-body w-44 rounded-2xl bg-[#f0f2fc]">
            <div className="day-header bg-light-gray rounded-t-xl text-center">
              <h6>Ajourd&apos;hui</h6>
            </div>
            <div className="day-content h-28"></div>
          </li>
          <li className="day-body w-44 rounded-2xl bg-[#f0f2fc]">
            <div className="day-header bg-light-gray rounded-t-xl text-center">
              <h6>Ajourd&apos;hui</h6>
            </div>
            <div className="day-content h-28"></div>
          </li>
        </ul>  
    </div>
  )
}

export default Calendar
