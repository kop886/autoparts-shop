import ProductSkeleton from "@/app/components/ProductSkeleton/ProductSkeleton";

// показується, поки сервер готує наступну сторінку
export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="skeleton mb-6 h-9 w-64" />
      <ProductSkeleton count={8} />
    </div>
  );
}
