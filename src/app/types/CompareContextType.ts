export type CompareContextType = {
  compareIds: number[];
  isInCompare: (productId: number) => boolean;
  toggleCompare: (productId: number) => void;
  clearCompare: () => void;
  maxItems: number;
};
