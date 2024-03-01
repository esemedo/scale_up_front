"use client";

import axios from "axios";
import React , { FC } from "react";

const STATUS = ['En Cours', "Complétée"]
type Dei = {
  setStatusUpdated : Function,
    dei: {id:number, status: number} |undefined |null,
  }
const  StatusBanner : FC<Dei> = ({dei, setStatusUpdated}) => {

  const updateStatus = async (newStatus : number)=>{
    if(dei?.id){
    try {
        const result = await axios.patch(`http://localhost:3000/dei/${dei.id}`, {status: newStatus})
        console.log(result.data);
        setStatusUpdated((prev: any) => !prev)
        
    } catch (error) {
        console.log(error);
    }}
  }
  return (
    <div className="bg-primary rounded-r-3xl w-full p-8 h-full flex flex-col justify-between gap-12">
        <p className="text-white">Statut : {dei?STATUS[ dei.status? 1:0]: ""} </p>
        <div className="flex flex-col justify-self-end">
        <button className="bg-orange-500 text-white rounded-3xl p-2 text-xs" onClick={()=>{updateStatus(0)}}>Mettre en attente</button>   

        <button className="bg-electric-blue text-white rounded-3xl p-2 text-xs" onClick={()=>{updateStatus(1)}}>Marquer comme complétée</button>   
    </div></div>
  );
}

export default StatusBanner;
