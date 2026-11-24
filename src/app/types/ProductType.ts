export type ProductType = {
  id: number;
  categoryId: number;
  manufacturerId: number;
  nameUk: string;
  nameEn: string;
  articleNumber: string;
  price: number;
  stockQuantity: number;
  imageUrl: string | null;
  descriptionUk: string | null;
  descriptionEn: string | null;
};