"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ListAbsence from "@/components/Absence/ListAbsence";
import CalendarAbsence from "@/components/Absence/CalendarAbsence";
import {  useSession, } from "next-auth/react";
import CalendarAbsenceCreate from "@/components/Absence/CalendarAbsenceCreate";
import { Absence } from "@/types/absence";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { LoadingSpinner } from "@/components/LoadingSpinner/LoadingSpinner";
import { useToast } from "@/components/ui/use-toast";
import useVerifyAccess from "@/lib/verifyAccess";

const Page = () => {
  const [data, setData] = useState<Absence[]>([]);
  const {toast} = useToast() 
  const [selectedItem, setItemSelected] = useState<Absence | null>(null); 
  const [updated, setUpdated] = useState<boolean>(false); 
  const [isCreateMode, setIsCreateMode] = useState<boolean>(false);
  const { data: session, status  } = useSession();
  const [calendarKey, setCalendarKey] = useState<number>(0);
  const [assistants, setAssistants] = useState<Array<{id: number, name: string}>>([])
  useVerifyAccess("educational-assistant", session, status)
 
  useEffect(() => {
    if(session){
    let url = `${process.env.NEXT_PUBLIC_API_URL}/absence`
    axios
      .get<Absence[]>(url, {headers:{Authorization: `Bearer ${session?.accessToken}`}}) 
      .then((result) => {
        setData(result.data);
        if(selectedItem)
          setItemSelected(result.data.find(item => item.id === selectedItem.id)?? null)
      })
      .catch((error) => {
        toast({
          variant: "destructive",
          title: "Oh là là ! Quelque chose s'est mal passé.",
          description:axios.isAxiosError(error)?  error.response?.data?.error ??
          "Une erreur s'est produite lors de la création d'une absence.": "Une erreur inattendue s'est produite.",
        })
      });
    }
   
  }, [session,updated]);
  useEffect(() => {
    if(session){

    let url = `${process.env.NEXT_PUBLIC_API_URL}/users/assistants`
    axios
        .get<[]>(url, {headers:{Authorization: `Bearer ${session?.accessToken}`}}) 
        .then((result) => {
          setAssistants(result.data);
        })
        .catch((error) => {
          toast({
            variant: "destructive",
            title: "Oh là là ! Quelque chose s'est mal passé.",
            description:axios.isAxiosError(error)?  error.response?.data?.error ??
            "Une erreur s'est produite lors de la création d'une absence.": "Une erreur inattendue s'est produite.",
          })
        });
      }
  }, [session]);
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
  if (status === "loading" || status === "unauthenticated")
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  return (
    <div className="group-componen mx-36 mt-8 flex justify-center gap-3 rounded-lg p-8 pt-16 font-main h-screen">
        <ListAbsence handleMode={createNewAbsence} data={data} handleItemClick={selectExistingAbsence} selectedItem={selectedItem}/>   
          {isCreateMode === true  && 
          <div className="right-side mx-auto w-4/5 rounded-3xl bg-white top mx-auto mt-2 h-full shadow-lg overflow-y-auto" > 
            <CalendarAbsenceCreate session={session} assistants={assistants} update={toggleUpdatedState} absence={{ startDate: '', endDate: '', reason: '', substituteUserId:null }} />
          </div>
          } 
          {selectedItem !== null && 
          <ScrollArea className="right-side mx-auto w-4/5 rounded-3xl bg-white top mx-auto mt-2 h-full shadow-lg" > 
            <CalendarAbsence session={session} assistants={assistants} key={calendarKey} update={toggleUpdatedState} absence={selectedItem} /> 
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
          }
       
    </div>
  );
};

export default Page;
