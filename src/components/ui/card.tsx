import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <section
      className={cn("surface-enter rounded-xl border border-[#d8e2ef] bg-white p-5 shadow-[0_16px_40px_rgba(10,37,64,0.06)]", className)}
      {...props}
    />
  );
}

export function CardTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className={cn("text-lg font-semibold text-[#0a2540]", className)} {...props} />;
}
