"use client";

import { signOut } from "next-auth/react";
import { Button } from "./ui/button";

export default function SignoutButton() {
  return (
    <Button
    className="fixed bottom-1 right-1"
      onClick={() => {
        signOut();
      }}
    >
      Logout
    </Button>
  );
}
