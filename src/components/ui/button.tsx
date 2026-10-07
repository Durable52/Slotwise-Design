import { cloneElement, isValidElement, type ButtonHTMLAttributes, type ReactElement, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
};

export function Button({
  asChild,
  className,
  children,
  variant = "primary",
  ...props
}: ButtonProps) {
  const classes = cn(
    "interactive-lift inline-flex h-10 items-center justify-center gap-2 rounded-md px-4 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0a66ff] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0",
    variant === "primary" && "bg-[#0a66ff] text-white shadow-[0_10px_24px_rgba(10,102,255,0.20)] hover:bg-[#0846b8]",
    variant === "secondary" && "border border-[#d8e2ef] bg-white text-[#0a2540] hover:border-[#b8c9dd] hover:bg-[#f6f9fc]",
    variant === "ghost" && "text-[#0a2540] hover:bg-[#eaf2ff]",
    className,
  );

  if (asChild && isValidElement(children)) {
    const child = children as ReactElement<{ className?: string }>;
    return cloneElement(child, {
      className: cn(classes, child.props.className),
    });
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
