"use server";

import { addMinutes } from "date-fns";
import { redirect } from "next/navigation";
import { appointmentTypes, hostProfile } from "@/lib/mock-data";
import { mockCalendarProvider } from "@/lib/providers/calendar";
import { mockEmailProvider } from "@/lib/providers/email";
import { intervalsOverlap } from "@/lib/slot-calculation";
import { bookingRequestSchema } from "@/lib/validators";

export async function createBookingAction(formData: FormData) {
  const fallbackSlug = String(formData.get("slug") ?? "strategy-call");
  const parsed = bookingRequestSchema.safeParse({
    slug: formData.get("slug"),
    slotStart: formData.get("slotStart"),
    inviteeName: formData.get("inviteeName"),
    inviteeEmail: formData.get("inviteeEmail"),
    inviteeNotes: formData.get("inviteeNotes"),
    inviteeTimeZone: formData.get("inviteeTimeZone"),
  });

  if (!parsed.success) {
    redirect(`/book/${fallbackSlug}?error=invalid`);
  }

  const appointmentType = appointmentTypes.find(
    (type) => type.slug === parsed.data.slug && type.active,
  );

  if (!appointmentType) {
    redirect(`/book/${parsed.data.slug}?error=missing`);
  }

  const startsAt = new Date(parsed.data.slotStart);
  const endsAt = addMinutes(startsAt, appointmentType.durationMinutes);
  const bufferedStart = addMinutes(startsAt, -appointmentType.bufferBeforeMinutes);
  const bufferedEnd = addMinutes(endsAt, appointmentType.bufferAfterMinutes);
  const busyIntervals = await mockCalendarProvider.getBusyIntervals({
    startsAt: bufferedStart,
    endsAt: bufferedEnd,
  });

  if (
    busyIntervals.some((busy) =>
      intervalsOverlap(bufferedStart, bufferedEnd, busy.startsAt, busy.endsAt),
    )
  ) {
    redirect(`/book/${parsed.data.slug}?error=conflict`);
  }

  const bookingId = `mock-${crypto.randomUUID()}`;
  await mockCalendarProvider.createEvent({
    bookingId,
    title: appointmentType.title,
    startsAt,
    endsAt,
    inviteeEmail: parsed.data.inviteeEmail,
    location: appointmentType.location,
  });

  await mockEmailProvider.sendBookingConfirmation({
    inviteeName: parsed.data.inviteeName,
    inviteeEmail: parsed.data.inviteeEmail,
    hostEmail: hostProfile.email,
    title: appointmentType.title,
    startsAt,
    timeZone: parsed.data.inviteeTimeZone,
    location: appointmentType.location,
    cancellationUrl: `/cancel/cancel-${bookingId}`,
  });

  redirect(
    `/book/${parsed.data.slug}/confirmed?slot=${encodeURIComponent(startsAt.toISOString())}&name=${encodeURIComponent(parsed.data.inviteeName)}`,
  );
}

