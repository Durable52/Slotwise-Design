export type BookingEmailInput = {
  inviteeName: string;
  inviteeEmail: string;
  hostEmail: string;
  title: string;
  startsAt: Date;
  timeZone: string;
  location: string;
  cancellationUrl: string;
};

export type EmailProvider = {
  sendBookingConfirmation(input: BookingEmailInput): Promise<{ providerMessageId: string; status: "sent" }>;
  sendCancellationNotice(input: BookingEmailInput): Promise<{ providerMessageId: string; status: "sent" }>;
};

export const mockEmailProvider: EmailProvider = {
  async sendBookingConfirmation(input) {
    return {
      providerMessageId: `mock-confirmation-${input.inviteeEmail}`,
      status: "sent",
    };
  },
  async sendCancellationNotice(input) {
    return {
      providerMessageId: `mock-cancellation-${input.inviteeEmail}`,
      status: "sent",
    };
  },
};

