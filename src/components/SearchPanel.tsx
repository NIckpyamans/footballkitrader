"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { SlidersHorizontal, Search } from "lucide-react";
import { T } from "@/components/T";

export function SearchPanel({ compact = false, defaultQuery = "" }: { compact?: boolean; defaultQuery?: string }) {
  const [query, setQuery] = useState(defaultQuery);
  const [version, setVersion] = useState("");
  const router = useRouter();
  const activeQuery = query || defaultQuery;

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    goToSearch();
  }

  function goToSearch() {
    const params = new URLSearchParams();
    if (activeQuery.trim()) params.set("q", activeQuery.trim());
    if (version) params.set("version", version);
    const target = `/search${params.toString() ? `?${params.toString()}` : ""}`;
    router.push(target);
    window.location.assign(target);
  }

  return (
    <form onSubmit={submitSearch} className={`glass rounded-[28px] p-3 ${compact ? "" : "mx-auto max-w-4xl"}`}>
      <div className="flex flex-col gap-3 sm:flex-row">
        <label className="flex flex-1 items-center gap-3 rounded-2xl bg-white/[0.06] px-4 py-3">
          <Search size={18} className="text-steel" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} name="q" placeholder="Search club, player, season, retro or national team" className="w-full bg-transparent text-sm text-white outline-none placeholder:text-steel" />
        </label>
        <select name="version" value={version} onChange={(event) => setVersion(event.target.value)} className="rounded-2xl border border-white/10 bg-graphite px-4 py-3 text-sm text-white outline-none">
          <option value="">All versions</option>
          <option value="Retro">Retro</option>
          <option value="Fan">Fan</option>
          <option value="Player">Player</option>
          <option value="Training">Training</option>
        </select>
        <button type="button" onClick={goToSearch} className="flex items-center justify-center gap-2 rounded-2xl bg-volt px-6 py-3 text-sm font-bold text-ink">
          <SlidersHorizontal size={16} /> <T k="findDeals" />
        </button>
      </div>
    </form>
  );
}
