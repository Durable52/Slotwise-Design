# Appointment Scheduler — Product Requirements Document

**Version:** 1.0  
**Status:** Draft  
**Audience:** Product, design, engineering, and operations

## 1. Product overview

### Product name

**Slotwise** (working name)

### One-line description

A fast, professional scheduling tool that lets independent professionals publish availability, share booking links, and automatically confirm appointments.

### Product statement

Slotwise helps business professionals and freelancers eliminate the back-and-forth of arranging meetings. Hosts define when they are available, clients select a suitable time from a simple booking page, and both parties receive a confirmed calendar event and email notification.

## 2. Problem and opportunity

Independent professionals often coordinate appointments through email, chat, and manual calendar checks. This is slow, error-prone, and can result in double bookings, missed appointments, or an unpolished client experience.

Slotwise provides a reliable self-service booking flow while giving hosts control over their calendar, working hours, appointment types, and notifications.

## 3. Target user profile

### Primary user: the host

Business professionals and freelancers aged 25–50 who schedule meetings with clients, prospects, partners, or collaborators. Examples include consultants, coaches, recruiters, designers, photographers, therapists (non-clinical use in v1), accountants, and small-agency owners.

**Characteristics**

- Time-constrained and frequently work across several clients.
- Use Google Calendar or Microsoft Outlook Calendar as their source of truth.
- Need a professional booking experience without administrative overhead.
- Value control over availability, buffers, meeting duration, and notice periods.
- May schedule across time zones.

**Key jobs to be done**

- “When someone wants to meet me, help them find a time without emailing me repeatedly.”
- “Keep my calendar accurate so I do not get double booked.”
- “Make scheduling feel professional and trustworthy for my clients.”

### Secondary user: the invitee

A client, prospect, or collaborator booking time with a host. They need a frictionless mobile-friendly flow, clear time-zone handling, and immediate confidence that the appointment is confirmed.

## 4. Goals and success metrics

### Goals

- Enable a host to create and share a bookable appointment type in under five minutes.
- Let invitees book an available slot without creating an account.
- Prevent conflicting bookings using the host’s connected calendar.
- Deliver a clear confirmation immediately after a booking.

### Initial success metrics

- At least 70% of newly registered hosts publish one appointment type.
- At least 80% of booking-page visitors who reach slot selection complete booking.
- Fewer than 0.5% of confirmed bookings result in a scheduling conflict.
- At least 99% of confirmation emails are accepted by the email provider within five minutes.

## 5. Core features for v1

### 1. Host account and calendar connection

Hosts sign up, authenticate securely, and connect a primary Google Calendar or Microsoft Outlook Calendar.

**User stories**

- As a host, I want to sign up with Google or Microsoft so I can get started quickly.
- As a host, I want to connect my calendar and choose which calendars block time so open slots never overlap existing commitments.
- As a host, I want to disconnect my calendar so I remain in control of access.

### 2. Appointment types and shareable booking pages

Hosts create a named meeting type, configure duration and basic details, then receive a unique public booking link.

**User stories**

- As a host, I want to create a 15-, 30-, or 60-minute appointment type so clients can book the right kind of meeting.
- As a host, I want to set a title, description, location or meeting link, and booking link slug so the experience represents my business.
- As a host, I want to copy and share my booking link so people can book without contacting me first.

### 3. Availability management

Hosts set their weekly working hours plus booking rules that determine which open slots may be offered.

**User stories**

- As a host, I want to define weekly availability by day and time so bookings match my working schedule.
- As a host, I want to configure a minimum notice period and buffers before or after meetings so I have adequate preparation time.
- As a host, I want calendar events marked busy to block availability automatically so I avoid conflicts.

### 4. Public booking and confirmation flow

Invitees select an open time in their own time zone, enter booking details, and receive an immediate confirmed appointment.

**User stories**

- As an invitee, I want to see only available times in my local time zone so I can choose confidently.
- As an invitee, I want to provide my name, email, and optional notes so the host knows who is booking.
- As an invitee, I want a clear booking success screen and calendar invitation so I know the meeting is confirmed.

### 5. Booking records, email confirmations, and cancellation

The product creates calendar events and sends email confirmations to both parties; hosts can review bookings and invitees can cancel through a secure link.

**User stories**

- As a host, I want every confirmed booking written to my connected calendar so my schedule stays current.
- As a host and invitee, I want a confirmation email with time, location, and cancellation link so I have a reliable record.
- As an invitee, I want to cancel from the confirmation email so I can free the slot without contacting the host.
- As a host, I want to see upcoming and cancelled bookings in one place so I can manage my schedule.

## 6. Explicitly out of scope for v1

- Payments, invoicing, subscriptions, and paid appointment types.
- Group events, round-robin assignment, teams, and multi-host scheduling.
- Rescheduling flow (v1 supports cancellation; a new slot can then be booked).
- SMS, WhatsApp, push notifications, and automated reminders.
- Video-conferencing link generation or native Zoom/Teams integration; hosts may paste a meeting link.
- Two-way calendar sync beyond creating and cancelling scheduler-created events.
- Apple/iCloud Calendar integration.
- Custom domains, advanced branding, embeddable widgets, and white-labeling.
- Native iOS and Android apps.
- CRM, payment, marketing, or analytics-platform integrations.
- Regulated healthcare workflows, HIPAA compliance, or sensitive medical data collection.

## 7. Recommended tech stack

| Layer | Recommendation | Why |
|---|---|---|
| Web application | **Next.js (TypeScript) + React** | Full-stack TypeScript, strong routing, server rendering for public booking pages, and mature deployment support. |
| UI and styling | **Tailwind CSS + shadcn/ui** | Fast, accessible, professional UI development with components that remain customizable. |
| Backend/API | **Next.js Route Handlers / Server Actions** | Keeps v1 in one codebase while securely handling booking and integration workflows. |
| Database | **PostgreSQL** | Robust relational model for users, appointment types, availability rules, bookings, and audit data. |
| ORM | **Prisma** | Type-safe data access, migrations, and clear schema management for a TypeScript team. |
| Authentication | **Auth.js** | Supports email/passwordless options and Google/Microsoft OAuth while fitting the Next.js stack. |
| Calendar integration | **Nylas** | A unified API for Google and Microsoft calendar authorization, free/busy checks, and event creation; reduces integration complexity for v1. |
| Transactional email | **Resend + React Email** | Simple API, deliverability-oriented transactional sending, and maintainable email templates. |
| Background jobs | **Trigger.dev** | Handles retries and asynchronous event/email work without operating a separate worker stack. |
| Validation | **Zod** | Shared, type-safe validation for forms and server endpoints. |
| Monitoring | **Sentry** | Production error tracking and performance visibility from launch. |
| Product analytics | **PostHog** | Privacy-aware funnel and feature analytics for early product learning. |
| Hosting | **Vercel** | Low-operations deployment for Next.js, preview environments, and edge delivery. |
| Database hosting | **Neon Postgres** | Managed serverless PostgreSQL with branching and easy Vercel integration. |
| Testing | **Vitest + Playwright** | Fast unit/integration tests plus end-to-end coverage for critical booking journeys. |

### Architecture principles

- Store all timestamps in UTC; render times in the viewer’s IANA time zone.
- Treat the database booking record as the scheduling source of truth and use idempotency keys for calendar and email side effects.
- Recheck calendar conflicts immediately before final booking creation.
- Queue external calls (calendar event creation and email) with retries and observable failure states.
- Encrypt OAuth refresh tokens at rest and request only the minimum calendar scopes.

## 8. Functional requirements

- Booking slots must be calculated from host availability, appointment duration, buffers, notice period, time zone, and busy calendar events.
- A slot must be revalidated at submission to prevent race-condition double bookings.
- Public booking pages must work without invitee authentication and on mobile browsers.
- Confirmation emails must include host name, appointment type, scheduled time with time zone, location/meeting link, and cancellation link.
- Cancellation must update the booking status, remove or cancel the calendar event when applicable, and notify the host.
- The host dashboard must show at minimum upcoming, completed/past, and cancelled bookings.

## 9. Non-functional requirements

- **Security:** OAuth tokens encrypted at rest; HTTPS everywhere; least-privilege access; rate limiting and bot protection on public booking endpoints.
- **Privacy:** Collect only the invitee data needed for booking; offer account deletion and clear retention policy.
- **Reliability:** Target 99.9% monthly availability for public booking pages; retries for recoverable third-party errors.
- **Performance:** Public booking pages should become interactive in under 2.5 seconds on a typical mobile connection.
- **Accessibility:** Meet WCAG 2.1 AA for key booking and dashboard flows.
- **Time zones:** Use IANA time-zone identifiers; clearly display the active time zone and daylight-saving transitions.

## 10. Key data entities

| Entity | Purpose |
|---|---|
| User | Host identity, authentication, profile, and default time zone. |
| CalendarConnection | OAuth provider/account information, encrypted tokens, and selected calendars. |
| AppointmentType | Host-owned bookable configuration: name, duration, location, slug, and active status. |
| AvailabilityRule | Recurring weekly working hours and booking constraints. |
| CalendarBlock | Cached busy intervals when needed for fast slot calculation. |
| Booking | Invitee details, scheduled interval, status, cancellation token, and idempotency metadata. |
| ExternalEvent | Link between a booking and its provider calendar-event identifier/status. |
| Notification | Email delivery intent, provider message ID, status, and retry history. |

## 11. Definition of done for v1

V1 is ready to launch when all of the following are true:

- A new host can sign in, connect Google Calendar or Outlook Calendar, create an appointment type, set availability, and share a public link without internal assistance.
- An invitee can select an available time, submit their name and email, receive a success page and email confirmation, and add the appointment to their calendar.
- A confirmed booking is conflict-checked, stored atomically, and represented on the host’s connected calendar.
- Cancellation from a secure email link updates the application and associated calendar event, then notifies the relevant party.
- Critical flows have automated end-to-end tests: sign-in, calendar connection mock, appointment-type creation, slot calculation, booking, conflict rejection, confirmation email dispatch, and cancellation.
- Error tracking, audit logs for booking state changes, basic product analytics, privacy policy, and terms of service are enabled.
- The responsive public booking flow passes manual accessibility checks for keyboard navigation, labels, contrast, and screen-reader-friendly form errors.
- Production environment variables, OAuth redirect URLs, email sending domain, monitoring alerts, backups, and rollback procedure are configured and documented.

## 12. Launch plan and next steps

### Recommended MVP sequence

1. Set up authentication, database schema, host profile, and one calendar provider.
2. Build appointment types, availability rules, and a tested slot-calculation service.
3. Release the public booking flow with atomic booking creation and confirmation email.
4. Add cancellation, booking dashboard, telemetry, and production hardening.
5. Add the second calendar provider before broad launch, if not completed in the first release.

### Post-v1 candidates

- Rescheduling and reminder emails.
- Stripe payments and paid consultations.
- Teams, round-robin availability, and group sessions.
- Zoom/Google Meet/Teams conferencing integrations.
- Branded embeds, custom domains, and CRM integrations.
- SMS/WhatsApp notifications and native mobile applications.

## 13. Risks and decisions to validate early

- **Calendar-provider cost and scope:** Validate Nylas pricing, provider coverage, and OAuth scopes against expected volume before committing. A direct Google/Microsoft implementation is viable but increases engineering and maintenance cost.
- **Conflicts:** Calendar data can change between displayed-slot calculation and booking submission. The final availability check and database transaction are mandatory.
- **Email deliverability:** Authenticate the sending domain with SPF, DKIM, and DMARC before inviting real customers.
- **Privacy expectations:** Confirm applicable privacy obligations and a data-retention policy before collecting invitee information at scale.

