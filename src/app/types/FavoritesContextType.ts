export type FavoritesContextType = {
  favoriteIds: number[];
  isFavorite: (productId: number) => boolean;
  toggleFavorite: (productId: number) => void;
};
