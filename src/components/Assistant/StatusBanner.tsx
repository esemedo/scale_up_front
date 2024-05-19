"use client";

import axios from "axios";
import React , { FC } from "react";
import { STATUS } from "../../lib/constants";
import { useToast } from "../ui/use-toast";


const  StatusBanner : FC<StatusBannerProps> = ({dei, setStatusUpdated, session}) => {
  const {toast} = useToast()
  const updateStatus = async (newStatus : number)=>{
    if(dei?.id){
      try {
        const result = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/dei/${dei.id}/status`, {status: newStatus}, {headers:{Authorization: `Bearer ${session?.accessToken}`}})
          setStatusUpdated((prev: boolean) => !prev)
          toast({
            variant: "successful",
            title: result.data.message ?? "La tâche a été mis à jour !",
          })
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Oh là là ! Quelque chose s'est mal passé.",
          description:axios.isAxiosError(error)?  error.response?.data?.error ??
          "Une erreur s'est produite lors de la mis à jour de la tâche.": "Une erreur inattendue s'est produite.",
        })
      }
      }
  }
  
  return (
    <div className="bg-primary rounded-r-3xl w-full py-5 px-3 h-full flex flex-col justify-between gap-12">
        <p className="text-white">Statut : {STATUS[ dei?.status]} </p>
        <div className="flex flex-col justify-self-end">
        <button className="bg-[#EB9240] text-white rounded-3xl p-2 text-xs" onClick={()=>{updateStatus(1)}}>Mettre en attente</button>   

        <button className="bg-electric-blue text-white rounded-3xl p-2 text-xs" onClick={()=>{updateStatus(2)}}>Marquer comme complétée</button>   
    </div></div>
  );
}

export default StatusBanner;
