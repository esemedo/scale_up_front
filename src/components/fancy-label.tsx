import * as React from "react";

import { Label } from "@/components/ui/label";

import { cn } from "@/lib/utils";

export interface FancyLabelProps {
  id: string;
  label: string;
  labelClassName?: string;
  required?: boolean;
}

const FancyLabel = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div"> & FancyLabelProps
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
        <Label
          className={cn(
            "absolute -top-11 left-2 rounded-md bg-white px-1 text-sm text-gray-300",
            labelClassName,
          )}
          htmlFor={id}
        >
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
        {children}
      </div>
    );
  },
);
FancyLabel.displayName = "FancyLabel";

export { FancyLabel };
