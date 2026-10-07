import { formatInTimeZone } from "date-fns-tz";
import { CalendarCheck2, CalendarX2, Link2, MailCheck } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { AppointmentTypeForm } from "@/components/dashboard/appointment-type-form";
import { AvailabilityEditor } from "@/components/dashboard/availability-editor";
import { PageShell } from "@/components/page-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { appointmentTypes, availabilityRules, bookings, hostProfile } from "@/lib/mock-data";

export function DashboardHome() {
  const primaryAppointment = appointmentTypes[0];
  const upcoming = bookings.filter((booking) => booking.status === "confirmed");
  const cancelled = bookings.filter((booking) => booking.status === "cancelled");

  return (
    <PageShell>
      <main className="w-full px-4 py-6 lg:px-8">
        <header className="flex flex-wrap items-start justify-between gap-4 border-b border-[#d8e2ef] pb-6">
          <div>
            <Badge>Host workspace</Badge>
            <h1 className="mt-3 text-3xl font-semibold tracking-[-0.02em] text-[#0a2540]">Appointment scheduler</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#425466]">
              Manage appointment types, weekly availability, booking records, and mocked confirmation delivery for {hostProfile.name}.
            </p>
          </div>
          <Button asChild>
            <Link href={`/book/${primaryAppointment.slug}`}>
              <Link2 className="h-4 w-4" aria-hidden="true" />
              Open booking link
            </Link>
          </Button>
        </header>

        <section className="mt-6 grid gap-4 md:grid-cols-4">
          <Metric icon={<CalendarCheck2 className="h-5 w-5" />} label="Upcoming" value={upcoming.length.toString()} />
          <Metric icon={<CalendarX2 className="h-5 w-5" />} label="Cancelled" value={cancelled.length.toString()} />
          <Metric icon={<Link2 className="h-5 w-5" />} label="Active types" value={appointmentTypes.filter((type) => type.active).length.toString()} />
          <Metric icon={<MailCheck className="h-5 w-5" />} label="Email mode" value="Mock" />
        </section>

        <section className="mt-6 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="grid gap-6">
            <AppointmentTypeForm appointmentType={primaryAppointment} />
            <BookingsTable />
          </div>
          <AvailabilityEditor rules={availabilityRules} />
        </section>
      </main>
    </PageShell>
  );
}

function Metric({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <Card className="flex items-center justify-between gap-3">
      <div>
        <p className="text-sm text-[#425466]">{label}</p>
        <p className="mt-1 text-2xl font-semibold tracking-[-0.02em] text-[#0a2540]">{value}</p>
      </div>
      <span className="flex h-10 w-10 items-center justify-center rounded-md bg-[#eaf2ff] text-[#0a66ff]">
        {icon}
      </span>
    </Card>
  );
}

function BookingsTable() {
  return (
    <Card>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <CardTitle>Bookings</CardTitle>
          <p className="mt-1 text-sm text-[#425466]">Upcoming, completed, and cancelled records in one place.</p>
        </div>
        <Badge>Calendar writes mocked</Badge>
      </div>
      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[680px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-[#d8e2ef] text-xs text-[#5f6f86]">
              <th className="py-3 pr-4 font-medium">Invitee</th>
              <th className="py-3 pr-4 font-medium">Appointment</th>
              <th className="py-3 pr-4 font-medium">Time</th>
              <th className="py-3 pr-4 font-medium">Status</th>
              <th className="py-3 pr-4 font-medium">Cancel</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => {
              const appointment = appointmentTypes.find((type) => type.id === booking.appointmentTypeId);
              return (
                <tr key={booking.id} className="border-b border-[#edf2f7] last:border-0">
                  <td className="py-3 pr-4">
                    <span className="block font-medium text-[#0a2540]">{booking.inviteeName}</span>
                    <span className="text-xs text-[#5f6f86]">{booking.inviteeEmail}</span>
                  </td>
                  <td className="py-3 pr-4 text-[#425466]">{appointment?.title ?? "Appointment"}</td>
                  <td className="py-3 pr-4 text-[#425466]">
                    {formatInTimeZone(booking.startsAt, hostProfile.defaultTimeZone, "MMM d, h:mm a zzz")}
                  </td>
                  <td className="py-3 pr-4">
                    <span className="rounded-full bg-[#f6f9fc] px-2.5 py-1 text-xs font-semibold capitalize text-[#425466] ring-1 ring-[#d8e2ef]">
                      {booking.status}
                    </span>
                  </td>
                  <td className="py-3 pr-4">
                    <Link className="font-medium text-[#0a66ff] underline-offset-4 hover:underline" href={`/cancel/${booking.cancellationToken}`}>
                      Secure link
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
