import { CompatibleCarType } from "@/app/types/CompatibleCarType";

export default function CompatibilityBadge({ car }: { car: CompatibleCarType }) {
  return (
    <div className="rounded-lg bg-soft px-3 py-2 text-sm">
      <span className="font-semibold">
        {car.brandName} {car.modelName}
      </span>
      <span className="block text-xs text-muted">
        {car.yearFrom}
        {car.yearTo ? `–${car.yearTo}` : "+"} · {car.bodyType} · {car.engineType} {car.engineVolume}л
      </span>
    </div>
  );
}
