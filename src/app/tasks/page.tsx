"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import StatusBanner from "@/components/Assistant/StatusBanner";
import InputInfoDei from "@/components/Assistant/Input";
import SelectComponentLabel from "@/components/Assistant/SelectComponentLabel";
import Calendar from "@/components/Assistant/Calendar";
import ListTasks from "@/components/Assistant/ListTasks";
import { PRIORITY, SACHA_STATUS } from "@/components/Assistant/constants";



const Page = () => {
  const [data, setData] = useState<Dei[]>([]); 
  const [selectedItem, setItemSelected] = useState<Dei | null>(null); 
  const [statusUpdated, setStatusUpdated] = useState<boolean>(false); 
  const [priority, setPriority] = useState<number|string>(''); 

  useEffect(() => {
    let url = "http://localhost:3000/api/dei"
    if(priority !== ""){
        url += `?priority=${priority}`
    }
    axios
      .get<Dei[]>(url) 
      .then((result) => {
        setData(result.data);
        setItemSelected(result.data[0])
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [statusUpdated, priority]);

  const handleItemClick = (itemId: number) => {
    const selectedItem = data.find((item) => item.id === itemId);
    setItemSelected(selectedItem ?? null);
  };
  const handleChangePriority = (priority: number |string)=>{
    setPriority(priority)
  }

  return (

      <div className="group-componen mx-36 mt-8 flex justify-center gap-3 rounded-lg p-8 pt-16 font-main">
        <ListTasks data={data} selectedItem={selectedItem} handleItemClick={handleItemClick} handleChangePriority={handleChangePriority} priority={priority}/>
        <div className="right-side mx-auto w-4/5">
         {selectedItem !== null && selectedItem !== undefined && <div className="top mx-auto mt-2 flex flex-row gap-y-2 rounded-3xl bg-white shadow-lg h-96">
           <div className="top-left w-3/4 p-8 flex flex-col justify-around">
            <h1 className="text-3xl font-bold text-[#41494e]">
              Tâche n. {selectedItem ? selectedItem.id : ""}
            </h1>
            <div className="flex justify-between gap-2">
             
              <InputInfoDei label="Titre" position="relative w-1/3" value={""} readOnly={true} type="text"/>
              <InputInfoDei label="Date d'échéance" position="relative w-1/3" value={""} readOnly={true} type="date"/>
              <SelectComponentLabel label="Priorité" position="relative w-1/3" value={selectedItem?.priority !== undefined? selectedItem.priority:0}  options={PRIORITY} onChange={(value : string)=>{
              axios.patch(`http://localhost:3000/api/dei/${selectedItem?.id}/priority`, {priority: parseInt(value)}).then(result =>{
                setStatusUpdated(prev => !prev)
              }).catch(e => {
                console.log(e.error);
              })
            }}/>
            
            </div>
            <SelectComponentLabel label="Statut Sacha" position="relative" value={selectedItem?.sashaStatus !== undefined? selectedItem.sashaStatus:0}  options={SACHA_STATUS} onChange={(value : string)=>{
              axios.patch(`http://localhost:3000/api/dei/${selectedItem?.id}/sachaStatus`, {sachaStatus: parseInt(value)}).then(result =>{ 
                setStatusUpdated(prev => !prev)
              }).catch(e => {
                console.log(e.error);
              })
            }} classSelect="py-3"/>
            <div className="field-groupe flex flex-row gap-2">
              <InputInfoDei label="Tarif horaire en €" position="relative w-1/2" value={selectedItem?.hourlyPrice !== undefined? selectedItem?.hourlyPrice:""} readOnly={true}/>
              <InputInfoDei label="Prix total en €" position="relative w-1/2" value={selectedItem?.totalPrice !== undefined? selectedItem?.totalPrice:""} readOnly={true}/>
            </div>
            <div className="relative">
              <label
                htmlFor="linkedFile"
                className="absolute -top-2 left-3 bg-white px-1 text-sm transition-all duration-200 ease-in-out peer-placeholder-shown:top-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:opacity-100 peer-focus:top-1 peer-focus:scale-75 peer-focus:opacity-100"
              >
                Pièce Jointe(s)
              </label>
              <input
                type="text"
                name="linkedFile"
                className="w-full rounded-md border border-black py-3"
              />
            </div>
            </div>
            <div className="top-right w-1/4">
            <StatusBanner dei={selectedItem} setStatusUpdated={setStatusUpdated}/>
          </div>
          </div>}
          <Calendar/>
        </div>
      </div>
    
  );
};

export default Page;
