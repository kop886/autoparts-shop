import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { CategoryWithChildrenType } from "@/app/types/CategoryWithChildrenType";
import CategoryIcon from "@/app/components/CategoryIcon/CategoryIcon";

export default function CategoryCard({
  category,
  index = 0,
}: {
  category: CategoryWithChildrenType;
  index?: number;
}) {
  return (
    <div
      className="card-lift animate-fade-up rounded-2xl border border-line bg-card p-5"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <Link href={`/catalog/${category.slug}`} className="group flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10 text-brand transition group-hover:bg-brand group-hover:text-white">
          <CategoryIcon slug={category.slug} size={24} />
        </div>
        <h3 className="flex-1 font-bold group-hover:text-brand">{category.nameUk}</h3>
        <ChevronRight size={18} className="text-muted transition group-hover:translate-x-1 group-hover:text-brand" />
      </Link>

      {category.children.length > 0 && (
        <ul className="mt-4 space-y-1.5 border-t border-line pt-3">
          {category.children.map((child) => (
            <li key={child.id}>
              <Link
                href={`/catalog/${child.slug}`}
                className="block text-sm text-muted transition hover:translate-x-1 hover:text-brand"
              >
                {child.nameUk}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
