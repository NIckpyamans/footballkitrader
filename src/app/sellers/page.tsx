import { Shell } from "@/components/Shell";
import { sellers } from "@/data/mock";

export const metadata = { title: "Seller Comparison" };

export default function SellersPage() {
  return (
    <Shell>
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <h1 className="text-4xl font-black">Seller comparison</h1>
        <div className="mt-8 overflow-hidden rounded-[28px] border border-white/10">
          <table className="w-full min-w-[760px] border-collapse bg-white/[0.04] text-sm">
            <thead className="bg-white/10 text-left text-steel"><tr><th className="p-4">Seller</th><th>Marketplace</th><th>Trust</th><th>Rating</th><th>Orders</th><th>Refunds</th><th>Delivery</th></tr></thead>
            <tbody>{sellers.map((seller) => <tr key={seller.id} className="border-t border-white/10"><td className="p-4 font-semibold">{seller.name}</td><td>{seller.marketplace}</td><td className="text-volt">{seller.trustScore}%</td><td>{seller.rating}</td><td>{seller.orders.toLocaleString()}</td><td>{seller.refundRate}%</td><td>{seller.avgDeliveryDays} days</td></tr>)}</tbody>
          </table>
        </div>
      </section>
    </Shell>
  );
}
