import * as React from "react"

import { useMediaQuery } from '@mantine/hooks';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import FormUpdateCategory from "./FormUpdateCategory";
import { Button } from "../ui/button";
import { PencilIcon } from "lucide-react";
import { Category } from "./ListingCategory";

export function ButtonUpdateCategory(props:Category) {

  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (isDesktop) {
    
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <Button className="bg-blue-700 rounded-full ml-6"><PencilIcon/></Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Modifié la catégorie {props.name}</DialogTitle>
            
          </DialogHeader>
          <FormUpdateCategory id={props.id} name={props.name}/>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger>
        <Button className="bg-blue-700  rounded-full ml-6" ><PencilIcon/></Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Modifié la catégorie {props.name}</DrawerTitle>
        </DrawerHeader>
        <FormUpdateCategory  id={props.id} name={props.name}/>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button className="bg-blue-700  rounded-full">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}


