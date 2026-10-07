import type {
  AppointmentType,
  Booking,
  HostProfile,
  WeeklyAvailabilityRule,
} from "@/lib/types";

export const hostProfile: HostProfile = {
  id: "host_001",
  name: "Alex Morgan",
  email: "alex@slotwise.local",
  slug: "alex-morgan",
  defaultTimeZone: "America/New_York",
};

export const appointmentTypes: AppointmentType[] = [
  {
    id: "apt_strategy",
    title: "Strategy Call",
    slug: "strategy-call",
    description:
      "A focused session for prospects and clients to scope needs, timelines, and next steps.",
    location: "Google Meet link shared after booking",
    durationMinutes: 30,
    bufferBeforeMinutes: 10,
    bufferAfterMinutes: 10,
    minimumNoticeMinutes: 240,
    active: true,
  },
  {
    id: "apt_review",
    title: "Project Review",
    slug: "project-review",
    description: "Review current work, decisions, and upcoming milestones.",
    location: "Client-provided video link",
    durationMinutes: 60,
    bufferBeforeMinutes: 15,
    bufferAfterMinutes: 15,
    minimumNoticeMinutes: 1440,
    active: true,
  },
];

export const availabilityRules: WeeklyAvailabilityRule[] = [
  { id: "mon", dayOfWeek: 1, startTime: "09:00", endTime: "12:00", timeZone: hostProfile.defaultTimeZone, isActive: true },
  { id: "mon_pm", dayOfWeek: 1, startTime: "13:00", endTime: "17:00", timeZone: hostProfile.defaultTimeZone, isActive: true },
  { id: "tue", dayOfWeek: 2, startTime: "09:00", endTime: "12:00", timeZone: hostProfile.defaultTimeZone, isActive: true },
  { id: "tue_pm", dayOfWeek: 2, startTime: "13:00", endTime: "17:00", timeZone: hostProfile.defaultTimeZone, isActive: true },
  { id: "wed", dayOfWeek: 3, startTime: "10:00", endTime: "15:00", timeZone: hostProfile.defaultTimeZone, isActive: true },
  { id: "thu", dayOfWeek: 4, startTime: "09:00", endTime: "12:00", timeZone: hostProfile.defaultTimeZone, isActive: true },
  { id: "thu_pm", dayOfWeek: 4, startTime: "13:00", endTime: "17:00", timeZone: hostProfile.defaultTimeZone, isActive: true },
  { id: "fri", dayOfWeek: 5, startTime: "09:00", endTime: "13:00", timeZone: hostProfile.defaultTimeZone, isActive: true },
];

export const bookings: Booking[] = [
  {
    id: "bk_001",
    appointmentTypeId: "apt_strategy",
    inviteeName: "Jordan Lee",
    inviteeEmail: "jordan@example.com",
    startsAt: new Date("2026-09-22T15:00:00.000Z"),
    endsAt: new Date("2026-09-22T15:30:00.000Z"),
    inviteeTimeZone: "America/Chicago",
    status: "confirmed",
    cancellationToken: "cancel-demo-001",
  },
  {
    id: "bk_002",
    appointmentTypeId: "apt_review",
    inviteeName: "Priya Shah",
    inviteeEmail: "priya@example.com",
    startsAt: new Date("2026-09-24T18:00:00.000Z"),
    endsAt: new Date("2026-09-24T19:00:00.000Z"),
    inviteeTimeZone: "America/Los_Angeles",
    status: "confirmed",
    cancellationToken: "cancel-demo-002",
  },
  {
    id: "bk_003",
    appointmentTypeId: "apt_strategy",
    inviteeName: "Sam Rivera",
    inviteeEmail: "sam@example.com",
    startsAt: new Date("2026-09-18T14:00:00.000Z"),
    endsAt: new Date("2026-09-18T14:30:00.000Z"),
    inviteeTimeZone: "America/New_York",
    status: "cancelled",
    cancellationToken: "cancel-demo-003",
  },
];

