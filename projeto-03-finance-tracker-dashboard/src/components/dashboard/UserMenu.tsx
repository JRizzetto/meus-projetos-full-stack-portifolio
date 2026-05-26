"use client";

import { signOut } from "next-auth/react";

interface UserMenuProps {
  userName?: string | null;
  userEmail?: string | null;
}

export function UserMenu({ userName, userEmail }: UserMenuProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="text-right">
        <p className="text-sm font-medium text-white">{userName}</p>

        <p className="text-xs text-zinc-400">{userEmail}</p>
      </div>

      <button
        onClick={() => signOut({ callbackUrl: "/login" })}
        className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-300 transition hover:bg-zinc-900 hover:text-white cursor-pointer"
      >
        Logout
      </button>
    </div>
  );
}
