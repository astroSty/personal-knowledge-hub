"use client";

import LogoutButton from "@/components/dashboard/logout-button";
import { useAuth } from "@/components/auth/auth-context";

export default function Header() {
  const { user } = useAuth();

  return (
    <header className="flex items-center justify-between border-b pb-4 mb-6">
      <h1 className="text-xl font-semibold">
        Dashboard
      </h1>

      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground">
          Welcome back, {user?.email || "User"}!
        </span>

        <LogoutButton />
      </div>
    </header>
  );
}