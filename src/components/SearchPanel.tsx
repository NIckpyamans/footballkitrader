"use client";

import { useState } from "react";
import { SlidersHorizontal, Search } from "lucide-react";
import { T } from "@/components/T";

export function SearchPanel({ compact = false }: { compact?: boolean }) {
  const [query, setQuery] = useState("");
  const action = `/search${query ? `?q=${encodeURIComponent(query)}` : ""}`;

  return (
    <form action={action} className={`glass rounded-[28px] p-3 ${compact ? "" : "mx-auto max-w-4xl"}`}>
      <div className="flex flex-col gap-3 sm:flex-row">
        <label className="flex flex-1 items-center gap-3 rounded-2xl bg-white/[0.06] px-4 py-3">
          <Search size={18} className="text-steel" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} name="q" placeholder="Search club, player, season, retro or national team" className="w-full bg-transparent text-sm text-white outline-none placeholder:text-steel" />
        </label>
        <select name="version" className="rounded-2xl border border-white/10 bg-graphite px-4 py-3 text-sm text-white outline-none">
          <option value="">All versions</option>
          <option value="Retro">Retro</option>
          <option value="Fan">Fan</option>
          <option value="Player">Player</option>
          <option value="Training">Training</option>
        </select>
        <button className="flex items-center justify-center gap-2 rounded-2xl bg-volt px-6 py-3 text-sm font-bold text-ink">
          <SlidersHorizontal size={16} /> <T k="findDeals" />
        </button>
      </div>
    </form>
  );
}
