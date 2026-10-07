"use client";

import { Copy, ExternalLink, Save } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { AppointmentType } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Input, Label, Textarea } from "@/components/ui/field";

type AppointmentTypeFormProps = {
  appointmentType: AppointmentType;
};

export function AppointmentTypeForm({ appointmentType }: AppointmentTypeFormProps) {
  const [title, setTitle] = useState(appointmentType.title);
  const [slug, setSlug] = useState(appointmentType.slug);
  const [durationMinutes, setDurationMinutes] = useState(appointmentType.durationMinutes);
  const [saved, setSaved] = useState(false);
  const bookingLink = useMemo(() => `/book/${slug || appointmentType.slug}`, [appointmentType.slug, slug]);

  return (
    <Card>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <CardTitle>Appointment type</CardTitle>
          <p className="mt-1 text-sm text-[#425466]">Configure the first shareable booking link.</p>
        </div>
        <Button asChild variant="secondary">
          <Link href={bookingLink}>
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
            Preview
          </Link>
        </Button>
      </div>

      <form
        className="mt-5 grid gap-4"
        onSubmit={(event) => {
          event.preventDefault();
          setSaved(true);
        }}
      >
        <div className="grid gap-2">
          <Label htmlFor="title">Title</Label>
          <Input id="title" value={title} onChange={(event) => setTitle(event.target.value)} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" defaultValue={appointmentType.description} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="slug">Booking slug</Label>
            <Input id="slug" value={slug} onChange={(event) => setSlug(event.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="duration">Duration</Label>
            <select
              id="duration"
              className="h-10 rounded-md border border-[#d8e2ef] bg-white px-3 text-sm text-[#0a2540] outline-none focus:border-[#0a66ff] focus:ring-2 focus:ring-[#cfe0ff]"
              value={durationMinutes}
              onChange={(event) => setDurationMinutes(Number(event.target.value))}
            >
              <option value={15}>15 minutes</option>
              <option value={30}>30 minutes</option>
              <option value={60}>60 minutes</option>
            </select>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="grid gap-2">
            <Label htmlFor="bufferBefore">Buffer before</Label>
            <Input id="bufferBefore" type="number" min={0} defaultValue={appointmentType.bufferBeforeMinutes} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="bufferAfter">Buffer after</Label>
            <Input id="bufferAfter" type="number" min={0} defaultValue={appointmentType.bufferAfterMinutes} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="notice">Minimum notice</Label>
            <Input id="notice" type="number" min={0} defaultValue={appointmentType.minimumNoticeMinutes} />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="location">Location</Label>
          <Input id="location" defaultValue={appointmentType.location} />
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button type="submit">
            <Save className="h-4 w-4" aria-hidden="true" />
            Save draft
          </Button>
          <Button type="button" variant="secondary">
            <Copy className="h-4 w-4" aria-hidden="true" />
            Copy link
          </Button>
          {saved ? <span className="text-sm font-medium text-[#0846b8]">Draft settings saved locally.</span> : null}
        </div>
      </form>
    </Card>
  );
}
