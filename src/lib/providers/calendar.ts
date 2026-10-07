import { addMinutes } from "date-fns";
import type { BusyInterval } from "@/lib/types";

export type CalendarEventInput = {
  bookingId: string;
  title: string;
  startsAt: Date;
  endsAt: Date;
  inviteeEmail: string;
  location: string;
};

export type CalendarProvider = {
  getBusyIntervals(input: { startsAt: Date; endsAt: Date }): Promise<BusyInterval[]>;
  createEvent(input: CalendarEventInput): Promise<{ providerEventId: string; status: "created" }>;
  cancelEvent(input: { providerEventId: string }): Promise<{ status: "cancelled" }>;
};

export const mockCalendarProvider: CalendarProvider = {
  async getBusyIntervals({ startsAt }) {
    const anchor = new Date(startsAt);
    anchor.setUTCHours(16, 0, 0, 0);

    return [
      {
        startsAt: anchor,
        endsAt: addMinutes(anchor, 60),
        source: "calendar",
        label: "Mock busy event",
      },
    ];
  },
  async createEvent(input) {
    return {
      providerEventId: `mock-event-${input.bookingId}`,
      status: "created",
    };
  },
  async cancelEvent() {
    return { status: "cancelled" };
  },
};

