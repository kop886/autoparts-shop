export type CarModificationType = {
  id: number;
  modelId: number;
  yearFrom: number;
  yearTo: number | null;
  bodyType: string;
  engineType: string;
  engineVolume: number;
};