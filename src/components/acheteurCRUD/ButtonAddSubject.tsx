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
import { FilePlusIcon } from "lucide-react";
import FormCreateSubject from "./FormCreateSubject";

export function ButtonAddSubject() {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <Button className="rounded-full bg-blue-700">
            <FilePlusIcon />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Ajoutez une matière/module</DialogTitle>
          </DialogHeader>
          <FormCreateSubject />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger>
        <Button className="rounded-full  bg-blue-700">
          <FilePlusIcon />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Ajoutez une matière/module</DrawerTitle>
        </DrawerHeader>
        <FormCreateSubject />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button className="rounded-full  bg-blue-700">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
