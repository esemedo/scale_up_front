import React, { useState, useEffect } from "react";
import { Badge } from "../ui/badge";
import { isSameMonth } from "date-fns";
import { STATUS_COLOR_BG, STATUS_COLOR_TEXT } from "@/lib/constants";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

function Calendar({data }: Calendar) {
  const [deis, setDeis] = useState({});

  useEffect(() => {
    const regroupement : {'0': Array<{id: number; status: number;}>,
      '1': Array<{id: number; status: number;}>,
       '2': Array<{id: number; status: number;}>,'3': Array<{id: number; status: number;}>, '4': Array<{id: number; status: number;}>,'5': Array<{id: number; status: number;}>, '6': Array<{id: number; status: number;}>} = {'0':[], '1':[], '2':[], '3':[], '4':[], '5':[], '6':[]}
    const itemByWeek = data.filter((item)=>isSameMonth(new Date(), new Date(item.dueDate)) )
    itemByWeek.map(item => 
     {
      const day = new Date(item.dueDate).getDay()
      if(regroupement.hasOwnProperty(day)){
      regroupement[`${day}`].push({id: item.id, status: item.status})
     }
     }
    
    )
    setDeis(regroupement)
 
  }, [data]);

  const today = new Date();
  const dayNames = ["Dim","lun", "Mar", "Mer", "Jeu", "Ven", "Sam" ];

  return (
    <div className="bottom mx-auto mt-4 flex flex-col rounded-3xl bg-white p-8 shadow-lg">
     
      <ul className="flex flex-row gap-2 overflow-x-auto">
        {Object.keys(deis).map((deiKey , index) =>(
           <li
           key={index}
           className={`day-body w-36 min-w-36 rounded-2xl bg-[#f0f2fc] ${index === today.getDay() ? 'current-day' : ''}`} // Highlight current day
         >
           <div className="day-header rounded-t-xl bg-light-gray py-1 text-center">
             <h6>{dayNames[deiKey]}</h6>
           </div>
           <ScrollArea className={`day-content h-28 text-center flex flex-col items-center`}>
             {deis[deiKey].map((item:{id:number, status: number}) => (
               <Badge style={{backgroundColor: STATUS_COLOR_BG[item.status]}} className={`${item.status ===0?"":`bg-${STATUS_COLOR_BG[item.status]} text-${STATUS_COLOR_TEXT[item.status]}`} `}key={item.id}>Tâche n°{item.id}</Badge>
             ))}
             
           </ScrollArea>
         </li>
        ) )}
       
      </ul>
    </div>
  );
}

export default Calendar;