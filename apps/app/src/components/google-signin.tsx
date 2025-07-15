"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { Button } from "@v1/ui/button";

export function GoogleSignin() {
  const { signIn } = useAuthActions();

  return (
    <Button 
      onClick={() => signIn("google")} 
      variant="outline" 
      className="font-mono bg-white text-black border-gray-300 hover:bg-gray-100 hover:border-gray-400"
    >
      Sign in with Google
    </Button>
  );
}
