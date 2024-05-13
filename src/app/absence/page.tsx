"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ListAbsence from "@/components/Absence/ListAbsence";
import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";
import CalendarAbsence from "@/components/Absence/CalendarAbsence";

const Page = () => {
  const [data, setData] = useState<Absence[]>([]); 
  const [selectedItem, setItemSelected] = useState<Absence | null>(null); 

  useEffect(() => {
    let url = "http://localhost:3000/api/absence"
    axios
      .get<Absence[]>(url) 
      .then((result) => {
        setData(result.data);
        setItemSelected(result.data[0])
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const handleItemClick = (itemId: number) => {
    const selectedItem = data.find((item) => item.id === itemId);
    setItemSelected(selectedItem ?? null);
  };


  return (
    <div className="group-componen mx-36 mt-8 flex justify-center gap-3 rounded-lg p-8 pt-16 font-main h-screen">
        <ListAbsence  data={data} handleItemClick={handleItemClick} selectedItem={selectedItem}/>   
        {selectedItem !== null &&
            <CalendarAbsence id={selectedItem.id} endDate={selectedItem.endDate} startDate={selectedItem.startDate} reason={selectedItem.reason}/>}
    </div>
    
  );
};

export default Page;
