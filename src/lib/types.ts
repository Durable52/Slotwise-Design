export type BookingStatus = "confirmed" | "cancelled" | "completed";

export type WeeklyAvailabilityRule = {
  id: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  timeZone: string;
  isActive: boolean;
};

export type BusyInterval = {
  startsAt: Date;
  endsAt: Date;
  source: "calendar" | "booking" | "buffer";
  label?: string;
};

export type AppointmentType = {
  id: string;
  title: string;
  slug: string;
  description: string;
  location: string;
  durationMinutes: number;
  bufferBeforeMinutes: number;
  bufferAfterMinutes: number;
  minimumNoticeMinutes: number;
  active: boolean;
};

export type HostProfile = {
  id: string;
  name: string;
  email: string;
  slug: string;
  defaultTimeZone: string;
};

export type Booking = {
  id: string;
  appointmentTypeId: string;
  inviteeName: string;
  inviteeEmail: string;
  inviteeNotes?: string;
  startsAt: Date;
  endsAt: Date;
  inviteeTimeZone: string;
  status: BookingStatus;
  cancellationToken: string;
};

