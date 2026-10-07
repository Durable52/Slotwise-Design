import { z } from "zod";

export const appointmentTypeSchema = z.object({
  title: z.string().min(2).max(80),
  slug: z.string().min(3).max(60).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  description: z.string().max(600),
  location: z.string().min(2).max(160),
  durationMinutes: z.coerce.number().int().refine((value) => [15, 30, 60].includes(value)),
  bufferBeforeMinutes: z.coerce.number().int().min(0).max(120),
  bufferAfterMinutes: z.coerce.number().int().min(0).max(120),
  minimumNoticeMinutes: z.coerce.number().int().min(0).max(10080),
  active: z.coerce.boolean().default(true),
});

export const availabilityRuleSchema = z.object({
  dayOfWeek: z.coerce.number().int().min(0).max(6),
  startTime: z.string().regex(/^\d{2}:\d{2}$/),
  endTime: z.string().regex(/^\d{2}:\d{2}$/),
  timeZone: z.string().min(3),
  isActive: z.coerce.boolean().default(true),
});

export const bookingRequestSchema = z.object({
  slug: z.string().min(3),
  slotStart: z.string().datetime(),
  inviteeName: z.string().min(2).max(120),
  inviteeEmail: z.string().email(),
  inviteeNotes: z.string().max(1000).optional(),
  inviteeTimeZone: z.string().min(3),
});

export const cancellationSchema = z.object({
  token: z.string().min(12),
});

