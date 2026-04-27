"use client";

import { signOut } from "next-auth/react";

export function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="transition hover:bg-red-50 rounded-lg px-4 py-3 text-left text-sm font-medium text-red-600 cursor-pointer"
    >
      Logout
    </button>
  );
}
