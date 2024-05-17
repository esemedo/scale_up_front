"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import StatusBanner from "@/components/Assistant/StatusBanner";
import InputInfoDei from "@/components/Assistant/Input";
import SelectComponentLabel from "@/components/Assistant/SelectComponentLabel";
import Calendar from "@/components/Assistant/Calendar";
import TaskView from "@/components/TaskView/TaskView";
import { PRIORITY, SACHA_STATUS, statusConfig } from "@/lib/constants";
import { useSession } from "next-auth/react";
import Card from "@/components/Assistant/Card";
import CardsGrey from "@/components/CardsGrey/CardsUser"
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { ScrollBar } from "@/components/ui/scroll-area";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import CardDei from "@/components/Assistant/Card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const Page = () => {
  const [selectedItem, setItemSelected] = useState<Dei | null>(null);
  const [disabled, setDisabled] = useState<DeiDisabled>({
    purchaseOrder: true,
    sashaStatus: true,
    totalPrice: true,
    dueDate: true,
    hourlyPrice: true,
    priority: true,
  });
  const [statusUpdated, setStatusUpdated] = useState<boolean>(false);
  const [priority, setPriority] = useState<number | string>('');
  const { data: session } = useSession();

  const handleItemClick = (selectedItem: Dei | null) => {
    setItemSelected(selectedItem ?? null);
  };

  const handleRefreshData = () => {
    setStatusUpdated((prev) => !prev);
  };

  const handleChangePriority = (priority: number | string) => {
    setPriority(priority);
  };

  useEffect(() => {
    if (selectedItem) {
      const config = statusConfig[selectedItem?.sashaStatus] ? statusConfig[selectedItem?.sashaStatus] : statusConfig.default;
      setDisabled(config);
    }
  }, [selectedItem]);

  return (

    <div className="group-componen mx-36 mt-8 flex justify-center gap-3 rounded-lg p-8 pt-16 font-main">
      <ScrollArea className="left-side mx-auto mt-2 w-2/6 rounded-3xl bg-white p-8 shadow-lg">
      <h1 className="text-lg ">Les dérogations récentes en cours</h1>

      <CardsGrey />
      </ScrollArea>
      <ScrollArea className="left-side mx-auto mt-2 w-2/6 rounded-3xl bg-white p-8 shadow-lg">
        <h3 className="text-lg ">Mes tâches</h3>
        <Tabs defaultValue="0" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-transparent">
            <TabsTrigger className="data-[state=active]:border-solid data-[state=active]:border-b-2 data-[state=active]:border-electric-blue" value="0">
              A faire
            </TabsTrigger>
           
          </TabsList>
         


          <TabsContent value="0">
            <TaskView updateState={statusUpdated} key={0} status={0} session={session} selectedItem={selectedItem} handleItemClick={handleItemClick} />
          </TabsContent>
          <TabsContent value="1">
            <TaskView updateState={statusUpdated} key={1} status={1} session={session} selectedItem={selectedItem} handleItemClick={handleItemClick} />
          </TabsContent>
          <TabsContent value="2">
            <TaskView updateState={statusUpdated} key={2} status={2} session={session} selectedItem={selectedItem} handleItemClick={handleItemClick} />
          </TabsContent>
          <TabsContent value="3">
            <TaskView updateState={statusUpdated} key={3} status={3} session={session} selectedItem={selectedItem} handleItemClick={handleItemClick} />
          </TabsContent>
        </Tabs>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
        <ScrollArea className="left-side mx-auto mt-2 w-2/6 rounded-3xl bg-white p-8 shadow-lg">
          {selectedItem !== null && selectedItem !== undefined && (
            <>
              <CardDei update={handleRefreshData} dei={selectedItem} key={selectedItem.id} disabled={disabled} session={session} />
            </>
          )}
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    
  );
};

export default Page;
