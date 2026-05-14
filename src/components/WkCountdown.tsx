"use client";

import { useEffect, useState } from "react";

const target = new Date("2026-06-11T00:00:00-04:00").getTime();

export function WkCountdown() {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const distance = Math.max(target - now, 0);
  const days = Math.floor(distance / 86400000);
  const hours = Math.floor((distance % 86400000) / 3600000);
  const minutes = Math.floor((distance % 3600000) / 60000);
  const seconds = Math.floor((distance % 60000) / 1000);

  return (
    <div className="grid grid-cols-4 gap-2">
      <TimeBox label="days" value={days} />
      <TimeBox label="hrs" value={hours} />
      <TimeBox label="min" value={minutes} />
      <TimeBox label="sec" value={seconds} />
    </div>
  );
}

function TimeBox({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-gold/25 bg-black/45 p-3 text-center shadow-glow backdrop-blur">
      <p className="text-2xl font-black text-champagne">{String(value).padStart(2, "0")}</p>
      <p className="text-[10px] uppercase tracking-[0.18em] text-steel">{label}</p>
    </div>
  );
}
