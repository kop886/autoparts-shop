import { EmptyStateProps } from "@/app/types/EmptyStateProps";

export default function EmptyState({ icon: Icon, title, text, action }: EmptyStateProps) {
  return (
    <div className="animate-fade-up flex flex-col items-center rounded-2xl border border-dashed border-line bg-card px-6 py-16 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand/10 text-brand">
        <Icon size={30} />
      </div>
      <h3 className="text-lg font-bold">{title}</h3>
      {text && <p className="mt-1 max-w-sm text-sm text-muted">{text}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
