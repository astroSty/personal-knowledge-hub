"use client";

import LogoutButton from "@/components/dashboard/logout-button";
import { useAuth } from "@/components/auth/auth-context";

export default function Header() {
  const { user } = useAuth();

  return (
    <header className="flex justify-end border-b pb-4 mb-6">
    <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground">
          Welcome back, {user?.email || "User"}!
        </span>

        <LogoutButton />
      </div>
    </header>
  );
}