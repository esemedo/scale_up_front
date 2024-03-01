import * as React from "react";

import { Label } from "@/components/ui/label";

import { cn } from "@/lib/utils";

export interface FloatingLabelProps {
  id: string;
  label: string;
  labelClassName?: string;
  required?: boolean;
}

export const FloatingLabel = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div"> & FloatingLabelProps
>(
  (
    {
      id,
      label,
      labelClassName,
      required = false,
      children,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <div className={cn("relative mt-4", className)} {...props} ref={ref}>
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
  },
);
