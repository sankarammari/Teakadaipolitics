"use client";

import { useEffect, useState } from "react";

const formatter = new Intl.DateTimeFormat("ta-IN", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Asia/Kolkata",
});

/** Rendered in the browser so a statically built page still shows today's date. */
export function TodayDate() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => setNow(new Date()), []);
  return (
    <time dateTime={now?.toISOString()} className="whitespace-nowrap">
      {now ? formatter.format(now) : " "}
    </time>
  );
}
