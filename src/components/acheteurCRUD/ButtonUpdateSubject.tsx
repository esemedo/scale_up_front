import * as React from "react";

import { useMediaQuery } from "@mantine/hooks";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";
import { PencilIcon } from "lucide-react";
import FormUpdateSubject from "./FormUpdateSubject";
import { Subjects } from "./ListingSubject";
export function ButtonUpdateSubject(props: Subjects) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <Button className="ml-6  rounded-full bg-blue-700">
            <PencilIcon />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Modifier la matière {props.name}</DialogTitle>
          </DialogHeader>
          <FormUpdateSubject
            id={props.id}
            level={props.level}
            name={props.name}
            categoryId={props.categoryId}
          />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger>
        <Button className="ml-6  rounded-full bg-blue-700">
          <PencilIcon />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Modifier la matière {props.name}</DrawerTitle>
        </DrawerHeader>
        <FormUpdateSubject
          id={props.id}
          level={props.level}
          name={props.name}
          categoryId={props.categoryId}
        />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button className="rounded-full  bg-blue-700">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
