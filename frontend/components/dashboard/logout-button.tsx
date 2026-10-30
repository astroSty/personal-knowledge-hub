"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/auth-context";

export default function LogoutButton() {
  const router = useRouter();
  const { setUser } = useAuth();

  function handleLogout() {
    localStorage.removeItem("accessToken");
    setUser(null);
    router.replace("/login");
  }

  return (
    <button
      onClick={handleLogout}
      className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted"
    >
      Logout
    </button>
  );
}