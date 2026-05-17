"use client";

import { useState } from "react";
import { Bell, Check, Heart } from "lucide-react";

export function ProductActions({ productId, productTitle }: { productId: string; productTitle: string }) {
  const [favoriteSaved, setFavoriteSaved] = useState(false);
  const [alertSaved, setAlertSaved] = useState(false);

  async function saveFavorite() {
    const stored = JSON.parse(localStorage.getItem("footballkitradar_favorites") ?? "[]") as string[];
    const next = Array.from(new Set([...stored, productId]));
    localStorage.setItem("footballkitradar_favorites", JSON.stringify(next));
    await fetch("/api/favorites", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ productId }) }).catch(() => null);
    setFavoriteSaved(true);
  }

  async function saveAlert() {
    const stored = JSON.parse(localStorage.getItem("footballkitradar_alerts") ?? "[]") as Array<{ productId: string; title: string }>;
    const next = [...stored.filter((item) => item.productId !== productId), { productId, title: productTitle }];
    localStorage.setItem("footballkitradar_alerts", JSON.stringify(next));
    await fetch("/api/alerts", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ productId, targetPrice: 25 }) }).catch(() => null);
    setAlertSaved(true);
  }

  return (
    <div className="mt-5 space-y-3">
      <div className="flex flex-wrap gap-3">
        <button onClick={saveFavorite} className="rounded-full border border-white/10 px-5 py-3 font-semibold transition hover:border-volt/40 hover:text-volt">
          {favoriteSaved ? <Check className="mr-2 inline" size={16} /> : <Heart className="mr-2 inline" size={16} />}
          {favoriteSaved ? "Saved to favorites" : "Favorite"}
        </button>
        <button onClick={saveAlert} className="rounded-full bg-volt px-5 py-3 font-bold text-ink transition hover:bg-champagne">
          {alertSaved ? <Check className="mr-2 inline" size={16} /> : <Bell className="mr-2 inline" size={16} />}
          {alertSaved ? "Price alert active" : "Create price alert"}
        </button>
      </div>
      {(favoriteSaved || alertSaved) ? (
        <p className="rounded-2xl border border-volt/20 bg-volt/10 px-4 py-3 text-sm text-volt">
          Saved. This is ready to sync with Supabase Auth when the user is signed in.
        </p>
      ) : null}
    </div>
  );
}
