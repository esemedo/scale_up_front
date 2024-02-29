import * as React from "react";

import { Label } from "@/components/ui/label";
import { SelectTrigger } from "@/components/ui/select";

import { cn } from "@/lib/utils";

import "./style.css";

interface FloatingLabelSelectTriggerProps {
  label?: string;
}

const FloatingLabelSelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectTrigger>,
  React.ComponentPropsWithoutRef<typeof SelectTrigger> &
    FloatingLabelSelectTriggerProps
>(({ id, label, className, children, ...props }, ref) => {
  return (
    <div className="relative mt-4">
      <SelectTrigger
        id={id}
        className={cn(
          "ring-offset-0 ring-offset-gray-300 transition duration-200 placeholder:opacity-0 focus:border-gray-300 focus:placeholder:opacity-80 focus-visible:ring-0 focus-visible:ring-gray-300",
          className,
        )}
        ref={ref}
        {...props}
      >
        {children}
      </SelectTrigger>
      <Label
        className="absolute -top-11 left-2 rounded-md bg-white px-1 text-sm text-gray-300"
        htmlFor={id}
      >
        {label}
      </Label>
    </div>
  );
});
FloatingLabelSelectTrigger.displayName = "FloatingLabelSelectTrigger";

export { FloatingLabelSelectTrigger };
