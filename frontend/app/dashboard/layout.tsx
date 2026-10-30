import Sidebar from "@/components/dashboard/sidebar";
import Header from "@/components/dashboard/header";
import ProtectedRoute from "@/components/auth/protected-route";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 p-6">
          <Header />
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
}