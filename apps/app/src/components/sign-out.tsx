"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { Button } from "@v1/ui/button";
import { Icons } from "@v1/ui/icons";

export function SignOut() {
  const { signOut } = useAuthActions();

  return (
    <Button
      onClick={signOut}
      variant="outline"
      className="font-mono gap-2 flex items-center bg-white dark:bg-gray-800 text-black dark:text-white border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
    >
      <Icons.SignOut className="size-4" />
      <span>Sign out</span>
    </Button>
  );
}
