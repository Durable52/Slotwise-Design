import { formatInTimeZone } from "date-fns-tz";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import { hostProfile } from "@/lib/mock-data";

type ConfirmedPageProps = {
  searchParams: Promise<{ slot?: string; name?: string }>;
};

export default async function ConfirmedPage({ searchParams }: ConfirmedPageProps) {
  const { slot, name } = await searchParams;
  const startsAt = slot ? new Date(slot) : new Date();

  return (
    <PageShell variant="public">
      <main className="mx-auto flex min-h-screen w-full max-w-2xl items-center px-4 py-12">
        <section className="w-full rounded-xl border border-[#d8e2ef] bg-white p-8 shadow-[0_16px_40px_rgba(10,37,64,0.06)]">
          <CheckCircle2 className="h-12 w-12 text-[#0a66ff]" aria-hidden="true" />
          <h1 className="mt-6 text-3xl font-semibold tracking-[-0.02em] text-[#0a2540]">Booking confirmed</h1>
          <p className="mt-3 text-base leading-7 text-[#425466]">
            {name ?? "Your appointment"} is scheduled for{" "}
            <strong className="font-semibold text-[#0a2540]">
              {formatInTimeZone(startsAt, hostProfile.defaultTimeZone, "EEEE, MMMM d 'at' h:mm a zzz")}
            </strong>
            . Mock calendar and email providers accepted the confirmation.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/dashboard">View host dashboard</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/book/strategy-call">Book another slot</Link>
            </Button>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
