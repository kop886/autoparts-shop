import AdminProductForm from "@/app/components/AdminProductForm/AdminProductForm";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Редагування товару</h1>
      <AdminProductForm productId={id} />
    </div>
  );
}