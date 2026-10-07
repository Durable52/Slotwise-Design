import { describe, expect, it } from "vitest";
import { generateAvailabilitySlots, intervalsOverlap } from "@/lib/slot-calculation";
import type { WeeklyAvailabilityRule } from "@/lib/types";

const mondayMorning: WeeklyAvailabilityRule[] = [
  {
    id: "monday",
    dayOfWeek: 1,
    startTime: "09:00",
    endTime: "10:00",
    timeZone: "America/New_York",
    isActive: true,
  },
];

describe("generateAvailabilitySlots", () => {
  it("generates appointment starts inside weekly availability", () => {
    const slots = generateAvailabilitySlots({
      rangeStartUtc: new Date("2026-09-21T12:00:00.000Z"),
      rangeEndUtc: new Date("2026-09-21T18:00:00.000Z"),
      durationMinutes: 30,
      bufferBeforeMinutes: 0,
      bufferAfterMinutes: 0,
      minimumNoticeMinutes: 0,
      timeZone: "America/New_York",
      availabilityRules: mondayMorning,
      busyIntervals: [],
      nowUtc: new Date("2026-09-21T11:00:00.000Z"),
    });

    expect(slots.map((slot) => slot.localTimeLabel)).toEqual(["9:00 AM", "9:15 AM", "9:30 AM"]);
  });

  it("applies buffers when checking busy calendar intervals", () => {
    const slots = generateAvailabilitySlots({
      rangeStartUtc: new Date("2026-09-21T12:00:00.000Z"),
      rangeEndUtc: new Date("2026-09-21T18:00:00.000Z"),
      durationMinutes: 30,
      bufferBeforeMinutes: 10,
      bufferAfterMinutes: 10,
      minimumNoticeMinutes: 0,
      timeZone: "America/New_York",
      availabilityRules: mondayMorning,
      busyIntervals: [
        {
          startsAt: new Date("2026-09-21T13:35:00.000Z"),
          endsAt: new Date("2026-09-21T13:45:00.000Z"),
          source: "calendar",
        },
      ],
      nowUtc: new Date("2026-09-21T11:00:00.000Z"),
    });

    expect(slots.map((slot) => slot.localTimeLabel)).toEqual([]);
  });

  it("honors minimum notice", () => {
    const slots = generateAvailabilitySlots({
      rangeStartUtc: new Date("2026-09-21T12:00:00.000Z"),
      rangeEndUtc: new Date("2026-09-21T18:00:00.000Z"),
      durationMinutes: 30,
      bufferBeforeMinutes: 0,
      bufferAfterMinutes: 0,
      minimumNoticeMinutes: 180,
      timeZone: "America/New_York",
      availabilityRules: mondayMorning,
      busyIntervals: [],
      nowUtc: new Date("2026-09-21T10:30:00.000Z"),
    });

    expect(slots.map((slot) => slot.localTimeLabel)).toEqual(["9:30 AM"]);
  });

  it("returns labels in the requested IANA time zone", () => {
    const slots = generateAvailabilitySlots({
      rangeStartUtc: new Date("2026-09-21T00:00:00.000Z"),
      rangeEndUtc: new Date("2026-09-21T23:00:00.000Z"),
      durationMinutes: 30,
      bufferBeforeMinutes: 0,
      bufferAfterMinutes: 0,
      minimumNoticeMinutes: 0,
      timeZone: "Europe/London",
      availabilityRules: [
        {
          id: "london",
          dayOfWeek: 1,
          startTime: "09:00",
          endTime: "09:30",
          timeZone: "Europe/London",
          isActive: true,
        },
      ],
      busyIntervals: [],
      nowUtc: new Date("2026-09-20T12:00:00.000Z"),
    });

    expect(slots[0]).toMatchObject({
      localDateLabel: "Mon, Sep 21",
      localTimeLabel: "9:00 AM",
      timeZone: "Europe/London",
    });
  });
});

describe("intervalsOverlap", () => {
  it("rejects exact edge adjacency as an overlap", () => {
    expect(
      intervalsOverlap(
        new Date("2026-09-21T13:00:00.000Z"),
        new Date("2026-09-21T13:30:00.000Z"),
        new Date("2026-09-21T13:30:00.000Z"),
        new Date("2026-09-21T14:00:00.000Z"),
      ),
    ).toBe(false);
  });
});
