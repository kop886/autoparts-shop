import { AdminStatCardProps } from "@/app/types/AdminStatCardProps";

export default function AdminStatCard({ icon: Icon, label, value, highlight }: AdminStatCardProps) {
  return (
    <div className="card-lift rounded-2xl border border-line bg-card p-5">
      <div
        className={`mb-3 flex h-11 w-11 items-center justify-center rounded-xl ${
          highlight ? "bg-brand text-white" : "bg-brand/10 text-brand"
        }`}
      >
        <Icon size={22} />
      </div>
      <p className="text-2xl font-extrabold">{value}</p>
      <p className="text-sm text-muted">{label}</p>
    </div>
  );
}
