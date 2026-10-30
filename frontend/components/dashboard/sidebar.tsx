import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen border-r p-6">
      <h2 className="text-xl font-bold mb-8">
        Knowledge Hub
      </h2>

      <nav className="space-y-4">
        <Link href="/dashboard" className="block font-medium">
          Dashboard
        </Link>

        <Link href="/dashboard/notes" className="block text-muted-foreground">
          My Notes
        </Link>

        <Link href="/dashboard/settings" className="block text-muted-foreground">
          Settings
        </Link>
      </nav>
    </aside>
  );
}