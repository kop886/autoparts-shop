import Image from "next/image";
import CategoryIcon from "@/app/components/CategoryIcon/CategoryIcon";
import { ProductImageProps } from "@/app/types/ProductImageProps";

const boxSize = {
  sm: "h-16 w-16 rounded-lg",
  md: "aspect-[4/3] w-full rounded-xl",
  lg: "aspect-square w-full rounded-2xl",
};
const iconSize = { sm: 26, md: 52, lg: 90 };

// Показує фото товару, а якщо його немає — стильну заглушку з іконкою розділу
export default function ProductImage({
  imageUrl,
  alt,
  categorySlug,
  parentSlug,
  size = "md",
}: ProductImageProps) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-soft to-line/60 ${boxSize[size]}`}
    >
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={alt}
          fill
          unoptimized
          sizes="(max-width: 768px) 100vw, 400px"
          className="object-contain p-2"
        />
      ) : (
        <CategoryIcon
          slug={parentSlug ?? categorySlug}
          size={iconSize[size]}
          className="text-muted/60"
        />
      )}
    </div>
  );
}
