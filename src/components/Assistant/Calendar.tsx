import React, { useState, useEffect } from "react";
import axios from 'axios';
import { isSameMonth, isSameWeek } from "date-fns";
import { Badge } from "../ui/badge";

function Calendar({data }: Calendar) {
  const [currentWeek, setCurrentWeek] = useState(0);
  const [deis, setDeis] = useState({});

  // const url = "http://localhost:3000/api/dei"

  useEffect(() => {
    const regroupement : {'0': Array<Number>,
      '1': Array<Number>,
       '2': Array<Number>,'3': Array<Number>, '4': Array<Number>,'5': Array<Number>, '6': Array<Number>} = {'0':[], '1':[], '2':[], '3':[], '4':[], '5':[], '6':[]}
    const itemByWeek = data.filter((item)=>isSameMonth(new Date(), new Date(item.dueDate)) )
    itemByWeek.map(item => 
     {
      const day = new Date(item.dueDate).getDay()
      if(regroupement.hasOwnProperty(day)){
      regroupement[`${day}`].push(item.id)
     }
     }
    
    )
    setDeis(regroupement)
 
  }, [data]);

  const today = new Date();
  const dayNames = ["Dim","lun", "Mar", "Mer", "Jeu", "Ven", "Sam" ];

  // const getDateForOffset = (offset: number) => {
  //   const newDate = new Date(today);
  //   newDate.setDate(today.getDate() + (offset - 4) + currentWeek * 7);
  //   return newDate.getDate();
  // };

  // const handlePreviousWeek = () => {
  //   setCurrentWeek(currentWeek - 1);
  // };

  // const handleNextWeek = () => {
  //   setCurrentWeek(currentWeek + 1);
  // };

  // const getDeisForDate = (date: number) => {
  //   return deis.filter(dei => new Date(dei.dueDate).getDate() === date);
  // };

  return (
    <div className="bottom mx-auto mt-4 flex flex-col rounded-3xl bg-white p-8 shadow-lg">
      {/* <div className="flex justify-between items-center">
        <button onClick={handlePreviousWeek} className="btn btn-sm">
          Précédent
        </button>
        <h3 className="text-lg">Calendrier</h3>
        <button onClick={handleNextWeek} className="btn btn-sm">
          Suivant
        </button>
      </div> */}
      <ul className="flex flex-row gap-2 overflow-x-auto">
        {Object.keys(deis).map((deiKey , index) =>(
           <li
           key={index}
           className={`day-body w-44 rounded-2xl bg-[#f0f2fc] ${index === today.getDay() ? 'current-day' : ''}`} // Highlight current day
         >
           <div className="day-header rounded-t-xl bg-light-gray py-1 text-center">
             <h6>{dayNames[deiKey]}</h6>
           </div>
           <div className="day-content h-28 text-center">
             {deis[deiKey].map((item:number) => (
               <Badge key={item}>Tâche n°{item}</Badge>
             ))}
           </div>
         </li>
        ) )}
        {/* {dayNames.map((day, index) => {
          const date = getDateForOffset(index);
          const deisForDate = getDeisForDate(date);
          return (
            <li
              key={index}
              className={`day-body w-44 rounded-2xl bg-[#f0f2fc] ${index === today.getDay() ? 'current-day' : ''}`} // Highlight current day
            >
              <div className="day-header rounded-t-xl bg-light-gray py-1 text-center">
                <h6>{day} {date}</h6>
              </div>
              <div className="day-content h-28">
                {deisForDate.map(dei => (
                  <div key={dei.id}>Tâche n°{dei.id}</div>
                ))}
              </div>
            </li>
          );
        })} */}
      </ul>
    </div>
  );
}

export default Calendar;