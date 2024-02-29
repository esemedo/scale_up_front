import * as React from "react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import "./style.css";

interface FloatingLabelButtonProps {
  label?: string;
}

const FloatingLabelButton = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentPropsWithoutRef<typeof Button> & FloatingLabelButtonProps
>(({ id, label, children, className, ...props }, ref) => {
  return (
    <div className="relative mt-4">
      <Button
        id={id}
        variant="outline"
        className={className}
        ref={ref}
        {...props}
      >
        {children}
      </Button>
      <Label
        className="absolute -top-11 left-2 rounded-md bg-white px-1 text-sm text-gray-300"
        htmlFor={id}
      >
        {label}
      </Label>
    </div>
  );
});
FloatingLabelButton.displayName = "FloatingLabelButton";

export { FloatingLabelButton };
