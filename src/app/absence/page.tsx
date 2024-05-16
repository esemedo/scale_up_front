"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ListAbsence from "@/components/Absence/ListAbsence";
import CalendarAbsence from "@/components/Absence/CalendarAbsence";
import { useSession } from "next-auth/react";

const Page = () => {
  const [data, setData] = useState<Absence[]>([]); 
  const [selectedItem, setItemSelected] = useState<Absence | null>(null); 
  const [updated, setUpdated] = useState<boolean>(false); 
  const [isCreateMode, setIsCreateMode] = useState<boolean>(false);
  const { data: session  } = useSession();
  const [calendarKey, setCalendarKey] = useState<number>(0);

  useEffect(() => {
    if(session){

    const url = "http://localhost:3000/api/absence"
    axios
      .get<Absence[]>(url, {headers:{Authorization: `Bearer ${session?.accessToken}`}}) 
      .then((result) => {
        setData(result.data);
        if(selectedItem)
          setItemSelected(result.data.find(item => item.id === selectedItem.id)?? null)
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    }

  }, [session,updated]);
  const toggleUpdatedState = ()=>{
    setUpdated(prev =>!prev)
  }


  const selectExistingAbsence = (absence: Absence) => {
    setItemSelected(absence); 
    setCalendarKey((prevKey) => prevKey + 1);
    setIsCreateMode(false); 
  };
  const createNewAbsence = () => {
    setItemSelected(null); 
    setIsCreateMode(true); 
  };
  return (
    <div className="group-componen mx-36 mt-8 flex justify-center gap-3 rounded-lg p-8 pt-16 font-main h-screen">
        <ListAbsence handleMode={createNewAbsence} data={data} handleItemClick={selectExistingAbsence} selectedItem={selectedItem}/>   
          <div className="right-side mx-auto w-4/5 rounded-3xl bg-white top mx-auto mt-2 h-3/4 shadow-lg">
          {isCreateMode === true  && <CalendarAbsence update={toggleUpdatedState} absence={{ startDate: '', endDate: '', reason: '' }} isCreate={true}/>}
          {selectedItem !== null &&
            <CalendarAbsence key={calendarKey} update={toggleUpdatedState} absence={selectedItem}  isCreate={false} /> }
          </div>
       
    </div>
  );
};

export default Page;
