import { addMinutes, isBefore } from "date-fns";
import { formatInTimeZone, fromZonedTime } from "date-fns-tz";
import type { BusyInterval, WeeklyAvailabilityRule } from "@/lib/types";

type SlotCalculationInput = {
  rangeStartUtc: Date;
  rangeEndUtc: Date;
  durationMinutes: number;
  bufferBeforeMinutes: number;
  bufferAfterMinutes: number;
  minimumNoticeMinutes: number;
  timeZone: string;
  availabilityRules: WeeklyAvailabilityRule[];
  busyIntervals: BusyInterval[];
  nowUtc?: Date;
  slotIntervalMinutes?: number;
};

export type AvailableSlot = {
  startsAt: Date;
  endsAt: Date;
  localDateLabel: string;
  localTimeLabel: string;
  timeZone: string;
};

export function generateAvailabilitySlots(input: SlotCalculationInput): AvailableSlot[] {
  const nowUtc = input.nowUtc ?? new Date();
  const slotIntervalMinutes = input.slotIntervalMinutes ?? 15;
  const earliestStart = addMinutes(nowUtc, input.minimumNoticeMinutes);
  const dates = getLocalDateStrings(input.rangeStartUtc, input.rangeEndUtc, input.timeZone);
  const slots: AvailableSlot[] = [];

  for (const localDate of dates) {
    const dayOfWeek = new Date(`${localDate}T12:00:00.000Z`).getUTCDay();
    const rules = input.availabilityRules.filter(
      (rule) => rule.isActive && rule.dayOfWeek === dayOfWeek,
    );

    for (const rule of rules) {
      const windowStart = fromZonedTime(`${localDate}T${rule.startTime}:00`, rule.timeZone);
      const windowEnd = fromZonedTime(`${localDate}T${rule.endTime}:00`, rule.timeZone);

      for (
        let slotStart = new Date(windowStart);
        addMinutes(slotStart, input.durationMinutes) <= windowEnd;
        slotStart = addMinutes(slotStart, slotIntervalMinutes)
      ) {
        const slotEnd = addMinutes(slotStart, input.durationMinutes);
        const blockedStart = addMinutes(slotStart, -input.bufferBeforeMinutes);
        const blockedEnd = addMinutes(slotEnd, input.bufferAfterMinutes);

        if (isBefore(slotStart, earliestStart)) {
          continue;
        }

        if (slotStart < input.rangeStartUtc || slotEnd > input.rangeEndUtc) {
          continue;
        }

        if (input.busyIntervals.some((busy) => intervalsOverlap(blockedStart, blockedEnd, busy.startsAt, busy.endsAt))) {
          continue;
        }

        slots.push({
          startsAt: slotStart,
          endsAt: slotEnd,
          localDateLabel: formatInTimeZone(slotStart, input.timeZone, "EEE, MMM d"),
          localTimeLabel: formatInTimeZone(slotStart, input.timeZone, "h:mm a"),
          timeZone: input.timeZone,
        });
      }
    }
  }

  return slots.sort((a, b) => a.startsAt.getTime() - b.startsAt.getTime());
}

export function intervalsOverlap(
  leftStart: Date,
  leftEnd: Date,
  rightStart: Date,
  rightEnd: Date,
) {
  return leftStart < rightEnd && rightStart < leftEnd;
}

function getLocalDateStrings(rangeStartUtc: Date, rangeEndUtc: Date, timeZone: string) {
  const startDate = formatInTimeZone(rangeStartUtc, timeZone, "yyyy-MM-dd");
  const endDate = formatInTimeZone(rangeEndUtc, timeZone, "yyyy-MM-dd");
  const dates: string[] = [];
  let cursor = new Date(`${startDate}T00:00:00.000Z`);
  const end = new Date(`${endDate}T00:00:00.000Z`);

  while (cursor <= end) {
    dates.push(cursor.toISOString().slice(0, 10));
    cursor = new Date(cursor.getTime() + 24 * 60 * 60 * 1000);
  }

  return dates;
}

