import { getCategoryTree } from "@/lib/queries";
import CategoryCard from "@/app/components/CategoryCard/CategoryCard";

// серверний компонент: читає категорії прямо з бази, без зайвого запиту з браузера
export default function CategoryList() {
  const categories = getCategoryTree();

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((category, i) => (
        <CategoryCard key={category.id} category={category} index={i} />
      ))}
    </div>
  );
}
