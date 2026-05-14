import { Bell } from "lucide-react";
import { Shell } from "@/components/Shell";

export const metadata = { title: "Price Alerts" };

export default function AlertsPage() {
  return <Shell><section className="mx-auto max-w-4xl px-4 py-10 sm:px-6"><h1 className="text-4xl font-black">Price alerts</h1><div className="glass mt-8 rounded-[28px] p-6"><Bell className="text-volt" /><h2 className="mt-4 text-2xl font-bold">Drop alerts and push notifications</h2><p className="mt-3 text-steel">Alerts are stored in Supabase and can be triggered by scheduled marketplace refresh jobs. Expo push notification tokens belong on the user profile.</p><form className="mt-6 grid gap-3 sm:grid-cols-[1fr_160px_auto]"><input className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 outline-none" placeholder="Product URL or search" /><input className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 outline-none" placeholder="Target €" /><button className="rounded-2xl bg-volt px-5 py-3 font-bold text-ink">Create</button></form></div></section></Shell>;
}
