"use client";

import * as React from "react";

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

import { useIsDesktop } from "@/hooks/use-is-desktop";

const minWidth = "768px";

type Item = {
  value: string;
  label: string;
};

const ComboboxResponsive = React.forwardRef<
  React.ElementRef<typeof Drawer & typeof Popover>,
  React.ComponentPropsWithoutRef<typeof Drawer> &
    React.ComponentPropsWithoutRef<typeof Popover>
>(({ children, ...props }) => {
  const isDesktop = useIsDesktop(minWidth);

  return isDesktop ? (
    <Popover {...props}>{children}</Popover>
  ) : (
    <Drawer {...props}>{children}</Drawer>
  );
});
ComboboxResponsive.displayName = "ComboboxResponsive";

const ComboboxResponsiveTrigger = React.forwardRef<
  React.ElementRef<typeof DrawerTrigger & typeof PopoverTrigger>,
  React.ComponentPropsWithoutRef<typeof DrawerTrigger> &
    React.ComponentPropsWithoutRef<typeof PopoverTrigger>
>(({ children, className, ...props }, ref) => {
  const isDesktop = useIsDesktop(minWidth);

  return isDesktop ? (
    <PopoverTrigger className={className} ref={ref} {...props} asChild>
      {children}
    </PopoverTrigger>
  ) : (
    <DrawerTrigger className={className} ref={ref} {...props} asChild>
      {children}
    </DrawerTrigger>
  );
});
ComboboxResponsiveTrigger.displayName = "ComboboxResponsiveTrigger";

const ComboboxResponsiveContent = React.forwardRef<
  React.ElementRef<typeof DrawerContent & typeof PopoverContent>,
  React.ComponentPropsWithoutRef<typeof DrawerContent> &
    React.ComponentPropsWithoutRef<typeof PopoverContent>
>(({ children, className, ...props }, ref) => {
  const isDesktop = useIsDesktop(minWidth);

  return isDesktop ? (
    <PopoverContent className={className} ref={ref} {...props}>
      {children}
    </PopoverContent>
  ) : (
    <DrawerContent className={className} ref={ref} {...props}>
      {children}
    </DrawerContent>
  );
});
ComboboxResponsiveContent.displayName = "ComboboxResponsiveContent";

export {
  ComboboxResponsive,
  ComboboxResponsiveContent,
  ComboboxResponsiveTrigger,
};

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
