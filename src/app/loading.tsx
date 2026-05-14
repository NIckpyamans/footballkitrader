import { Shell } from "@/components/Shell";
import { SkeletonGrid } from "@/components/SkeletonGrid";

export default function Loading() {
  return <Shell><section className="mx-auto max-w-7xl px-4 py-10 sm:px-6"><SkeletonGrid /></section></Shell>;
}
