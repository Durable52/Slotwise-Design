"use client";

import { useMemo, useState } from "react";
import { CalendarDays, Mail, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/field";
import { cn } from "@/lib/utils";

type SerializableSlot = {
  startsAt: string;
  endsAt: string;
  localDateLabel: string;
  localTimeLabel: string;
  timeZone: string;
};

type BookingCalendarProps = {
  action: (formData: FormData) => void | Promise<void>;
  error?: string;
  slug: string;
  slots: SerializableSlot[];
};

export function BookingCalendar({ action, error, slug, slots }: BookingCalendarProps) {
  const [selectedSlot, setSelectedSlot] = useState(slots[0]?.startsAt ?? "");
  const inviteeTimeZone = useMemo(
    () => Intl.DateTimeFormat().resolvedOptions().timeZone || "America/New_York",
    [],
  );
  const groupedSlots = useMemo(() => {
    return slots.reduce<Record<string, SerializableSlot[]>>((groups, slot) => {
      groups[slot.localDateLabel] = [...(groups[slot.localDateLabel] ?? []), slot];
      return groups;
    }, {});
  }, [slots]);

  return (
    <section className="rounded-xl border border-[#d8e2ef] bg-white p-5 shadow-[0_16px_40px_rgba(10,37,64,0.06)]">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold tracking-[-0.01em] text-[#0a2540]">Select a time</h2>
          <p className="mt-1 text-sm text-[#425466]">Available slots account for buffers, notice period, and mocked busy calendar events.</p>
        </div>
        <span className="rounded-full bg-[#eaf2ff] px-2.5 py-1 text-xs font-semibold text-[#0846b8]">
          {inviteeTimeZone}
        </span>
      </div>

      {error ? (
        <div className="mt-4 rounded-md border border-[#f2b8aa] bg-[#fff4f1] px-3 py-2 text-sm text-[#8b2e1a]">
          {error === "conflict"
            ? "That slot was just blocked. Please choose another time."
            : "Please check the booking details and try again."}
        </div>
      ) : null}

      <div className="mt-5 grid max-h-[420px] gap-5 overflow-y-auto pr-1">
        {Object.entries(groupedSlots).map(([dateLabel, daySlots]) => (
          <div key={dateLabel}>
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#0a2540]">
              <CalendarDays className="h-4 w-4 text-[#0a66ff]" aria-hidden="true" />
              {dateLabel}
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {daySlots.map((slot) => (
                <button
                  type="button"
                  key={slot.startsAt}
                  className={cn(
                    "h-10 rounded-md border px-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0a66ff]",
                    selectedSlot === slot.startsAt
                      ? "border-[#0a66ff] bg-[#0a66ff] text-white shadow-[0_8px_20px_rgba(10,102,255,0.18)]"
                      : "border-[#d8e2ef] bg-white text-[#0a2540] hover:border-[#bdd3f5] hover:bg-[#eaf2ff]",
                  )}
                  onClick={() => setSelectedSlot(slot.startsAt)}
                >
                  {slot.localTimeLabel}
                </button>
              ))}
            </div>
          </div>
        ))}
        {slots.length === 0 ? (
          <p className="rounded-md border border-[#d8e2ef] bg-[#f6f9fc] p-4 text-sm text-[#425466]">
            No slots are available in this two-week window.
          </p>
        ) : null}
      </div>

      <form action={action} className="mt-6 grid gap-4 border-t border-[#d8e2ef] pt-5">
        <input type="hidden" name="slug" value={slug} />
        <input type="hidden" name="slotStart" value={selectedSlot} />
        <input type="hidden" name="inviteeTimeZone" value={inviteeTimeZone} />
        <div className="grid gap-2">
          <Label htmlFor="inviteeName">Name</Label>
          <div className="relative">
            <UserRound className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-[#5f6f86]" aria-hidden="true" />
            <Input id="inviteeName" name="inviteeName" required className="pl-9" placeholder="Taylor Reed" />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="inviteeEmail">Email</Label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-[#5f6f86]" aria-hidden="true" />
            <Input id="inviteeEmail" name="inviteeEmail" type="email" required className="pl-9" placeholder="taylor@example.com" />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="inviteeNotes">Notes</Label>
          <Textarea id="inviteeNotes" name="inviteeNotes" placeholder="Anything the host should know?" />
        </div>
        <Button type="submit" disabled={!selectedSlot}>
          Confirm appointment
        </Button>
      </form>
    </section>
  );
}
