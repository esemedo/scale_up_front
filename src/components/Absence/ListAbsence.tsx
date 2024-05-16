import { Absence, ListAbsenceParams } from '@/types/absence'
import React from 'react'
import { ScrollArea, ScrollBar } from '../ui/scroll-area'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { isBefore } from 'date-fns'

function ListAbsence({data, selectedItem, handleItemClick, handleMode} : ListAbsenceParams) {
  const isCancellable = (date1: Date, date2: Date)=>{
    return isBefore(date1, date2)
  }
  return (
    <ScrollArea className="left-side mx-auto mt-2 w-2/5 rounded-3xl bg-white p-8 shadow-lg h-full">
      <div className='flex justify-between items-center w-full px-2'>
        <h3 className="text-lg ">Mes absences</h3>
        <button onClick={()=>handleMode(true)} type='button' className='text-lg hover:bg-light-gray rounded-lg w-1/5'>+</button>
      </div>
      <Tabs defaultValue="future" className="w-full">
      <TabsList className="grid w-full grid-cols-2 bg-transparent">
        <TabsTrigger className='data-[state=active]:border-solid data-[state=active]:border-b-2 data-[state=active]:border-electric-blue' value="future">A venir</TabsTrigger>
        <TabsTrigger className='data-[state=active]:border-solid data-[state=active]:border-b-2 data-[state=active]:border-electric-blue' value="past">Passées</TabsTrigger>
      </TabsList>
      <TabsContent value="future">
      <ul className="task-list max-h-full ">
            {data.map((item: Absence, index : number) => 
             { if (isCancellable(new Date(), new Date(item.startDate)))
              return <li
                key={item?.id ?? index}
                className={`bg-[#f0f2fc] mb-3 p-5 mt-3 rounded-lg  ${
                  selectedItem === item ? "selected border-2 border-electric-blue border-solid" : ""
                }`}
                onClick={() => handleItemClick(item)}
              >
                <h4>Absence n°{item.id?? index}</h4>
                <span className='text-sm'>{new Date(item.startDate).toLocaleString("fr")} - {new Date(item.endDate).toLocaleString("fr")}</span>
              </li>}
            )}
          </ul>
        </TabsContent>
        <TabsContent value="past">
      <ul className="task-list max-h-full ">
            {data.map((item: Absence, index : number) => 
             { if (!isCancellable(new Date(), new Date(item.startDate)))
              return <li
                key={item?.id ?? index}
                className={`bg-[#f0f2fc] mb-3 p-5 mt-3 rounded-lg  ${
                  selectedItem === item ? "selected border-2 border-electric-blue border-solid" : ""
                }`}
                onClick={() => handleItemClick(item)}
              >
                <h4>Absence n°{item.id?? index}</h4>
                <span className='text-sm'>{new Date(item.startDate).toLocaleString("fr")} - {new Date(item.endDate).toLocaleString("fr")}</span>
              </li>}
            )}
          </ul>
        </TabsContent>
      </Tabs>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}

export default ListAbsence
