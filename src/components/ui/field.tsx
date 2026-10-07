import type { InputHTMLAttributes, LabelHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Label({ className, ...props }: LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className={cn("text-sm font-semibold text-[#0a2540]", className)} {...props} />;
}

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-10 w-full rounded-md border border-[#d8e2ef] bg-white px-3 text-sm text-[#0a2540] outline-none transition placeholder:text-[#9aa8ba] focus:border-[#0a66ff] focus:ring-2 focus:ring-[#cfe0ff]",
        className,
      )}
      {...props}
    />
  );
}

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "min-h-24 w-full rounded-md border border-[#d8e2ef] bg-white px-3 py-2 text-sm text-[#0a2540] outline-none transition placeholder:text-[#9aa8ba] focus:border-[#0a66ff] focus:ring-2 focus:ring-[#cfe0ff]",
        className,
      )}
      {...props}
    />
  );
}
