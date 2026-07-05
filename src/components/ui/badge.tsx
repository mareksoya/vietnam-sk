import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export function Badge({
  className,
  gold,
  ...props
}: HTMLAttributes<HTMLSpanElement> & { gold?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
        gold
          ? "bg-accent-light text-accent"
          : "bg-primary-light text-primary-dark",
        className
      )}
      {...props}
    />
  );
}
