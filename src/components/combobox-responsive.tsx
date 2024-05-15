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

function withDesktopCheck(Component: React.FC<any>): React.FC<any> {
  const ComponentWithDeskTopCheck = (props: any) => {
    const isDesktop = useIsDesktop(minWidth);
    return <Component {...props} isDesktop={isDesktop} />;
  };
  return ComponentWithDeskTopCheck;
}

const ComboboxResponsive = withDesktopCheck(
  ({ isDesktop, children, ...props }) => {
    return isDesktop ? (
      <Popover {...props}>{children}</Popover>
    ) : (
      <Drawer {...props}>{children}</Drawer>
    );
  },
);
ComboboxResponsive.displayName = "ComboboxResponsive";

const ComboboxResponsiveTrigger = withDesktopCheck(
  ({ isDesktop, children, className, ...props }, ref) => {
    return isDesktop ? (
      <PopoverTrigger className={className} ref={ref} {...props}>
        {children}
      </PopoverTrigger>
    ) : (
      <DrawerTrigger className={className} ref={ref} {...props}>
        {children}
      </DrawerTrigger>
    );
  },
);
ComboboxResponsiveTrigger.displayName = "ComboboxResponsiveTrigger";

const ComboboxResponsiveContent = withDesktopCheck(
  ({ isDesktop, children, className, ...props }, ref) => {
    return isDesktop ? (
      <PopoverContent className={className} ref={ref} {...props}>
        {children}
      </PopoverContent>
    ) : (
      <DrawerContent className={className} ref={ref} {...props}>
        {children}
      </DrawerContent>
    );
  },
);
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
