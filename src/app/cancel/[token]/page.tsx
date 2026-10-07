import { CalendarX2 } from "lucide-react";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import { bookings } from "@/lib/mock-data";

type CancellationPageProps = {
  params: Promise<{ token: string }>;
};

export default async function CancellationPage({ params }: CancellationPageProps) {
  const { token } = await params;
  const booking = bookings.find((item) => item.cancellationToken === token);

  return (
    <PageShell variant="public">
      <main className="mx-auto flex min-h-screen w-full max-w-2xl items-center px-4 py-12">
        <section className="w-full rounded-xl border border-[#d8e2ef] bg-white p-8 shadow-[0_16px_40px_rgba(10,37,64,0.06)]">
          <CalendarX2 className="h-12 w-12 text-[#b34a33]" aria-hidden="true" />
          <h1 className="mt-6 text-3xl font-semibold tracking-[-0.02em] text-[#0a2540]">
            {booking ? "Cancel appointment" : "Cancellation link ready"}
          </h1>
          <p className="mt-3 text-base leading-7 text-[#425466]">
            {booking
              ? `This scaffold found ${booking.inviteeName}'s booking. In production, submitting this action would cancel the calendar event and send a notification.`
              : "This route accepts secure cancellation tokens. The mocked scaffold shows the cancellation surface without changing persisted data."}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button>Confirm cancellation</Button>
            <Button asChild variant="secondary">
              <Link href="/dashboard">Back to dashboard</Link>
            </Button>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
