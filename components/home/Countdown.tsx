"use client";

import { useState, useEffect } from "react";
import { getTimeUntilHalloween } from "@/lib/utils";

export function Countdown() {
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    setMounted(true);
    setTime(getTimeUntilHalloween());
    const interval = setInterval(() => {
      setTime(getTimeUntilHalloween());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const units = [
    { label: "Days", value: time.days },
    { label: "Hours", value: time.hours },
    { label: "Min", value: time.minutes },
    { label: "Sec", value: time.seconds },
  ];

  return (
    <div className="inline-block" style={{ visibility: mounted ? "visible" : "hidden" }}>
      <p className="font-inter text-[10px] uppercase tracking-[0.25em] text-magic-gold/70 mb-3">
        The Night Begins In
      </p>
      <div className="flex items-center gap-3">
        {units.map((unit, index) => (
          <div key={unit.label} className="flex items-center gap-3">
            <div className="flex flex-col items-center">
              <div className="bg-deep-black/80 border border-magic-gold/30 px-3 py-2 rounded-sm min-w-[48px] text-center backdrop-blur-sm">
                <span className="font-cinzel text-xl text-bright-gold font-bold tabular-nums">
                  {String(unit.value).padStart(2, "0")}
                </span>
              </div>
              <span className="font-inter text-[9px] uppercase tracking-widest text-parchment-brown/60 mt-1.5">
                {unit.label}
              </span>
            </div>
            {index < units.length - 1 && (
              <span className="font-cinzel text-magic-gold/60 text-xl pb-4">
                :
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
