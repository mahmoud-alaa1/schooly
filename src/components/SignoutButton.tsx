"use client";

import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { IoMdLogOut } from "react-icons/io";

export default function SignoutButton() {
  return (
    <Button onClick={() => signOut()} variant="ghost" size="icon">
      <IoMdLogOut className="text-2xl relative" />
    </Button>
  );
}
