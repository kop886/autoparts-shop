export type SelectedCarType = {
  brandId: number;
  brandName: string;
  modelId: number;
  modelName: string;
  modificationId: number;
  yearFrom: number;
  yearTo: number | null;
  bodyType: string;
  engineType: string;
  engineVolume: number;
};