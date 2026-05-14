import type { Product } from "@/types";

export function PriceHistoryChart({ product }: { product: Product }) {
  const values = product.priceHistory.map((item) => item.price);
  const max = Math.max(...values);
  const min = Math.min(...values);

  return (
    <div className="glass rounded-[28px] p-5">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-mint">price history</p>
          <h2 className="text-2xl font-bold">Lowest trend</h2>
        </div>
        <p className="rounded-full bg-volt/10 px-3 py-1 text-sm font-semibold text-volt">-{Math.round(((max - min) / max) * 100)}%</p>
      </div>
      <div className="flex h-44 items-end gap-3">
        {product.priceHistory.map((item) => {
          const height = 24 + ((item.price - min) / Math.max(max - min, 1)) * 120;
          return (
            <div key={item.date} className="flex flex-1 flex-col items-center gap-2">
              <div className="w-full rounded-t-2xl bg-gradient-to-t from-volt to-mint" style={{ height }} />
              <span className="text-xs text-steel">{item.date}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
