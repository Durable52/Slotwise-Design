import type { ReactNode } from "react";
import { CalendarDays } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type PageShellProps = {
  children: ReactNode;
  variant?: "app" | "public";
};

export function PageShell({ children, variant = "app" }: PageShellProps) {
  return (
    <div
      className={cn(
        "min-h-screen bg-[#f6f9fc] text-[#0a2540]",
        variant === "app" && "lg:grid lg:grid-cols-[232px_1fr]",
      )}
    >
      {variant === "app" ? (
        <aside className="border-b border-[#d8e2ef] bg-white px-4 py-4 text-[#0a2540] lg:min-h-screen lg:border-b-0 lg:border-r">
          <Link href="/" className="flex items-center gap-3 rounded-md px-2 py-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-[#0a66ff] text-white shadow-[0_8px_22px_rgba(10,102,255,0.22)]">
              <CalendarDays className="h-5 w-5" aria-hidden="true" />
            </span>
            <span>
              <span className="block text-base font-semibold">Slotwise</span>
              <span className="block text-xs text-[#5f6f86]">Scheduling workspace</span>
            </span>
          </Link>
          <nav aria-label="Main navigation" className="mt-6 grid gap-1 text-sm">
            <Link className="rounded-md border-l-2 border-[#0a66ff] bg-[#eaf2ff] px-3 py-2 font-medium text-[#0846b8]" href="/dashboard">
              Dashboard
            </Link>
            <Link className="rounded-md border-l-2 border-transparent px-3 py-2 text-[#425466] hover:bg-[#f6f9fc] hover:text-[#0a2540]" href="/book/strategy-call">
              Public booking page
            </Link>
            <Link className="rounded-md border-l-2 border-transparent px-3 py-2 text-[#425466] hover:bg-[#f6f9fc] hover:text-[#0a2540]" href="/cancel/cancel-demo-001">
              Cancellation route
            </Link>
            <Link className="rounded-md border-l-2 border-transparent px-3 py-2 text-[#425466] hover:bg-[#f6f9fc] hover:text-[#0a2540]" href="/login">
              Login
            </Link>
          </nav>
        </aside>
      ) : null}
      {children}
    </div>
  );
}
