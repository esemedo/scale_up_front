"use client";

import * as React from "react";

import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type Item = {
  value: string;
  label: string;
};

export interface ComboBoxResponsiveProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  items: Item[];
  placeholder: string;
  emptyMessage: string;
}

export function ComboBoxResponsive(
  {
    items,
    placeholder,
    emptyMessage,
    className,
    ...props
  }: ComboBoxResponsiveProps,
  ref: React.Ref<HTMLButtonElement>,
) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [selectedItem, setSelectedItem] = React.useState<Item | null>(null);

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn("w-[150px] justify-start", className)}
            ref={ref}
            {...props}
          >
            {selectedItem ? <>{selectedItem.label}</> : <>+ Set status</>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <ItemList
            items={items}
            placeholder={placeholder}
            emptyMessage={emptyMessage}
            setOpen={setOpen}
            setSelectedItem={setSelectedItem}
          />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          className={cn("w-[150px] justify-start", className)}
          ref={ref}
          {...props}
        >
          {selectedItem ? <>{selectedItem.label}</> : <>+ Set status</>}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <ItemList
            items={items}
            placeholder={placeholder}
            emptyMessage={emptyMessage}
            setOpen={setOpen}
            setSelectedItem={setSelectedItem}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

interface ItemListProps {
  items: Item[];
  placeholder: string;
  emptyMessage: string;
  setOpen: (open: boolean) => void;
  setSelectedItem: (item: Item | null) => void;
}

function ItemList({
  items,
  placeholder,
  emptyMessage,
  setOpen,
  setSelectedItem,
}: ItemListProps) {
  return (
    <Command>
      <CommandInput placeholder={placeholder} />
      <CommandList>
        <CommandEmpty>{emptyMessage}</CommandEmpty>
        <CommandGroup>
          {items.map((item) => (
            <CommandItem
              key={item.value}
              value={item.value}
              onSelect={(value) => {
                setSelectedItem(
                  items.find((priority) => priority.value === value) || null,
                );
                setOpen(false);
              }}
            >
              {item.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
