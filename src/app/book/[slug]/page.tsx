import { addDays } from "date-fns";
import { notFound } from "next/navigation";
import { BookingCalendar } from "@/components/booking/booking-calendar";
import { PageShell } from "@/components/page-shell";
import { Badge } from "@/components/ui/badge";
import { appointmentTypes, availabilityRules, hostProfile } from "@/lib/mock-data";
import { mockCalendarProvider } from "@/lib/providers/calendar";
import { generateAvailabilitySlots } from "@/lib/slot-calculation";
import { createBookingAction } from "./actions";

type BookingPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ error?: string }>;
};

export default async function BookingPage({ params, searchParams }: BookingPageProps) {
  const { slug } = await params;
  const { error } = await searchParams;
  const appointmentType = appointmentTypes.find((type) => type.slug === slug && type.active);

  if (!appointmentType) {
    notFound();
  }

  const now = new Date();
  const rangeStartUtc = now;
  const rangeEndUtc = addDays(now, 14);
  const busyIntervals = await mockCalendarProvider.getBusyIntervals({
    startsAt: rangeStartUtc,
    endsAt: rangeEndUtc,
  });
  const slots = generateAvailabilitySlots({
    rangeStartUtc,
    rangeEndUtc,
    durationMinutes: appointmentType.durationMinutes,
    bufferBeforeMinutes: appointmentType.bufferBeforeMinutes,
    bufferAfterMinutes: appointmentType.bufferAfterMinutes,
    minimumNoticeMinutes: appointmentType.minimumNoticeMinutes,
    timeZone: hostProfile.defaultTimeZone,
    availabilityRules,
    busyIntervals,
    nowUtc: now,
  }).slice(0, 36);

  return (
    <PageShell variant="public">
      <main className="mx-auto grid min-h-screen w-full max-w-6xl gap-8 px-4 py-8 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        <section className="flex flex-col justify-between rounded-xl border border-[#d8e2ef] bg-white p-6 shadow-[0_16px_40px_rgba(10,37,64,0.06)]">
          <div>
            <Badge>Slotwise booking page</Badge>
            <h1 className="mt-5 text-3xl font-semibold tracking-[-0.02em] text-[#0a2540]">
              {appointmentType.title}
            </h1>
            <p className="mt-3 text-base leading-7 text-[#425466]">
              {appointmentType.description}
            </p>
            <dl className="mt-8 grid gap-4 text-sm">
              <div>
                <dt className="font-semibold text-[#0a2540]">Host</dt>
                <dd className="text-[#425466]">{hostProfile.name}</dd>
              </div>
              <div>
                <dt className="font-semibold text-[#0a2540]">Duration</dt>
                <dd className="text-[#425466]">{appointmentType.durationMinutes} minutes</dd>
              </div>
              <div>
                <dt className="font-semibold text-[#0a2540]">Location</dt>
                <dd className="text-[#425466]">{appointmentType.location}</dd>
              </div>
            </dl>
          </div>
          <p className="mt-8 rounded-lg bg-[#f6f9fc] p-3 text-xs leading-5 text-[#5f6f86]">
            Times are shown in {hostProfile.defaultTimeZone}. The invitee time zone is captured with the booking.
          </p>
        </section>

        <BookingCalendar
          action={createBookingAction}
          error={error}
          slug={appointmentType.slug}
          slots={slots.map((slot) => ({
            startsAt: slot.startsAt.toISOString(),
            endsAt: slot.endsAt.toISOString(),
            localDateLabel: slot.localDateLabel,
            localTimeLabel: slot.localTimeLabel,
            timeZone: slot.timeZone,
          }))}
        />
      </main>
    </PageShell>
  );
}
