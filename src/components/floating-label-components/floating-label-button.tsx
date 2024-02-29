import * as React from "react";

import { Button } from "@/components/ui/button";

import { FloatingLabel, FloatingLabelProps } from "./floating-label";

import "./style.css";

const FloatingLabelButton = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentPropsWithoutRef<typeof Button> & FloatingLabelProps
>(({ id, label, children, className, ...props }, ref) => {
  return (
    <FloatingLabel label={label}>
      <Button
        id={id}
        variant="outline"
        className={className}
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
