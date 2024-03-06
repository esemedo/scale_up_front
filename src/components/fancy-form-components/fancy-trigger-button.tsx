import * as React from "react";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

import { FancyLabel, FancyLabelProps } from "@/components/fancy-label";

const FancyTriggerButton = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentPropsWithoutRef<typeof Button> & FancyLabelProps
>(({ id, label, required, children, className, ...props }, ref) => {
  return (
    <FancyLabel id={id} label={label} required={required}>
      <Button
        id={id}
        variant="outline"
        className={cn("rounded-md", className)}
        ref={ref}
        {...props}
      >
        {children}
      </Button>
    </FancyLabel>
  );
});
FancyTriggerButton.displayName = "FancyTriggerButton";

export { FancyTriggerButton };
