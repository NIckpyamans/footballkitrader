"use client";

import { useEffect, useState } from "react";
import { currencyRates, currencySymbols } from "@/lib/i18n";
import type { CurrencyCode } from "@/types";

export function Price({ amount, className = "" }: { amount: number; className?: string }) {
  const [currency, setCurrency] = useState<CurrencyCode>("EUR");

  useEffect(() => {
    const stored = localStorage.getItem("kitradar_currency") as CurrencyCode | null;
    if (stored) setCurrency(stored);
    const handler = (event: Event) => setCurrency((event as CustomEvent<CurrencyCode>).detail);
    window.addEventListener("kitradar-currency", handler);
    return () => window.removeEventListener("kitradar-currency", handler);
  }, []);

  const converted = amount * currencyRates[currency];
  return <span className={className}>{currencySymbols[currency]}{converted.toFixed(currency === "TRY" || currency === "PLN" ? 0 : 2)}</span>;
}
