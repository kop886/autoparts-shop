import Link from "next/link";
import { getCategoryTree } from "@/lib/queries";
import CategoryIcon from "@/app/components/CategoryIcon/CategoryIcon";
import SectionTitle from "@/app/components/SectionTitle/SectionTitle";

export default function HomeCategories() {
  const categories = getCategoryTree();

  return (
    <section className="mx-auto max-w-7xl px-4 py-14">
      <SectionTitle
        title="Розділи каталогу"
        subtitle="Усе для обслуговування та ремонту"
        href="/catalog"
        linkText="Увесь каталог"
      />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {categories.map((c, i) => (
          <Link
            key={c.id}
            href={`/catalog/${c.slug}`}
            className="card-lift animate-fade-up group flex flex-col items-center rounded-2xl border border-line bg-card px-3 py-6 text-center"
            style={{ animationDelay: `${i * 40}ms` }}
          >
            <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/10 text-brand transition duration-300 group-hover:rotate-6 group-hover:bg-brand group-hover:text-white">
              <CategoryIcon slug={c.slug} size={28} />
            </div>
            <span className="text-sm font-semibold">{c.nameUk}</span>
            <span className="mt-0.5 text-xs text-muted">{c.children.length} підрозділів</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
