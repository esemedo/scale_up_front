import * as React from "react";

import { Label } from "@/components/ui/label";

import { cn } from "@/lib/utils";

export interface FancyLabelProps {
  id: string;
  label: string;
  required?: boolean;
}

const FancyLabel = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div"> & FancyLabelProps
>(({ id, label, required, children, className, ...props }, ref) => {
  return (
    <div className="relative mt-4" {...props} ref={ref}>
      <Label
        className={cn(
          "absolute -top-[.65rem] left-2 scale-[.9] transform rounded-md bg-white px-1 text-sm text-gray-300",
          className,
        )}
        htmlFor={id}
      >
        {label}{" "}
        {required && <span className="relative top-0.5 text-red-500">*</span>}
      </Label>
      {children}
    </div>
  );
});
FancyLabel.displayName = "FancyLabel";

export { FancyLabel };
