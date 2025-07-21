"use client";
import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";

import { cn } from "@/lib/utils";

interface LabelProps
  extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> {
  className?: string;
}

function Label({ className, ...props }: LabelProps) {
  const labelRef =
    React.useRef<React.ComponentRef<typeof LabelPrimitive.Root>>(null);

  return (
    <LabelPrimitive.Root
      ref={labelRef}
      className={cn(
        "text-sm font-medium text-black dark:text-white leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className
      )}
      {...props}
    />
  );
}

export { Label };
