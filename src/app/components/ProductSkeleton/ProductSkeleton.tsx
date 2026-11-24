// Сірі «заглушки» карток, поки вантажаться товари
export default function ProductSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-2xl border border-line bg-card p-3">
          <div className="skeleton aspect-[4/3] w-full" />
          <div className="skeleton mt-4 h-3 w-1/3" />
          <div className="skeleton mt-3 h-4 w-full" />
          <div className="skeleton mt-2 h-4 w-2/3" />
          <div className="mt-5 flex items-center justify-between">
            <div className="skeleton h-6 w-24" />
            <div className="skeleton h-9 w-9" />
          </div>
        </div>
      ))}
    </div>
  );
}
