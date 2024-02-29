import * as React from "react";

import { Label } from "@/components/ui/label";

import { cn } from "@/lib/utils";

export interface FloatingLabelProps {
  label: string;
  labelClassName?: string;
}

export const FloatingLabel = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div"> & FloatingLabelProps
>(({ id, label, labelClassName, children, className, ...props }, ref) => {
  return (
    <div className={cn("relative mt-4", className)}>
      {children}
      <Label
        className={cn(
          "absolute -top-11 left-2 rounded-md bg-white px-1 text-sm text-gray-300",
          labelClassName,
        )}
        htmlFor={id}
      >
        {label}
      </Label>
    </div>
  );
});
