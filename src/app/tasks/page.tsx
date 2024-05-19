"use client";
import React, { useEffect, useState } from "react";
import StatusBanner from "@/components/Assistant/StatusBanner";
import Calendar from "@/components/Assistant/Calendar";
import ListTasks from "@/components/Assistant/ListTasks";
import {  statusConfig } from "@/lib/constants";
import {  useSession } from "next-auth/react";
import { ScrollBar, ScrollArea } from "@/components/ui/scroll-area";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import CardDei from "@/components/Assistant/Card";
import Link from "next/link";
import { LoadingSpinner } from "@/components/LoadingSpinner/LoadingSpinner";
import useVerifyAccess from "@/lib/verifyAccess";
import SelectPriority from "@/components/Assistant/SelectPriority";


const Page = () => {
  const [selectedItem, setItemSelected] = useState<Dei | null>(null); 
  const [disabled, setDisabled] = useState<DeiDisabled>({
    purchaseOrder: true,
    sashaStatus: true,
    totalPrice: true,
    dueDate: true,
    hourlyPrice: true,
    priority: true
  }); 
  const [statusUpdated, setStatusUpdated] = useState<boolean>(false); 
  const { data: session, status  } = useSession();

  const handleItemClick = (selectedItem: Dei|null) => {
    setItemSelected(selectedItem ?? null);
  };
  const handleRefreshData = ()=> {
    setStatusUpdated(prev =>!prev)
  }
  
  const [data, setData] = React.useState<Dei[]>([]); 

  useVerifyAccess("educational-assistant", session, status)

useEffect(() => {
  if(selectedItem){
  const config =statusConfig[selectedItem?.sashaStatus]  ?  statusConfig[selectedItem?.sashaStatus] : statusConfig.default;
  setDisabled(config);
}
}, [selectedItem]);

  if (status === "loading" || status === "unauthenticated")
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  return (
    <div className="group-componen w-full h-full items-center flex justify-center gap-3 rounded-lg  font-main">
      <ScrollArea className="left-side h-5/6 mx-s mt-2 min-w-64 rounded-3xl bg-white flex flex-col items-center ml-2 shadow-lg">
       <div className="w-full py-4 flex justify-around items-center">
         <h3 className="text-lg text-left ">Mes tâches</h3>
         <Link href={`/absence`} className="border-solid border-2 p-1 border-slate-700 rounded-lg hover:bg-neutral-700 hover:text-white">Absence</Link>
         </div>
        <Tabs defaultValue="0" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-transparent">
            <TabsTrigger className='data-[state=active]:border-solid data-[state=active]:border-b-2 data-[state=active]:border-electric-blue' value="0">A faire</TabsTrigger>
            <TabsTrigger className='data-[state=active]:border-solid data-[state=active]:border-b-2 data-[state=active]:border-electric-blue' value="1">En attente de retour</TabsTrigger>
            <TabsTrigger className='data-[state=active]:border-solid data-[state=active]:border-b-2 data-[state=active]:border-electric-blue' value="2">Retourné</TabsTrigger>
            <TabsTrigger className='data-[state=active]:border-solid data-[state=active]:border-b-2 data-[state=active]:border-electric-blue' value="3">Terminée</TabsTrigger>
          </TabsList>
          <TabsContent value="0">
            <ListTasks data={data} setData={setData} updateState={statusUpdated} key={0} status={0} session={session} selectedItem={selectedItem} handleItemClick={handleItemClick} />
          </TabsContent>
          <TabsContent value="1">
            <ListTasks  data={data} setData={setData} updateState={statusUpdated} key={1}  status={1} session={session} selectedItem={selectedItem} handleItemClick={handleItemClick} />
          </TabsContent>
          <TabsContent value="2">
            <ListTasks data={data} setData={setData} updateState={statusUpdated} key={2}  status={2} session={session} selectedItem={selectedItem} handleItemClick={handleItemClick} />
          </TabsContent>
          <TabsContent value="3">
            <ListTasks data={data} setData={setData} updateState={statusUpdated} key={3}  status={3} session={session} selectedItem={selectedItem} handleItemClick={handleItemClick} />
          </TabsContent>
        </Tabs>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
        <div className="right-side  w-4/6">
        < div className="top mx-auto mt-2 flex flex-row gap-y-2 rounded-3xl bg-white shadow-lg h-128">
            {selectedItem !== null && selectedItem !== undefined && 
            <>
              <div className="w-2/3">
              <CardDei update={handleRefreshData} dei={selectedItem} key={selectedItem.id} disabled={disabled} session={session}/>
            </div>
            <div className="w-1/3">

             <StatusBanner session={session} dei={selectedItem} setStatusUpdated={setStatusUpdated} />
            </div>
           </> } 
          </div>
          <Calendar data={data} />
        </div>
      </div>
    
  );
};

export default Page;
