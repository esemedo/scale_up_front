"use client";

import axios from "axios";
import React , { FC, useState } from "react";
import { STATUS } from "../../lib/constants";
import { Session } from "next-auth";

type Dei = {
  setStatusUpdated : Function,
    dei: {id:number, status: number} ,
    session: Session | null
  }
const  StatusBanner : FC<Dei> = ({dei, setStatusUpdated, session}) => {
  const updateStatus = async (newStatus : number)=>{
    if(dei?.id){
    try {
       await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/dei/${dei.id}/status`, {status: newStatus}, {headers:{Authorization: `Bearer ${session?.accessToken}`}})
        setStatusUpdated((prev: any) => !prev)
    } catch (error: any) {
      console.error('Erreur lors de la soumission du status:', error.message);
    }}
  }
  
  return (
    <div className="bg-primary rounded-r-3xl w-full py-5 px-3 h-full flex flex-col justify-between gap-12">
        <p className="text-white">Statut : {STATUS[ dei?.status]} </p>
        <div className="flex flex-col justify-self-end">
        <button className="bg-orange-500 text-white rounded-3xl p-2 text-xs" onClick={()=>{updateStatus(1)}}>Mettre en attente</button>   

        <button className="bg-electric-blue text-white rounded-3xl p-2 text-xs" onClick={()=>{updateStatus(2)}}>Marquer comme complétée</button>   
    </div></div>
  );
}

export default StatusBanner;
