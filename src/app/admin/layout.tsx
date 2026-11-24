import RequireAdmin from "@/app/components/RequireAdmin/RequireAdmin";
import AdminSidebar from "@/app/components/AdminSidebar/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <RequireAdmin>
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 md:flex-row md:gap-8">
        <AdminSidebar />
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </RequireAdmin>
  );
}
