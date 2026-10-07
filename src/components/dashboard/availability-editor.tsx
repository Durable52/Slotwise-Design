"use client";

import { Clock, Save } from "lucide-react";
import { useState } from "react";
import type { WeeklyAvailabilityRule } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function formatTime12Hour(time: string) {
  const [hourText, minuteText] = time.split(":");
  const hour = Number(hourText);
  const suffix = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;

  return `${displayHour}:${minuteText} ${suffix}`;
}

type AvailabilityEditorProps = {
  rules: WeeklyAvailabilityRule[];
};

export function AvailabilityEditor({ rules }: AvailabilityEditorProps) {
  const [enabledDays, setEnabledDays] = useState(() => new Set(rules.map((rule) => rule.dayOfWeek)));
  const [saved, setSaved] = useState(false);

  return (
    <Card>
      <div className="flex items-start justify-between gap-3">
        <div>
          <CardTitle>Availability</CardTitle>
          <p className="mt-1 text-sm text-[#425466]">Weekly working hours and booking guardrails.</p>
        </div>
        <Clock className="h-5 w-5 text-[#0a66ff]" aria-hidden="true" />
      </div>

      <form
        className="mt-5 grid gap-3"
        onSubmit={(event) => {
          event.preventDefault();
          setSaved(true);
        }}
      >
        {dayNames.map((dayName, dayOfWeek) => {
          const dayRules = rules.filter((rule) => rule.dayOfWeek === dayOfWeek);
          const checked = enabledDays.has(dayOfWeek);

          return (
            <div key={dayName} className="grid gap-3 rounded-lg border border-[#d8e2ef] bg-[#fbfdff] p-3 sm:grid-cols-[92px_1fr]">
              <label className="flex items-center gap-2 text-sm font-semibold text-[#0a2540]">
                <input
                  type="checkbox"
                  className="h-4 w-4 accent-[#0a66ff]"
                  checked={checked}
                  onChange={(event) => {
                    const next = new Set(enabledDays);
                    if (event.target.checked) {
                      next.add(dayOfWeek);
                    } else {
                      next.delete(dayOfWeek);
                    }
                    setEnabledDays(next);
                  }}
                />
                {dayName}
              </label>
              <div className="grid gap-2">
                {(dayRules.length ? dayRules : [{ id: dayName, startTime: "09:00", endTime: "17:00" }]).map((rule) => (
                  <div key={rule.id} className="grid grid-cols-[minmax(88px,1fr)_minmax(88px,1fr)] gap-2">
                    <input
                      aria-label={`${dayName} start time`}
                      className="h-9 rounded-md border border-[#d8e2ef] bg-white px-2 text-xs font-medium text-[#0a2540] disabled:bg-[#f3f7fb] disabled:text-[#9aa8ba]"
                      defaultValue={formatTime12Hour(rule.startTime)}
                      disabled={!checked}
                    />
                    <input
                      aria-label={`${dayName} end time`}
                      className="h-9 rounded-md border border-[#d8e2ef] bg-white px-2 text-xs font-medium text-[#0a2540] disabled:bg-[#f3f7fb] disabled:text-[#9aa8ba]"
                      defaultValue={formatTime12Hour(rule.endTime)}
                      disabled={!checked}
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
        <div className="flex flex-wrap items-center gap-3">
          <Button type="submit">
            <Save className="h-4 w-4" aria-hidden="true" />
            Save availability
          </Button>
          {saved ? <span className="text-sm font-medium text-[#0846b8]">Availability draft saved locally.</span> : null}
        </div>
      </form>
    </Card>
  );
}
