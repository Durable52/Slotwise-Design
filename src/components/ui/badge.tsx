import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-[#bdd3f5] bg-[#eaf2ff] px-2.5 py-1 text-xs font-semibold text-[#0846b8]",
        className,
      )}
      {...props}
    />
  );
}
