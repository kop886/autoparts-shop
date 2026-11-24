export type ProductImageProps = {
  imageUrl: string | null;
  alt: string;
  categorySlug: string;
  parentSlug: string | null;
  size?: "sm" | "md" | "lg";
};
