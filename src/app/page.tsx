import HomeHero from "@/app/components/HomeHero/HomeHero";
import HomeCategories from "@/app/components/HomeCategories/HomeCategories";
import HomeProducts from "@/app/components/HomeProducts/HomeProducts";
import HomeAdvantages from "@/app/components/HomeAdvantages/HomeAdvantages";
import HomeCta from "@/app/components/HomeCta/HomeCta";

// сторінка читає базу даних, тому завжди будується на сервері на запит
export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeCategories />
      <HomeProducts />
      <HomeAdvantages />
      <HomeCta />
    </>
  );
}
