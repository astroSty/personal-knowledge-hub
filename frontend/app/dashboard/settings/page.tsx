"use client";

import { useAuth } from "@/components/auth/auth-context";

export default function SettingsPage() {
  const { user } = useAuth();

  return (
    <div>
      <h2 className="text-2xl font-bold">Settings</h2>

      <p className="mt-2 text-muted-foreground">
        Manage your account settings here.
      </p>

      <div className="mt-6 max-w-md rounded-lg border p-4">
        <h3 className="font-semibold">Account Information</h3>

        <div className="mt-4">
          <p className="text-sm text-muted-foreground">Email</p>
          <p className="mt-1 font-medium">
            {user?.email || "Not available"}
          </p>
        </div>
      </div>
    </div>
  );
}