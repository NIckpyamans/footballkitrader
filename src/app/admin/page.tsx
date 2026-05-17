import { BarChart3, Bot, CreditCard, LineChart, SearchCheck, ShieldAlert, Store, Users } from "lucide-react";
import { DiscoveryPanel } from "@/components/DiscoveryPanel";
import { Shell } from "@/components/Shell";

export const metadata = { title: "Admin Dashboard" };

export default function AdminPage() {
  return (
    <Shell>
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <h1 className="text-4xl font-black">Admin dashboard</h1>
        <p className="mt-3 text-steel">Revenue, affiliate performance, user management, marketplace governance and AI moderation.</p>
        <div className="mt-8 grid gap-5 md:grid-cols-4">
          <AdminCard icon={<Store />} title="Marketplaces" value="8 monitored" />
          <AdminCard icon={<Bot />} title="AI moderation" value="17 queued" />
          <AdminCard icon={<CreditCard />} title="Revenue" value="EUR 9.3k MTD" />
          <AdminCard icon={<Users />} title="Users" value="12.4k" />
        </div>
        <div className="mt-6 grid gap-5 md:grid-cols-4">
          <AdminCard icon={<SearchCheck />} title="SEO pages" value="10 indexed-ready" />
          <AdminCard icon={<LineChart />} title="Trend velocity" value="+38% WK26" />
          <AdminCard icon={<BarChart3 />} title="Products" value="6 enriched" />
          <AdminCard icon={<ShieldAlert />} title="Risk sources" value="2 high-risk" />
        </div>
        <div className="mt-6 grid gap-5 lg:grid-cols-[1.2fr_.8fr]">
          <div className="glass rounded-[28px] p-6">
            <h2 className="text-2xl font-bold">Affiliate analytics</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-4"><Metric label="Clicks" value="38,421" /><Metric label="Conversions" value="1,287" /><Metric label="Commission" value="EUR 9,340" /><Metric label="EPC" value="EUR 0.24" /></div>
            <div className="mt-6 space-y-3">
              {["AliExpress", "DHGate", "Amazon", "Temu"].map((item, index) => <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"><div className="flex justify-between text-sm"><span>{item}</span><span className="text-volt">{42 - index * 7}% conversion quality</span></div><div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-volt" style={{ width: `${82 - index * 12}%` }} /></div></div>)}
            </div>
          </div>
          <div className="glass rounded-[28px] p-6">
            <ShieldAlert className="text-volt" />
            <h2 className="mt-4 text-2xl font-bold">AI moderation queue</h2>
            <div className="mt-5 space-y-3 text-sm text-steel">
              <p>Fake review clusters: 6</p>
              <p>Image mismatch warnings: 4</p>
              <p>Seller trust drops: 3</p>
              <p>High-risk source reviews: 4</p>
              <p>Manual product approvals: 21</p>
            </div>
          </div>
        </div>
        <div className="mt-6 grid gap-5 lg:grid-cols-3">
          <OpsPanel title="Product management" items={["Image completeness: 100%", "Missing thumbnails: 0", "Unmatched listings: 4", "Manual moderation: 21"]} />
          <OpsPanel title="SEO monitoring" items={["Canonical URLs: configured", "Sitemap routes: 36", "Structured data: products + collections", "Noindex admin: enabled"]} />
          <OpsPanel title="User analytics" items={["Watchlists: 3.8k", "Price alerts: 1.2k", "Top locale: NL", "Top currency: EUR"]} />
        </div>
        <div className="mt-6"><DiscoveryPanel compact /></div>
      </section>
    </Shell>
  );
}

function AdminCard({ icon, title, value }: { icon: React.ReactNode; title: string; value: string }) {
  return <div className="glass rounded-[28px] p-6"><div className="text-volt">{icon}</div><p className="mt-5 text-sm text-steel">{title}</p><p className="text-2xl font-bold">{value}</p></div>;
}

function Metric({ label, value }: { label: string; value: string }) {
  return <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"><p className="text-sm text-steel">{label}</p><p className="text-2xl font-bold">{value}</p></div>;
}

function OpsPanel({ title, items }: { title: string; items: string[] }) {
  return <div className="glass rounded-[28px] p-6"><h2 className="text-xl font-bold">{title}</h2><div className="mt-5 space-y-3">{items.map((item) => <p key={item} className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-steel">{item}</p>)}</div></div>;
}
