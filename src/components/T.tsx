"use client";

import { useEffect, useState } from "react";
import { t, type TranslationKey } from "@/lib/i18n";
import type { LocaleCode } from "@/types";

export function T({ k }: { k: TranslationKey }) {
  const [locale, setLocale] = useState<LocaleCode>("en");

  useEffect(() => {
    const stored = localStorage.getItem("kitradar_locale") as LocaleCode | null;
    if (stored) setLocale(stored);
    const handler = (event: Event) => setLocale((event as CustomEvent<LocaleCode>).detail);
    window.addEventListener("kitradar-locale", handler);
    return () => window.removeEventListener("kitradar-locale", handler);
  }, []);

  return t(k, locale);
}
