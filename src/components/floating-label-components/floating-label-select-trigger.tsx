import * as React from "react";

import { SelectTrigger } from "@/components/ui/select";

import { cn } from "@/lib/utils";

import { FloatingLabel, FloatingLabelProps } from "./floating-label";

import "./style.css";

const FloatingLabelSelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectTrigger>,
  React.ComponentPropsWithoutRef<typeof SelectTrigger> & FloatingLabelProps
>(({ id, label, className, children, ...props }, ref) => {
  return (
    <FloatingLabel label={label}>
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
    </FloatingLabel>
  );
});
FloatingLabelSelectTrigger.displayName = "FloatingLabelSelectTrigger";

export { FloatingLabelSelectTrigger };
