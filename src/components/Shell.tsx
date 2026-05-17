import Link from "next/link";
import { Bell, Heart, Search, ShieldCheck, UserRound } from "lucide-react";
import { LocaleControls } from "@/components/LocaleControls";
import { T } from "@/components/T";
import { siteConfig } from "@/config/site";

const nav = [
  ["navDeals", "/deals"],
  ["navTrending", "/trending"],
  ["navSellers", "/sellers"],
  ["Discovery", "/discovery"],
  ["navAlerts", "/alerts"]
] as const;

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-stadium">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-ink/75 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <Link href="/" className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-champagne text-sm font-black text-ink shadow-glow">{siteConfig.shortName}</span>
            <span>
              <span className="block text-lg font-semibold tracking-tight">{siteConfig.name}</span>
              <span className="hidden text-xs text-steel sm:block">{siteConfig.tagline}</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            {nav.map(([label, href]) => (
              <Link key={href} href={href} className="rounded-full px-4 py-2 text-sm text-steel transition hover:bg-white/10 hover:text-white">
                {label === "Discovery" ? label : <T k={label} />}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <div className="hidden sm:block"><LocaleControls labelPrefix="Desktop" /></div>
            <Link aria-label="Search" href="/search" className="rounded-full border border-white/10 p-2 text-steel hover:text-white"><Search size={18} /></Link>
            <Link aria-label="Favorites" href="/favorites" className="rounded-full border border-white/10 p-2 text-steel hover:text-white"><Heart size={18} /></Link>
            <Link aria-label="Account" href="/account" className="rounded-full border border-white/10 p-2 text-steel hover:text-white"><UserRound size={18} /></Link>
          </div>
        </div>
        <div className="mx-auto block max-w-7xl px-4 pb-3 sm:hidden"><LocaleControls labelPrefix="Mobile" /></div>
      </header>
      {children}
      <footer className="border-t border-white/10 px-4 py-10 text-sm text-steel">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2"><ShieldCheck size={18} className="text-mint" /> {siteConfig.name} combines seller trust, affiliate transparency and AI moderation.</div>
          <div className="flex items-center gap-2"><Bell size={18} className="text-volt" /> Alerts, favorites and SEO pages ready for launch.</div>
        </div>
      </footer>
    </main>
  );
}
