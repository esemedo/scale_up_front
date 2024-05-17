import * as React from "react";

import { Input } from "@/components/ui/input";

import { cn } from "@/lib/utils";

import { FancyLabel, FancyLabelProps } from "@/components/fancy-label";

import "./style.css";

interface FancyInputProps extends FancyLabelProps {
  type?: "text" | "password" | "email" | "number" | "tel" | "url";
}

const FancyInput = React.forwardRef<
  React.ElementRef<typeof Input>,
  React.ComponentPropsWithoutRef<typeof Input> & FancyInputProps
>(({ id, label, required, type = "text", className, ...props }, ref) => {
  return (
    <FancyLabel
      id={id}
      label={label}
      className="fancy-input-label absolute left-3 top-[.6rem] rounded-md text-sm text-muted-foreground/80 transition duration-200"
      required={required}
    >
      <Input
        type={type}
        placeholder=""
        id={id}
        className={cn(
          "ring-offset-0 ring-offset-gray-300 transition duration-200 focus:border-gray-300 focus-visible:ring-0 focus-visible:ring-gray-300",
          className,
        )}
        ref={ref}
        {...props}
      />
    </FancyLabel>
  );
});
FancyInput.displayName = "FancyInput";

export { FancyInput };
