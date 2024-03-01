import * as React from "react";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

import { FloatingLabel, FloatingLabelProps } from "./floating-label";

import "./style.css";

const FloatingLabelButton = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentPropsWithoutRef<typeof Button> & FloatingLabelProps
>(({ id, label, children, className, ...props }, ref) => {
  return (
    <FloatingLabel id={id} label={label}>
      <Button
        id={id}
        variant="outline"
        className={cn("rounded-md", className)}
        ref={ref}
        {...props}
      >
        {children}
      </Button>
    </FloatingLabel>
  );
});
FloatingLabelButton.displayName = "FloatingLabelButton";

export { FloatingLabelButton };
