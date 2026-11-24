export type CompatibleCarType = {
  modificationId: number;
  brandName: string;
  modelName: string;
  yearFrom: number;
  yearTo: number | null;
  bodyType: string;
  engineType: string;
  engineVolume: number;
};