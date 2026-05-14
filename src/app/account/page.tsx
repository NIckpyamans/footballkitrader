import { UserRound } from "lucide-react";
import { Shell } from "@/components/Shell";

export const metadata = { title: "Account Dashboard" };

export default function AccountPage() {
  return <Shell><section className="mx-auto max-w-6xl px-4 py-10 sm:px-6"><h1 className="text-4xl font-black">Account dashboard</h1><div className="mt-8 grid gap-5 md:grid-cols-3"><Panel title="Supabase Auth" value="Email, OAuth, magic links" /><Panel title="Favorites" value="2 watched products" /><Panel title="Alerts" value="3 active price drops" /></div><div className="glass mt-6 rounded-[28px] p-6"><UserRound className="text-volt" /><h2 className="mt-4 text-2xl font-bold">Profile and notification settings</h2><p className="mt-3 text-steel">Connect Auth UI here, persist sizes, clubs, country, marketplace preferences and Expo push tokens.</p></div></section></Shell>;
}

function Panel({ title, value }: { title: string; value: string }) {
  return <div className="glass rounded-[28px] p-6"><p className="text-sm text-steel">{title}</p><p className="mt-3 text-2xl font-bold">{value}</p></div>;
}
