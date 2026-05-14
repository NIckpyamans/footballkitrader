"use client";

import { useEffect, useState } from "react";
import { currencies, defaultCurrencyByLocale, locales } from "@/lib/i18n";
import type { CurrencyCode, LocaleCode } from "@/types";

const localeKey = "kitradar_locale";
const currencyKey = "kitradar_currency";

export function LocaleControls() {
  const [locale, setLocale] = useState<LocaleCode>("en");
  const [currency, setCurrency] = useState<CurrencyCode>("EUR");

  useEffect(() => {
    const browserLocale = navigator.language.slice(0, 2) as LocaleCode;
    const storedLocale = localStorage.getItem(localeKey) as LocaleCode | null;
    const nextLocale = storedLocale ?? (locales.some((item) => item.code === browserLocale) ? browserLocale : "en");
    const storedCurrency = localStorage.getItem(currencyKey) as CurrencyCode | null;
    setLocale(nextLocale);
    setCurrency(storedCurrency ?? defaultCurrencyByLocale[nextLocale] ?? "EUR");
  }, []);

  function updateLocale(value: LocaleCode) {
    setLocale(value);
    localStorage.setItem(localeKey, value);
    document.documentElement.lang = value;
    document.documentElement.dir = locales.find((item) => item.code === value)?.dir ?? "ltr";
    window.dispatchEvent(new CustomEvent("kitradar-locale", { detail: value }));
  }

  function updateCurrency(value: CurrencyCode) {
    setCurrency(value);
    localStorage.setItem(currencyKey, value);
    window.dispatchEvent(new CustomEvent("kitradar-currency", { detail: value }));
  }

  return (
    <div className="flex items-center gap-2">
      <select aria-label="Language" value={locale} onChange={(event) => updateLocale(event.target.value as LocaleCode)} className="rounded-full border border-white/10 bg-ink/80 px-3 py-2 text-xs text-white outline-none">
        {locales.map((item) => <option key={item.code} value={item.code}>{item.code.toUpperCase()}</option>)}
      </select>
      <select aria-label="Currency" value={currency} onChange={(event) => updateCurrency(event.target.value as CurrencyCode)} className="rounded-full border border-white/10 bg-ink/80 px-3 py-2 text-xs text-white outline-none">
        {currencies.map((item) => <option key={item} value={item}>{item}</option>)}
      </select>
    </div>
  );
}
