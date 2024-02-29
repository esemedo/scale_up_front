import * as React from "react";

import { Input, InputProps } from "@/components/ui/input";

import { cn } from "@/lib/utils";

import { FloatingLabel, FloatingLabelProps } from "./floating-label";

import "./style.css";

// interface FloatingLabelInputProps extends FloatingLabelProps {
//   type?: "text" | "password" | "email" | "number" | "tel" | "url";
// }

const FloatingLabelInput = React.forwardRef<
  React.ElementRef<typeof Input>,
  React.ComponentPropsWithoutRef<typeof Input> & FloatingLabelProps
>(({ id, label, type = "text", className, ...props }, ref) => {
  return (
    <FloatingLabel
      label={label}
      labelClassName="input-text absolute -top-5 left-3 rounded-md text-sm text-muted-foreground/80 transition duration-200"
    >
      <Input
        type={type}
        placeholder={label}
        ref={ref}
        id={id}
        className={cn(
          "ring-offset-0 ring-offset-gray-300 transition duration-200 placeholder:opacity-0 focus:border-gray-300 focus:placeholder:opacity-80 focus-visible:ring-0 focus-visible:ring-gray-300",
          className,
        )}
        {...props}
      />
    </FloatingLabel>
  );
});
FloatingLabelInput.displayName = "FloatingLabelInput";

export { FloatingLabelInput };
