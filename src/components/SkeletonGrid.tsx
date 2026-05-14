export function SkeletonGrid() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="glass rounded-[28px] p-4">
          <div className="skeleton aspect-[4/3] rounded-3xl" />
          <div className="mt-5 h-5 w-2/3 rounded-full skeleton" />
          <div className="mt-3 h-4 w-1/2 rounded-full skeleton" />
          <div className="mt-6 grid grid-cols-3 gap-3">
            <div className="h-16 rounded-2xl skeleton" />
            <div className="h-16 rounded-2xl skeleton" />
            <div className="h-16 rounded-2xl skeleton" />
          </div>
        </div>
      ))}
    </div>
  );
}
