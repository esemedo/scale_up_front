import * as React from "react";

import { Input, InputProps } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { cn } from "@/lib/utils";

import "./style.css";

interface FloatingLabelInputProps extends InputProps {
  id?: string;
  placeholder?: string;
  type?: "text" | "password" | "email" | "number" | "tel" | "url";
}

const FloatingLabelInput = React.forwardRef<
  HTMLInputElement,
  FloatingLabelInputProps
>(({ id, placeholder, type = "text", className, ...props }, ref) => {
  return (
    <div className="relative mt-4">
      <Input
        type={type}
        placeholder={placeholder}
        ref={ref}
        id={id}
        className={cn(
          "ring-offset-0 ring-offset-gray-300 transition duration-200 placeholder:opacity-0 focus:border-gray-300 focus:placeholder:opacity-80 focus-visible:ring-0 focus-visible:ring-gray-300",
          className,
        )}
        {...props}
      />
      <Label
        className="input-text absolute -top-5 left-3 rounded-md text-sm text-muted-foreground/80 transition duration-200"
        htmlFor={id}
      >
        {placeholder}
      </Label>
    </div>
  );
});
FloatingLabelInput.displayName = "FloatingLabelInput";

export { FloatingLabelInput };
