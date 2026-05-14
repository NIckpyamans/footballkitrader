const logos = ["AliExpress", "DHGate", "Temu", "Amazon", "Football Webshops", "Retro Markets", "Instagram Sellers", "Facebook Shops"];

export function MarketplaceLogos() {
  const items = [...logos, ...logos];
  return (
    <div className="mx-auto max-w-7xl overflow-hidden px-4 pb-12 sm:px-6">
      <div className="glass overflow-hidden rounded-[28px] py-4">
        <div className="market-logo-track flex w-max gap-3 px-4">
          {items.map((item, index) => (
            <span key={`${item}-${index}`} className="rounded-full border border-white/10 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-champagne">
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
